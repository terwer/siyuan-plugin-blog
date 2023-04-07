/*
 * Copyright (c) 2023, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */

/**
 * This snippet is copied from https://github.com/leolee9086/snippets/blob/3764e58f1f98286b9e2d14451ddcf53c6a63bedb/noobApi/util/requireHacker.js
 *
 * This code can only run in siyuan-note internal electron environment, DO NOT use in other space
 * To make work, I changed a little code
 * Thanks for leolee9086 and his hard work
 *
 * @author leolee9086
 */
const workspaceDir = window.siyuan ? window.siyuan.config.system.workspaceDir : window.workspaceDir

let re = null
let realRequire = null
if (window.require) {
    const fs = require("fs")
    const path = require("path")
    if (!window) {
        const window = global
    }
    if (window.require.cache) {
        realRequire = window.require
    }
    if (realRequire) {
        const path = require("path")
        re = function (moduleName, base) {
            if (module) {
                let _load = module.__proto__.load
                if (!module.__proto__.load.hacked) {
                    module.__proto__.load = function (filename) {
                        let realfilename = filename
                        try {
                            _load.bind(this)(filename)
                        } catch (e) {
                            if (e.message.indexOf("Cannot find module") >= 0 && e.message.indexOf(filename) >= 0) {
                                if (global.ExternalDepPathes) {
                                    let flag
                                    let modulePath
                                    global.ExternalDepPathes.forEach((depPath) => {
                                        if (fs.existsSync(path.join(depPath, moduleName))) {
                                            if (!flag) {
                                                console.file_warn
                                                    ? console.file_warn(
                                                          `模块${moduleName}未找到,重定向到${path.join(
                                                              depPath,
                                                              moduleName
                                                          )}`
                                                      )
                                                    : console.warn(
                                                          `模块${moduleName}未找到,重定向到${path.join(
                                                              depPath,
                                                              moduleName
                                                          )}`
                                                      )
                                                filename = path.join(depPath, filename)
                                                try {
                                                    _load.bind(this)(filename)

                                                    flag = true
                                                } catch (e) {
                                                    console.error(e)
                                                }
                                            } else {
                                                console.warn(
                                                    `模块${moduleName}在${modulePath}已经找到,请检查外部路径${path.join(
                                                        depPath,
                                                        moduleName
                                                    )}是否重复安装`
                                                )
                                            }
                                        }
                                    })
                                    if (!flag) {
                                        console.error(e)
                                        throw new Error(`无法加载模块${realfilename}`)
                                    }
                                } else {
                                    console.error(e)
                                    throw new Error(`无法加载模块${realfilename}`)
                                }
                            } else {
                                throw e
                            }
                        }
                    }

                    module.__proto__.load.hacked = true
                }
            }
            if (!window.realRequire) {
                window.realRequire = realRequire
            }
            let that = window
            if (base) {
                moduleName = path.resolve(base, moduleName)
            }

            if (workspaceDir) {
                if (this) {
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    that = this
                }
                try {
                    if (that.realRequire) {
                        let _module = that.realRequire(moduleName)
                        return _module
                    } else {
                        let _module = window.realRequire(moduleName)
                        return _module
                    }
                } catch (e) {
                    if (e.message.indexOf("Cannot find module") >= 0) {
                        if (
                            !(moduleName.startsWith("/") || moduleName.startsWith("./") || moduleName.startsWith("../"))
                        ) {
                            if (global.ExternalDepPathes) {
                                let flag
                                let modulePath
                                global.ExternalDepPathes.forEach((depPath) => {
                                    if (fs.existsSync(path.join(depPath, moduleName))) {
                                        if (!flag) {
                                            console.file_warn
                                                ? console.file_warn(
                                                      `模块${moduleName}未找到,重定向到${path.join(
                                                          depPath,
                                                          moduleName
                                                      )}`
                                                  )
                                                : console.warn(
                                                      `模块${moduleName}未找到,重定向到${path.join(
                                                          depPath,
                                                          moduleName
                                                      )}`
                                                  )
                                            moduleName = path.join(depPath, moduleName)
                                            modulePath = path.join(depPath, moduleName)
                                            flag = true
                                        } else {
                                            console.warn(
                                                `模块${moduleName}在${modulePath}已经找到,请检查外部路径${path.join(
                                                    depPath,
                                                    moduleName
                                                )}是否重复安装`
                                            )
                                        }
                                    }
                                })
                            }
                        } else {
                            moduleName = path.resolve(module.path, moduleName)
                        }
                        // eslint-disable-next-line no-useless-catch
                        try {
                            let _module
                            _module = that.realRequire(moduleName)
                            return _module
                        } catch (e) {
                            throw e
                        }
                    } else {
                        throw e
                    }
                }
            } else return window.require(moduleName)
        }
    }
}
if (window.require && re) {
    window.require = re
    window.realRequire = realRequire
    if (window.realRequire && window.realRequire.cache) {
        window.realRequire.cache.electron.__proto__.realRequire = realRequire.cache.electron.__proto__.require
        window.realRequire.cache.electron.__proto__.require = re
    }
    window.require.setExternalDeps = (path) => {
        if (!window.ExternalDepPathes) {
            window.ExternalDepPathes = []
        }
        if (path && !window.ExternalDepPathes.indexOf(path) >= 0) {
            window.ExternalDepPathes.push(path)
            window.ExternalDepPathes = Array.from(new Set(window.ExternalDepPathes))
        }
    }
    re.setExternalDeps(`${workspaceDir}`)
    window.require.setExternalBase = (path) => {
        if (!window.ExternalDepPathes) {
            window.ExternalDepPathes = []
        }
        if (!window.ExternalBase) {
            window.ExternalBase = path
        } else {
            console.error("不能重复设置外部依赖路径")
        }
    }
}
