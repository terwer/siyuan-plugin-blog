/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

const isInsideInlineCode = (text: string, index: number): boolean => {
    const lineStart = text.lastIndexOf('\n', index) + 1
    let inside = false
    for (let i = lineStart; i < index; i++) {
        if (text[i] === '`') {
            inside = !inside
        }
    }
    return inside
}

/**
 * 修复一个段落内的加粗跨度（允许跨单个换行，不允许跨空行）：
 * - 去掉 ** 内侧多余空格
 * - 结束标记后紧跟正文时补一个空格
 *
 * 不处理标题，不改写其他内容。
 */
const repairBoldSpans = (text: string): string => {
    let output = ''
    let cursor = 0

    while (cursor < text.length) {
        const open = text.indexOf('**', cursor)
        if (open === -1) {
            output += text.slice(cursor)
            break
        }

        if (text[open - 1] === '\\' || isInsideInlineCode(text, open)) {
            output += text.slice(cursor, open + 2)
            cursor = open + 2
            continue
        }

        const close = text.indexOf('**', open + 2)
        if (close === -1) {
            output += text.slice(cursor)
            break
        }

        const rawInner = text.slice(open + 2, close)
        // 加粗不能跨空行，否则不是同一个段落
        if (/\n\s*\n/.test(rawInner)) {
            output += text.slice(cursor, open + 2)
            cursor = open + 2
            continue
        }

        const inner = rawInner.replace(/^[ \t]+/, '').replace(/[ \t]+$/, '')
        output += `${text.slice(cursor, open)}**${inner}**`

        const nextChar = text[close + 2] ?? ''
        if (nextChar && nextChar !== '\n' && !/\s/.test(nextChar) && /[一-龥A-Za-z0-9]/.test(nextChar)) {
            output += ' '
        }

        cursor = close + 2
    }

    return output
}

/**
 * 处理一段不在代码块内的内容：
 * 1. 列表符号后紧跟文字时补空格
 * 2. 按空行分块修复加粗，保留所有换行
 * 3. 清理仍未配对的、两侧都是空白的孤立 **
 */
const sanitizeChunk = (chunk: string): string => {
    const listFixed = chunk
        .split('\n')
        .map((line) => {
            if (/^[-+](?=[一-龥A-Za-z])/.test(line)) {
                return `${line[0]} ${line.slice(1)}`
            }
            return line
        })
        .join('\n')

    const boldFixed = listFixed
        .split(/(\n{2,})/)
        .map((part, index) => (index % 2 === 1 ? part : repairBoldSpans(part)))
        .join('')

    return boldFixed
        .split('\n')
        .map((line) => {
            const markers = line.match(/\*\*/g)
            if (!markers || markers.length % 2 === 0) {
                return line
            }

            return line.replace(/\s\*\*\s/g, (match: string, ...args: any[]) => {
                const offset = args[0] as number
                return isInsideInlineCode(line, offset + 1) ? match : ' '
            })
        })
        .join('\n')
}

/**
 * 只处理 AI 输出里确定的格式问题：
 * - 列表符号后缺少空格
 * - 加粗标记内侧空格、结束标记后缺少空格（支持跨单行）
 * - 两侧都是空白的孤立 **
 *
 * 代码块和行内代码保持原样，标题和换行不做修改。
 */
export const sanitizeAiMarkdown = (content: string): string => {
    const lines = content.split('\n')
    const codeLines = new Array<boolean>(lines.length).fill(false)
    let inFence = false

    for (let i = 0; i < lines.length; i++) {
        if (/^\s*(```|~~~)/.test(lines[i])) {
            codeLines[i] = true
            inFence = !inFence
            continue
        }
        codeLines[i] = inFence
    }

    const output: string[] = []
    let i = 0
    while (i < lines.length) {
        if (codeLines[i]) {
            output.push(lines[i])
            i++
            continue
        }

        let j = i
        while (j < lines.length && !codeLines[j]) {
            j++
        }

        output.push(sanitizeChunk(lines.slice(i, j).join('\n')))
        i = j
    }

    return output.join('\n')
}
