/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2026 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * SSE 行解析器
 *
 * 网络读取的边界和 SSE 事件边界没有任何关系：一次 read() 可能只拿到半行
 * JSON，也可能一次拿到多个事件。必须把不完整的行留到下一次读取，否则
 * 被切断的事件会整条丢失，表现为 AI 回答随机少字、少换行、少加粗标记。
 */
export const createSSEParser = (onData: (data: string) => void) => {
    let buffer = ""

    const handleLine = (rawLine: string) => {
        const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine
        if (!line.startsWith("data:")) {
            return
        }

        const data = line.slice(5).trimStart()
        if (!data || data === "[DONE]") {
            return
        }

        onData(data)
    }

    return {
        /**
         * 追加一段已解码的文本，完整行立即回调，最后一行留到下次。
         */
        push(text: string) {
            buffer += text
            const lines = buffer.split("\n")
            buffer = lines.pop() ?? ""
            for (const line of lines) {
                handleLine(line)
            }
        },

        /**
         * 流结束时处理没有以换行结尾的最后一行。
         */
        flush() {
            if (buffer) {
                handleLine(buffer)
                buffer = ""
            }
        },
    }
}
