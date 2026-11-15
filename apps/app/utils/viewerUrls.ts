import { Base64 } from "js-base64"

export const normalizeAppBase = (base: string = "/") =>
  `/${base.replace(/^\/+|\/+$/g, "")}/`.replace(/^\/\//, "/")

export const withAppBase = (base: string, path: string) =>
  normalizeAppBase(base) + path.replace(/^\/+/, "")

// Only unresolved legacy relative assets need the provider's legacy read route.
// Absolute historical references and newly bound provider URLs remain unchanged.
export const isLegacyAssetPath = (url: string) => /^(?:\.\/)?assets\//.test(url)

export const providerAssetUrl = (url: string, publicBase: string) => isLegacyAssetPath(url)
  ? publicBase.replace(/\/$/, "") + "/api/asset/origin/base64/" + Base64.encodeURI(url)
  : url
