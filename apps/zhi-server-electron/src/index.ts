import ZhiBrowserWindow from "./lib/browser-window"

/**
 * zhi-server-electron 入口
 */
const init = () => {
  const zhiBrowserWindow = new ZhiBrowserWindow()
  zhiBrowserWindow.initBrowserWindow()
  return "ok"
}

export default init
