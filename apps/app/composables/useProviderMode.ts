/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * 获取当前是否为服务商模式
 *
 * @author terwer
 * @since 5.0.0
 */
export const useProviderMode = () => {
  const logger = createAppLogger("use-auth-mode-fetch")
  const env = useRuntimeConfig()
  const providerMode = env.public.providerMode.toString() === "true"
  logger.info(`check in providerMode => ${providerMode}`)
  return { providerMode }
}
