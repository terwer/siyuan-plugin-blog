import gitclone from "git-clone/promise"
import LogFactory, { LogLevelEnum } from "zhi-log"

const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_INFO, "zhi-cli").getLogger("init:download")

export const downloadTemplate = (templateGitUrl: string, downloadPath: string, branch: string) => {
  logger.info("download template")
  return new Promise((resolve, reject) => {
    logger.info("prepare to checkout templateGitUrl=>", templateGitUrl)
    logger.info("prepare to checkout downloadPath=>", downloadPath)
    logger.info("prepare to checkout branch=>", branch)
    logger.info("start download template ...")

    gitclone(templateGitUrl, downloadPath, {
      checkout: branch,
      shallow: false,
    })
      .then((r: any) => {
        logger.info("download success")
        resolve("download success")
      })
      .catch((error: any) => {
        logger.error("download fail")
        reject(error)
      })
  })
}
