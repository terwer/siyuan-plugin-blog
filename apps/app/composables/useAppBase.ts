/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

/**
 * 获取当前相对路径
 *
 * @author terwer
 * @since 5.0.0
 */
export const useAppBase = () => {
  const logger = createAppLogger("use-app-base")
  const appBase = process.env.APP_BASE
  logger.info(`get app base => ${appBase}`)
  return { appBase }
}
