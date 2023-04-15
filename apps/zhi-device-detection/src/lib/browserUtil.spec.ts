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

// Test cases for BrowserUtil class using Jest
import BrowserUtil from "./browserUtil"

describe("BrowserUtil", () => {
  it("isNode", () => {
    const result = BrowserUtil.isNode
    console.log(result)
  })

  it("isInBrowser", () => {
    const result = BrowserUtil.isInBrowser
    console.log(result)
  })

  it("isElectron", () => {
    const result = BrowserUtil.isElectron()
    console.log(result)
  })

  it("isInChromeExtension", () => {
    const result = BrowserUtil.isInChromeExtension()
    console.log(result)
  })

  it("getQueryString", () => {
    const expected = ""
    const result = BrowserUtil.getQueryString("foo")
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 中存在指定的查询参数时，replaceUrlParam 函数应该替换该参数的值。
   */
  it("replaceUrlParam1", () => {
    const url = "https://example.com/?foo=bar&baz=qux"
    const paramName = "foo"
    const paramValue = "baz"
    const expected = "https://example.com/?foo=baz&baz=qux"
    const result = BrowserUtil.replaceUrlParam(url, paramName, paramValue)
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 中不存在指定的查询参数时，replaceUrlParam 函数应该添加该参数到 URL 中。
   */
  it("replaceUrlParam2", () => {
    const url = "https://example.com/?foo=bar"
    const paramName = "baz"
    const paramValue = "qux"
    const expected = "https://example.com/?foo=bar&baz=qux"
    const result = BrowserUtil.replaceUrlParam(url, paramName, paramValue)
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 没有查询参数时，replaceUrlParam 函数应该添加一个查询参数到 URL 中。
   */
  it("replaceUrlParam3", () => {
    const url = "https://example.com/"
    const paramName = "foo"
    const paramValue = "bar"
    const expected = "https://example.com/?foo=bar"
    const result = BrowserUtil.replaceUrlParam(url, paramName, paramValue)
    expect(result).toBe(expected)
  })

  it("replaceUrlParam4", () => {
    const url = "https://example.com/?foo=bar#baz"
    const paramName = "qux"
    const paramValue = "quux"
    const expected = "https://example.com/?foo=bar&qux=quux#baz"
    const result = BrowserUtil.replaceUrlParam(url, paramName, paramValue)
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 包含带有问号的 hash 片段时，replaceUrlParam 函数应该正确处理。
   */
  it("replaceUrlParam5", () => {
    const url = "https://example.com/#foo?bar"
    const paramName = "baz"
    const paramValue = "qux"
    const expected = "https://example.com/?baz=qux#foo?bar"
    const result = BrowserUtil.replaceUrlParam(url, paramName, paramValue)
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 中不存在指定的查询参数时，setUrlParameter 函数应该添加该参数到 URL 中。
   */
  it("should add a new parameter to the URL if it does not already exist", () => {
    const url = "https://example.com/"
    const key = "foo"
    const value = "bar"
    const expected = "https://example.com/?foo=bar"
    const result = BrowserUtil.setUrlParameter(url, key, value)
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 中存在指定的查询参数时，setUrlParameter 函数应该替换该参数的值。
   */
  it("should replace the value of an existing parameter in the URL", () => {
    const url = "https://example.com/?foo=bar&baz=qux"
    const key = "foo"
    const value = "baz"
    const expected = "https://example.com/?foo=baz&baz=qux"
    const result = BrowserUtil.setUrlParameter(url, key, value)
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 包含 hash 片段时，setUrlParameter 函数应该正确处理。
   */
  it("should handle URLs with a hash fragment", () => {
    const url = "https://example.com/#foo"
    const key = "bar"
    const value = "baz"
    const expected = "https://example.com/?bar=baz#foo"
    const result = BrowserUtil.setUrlParameter(url, key, value)
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 包含带有问号的 hash 片段时，setUrlParameter 函数应该正确处理。
   */
  it("should handle URLs with a question mark in the hash fragment", () => {
    const url = "https://example.com/#foo?bar"
    const key = "baz"
    const value = "qux"
    const expected = "https://example.com/?baz=qux#foo?bar"
    const result = BrowserUtil.setUrlParameter(url, key, value)
    expect(result).toBe(expected)
  })

  /**
   * 当 URL 中存在其他参数的值包含新参数的键时，setUrlParameter 函数应该正确处理。
   */
  it("should handle URLs with existing parameters that contain the new parameter's key", () => {
    const url = "https://example.com/?foobar=baz"
    const key = "foo"
    const value = "bar"
    const expected = "https://example.com/?foobar=baz&foo=bar"
    const result = BrowserUtil.setUrlParameter(url, key, value)
    expect(result).toBe(expected)
  })

  it("should reload specified tab page", () => {
    console.log("reloadTabPage")
  })

  it("should reload current tab page", () => {
    console.log("reloadPage")
  })

  it("should reload current tab page with message callback", () => {
    console.log("reloadPageWithMessageCallback")
  })
})
