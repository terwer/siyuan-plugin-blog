import Cmd from "./lib"

/**
 * zhi-server-cmd 入口
 */
const init = async () => {
  const cmd = new Cmd()
  await cmd.initCmd()
  return "ok"
}

export default init
