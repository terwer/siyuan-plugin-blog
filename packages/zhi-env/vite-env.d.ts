/// <reference types="vite/client" />

/**
 * 预定义的环境变量
 *
 * @author terwer
 * @since 0.0.1
 */
interface ImportMetaEnv {
  /**
   * 是否是调试模式
   */
  readonly VITE_DEBUG_MODE: string
}

/**
 * 环境变量定义
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
