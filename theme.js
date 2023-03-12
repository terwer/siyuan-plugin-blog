"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _ = require("path");
const I = require("fs");
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var J = Object.defineProperty;
var Q = (n, e, t) => e in n ? J(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
var g = (n, e, t) => (Q(n, typeof e != "symbol" ? e + "" : e, t), t);
var ee = Object.defineProperty;
var te = (n, e, t) => e in n ? ee(n, e, { enumerable: true, configurable: true, writable: true, value: t }) : n[e] = t;
var b = (n, e, t) => (te(n, typeof e != "symbol" ? e + "" : e, t), t);
var $ = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var N = {};
var ne = {
  get exports() {
    return N;
  },
  set exports(n) {
    N = n;
  }
};
(function(n) {
  (function(e, t) {
    n.exports ? n.exports = t() : e.log = t();
  })($, function() {
    var e = function() {
    }, t = "undefined", r = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), s = ["trace", "debug", "info", "warn", "error"];
    function o(a, m) {
      var v = a[m];
      if (typeof v.bind == "function")
        return v.bind(a);
      try {
        return Function.prototype.bind.call(v, a);
      } catch {
        return function() {
          return Function.prototype.apply.apply(v, [a, arguments]);
        };
      }
    }
    function i() {
      console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
    }
    function d(a) {
      return a === "debug" && (a = "log"), typeof console === t ? false : a === "trace" && r ? i : console[a] !== void 0 ? o(console, a) : console.log !== void 0 ? o(console, "log") : e;
    }
    function E(a, m) {
      for (var v = 0; v < s.length; v++) {
        var u = s[v];
        this[u] = v < a ? e : this.methodFactory(u, a, m);
      }
      this.log = this.debug;
    }
    function w(a, m, v) {
      return function() {
        typeof console !== t && (E.call(this, m, v), this[a].apply(this, arguments));
      };
    }
    function l(a, m, v) {
      return d(a) || w.apply(this, arguments);
    }
    function f(a, m, v) {
      var u = this, x;
      m = m ?? "WARN";
      var h = "loglevel";
      typeof a == "string" ? h += ":" + a : typeof a == "symbol" && (h = void 0);
      function D(c) {
        var S = (s[c] || "silent").toUpperCase();
        if (!(typeof window === t || !h)) {
          try {
            window.localStorage[h] = S;
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(h) + "=" + S + ";";
          } catch {
          }
        }
      }
      function U() {
        var c;
        if (!(typeof window === t || !h)) {
          try {
            c = window.localStorage[h];
          } catch {
          }
          if (typeof c === t)
            try {
              var S = window.document.cookie, A = S.indexOf(encodeURIComponent(h) + "=");
              A !== -1 && (c = /^([^;]+)/.exec(S.slice(A))[1]);
            } catch {
            }
          return u.levels[c] === void 0 && (c = void 0), c;
        }
      }
      function V() {
        if (!(typeof window === t || !h)) {
          try {
            window.localStorage.removeItem(h);
            return;
          } catch {
          }
          try {
            window.document.cookie = encodeURIComponent(h) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch {
          }
        }
      }
      u.name = a, u.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5
      }, u.methodFactory = v || l, u.getLevel = function() {
        return x;
      }, u.setLevel = function(c, S) {
        if (typeof c == "string" && u.levels[c.toUpperCase()] !== void 0 && (c = u.levels[c.toUpperCase()]), typeof c == "number" && c >= 0 && c <= u.levels.SILENT) {
          if (x = c, S !== false && D(c), E.call(u, c, a), typeof console === t && c < u.levels.SILENT)
            return "No console available for logging";
        } else
          throw "log.setLevel() called with invalid level: " + c;
      }, u.setDefaultLevel = function(c) {
        m = c, U() || u.setLevel(c, false);
      }, u.resetLevel = function() {
        u.setLevel(m, false), V();
      }, u.enableAll = function(c) {
        u.setLevel(u.levels.TRACE, c);
      }, u.disableAll = function(c) {
        u.setLevel(u.levels.SILENT, c);
      };
      var L = U();
      L == null && (L = m), u.setLevel(L, false);
    }
    var p = new f(), y = {};
    p.getLogger = function(a) {
      if (typeof a != "symbol" && typeof a != "string" || a === "")
        throw new TypeError("You must supply a name when creating a logger.");
      var m = y[a];
      return m || (m = y[a] = new f(a, p.getLevel(), p.methodFactory)), m;
    };
    var R = typeof window !== t ? window.log : void 0;
    return p.noConflict = function() {
      return typeof window !== t && window.log === p && (window.log = R), p;
    }, p.getLoggers = function() {
      return y;
    }, p.default = p, p;
  });
})(ne);
var P = {};
var re = {
  get exports() {
    return P;
  },
  set exports(n) {
    P = n;
  }
};
(function(n) {
  (function(e, t) {
    n.exports ? n.exports = t() : e.prefix = t(e);
  })($, function(e) {
    var t = function(l) {
      for (var f = 1, p = arguments.length, y; f < p; f++)
        for (y in arguments[f])
          Object.prototype.hasOwnProperty.call(arguments[f], y) && (l[y] = arguments[f][y]);
      return l;
    }, r = {
      template: "[%t] %l:",
      levelFormatter: function(l) {
        return l.toUpperCase();
      },
      nameFormatter: function(l) {
        return l || "root";
      },
      timestampFormatter: function(l) {
        return l.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
      },
      format: void 0
    }, s, o = {}, i = function(l) {
      if (!l || !l.getLogger)
        throw new TypeError("Argument is not a root logger");
      s = l;
    }, d = function(l, f) {
      if (!l || !l.setLevel)
        throw new TypeError("Argument is not a logger");
      var p = l.methodFactory, y = l.name || "", R = o[y] || o[""] || r;
      function a(m, v, u) {
        var x = p(m, v, u), h = o[u] || o[""], D = h.template.indexOf("%t") !== -1, U = h.template.indexOf("%l") !== -1, V = h.template.indexOf("%n") !== -1;
        return function() {
          for (var L = "", c = arguments.length, S = Array(c), A = 0; A < c; A++)
            S[A] = arguments[A];
          if (y || !o[u]) {
            var k = h.timestampFormatter(new Date()), j = h.levelFormatter(m), Z = h.nameFormatter(u);
            h.format ? L += h.format(j, Z, k) : (L += h.template, D && (L = L.replace(/%t/, k)), U && (L = L.replace(/%l/, j)), V && (L = L.replace(/%n/, Z))), S.length && typeof S[0] == "string" ? S[0] = L + " " + S[0] : S.unshift(L);
          }
          x.apply(void 0, S);
        };
      }
      return o[y] || (l.methodFactory = a), f = f || {}, f.template && (f.format = void 0), o[y] = t({}, R, f), l.setLevel(l.getLevel()), s || l.warn(
        "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
      ), l;
    }, E = {
      reg: i,
      apply: d
    }, w;
    return e && (w = e.prefix, E.noConflict = function() {
      return e.prefix === E && (e.prefix = w), E;
    }), E;
  });
})(re);
var C = class {
};
b(C, "LOG_LEVEL_KEY", "VITE_LOG_LEVEL"), b(C, "LOG_PREFIX_KEY", "VITE_LOG_PREFIX");
var T = /* @__PURE__ */ ((n) => (n.LOG_LEVEL_DEBUG = "DEBUG", n.LOG_LEVEL_INFO = "INFO", n.LOG_LEVEL_WARN = "WARN", n.LOG_LEVEL_ERROR = "ERROR", n))(T || {});
function oe() {
  const n = Error.prepareStackTrace;
  Error.prepareStackTrace = (t, r) => r;
  const e = new Error().stack.slice(1);
  return Error.prepareStackTrace = n, e;
}
var F = class {
  /**
   * 解析日志级别为枚举
   *
   * @param enumObj 枚举对象
   * @param value 配置的值
   */
  static stringToEnumValue(e, t) {
    return e[Object.keys(e).filter((r) => e[r].toString() === t)[0]];
  }
  /**
   * 获取配置的日志级别
   */
  static getEnvLevel(e) {
    if (!e)
      return;
    const t = e.getEnvOrDefault(C.LOG_LEVEL_KEY, T.LOG_LEVEL_INFO), r = F.stringToEnumValue(T, t.toUpperCase());
    return r || console.warn(
      "[zhi-log] LOG_LEVEL is invalid in you .env file.Must be either debug, info, warn or error, fallback to default info level"
    ), r;
  }
  /**
   * 获取默认日志
   */
  static getEnvLogger(e) {
    if (e)
      return e.getEnv(C.LOG_PREFIX_KEY);
  }
};
var ie = class {
  constructor(e, t, r) {
    b(this, "consoleLogger", "console"), b(this, "stackSize", 1), b(this, "getLogger", (i) => {
      let d;
      if (i)
        d = i;
      else {
        const E = oe(), w = [];
        for (let l = 0; l < E.length; l++) {
          const f = E[l], p = f.getFileName() ?? "none";
          if (!p.includes(".ts") && !p.includes(".js") && !p.includes(".cjs") && !p.includes(".mjs") && !p.includes(".vue") && !p.includes(".tsx"))
            continue;
          if (l > this.stackSize - 1)
            break;
          const y = p + "-" + f.getLineNumber() + ":" + f.getColumnNumber();
          w.push(y);
        }
        E.length > 0 && (d = w.join(" -> "));
      }
      return (!d || d.trim().length === 0) && (d = this.consoleLogger), N.getLogger(d);
    }), this.stackSize = 1;
    let s;
    e ? s = e : s = F.getEnvLevel(r), s = s ?? T.LOG_LEVEL_INFO, N.setLevel(s);
    const o = {
      gray: (i) => i.toString(),
      green: (i) => i.toString(),
      yellow: (i) => i.toString(),
      red: (i) => i.toString()
    };
    P.reg(N), P.apply(N, {
      format(i, d, E) {
        const w = ["[" + (t ?? F.getEnvLogger(r) ?? "zhi") + "]"];
        switch (w.push(o.gray("[") + o.green(E).toString() + o.gray("]")), i) {
          case T.LOG_LEVEL_DEBUG:
            w.push(o.gray(i.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_INFO:
            w.push(o.green(i.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_WARN:
            w.push(o.yellow(i.toUpperCase().toString()));
            break;
          case T.LOG_LEVEL_ERROR:
            w.push(o.red(i.toUpperCase().toString()));
            break;
        }
        return w.push(o.green(d).toString()), w.push(o.gray(":")), w.join(" ");
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
};
var se = class {
  /**
   * 默认日志级别
   *
   * @param level - 可选，未设置默认INFO
   * @param sign - 可选前缀，默认zhi
   * @param env - 可选环境变量实例
   */
  constructor(e, t, r) {
    b(this, "logger"), this.logger = new ie(e, t, r);
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
};
var M = class extends se {
  constructor(e, t, r) {
    super(e, t, r);
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
};
var G = class {
  /**
   * 默认日志记录器
   *
   * @param stackSize 栈的深度
   * @param env - 环境变量实例
   */
  static defaultLogger(e, t) {
    return G.customLogFactory(void 0, void 0, e).getLogger(void 0, t);
  }
  /**
   * 自定义日志工厂
   */
  static customLogFactory(e, t, r) {
    return new M(e, t, r);
  }
  /**
   * 自定义日志工厂，自定义前缀
   */
  static customSignLogFactory(e, t) {
    return new M(void 0, e, t);
  }
};
var X = class {
};
g(X, "LOG_STACK_SIZE", 1);
var le = class {
  constructor() {
    g(this, "VERSION");
    this.VERSION = "1.0.0";
  }
};
var ae = class {
  constructor() {
    g(this, "VERSION");
    this.VERSION = "1.0.0";
  }
};
var H = class {
  /**
   * 检测是否运行在Chrome插件中
   */
  static isInChromeExtension() {
    return H.isInBrowser ? window.location.href.indexOf("chrome-extension://") > -1 : false;
  }
};
var O = H;
g(O, "isInBrowser", typeof window < "u");
var q = class {
  constructor() {
    g(this, "isInSiyuanOrSiyuanNewWin", () => O.isInBrowser);
    g(
      this,
      "isInSiyuanWidget",
      () => window.frameElement != null && window.frameElement.parentElement != null && window.frameElement.parentElement.parentElement != null && window.frameElement.parentElement.parentElement.getAttribute("data-node-id") !== ""
    );
    g(this, "isInSiyuanNewWin", () => typeof window.terwer < "u");
    g(this, "requireLib", (e) => {
      const t = this.syWin();
      if (!this.syWin())
        throw new Error("Not in siyuan env");
      return t.require(e);
    });
    g(this, "getCrossPlatformAppDataFolder", () => {
      var t, r, s, o, i, d;
      let e;
      return ((t = this.syProcess()) == null ? void 0 : t.platform) === "darwin" ? e = _.join((r = this.syProcess()) == null ? void 0 : r.env.HOME, "/Library/Application Support") : ((s = this.syProcess()) == null ? void 0 : s.platform) === "win32" ? e = (o = this.syProcess()) == null ? void 0 : o.env.APPDATA : ((i = this.syProcess()) == null ? void 0 : i.platform) === "linux" && (e = (d = this.syProcess()) == null ? void 0 : d.env.HOME), e;
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
    return O.isInBrowser ? window.process : process;
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
    return _.join(this.SIYUAN_CONF_PATH(), "appearance");
  }
  /**
   * 思源笔记 themes 目录
   */
  SIYUAN_THEME_PATH() {
    return _.join(this.SIYUAN_APPEARANCE_PATH(), "themes");
  }
  /**
   * zhi 主题目录
   */
  ZHI_THEME_PATH() {
    return _.join(this.SIYUAN_THEME_PATH(), "zhi");
  }
  /**
   * zhi 主题构建目录
   */
  ZHI_THEME_DIST_PATH() {
    return _.join(this.ZHI_THEME_PATH(), "apps", "theme", "dist");
  }
  /**
   * zhi 博客构建目录
   */
  ZHI_BLOG_DIST_PATH() {
    return _.join(this.SIYUAN_THEME_PATH(), "apps", "blog", "dist");
  }
};
var ce = class {
  constructor() {
    g(this, "serverApi");
    g(this, "clientApi");
    g(this, "siyuanUtil");
    this.serverApi = new le(), this.clientApi = new ae(), this.siyuanUtil = new q();
  }
};
var ue = class {
  constructor() {
    g(this, "VERSION");
    this.VERSION = "1.0.0";
  }
};
var ge = class {
  /**
   * 格式化字符串
   *
   * @param str - 字符串，可用占位符，例如：test\{0\}str
   * @param args - 按占位符顺序排列的参数
   * @author terwer
   * @since 0.0.1
   */
  f(e, ...t) {
    let r = e;
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      typeof o == "string" ? r = r.replace(`{${s}}`, o) : r = r.replace(`{${s}}`, o.toString());
    }
    return r;
  }
};
var pe = class {
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
    const r = this;
    I.existsSync(t) || I.mkdirSync(t), I.lstatSync(e).isDirectory() && I.readdirSync(e).forEach(function(o) {
      const i = _.join(e, o);
      I.lstatSync(i).isDirectory() ? r.copyFolderSync(i, _.join(t, o)) : I.copyFileSync(i, _.join(t, o));
    });
  }
  /**
   * 删除文件夹
   *
   * @param folder - 文件夹
   */
  rmFolder(e) {
    I.existsSync(e) && I.rmdirSync(e, { recursive: true });
  }
  /**
   * 路径拼接
   *
   * @param paths - 路径数组
   */
  joinPath(...e) {
    return _.join(...e);
  }
  /**
   * 获取相对路径
   *
   * @param pathname - 路径名称
   */
  dirname(e) {
    return _.dirname(e);
  }
  /**
   * 获取绝对路径
   *
   * @param pathname - 路径名称
   */
  absPath(e) {
    const t = this.dirname(e);
    return _.resolve(_.dirname(t), e);
  }
};
var fe = class {
  constructor() {
    g(this, "TIME_SPLIT", " ");
    g(this, "formatIsoToZhDate", (e, t, r) => {
      if (!e)
        return "";
      let s = e;
      const o = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.\d{3})Z$/gm, i = s.match(o);
      if (i == null)
        return e;
      for (let d = 0; d < i.length; d++) {
        const E = i[d];
        let w = E;
        t && (w = this.addHoursToDate(new Date(E), 8).toISOString());
        const l = w.split("T"), f = l[0], p = l[1].split(".")[0];
        let y = f + this.TIME_SPLIT + p;
        r && (y = f), s = s.replace(E, y);
      }
      return s;
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
};
var W = (n, e) => {
  const t = z(n), r = z(e), s = t.pop(), o = r.pop(), i = K(t, r);
  return i !== 0 ? i : s && o ? K(s.split("."), o.split(".")) : s || o ? s ? -1 : 1 : 0;
};
var he = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
var z = (n) => {
  if (typeof n != "string")
    throw new TypeError("Invalid argument expected string");
  const e = n.match(he);
  if (!e)
    throw new Error(`Invalid argument not valid semver ('${n}' received)`);
  return e.shift(), e;
};
var Y = (n) => n === "*" || n === "x" || n === "X";
var B = (n) => {
  const e = parseInt(n, 10);
  return isNaN(e) ? n : e;
};
var de = (n, e) => typeof n != typeof e ? [String(n), String(e)] : [n, e];
var we = (n, e) => {
  if (Y(n) || Y(e))
    return 0;
  const [t, r] = de(B(n), B(e));
  return t > r ? 1 : t < r ? -1 : 0;
};
var K = (n, e) => {
  for (let t = 0; t < Math.max(n.length, e.length); t++) {
    const r = we(n[t] || "0", e[t] || "0");
    if (r !== 0)
      return r;
  }
  return 0;
};
var me = class {
  /**
   * Compare [semver](https://semver.org/) version strings
   * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
   *
   * @param v1 - First version to compare
   * @param v2 - Second version to compare
   * @returns boolean true if v1 is higher than v2
   */
  greater(e, t) {
    return W(e, t) > 0;
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
    return W(e, t) === 0;
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
    return W(e, t) < 0;
  }
};
var Ee = class {
  /**
   * 获取当前设备
   */
  static getDevice() {
    const e = new q();
    return e.isInSiyuanWidget() ? "Siyuan_Widget" : e.isInSiyuanOrSiyuanNewWin() ? "Siyuan_NewWin" : O.isInChromeExtension() ? "Chrome_Extension" : "Chrome_Browser";
  }
};
var ve = class {
  constructor() {
    g(this, "strUtil");
    g(this, "dateUtil");
    g(this, "nodeUtil");
    g(this, "browserUtil");
    g(this, "versionUtil");
    g(this, "deviceUtil");
    this.strUtil = new ge(), this.dateUtil = new fe(), this.nodeUtil = new pe(), this.browserUtil = O, this.versionUtil = new me(), this.deviceUtil = Ee;
  }
};
var Ie = class {
  /**
   * 构造 zhi-sdk 对象
   * @param env - 可选，环境变量对象
   */
  constructor(e) {
    g(this, "env");
    g(this, "logger");
    g(this, "siyuanApi");
    g(this, "blogApi");
    g(this, "common");
    this.env = e, this.logger = G.defaultLogger(this.env, X.LOG_STACK_SIZE), this.siyuanApi = new ce(), this.blogApi = new ue(), this.common = new ve();
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
const __vite__cjsImport1_zhiEnv = require_lib();
const Env = __vite__cjsImport1_zhiEnv.__esModule ? __vite__cjsImport1_zhiEnv.default : __vite__cjsImport1_zhiEnv;
const _ZhiUtil = class {
  static zhiSdk() {
    if (!_ZhiUtil.zhiSdkObj) {
      const env = new Env({ "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false });
      _ZhiUtil.zhiSdkObj = new Ie(env);
      const logger = _ZhiUtil.zhiSdkObj.getLogger();
      const common = _ZhiUtil.zhiSdkObj.common;
      logger.info(common.strUtil.f("ZhiSdk inited, components are available now,like logger, env and so on."));
    }
    return _ZhiUtil.zhiSdkObj;
  }
};
let ZhiUtil = _ZhiUtil;
__publicField(ZhiUtil, "zhiSdkObj");
const version = "1.0.0";
var ThemeFromEnum = /* @__PURE__ */ ((ThemeFromEnum2) => {
  ThemeFromEnum2["ThemeFrom_Blog"] = "zhi-theme-blog";
  ThemeFromEnum2["ThemeFrom_Siyuan"] = "zhi-theme-siyuan";
  return ThemeFromEnum2;
})(ThemeFromEnum || {});
const initPluginSystem = () => {
  return [
    {
      libpath: "/plugin-system/plugin-system-hook.cjs",
      format: "cjs",
      importType: "require",
      runAs: "electron"
    }
  ];
};
const pluginSystem = {
  initPluginSystem
};
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
    return pluginSystem.initPluginSystem();
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
class Zhi {
  constructor() {
    __publicField(this, "logger");
    __publicField(this, "common");
    const zhiSdk = ZhiUtil.zhiSdk();
    this.logger = zhiSdk.getLogger();
    this.common = zhiSdk.common;
  }
  async main(args) {
    this.logger.debug(this.common.strUtil.f("Parsing args <{0}>", args));
    this.hello(ThemeFromEnum.ThemeFrom_Siyuan);
    return await Bootstrap.start();
  }
  hello(from) {
    this.logger.info(this.common.strUtil.f("Hello, {0} {1} v{2}! You are from {3}", "zhi", "theme", version, from));
  }
}
class Theme {
  constructor() {
    __publicField(this, "logger");
    __publicField(this, "common");
    __publicField(this, "siyuanApi");
    __publicField(this, "zhiTheme");
    const zhiSdk = ZhiUtil.zhiSdk();
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
          const importPath = _.join(this.siyuanApi.siyuanUtil.ZHI_THEME_DIST_PATH(), libpath);
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
