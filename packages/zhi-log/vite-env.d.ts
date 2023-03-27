/// <reference types="vite/client" />

/**
 * 预定义的环境变量
 *
 * @author terwer
 * @since 1.4.0
 */
interface ImportMetaEnv {
  /**
   * 日志级别
   */
  readonly VITE_LOG_LEVEL: string

  /**
   * 日志前缀
   */
  readonly VITE_LOG_PREFIX: string
}

/**
 * 环境变量定义
 */
interface ImportMeta {
  readonly env: ImportMetaEnv
}
