(function () {
  var STORAGE_KEY = "siyuan_blog_viewer_font_mode";
  var READY_KEY = "siyuan_blog_viewer_font_ready";
  var FONT_MODE_ATTR = "data-viewer-font-mode";
  var FONT_MODE_ENHANCED = "enhanced";
  var FONT_STYLESHEET_ID = "viewer-enhanced-fonts";
  var FONT_STYLESHEET_PATH = "libs/fonts/lxgw_font.css";

  try {
    if (localStorage.getItem(STORAGE_KEY) !== FONT_MODE_ENHANCED || localStorage.getItem(READY_KEY) !== "true") {
      return;
    }

    var currentScript = document.currentScript;
    var scriptSrc = currentScript && currentScript.src ? currentScript.src : "";
    var scriptPath = "/libs/fonts/viewer-font-mode.boot.js";
    var scriptIndex = scriptSrc.indexOf(scriptPath);
    var appBase = scriptIndex >= 0 ? scriptSrc.slice(0, scriptIndex + 1) : "/";
    var version = scriptSrc.indexOf("?") >= 0 ? scriptSrc.slice(scriptSrc.indexOf("?")) : "";

    document.documentElement.setAttribute(FONT_MODE_ATTR, FONT_MODE_ENHANCED);

    if (document.getElementById(FONT_STYLESHEET_ID)) {
      return;
    }

    var link = document.createElement("link");
    link.id = FONT_STYLESHEET_ID;
    link.rel = "stylesheet";
    link.href = appBase + FONT_STYLESHEET_PATH + version;
    document.head.appendChild(link);
  } catch (error) {
    console.error("[viewer-font-mode] boot failed", error);
  }
})();
