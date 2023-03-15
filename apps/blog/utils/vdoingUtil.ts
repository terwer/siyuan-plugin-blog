import { normalize } from "pathe"

export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^[a-z]+:/i

/**
 * Vdoing 主题工具类
 */
class VdoingUtil {
  public static resolveNavLinkItem(linkItem: any) {
    return Object.assign(linkItem, {
      type: linkItem.items && linkItem.items.length ? "links" : "link",
    })
  }

  public static isExternal(path: string) {
    return outboundRE.test(path)
  }

  public static isMailto(path: string) {
    return /^mailto:/.test(path)
  }

  public static isTel(path: string) {
    return /^tel:/.test(path)
  }

  public static ensureExt(path: string) {
    if (VdoingUtil.isExternal(path)) {
      return path
    }
    if (!path) return "404"
    const hashMatch = path.match(hashRE)
    const hash = hashMatch ? hashMatch[0] : ""
    const normalized = normalize(path)

    if (endingSlashRE.test(normalized)) {
      return path
    }
    return normalized + ".html" + hash
  }
}

export default VdoingUtil
