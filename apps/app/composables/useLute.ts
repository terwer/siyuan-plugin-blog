/**
 * useLute - Lute Markdown 渲染工具
 *
 * 用于将 Markdown 文本转换为 HTML。
 * Lute 体积较大，只在 AI 面板真正需要时按需加载。
 */

import { ref } from "vue"
import { loadScriptOnce } from "~/utils/assetLoader"
import { sanitizeAiMarkdown } from "~/utils/aiMarkdown"

// 创建日志记录器
const logger = createAppLogger("use-lute")

const LUTE_SCRIPT_PATH = "libs/lute/lute.min.js"

// Lute 实例（单例模式）
let luteInstance: any = null
let luteLoadPromise: Promise<void> | null = null

// 供模板建立响应式依赖：加载完成后自动重新渲染已存在的消息
const luteReady = ref(false)

/**
 * 获取 Lute 实例
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
 * 按需加载 Lute 脚本并创建实例。
 *
 * 只有打开 AI 面板时才会下载，普通阅读页面不会加载。
 */
const ensureLuteLoaded = async (): Promise<any> => {
    if (typeof window === 'undefined') {
        return null
    }

    if ((window as any).Lute) {
        const instance = getLuteInstance()
        luteReady.value = Boolean(instance)
        return instance
    }

    if (!luteLoadPromise) {
        luteLoadPromise = loadScriptOnce(LUTE_SCRIPT_PATH)
    }

    try {
        await luteLoadPromise
        const instance = getLuteInstance()
        luteReady.value = Boolean(instance)
        return instance
    } catch (error) {
        logger.error('Failed to load Lute:', error)
        luteLoadPromise = null
        return null
    }
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
        const ready = luteReady.value
        const lute = ready ? getLuteInstance() : null
        if (!lute) {
            return `<div class="markdown-content"><pre>${escapeHtml(content)}</pre></div>`
        }

        const html = lute.MarkdownStr('', sanitizeAiMarkdown(content))
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
        ensureLuteLoaded,
        luteReady,
    }
}
