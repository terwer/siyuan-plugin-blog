import ZhiBrowserWindow from "./lib/browser-window"

/**
 * zhi-server-electron 入口
 */
const init = () => {
  const zhiBrowserWindow = new ZhiBrowserWindow()
  zhiBrowserWindow.init()
  return "ok"
}

export default init
