"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const path = require("path");
var ee = Object.defineProperty;
var te = (r, e, t) => e in r ? ee(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
var M = (r, e, t) => (te(r, typeof e != "symbol" ? e + "" : e, t), t);
const w = {};
var re = Object.defineProperty, ne = (r, e, t) => e in r ? re(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, g = (r, e, t) => (ne(r, typeof e != "symbol" ? e + "" : e, t), t), oe = Object.defineProperty, ie = (r, e, t) => e in r ? oe(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, A = (r, e, t) => (ie(r, typeof e != "symbol" ? e + "" : e, t), t), X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, b = {}, se = {
  get exports() {
    return b;
  },
  set exports(r) {
    b = r;
  }
};
(function(r) {
  (function(e, t) {
    r.exports ? r.exports = t() : e.log = t();
  })(X, function() {
    var e = function() {
    }, t = "undefined", n = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), i = ["trace", "debug", "info", "warn", "error"];
    function o(l, m) {
      var S = l[m];
      if (typeof S.bind == "function")
        return S.bind(l);
      try {
        return Function.prototype.bind.call(S, l);
      } catch {
        return function() {
          return Function.prototype.apply.apply(S, [l, arguments]);
        };
      }
    }
    function c() {
      console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
    }
    function h(l) {
      return l === "debug" && (l = "log"), typeof console === t ? false : l === "trace" && n ? c : console[l] !== void 0 ? o(console, l) : console.log !== void 0 ? o(console, "log") : e;
    }
    function E(l, m) {
      for (var S = 0; S < i.length; S++) {
        var u = i[S];
        this[u] = S < l ? e : this.methodFactory(u, l, m);
      }
      this.log = this.debug;
    }
    function y(l, m, S) {
      return function() {
        typeof console !== t && (E.call(this, m, S), this[l].apply(this, arguments));
      };
    }
    function s(l, m, S) {
      return h(l) || y.apply(this, arguments);
    }
    function d(l, m, S) {
      var u = this, x;
      m = m ?? "WARN";
      var f = "loglevel";
      typeof l == "string" ? f += ":" + l : typeof l == "symbol" && (f = void 0);
      function D(a) {
        var L = (i[a] || "silent").toUpperCase();
        if (!(typeof window === t || !f)) {
          try {
            window.localStorage[f] = L;
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(f) + "=" + L + ";";
          } catch {
          }
        }
      }
      function U() {
        var a;
        if (!(typeof window === t || !f)) {
          try {
            a = window.localStorage[f];
          } catch {
          }
          if (typeof a === t)
            try {
              var L = window.document.cookie, _ = L.indexOf(encodeURIComponent(f) + "=");
              _ !== -1 && (a = /^([^;]+)/.exec(L.slice(_))[1]);
            } catch {
            }
          return u.levels[a] === void 0 && (a = void 0), a;
        }
      }
      function C() {
        if (!(typeof window === t || !f)) {
          try {
            window.localStorage.removeItem(f);
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(f) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch {
          }
        }
      }
      u.name = l, u.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, u.methodFactory = S || s, u.getLevel = function() {
        return x;
      }, u.setLevel = function(a, L) {
        if (typeof a == "string" && u.levels[a.toUpperCase()] !== void 0 && (a = u.levels[a.toUpperCase()]), typeof a == "number" && a >= 0 && a <= u.levels.SILENT) {
          if (x = a, L !== false && D(a), E.call(u, a, l), typeof console === t && a < u.levels.SILENT)
            return "No console available for logging";
        } else
          throw "log.setLevel() called with invalid level: " + a;
      }, u.setDefaultLevel = function(a) {
        m = a, U() || u.setLevel(a, false);
      }, u.resetLevel = function() {
        u.setLevel(m, false), C();
      }, u.enableAll = function(a) {
        u.setLevel(u.levels.TRACE, a);
      }, u.disableAll = function(a) {
        u.setLevel(u.levels.SILENT, a);
      };
      var I = U();
      I == null && (I = m), u.setLevel(I, false);
    }
    var p = new d(), v = {};
    p.getLogger = function(l) {
      if (typeof l != "symbol" && typeof l != "string" || l === "")
        throw new TypeError("You must supply a name when creating a logger.");
      var m = v[l];
      return m || (m = v[l] = new d(l, p.getLevel(), p.methodFactory)), m;
    };
    var k = typeof window !== t ? window.log : void 0;
    return p.noConflict = function() {
      return typeof window !== t && window.log === p && (window.log = k), p;
    }, p.getLoggers = function() {
      return v;
    }, p.default = p, p;
  });
})(se);
var P = {}, le = {
  get exports() {
    return P;
  },
  set exports(r) {
    P = r;
  }
};
(function(r) {
  (function(e, t) {
    r.exports ? r.exports = t() : e.prefix = t(e);
  })(X, function(e) {
    var t = function(s) {
      for (var d = 1, p = arguments.length, v; d < p; d++)
        for (v in arguments[d])
          Object.prototype.hasOwnProperty.call(arguments[d], v) && (s[v] = arguments[d][v]);
      return s;
    }, n = {
      template: "[%t] %l:",
      levelFormatter: function(s) {
        return s.toUpperCase();
      },
      nameFormatter: function(s) {
        return s || "root";
      },
      timestampFormatter: function(s) {
        return s.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
      },
      format: void 0
    }, i, o = {}, c = function(s) {
      if (!s || !s.getLogger)
        throw new TypeError("Argument is not a root logger");
      i = s;
    }, h = function(s, d) {
      if (!s || !s.setLevel)
        throw new TypeError("Argument is not a logger");
      var p = s.methodFactory, v = s.name || "", k = o[v] || o[""] || n;
      function l(m, S, u) {
        var x = p(m, S, u), f = o[u] || o[""], D = f.template.indexOf("%t") !== -1, U = f.template.indexOf("%l") !== -1, C = f.template.indexOf("%n") !== -1;
        return function() {
          for (var I = "", a = arguments.length, L = Array(a), _ = 0; _ < a; _++)
            L[_] = arguments[_];
          if (v || !o[u]) {
            var G = f.timestampFormatter(new Date()), z = f.levelFormatter(m), W = f.nameFormatter(u);
            f.format ? I += f.format(z, W, G) : (I += f.template, D && (I = I.replace(/%t/, G)), U && (I = I.replace(/%l/, z)), C && (I = I.replace(/%n/, W))), L.length && typeof L[0] == "string" ? L[0] = I + " " + L[0] : L.unshift(I);
          }
          x.apply(void 0, L);
        };
      }
      return o[v] || (s.methodFactory = l), d = d || {}, d.template && (d.format = void 0), o[v] = t({}, k, d), s.setLevel(s.getLevel()), i || s.warn(
        "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
      ), s;
    }, E = {
      reg: c,
      apply: h
    }, y;
    return e && (y = e.prefix, E.noConflict = function() {
      return e.prefix === E && (e.prefix = y), E;
    }), E;
  });
})(le);
class F {
}
A(F, "LOG_LEVEL_KEY", "VITE_LOG_LEVEL"), A(F, "LOG_PREFIX_KEY", "VITE_LOG_PREFIX");
var T = /* @__PURE__ */ ((r) => (r.LOG_LEVEL_DEBUG = "DEBUG", r.LOG_LEVEL_INFO = "INFO", r.LOG_LEVEL_WARN = "WARN", r.LOG_LEVEL_ERROR = "ERROR", r))(T || {});
function ae() {
  const r = Error.prepareStackTrace;
  Error.prepareStackTrace = (t, n) => n;
  const e = new Error().stack.slice(1);
  return Error.prepareStackTrace = r, e;
}
class R {
  /**
   * 解析日志级别为枚举
   *
   * @param enumObj 枚举对象
   * @param value 配置的值
   */
  static stringToEnumValue(e, t) {
    return e[Object.keys(e).filter((n) => e[n].toString() === t)[0]];
  }
  /**
   * 获取配置的日志级别
   */
  static getEnvLevel(e) {
    if (!e)
      return;
    const t = e.getEnvOrDefault(F.LOG_LEVEL_KEY, T.LOG_LEVEL_INFO), n = R.stringToEnumValue(T, t.toUpperCase());
    return n || console.warn(
      "[zhi-log] LOG_LEVEL is invalid in you .env file.Must be either debug, info, warn or error, fallback to default info level"
    ), n;
  }
  /**
   * 获取默认日志
   */
  static getEnvLogger(e) {
    if (e)
      return e.getEnv(F.LOG_PREFIX_KEY);
  }
}
class ce {
  constructor(e, t, n) {
    A(this, "consoleLogger", "console"), A(this, "stackSize", 1), A(this, "getLogger", (c) => {
      let h;
      if (c)
        h = c;
      else {
        const E = ae(), y = [];
        for (let s = 0; s < E.length; s++) {
          const d = E[s], p = d.getFileName() ?? "none";
          if (!p.includes(".ts") && !p.includes(".js") && !p.includes(".cjs") && !p.includes(".mjs") && !p.includes(".vue") && !p.includes(".tsx"))
            continue;
          if (s > this.stackSize - 1)
            break;
          const v = p + "-" + d.getLineNumber() + ":" + d.getColumnNumber();
          y.push(v);
        }
        E.length > 0 && (h = y.join(" -> "));
      }
      return (!h || h.trim().length === 0) && (h = this.consoleLogger), b.getLogger(h);
    }), this.stackSize = 1;
    let i;
    e ? i = e : i = R.getEnvLevel(n), i = i ?? T.LOG_LEVEL_INFO, b.setLevel(i);
    const o = {
      gray: (c) => c.toString(),
      green: (c) => c.toString(),
      yellow: (c) => c.toString(),
      red: (c) => c.toString()
    };
    P.reg(b), P.apply(b, {
      format(c, h, E) {
        const y = ["[" + (t ?? R.getEnvLogger(n) ?? "zhi") + "]"];
        switch (y.push(o.gray("[") + o.green(E).toString() + o.gray("]")), c) {
          case T.LOG_LEVEL_DEBUG:
            y.push(o.gray(c.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_INFO:
            y.push(o.green(c.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_WARN:
            y.push(o.yellow(c.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_ERROR:
            y.push(o.red(c.toUpperCase().toString()));
            break;
        }
        return y.push(o.green(h).toString()), y.push(o.gray(":")), y.join(" ");
      }
    });
  }
  /**
   * 设置输出栈的深度，默认1
   *
   * @param stackSize 栈的深度
   */
  setStackSize(e) {
    this.stackSize = e ?? 1;
  }
}
class ue {
  /**
   * 默认日志级别
   *
   * @param level - 可选，未设置默认INFO
   * @param sign - 可选前缀，默认zhi
   * @param env - 可选环境变量实例
   */
  constructor(e, t, n) {
    A(this, "logger"), this.logger = new ce(e, t, n);
  }
  /**
   * 获取日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   * @protected
   */
  getLogger(e, t) {
    return this.logger.setStackSize(t), this.logger.getLogger(e);
  }
}
class Y extends ue {
  constructor(e, t, n) {
    super(e, t, n);
  }
  /**
   * 获取默认的日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   */
  getLogger(e, t) {
    return super.getLogger(e, t);
  }
}
class V {
  /**
   * 默认日志记录器
   *
   * @param stackSize 栈的深度
   * @param env - 环境变量实例
   */
  static defaultLogger(e, t) {
    return V.customLogFactory(void 0, void 0, e).getLogger(void 0, t);
  }
  /**
   * 自定义日志工厂
   */
  static customLogFactory(e, t, n) {
    return new Y(e, t, n);
  }
  /**
   * 自定义日志工厂，自定义前缀
   */
  static customSignLogFactory(e, t) {
    return new Y(void 0, e, t);
  }
}
class q {
}
g(q, "LOG_STACK_SIZE", 1);
class ge {
  constructor() {
    g(this, "VERSION"), this.VERSION = "1.0.0";
  }
}
class pe {
  constructor() {
    g(this, "VERSION"), this.VERSION = "1.0.0";
  }
}
const J = class {
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    return J.isInBrowser ? window.location.href.indexOf("chrome-extension://") > -1 : false;
  }
};
let N = J;
g(N, "isInBrowser", typeof window < "u");
class Q {
  constructor() {
    g(this, "isInSiyuanOrSiyuanNewWin", () => N.isInBrowser), g(
      this,
      "isInSiyuanWidget",
      () => window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== ""
    ), g(this, "isInSiyuanNewWin", () => typeof window.terwer < "u"), g(this, "requireLib", (e) => {
      const t = this.syWin();
      if (!this.syWin())
        throw new Error("Not in siyuan env");
      return t.require(e);
    }), g(this, "getCrossPlatformAppDataFolder", () => {
      var e, t, n, i, o, c;
      let h;
      return ((e = this.syProcess()) == null ? void 0 : e.platform) === "darwin" ? h = w.join((t = this.syProcess()) == null ? void 0 : t.env.HOME, "/Library/Application Support") : ((n = this.syProcess()) == null ? void 0 : n.platform) === "win32" ? h = (i = this.syProcess()) == null ? void 0 : i.env.APPDATA : ((o = this.syProcess()) == null ? void 0 : o.platform) === "linux" && (h = (c = this.syProcess()) == null ? void 0 : c.env.HOME), h;
    });
  }
  /**
   * 思源笔记 window 对象
   */
  syWin() {
    let e;
    return this.isInSiyuanWidget() ? e = parent.window : (this.isInSiyuanNewWin() && (e = window), e = window), e ?? void 0;
  }
  /**
   * 思源笔记 process 对象
   */
  syProcess() {
    return N.isInBrowser ? window.process : process;
  }
  /**
   * 思源笔记 conf 目录
   */
  SIYUAN_CONF_PATH() {
    var e;
    if (!this.syWin())
      throw new Error("Not in siyuan env");
    return (e = this.syWin()) == null ? void 0 : e.siyuan.config.system.confDir;
  }
  /**
   * 思源笔记 data 目录
   */
  SIYUAN_DATA_PATH() {
    var e;
    if (!this.syWin())
      throw new Error("Not in siyuan env");
    return (e = this.syWin()) == null ? void 0 : e.siyuan.config.system.dataDir;
  }
  /**
   * 思源笔记 appearance 目录
   */
  SIYUAN_APPEARANCE_PATH() {
    return w.join(this.SIYUAN_CONF_PATH(), "appearance");
  }
  /**
   * 思源笔记 themes 目录
   */
  SIYUAN_THEME_PATH() {
    return w.join(this.SIYUAN_APPEARANCE_PATH(), "themes");
  }
  /**
   * zhi 主题目录
   */
  ZHI_THEME_PATH() {
    return w.join(this.SIYUAN_THEME_PATH(), "zhi");
  }
  /**
   * zhi 主题构建目录
   */
  ZHI_THEME_DIST_PATH() {
    return w.join(this.ZHI_THEME_PATH(), "apps", "theme", "dist");
  }
  /**
   * zhi 博客构建目录
   */
  ZHI_BLOG_DIST_PATH() {
    return w.join(this.SIYUAN_THEME_PATH(), "apps", "blog", "dist");
  }
}
class he {
  constructor() {
    g(this, "serverApi"), g(this, "clientApi"), g(this, "siyuanUtil"), this.serverApi = new ge(), this.clientApi = new pe(), this.siyuanUtil = new Q();
  }
}
class de {
  constructor() {
    g(this, "VERSION"), this.VERSION = "1.0.0";
  }
}
class fe {
  /**
   * 格式化字符串
   *
   * @param str - 字符串，可用占位符，例如：test\{0\}str
   * @param args - 按占位符顺序排列的参数
   * @author terwer
   * @since 0.0.1
   */
  f(e, ...t) {
    let n = e;
    for (let i = 0; i < t.length; i++) {
      const o = t[i];
      typeof o == "string" ? n = n.replace(`{${i}}`, o) : n = n.replace(`{${i}}`, o.toString());
    }
    return n;
  }
}
class we {
  /**
   *
   * 可以使用Node.js内置的fs模块中的`copyFileSync`或者`copyFile`方法来复制文件夹。不过需要注意，这两个方法只能复制单个文件，如果想要复制整个文件夹，需要自己编写递归函数实现。
   * 本方法用于复制一个文件夹以及其中所有子文件和子文件夹
   *
   * @param source - 源文件
   * @param target - 目标文件
   * @author terwer
   * @since 1.0.0
   */
  copyFolderSync(e, t) {
    const n = this;
    w.existsSync(t) || w.mkdirSync(t), w.lstatSync(e).isDirectory() && w.readdirSync(e).forEach(function(i) {
      const o = w.join(e, i);
      w.lstatSync(o).isDirectory() ? n.copyFolderSync(o, w.join(t, i)) : w.copyFileSync(o, w.join(t, i));
    });
  }
  /**
   * 删除文件夹
   *
   * @param folder - 文件夹
   */
  rmFolder(e) {
    w.existsSync(e) && w.rmdirSync(e, { recursive: true });
  }
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  joinPath(...e) {
    return w.join(...e);
  }
  /**
   * 获取相对路径
   *
   * @param pathname - 路径名称
   */
  dirname(e) {
    return w.dirname(e);
  }
  /**
   * 获取绝对路径
   *
   * @param pathname - 路径名称
   */
  absPath(e) {
    const t = this.dirname(e);
    return w.resolve(w.dirname(t), e);
  }
}
class ye {
  constructor() {
    g(this, "TIME_SPLIT", " "), g(this, "formatIsoToZhDate", (e, t, n) => {
      if (!e)
        return "";
      let i = e;
      const o = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.\d{3})Z$/gm, c = i.match(o);
      if (c == null)
        return e;
      for (let h = 0; h < c.length; h++) {
        const E = c[h];
        let y = E;
        t && (y = this.addHoursToDate(new Date(E), 8).toISOString());
        const s = y.split("T"), d = s[0], p = s[1].split(".")[0];
        let v = d + this.TIME_SPLIT + p;
        n && (v = d), i = i.replace(E, v);
      }
      return i;
    });
  }
  /**
   * 给日期添加小时
   *
   * @param date - Date
   * @param numOfHours - 数字
   * @author terwer
   * @since 1.0.0
   */
  addHoursToDate(e, t) {
    return e.setTime(e.getTime() + t * 60 * 60 * 1e3), e;
  }
  /**
   * 当前日期时间完整格式，格式：2023-03-10 02:03:43
   */
  nowZh() {
    return this.formatIsoToZhDate(new Date().toISOString());
  }
  /**
   * 当前日期，格式：2023-03-10
   */
  nowDateZh() {
    return this.formatIsoToZhDate(new Date().toISOString(), true, true);
  }
  /**
   * 当前时间，格式：02:03:43
   */
  nowTimeZh() {
    return this.formatIsoToZhDate(new Date().toISOString(), true).split(this.TIME_SPLIT)[1];
  }
}
const H = (r, e) => {
  const t = Z(r), n = Z(e), i = t.pop(), o = n.pop(), c = $(t, n);
  return c !== 0 ? c : i && o ? $(i.split("."), o.split(".")) : i || o ? i ? -1 : 1 : 0;
}, me = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i, Z = (r) => {
  if (typeof r != "string")
    throw new TypeError("Invalid argument expected string");
  const e = r.match(me);
  if (!e)
    throw new Error(`Invalid argument not valid semver ('${r}' received)`);
  return e.shift(), e;
}, B = (r) => r === "*" || r === "x" || r === "X", K = (r) => {
  const e = parseInt(r, 10);
  return isNaN(e) ? r : e;
}, ve = (r, e) => typeof r != typeof e ? [String(r), String(e)] : [r, e], Ee = (r, e) => {
  if (B(r) || B(e))
    return 0;
  const [t, n] = ve(K(r), K(e));
  return t > n ? 1 : t < n ? -1 : 0;
}, $ = (r, e) => {
  for (let t = 0; t < Math.max(r.length, e.length); t++) {
    const n = Ee(r[t] || "0", e[t] || "0");
    if (n !== 0)
      return n;
  }
  return 0;
};
class Se {
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is higher than v2
   */
  greater(e, t) {
    return H(e, t) > 0;
  }
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is equal to v2
   */
  equal(e, t) {
    return H(e, t) === 0;
  }
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is lesser than v2
   */
  lesser(e, t) {
    return H(e, t) < 0;
  }
}
class Le {
  /**
   * 获取当前设备
   */
  static getDevice() {
    const e = new Q();
    return e.isInSiyuanWidget() ? "Siyuan_Widget" : e.isInSiyuanOrSiyuanNewWin() ? "Siyuan_NewWin" : N.isInChromeExtension() ? "Chrome_Extension" : "Chrome_Browser";
  }
}
class Ie {
  constructor() {
    g(this, "strUtil"), g(this, "dateUtil"), g(this, "nodeUtil"), g(this, "browserUtil"), g(this, "versionUtil"), g(this, "deviceUtil"), this.strUtil = new fe(), this.dateUtil = new ye(), this.nodeUtil = new we(), this.browserUtil = N, this.versionUtil = new Se(), this.deviceUtil = Le;
  }
}
class Te {
  /**
   * 构造 zhi-sdk 对象
   * @param env - 可选，环境变量对象
   */
  constructor(e) {
    g(this, "env"), g(this, "logger"), g(this, "siyuanApi"), g(this, "blogApi"), g(this, "common"), this.env = e, this.logger = V.defaultLogger(this.env, q.LOG_STACK_SIZE), this.siyuanApi = new he(), this.blogApi = new de(), this.common = new Ie();
  }
  /**
   * 获取配置环境变量
   */
  getEnv() {
    if (!this.env)
      throw new Error("env is not initiated, please use new ZhiSdk(env) create ZhiSdk object!");
    return this.env;
  }
  /**
   * 获取日志操作对象
   */
  getLogger() {
    return this.logger;
  }
}
const O = class {
  /**
   * 获取 zhi-sdk 实例
   *
   * @param env - 可选，环境变量对象
   */
  static zhiSdk(e) {
    if (!O.zhiSdkObj) {
      O.zhiSdkObj = new Te(e);
      const t = O.zhiSdkObj.getLogger(), n = O.zhiSdkObj.common;
      t.info(n.strUtil.f("ZhiSdk inited, components are available now,like logger, env and so on."));
    }
    return O.zhiSdkObj;
  }
};
let j = O;
M(j, "zhiSdkObj");
var _e = /* @__PURE__ */ ((r) => (r.ThemeFrom_Blog = "zhi-theme-blog", r.ThemeFrom_Siyuan = "zhi-theme-siyuan", r))(
  _e || {}
);
const version = "1.0.0";
class Lifecycle {
  constructor() {
    __publicField(this, "_dynamicImports", []);
  }
  get dynamicImports() {
    return this._dynamicImports;
  }
  load() {
    const allImports = [];
    const pluginSystemImports = this.loadPluginSystem();
    const widgetsImports = this.loadWidgets();
    const vendorImports = this.loadVendors();
    this._dynamicImports = allImports.concat(pluginSystemImports).concat(widgetsImports).concat(vendorImports);
  }
  /**
   * SiYuanPluginSystem
   *
   * @private
   */
  loadPluginSystem() {
    return [];
  }
  /**
   * 加载挂件
   *
   * @private
   */
  loadWidgets() {
    return [];
  }
  /**
   * 加载第三方库
   *
   * @private
   */
  loadVendors() {
    return [];
  }
}
const _Bootstrap = class {
  /**
   * 主题激活
   */
  static async start() {
    _Bootstrap.lifecycle.load();
    return Promise.resolve(_Bootstrap.lifecycle.dynamicImports);
  }
};
let Bootstrap = _Bootstrap;
__publicField(Bootstrap, "lifecycle");
(() => {
  _Bootstrap.lifecycle = new Lifecycle();
})();
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_lib = __commonJS({
  "node_modules/.pnpm/zhi-env@1.8.2/node_modules/zhi-env/lib/index.js"(exports) {
    var i = Object.defineProperty;
    var v = (n, e, t) => e in n ? i(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
    var s = (n, e, t) => (v(n, typeof e != "symbol" ? e + "" : e, t), t);
    Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
    var r = class {
    };
    s(r, "NODE_ENV_KEY", "NODE_ENV"), s(r, "VITE_DEBUG_MODE_KEY", "VITE_DEBUG_MODE");
    var o = class {
      constructor(e) {
        s(this, "envMeta");
        this.envMeta = e;
      }
      isNodeDev() {
        return this.getEnv(r.NODE_ENV_KEY) === "development";
      }
      isDev() {
        return this.isNodeDev() || this.getBooleanEnv(r.VITE_DEBUG_MODE_KEY);
      }
      getEnv(e) {
        let t;
        try {
          this.envMeta[e] && (t = this.envMeta[e]);
        } catch (E) {
          console.error(E);
        }
        return t;
      }
      getStringEnv(e) {
        return this.getEnv(e) ?? "";
      }
      getBooleanEnv(e) {
        let t = false;
        return this.getEnv(e) && (t = this.getStringEnv(e).toLowerCase() === "true"), t;
      }
      getEnvOrDefault(e, t) {
        const E = this.getStringEnv(e);
        return E.trim().length == 0 ? t : E;
      }
    };
    exports.EnvConstants = r;
    exports.default = o;
  }
});
const __vite__cjsImport3_zhiEnv = require_lib();
const Env$1 = __vite__cjsImport3_zhiEnv.__esModule ? __vite__cjsImport3_zhiEnv.default : __vite__cjsImport3_zhiEnv;
class Zhi {
  constructor() {
    __publicField(this, "logger");
    __publicField(this, "common");
    const env = new Env$1({ "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false });
    const zhiSdk = j.zhiSdk(env);
    this.logger = zhiSdk.getLogger();
    this.common = zhiSdk.common;
  }
  async main(args) {
    this.logger.debug(this.common.strUtil.f("Parsing args <{0}>", args));
    this.hello(_e.ThemeFrom_Siyuan);
    return await Bootstrap.start();
  }
  hello(from) {
    this.logger.info(this.common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from));
  }
}
const Env = __vite__cjsImport3_zhiEnv.__esModule ? __vite__cjsImport3_zhiEnv.default : __vite__cjsImport3_zhiEnv;
class Theme {
  constructor() {
    __publicField(this, "logger");
    __publicField(this, "common");
    __publicField(this, "siyuanApi");
    __publicField(this, "zhiTheme");
    const env = new Env({ "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false });
    const zhiSdk = j.zhiSdk(env);
    this.logger = zhiSdk.getLogger();
    this.common = zhiSdk.common;
    this.siyuanApi = zhiSdk.siyuanApi;
    this.zhiTheme = new Zhi();
  }
  /**
   * 主流程加载
   *
   * @param runAs 运行模式
   */
  async init(runAs) {
    try {
      const dynamicImports = await this.zhiTheme.main([]);
      for (const item of dynamicImports) {
        const libpath = item.libpath;
        if (item.format !== "cjs" || !libpath.includes(".cjs")) {
          this.logger.warn("Only cjs supported, skip this lib!", libpath);
          continue;
        }
        if (runAs) {
          if (runAs !== item.runAs) {
            this.logger.warn(
              this.common.strUtil.f("This lib can only run at {0}, skip!Lib is=>{1}", item.runAs, item.libpath)
            );
            continue;
          }
        }
        this.logger.info("Loading dependency=>", libpath);
        let lib;
        if (this.common.browserUtil.isInBrowser) {
          const importPath = path.join(this.siyuanApi.siyuanUtil.ZHI_THEME_DIST_PATH(), libpath);
          lib = this.siyuanApi.siyuanUtil.requireLib(importPath);
        }
        if (lib && lib.init) {
          await lib.init();
        }
      }
      this.logger.info("Theme inited.");
    } catch (e) {
      this.logger.error("Theme load error=>", e);
    }
  }
}
(async () => {
  const theme = new Theme();
  await theme.init("electron");
})();
