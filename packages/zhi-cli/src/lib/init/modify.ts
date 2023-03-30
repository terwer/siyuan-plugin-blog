import fs from "fs-extra"
import path from "path"
import handlebars from "handlebars"
import LogFactory, { LogLevelEnum } from "zhi-log"

const logger = LogFactory.customLogFactory(LogLevelEnum.LOG_LEVEL_INFO, "zhi-cli").getLogger("init:modify")

export const modifyPackageJson = function (downloadPath: string, options: any) {
  const packagePath = path.join(downloadPath, "package.json")
  logger.info("start modifying package.json ...")
  if (fs.existsSync(packagePath)) {
    const content = fs.readFileSync(packagePath).toString()
    const template = handlebars.compile(content)

    const param = {
      name: options.name,
      description: options.description,
      author: options.author,
    }

    const result = template(param)
    fs.writeFileSync(packagePath, result)
    logger.info("modify package.json complete")
  } else {
    logger.error("modify package.json fail")
    throw new Error("no package.json")
  }
}
