import gitclone from "git-clone/promise"
import ora from "ora"
import LogFactory, { LogLevelEnum } from "zhi-log"

const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_INFO, "zhi-cli").getLogger("init:download")

export const downloadTemplate = (templateGitUrl: string, downloadPath: string, branch: string) => {
  const loading = ora("download template")
  return new Promise((resolve, reject) => {
    logger.info("prepare to checkout templateGitUrl=>", templateGitUrl)
    logger.info("prepare to checkout downloadPath=>", downloadPath)
    logger.info("prepare to checkout branch=>", branch)
    loading.start("start download template")

    gitclone(templateGitUrl, downloadPath, {
      checkout: branch,
      shallow: false,
    })
      .then((r: any) => {
        loading.succeed("download success")
        loading.stop()

        resolve("download success")
      })
      .catch((error: any) => {
        loading.stop()
        loading.fail("download fail")

        reject(error)
      })
  })
}
