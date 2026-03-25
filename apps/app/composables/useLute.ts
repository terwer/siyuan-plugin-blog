/**
 * useLute - Lute Markdown 渲染工具
 * 
 * 用于将 Markdown 文本转换为 HTML
 * Lute 库通过 nuxt.config.ts 的 head.script 加载
 */

// 创建日志记录器
const logger = createAppLogger("use-lute")

// Lute 实例（单例模式）
let luteInstance: any = null

/**
 * 获取 Lute 实例
 * 注意：Lute 脚本通过 nuxt.config.ts 的 head.script 加载
 */
const getLuteInstance = (): any => {
    if (typeof window === 'undefined') return null

    // 创建实例（如果还没有创建）
    if ((window as any).Lute && luteInstance === null) {
        try {
            luteInstance = (window as any).Lute.New()
            // 设置一些常用的渲染选项
            luteInstance.SetSoftBreak2HardBreak(true)
            luteInstance.SetAutoSpace(true)
            luteInstance.SetFixTermTypo(true)
            logger.info('Lute instance created with default settings')
        } catch (error) {
            logger.error('Failed to create Lute instance:', error)
            return null
        }
    }

    return luteInstance
}

/**
 * 渲染 Markdown 为 HTML
 * @param content Markdown 文本
 * @returns HTML 字符串（包裹在 .markdown-content 中）
 */
const renderMarkdown = (content: string): string => {
    if (!content || typeof content !== 'string') {
        return ''
    }

    try {
        const lute = getLuteInstance()
        if (!lute) {
            logger.warn('Lute not available, returning plain text')
            return `<div class="markdown-content"><pre>${escapeHtml(content)}</pre></div>`
        }

        const html = lute.MarkdownStr('', content)
        return `<div class="markdown-content">${html}</div>`
    } catch (error) {
        logger.error('Error rendering markdown:', error)
        return `<div class="markdown-content"><pre>${escapeHtml(content)}</pre></div>`
    }
}

/**
 * HTML 转义辅助函数
 */
const escapeHtml = (text: string): string => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

/**
 * Composable: useLute
 * 
 * 提供 Markdown 渲染功能
 */
export const useLute = () => {
    return {
        renderMarkdown,
        getLuteInstance,
    }
}
