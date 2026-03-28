/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

const HTML_ENTITY_MAP: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: "\"",
  "#39": "'",
}

const decodeHtmlEntities = (text: string) => {
  return text
    .replace(/&([a-z0-9#]+);/gi, (match, entity) => {
      const normalizedEntity = entity.toLowerCase()
      return HTML_ENTITY_MAP[normalizedEntity] ?? match
    })
    .replace(/&#(\d+);/g, (_, code) => {
      const codePoint = Number(code)
      return Number.isNaN(codePoint) ? "" : String.fromCodePoint(codePoint)
    })
    .replace(/&#x([\da-f]+);/gi, (_, code) => {
      const codePoint = Number.parseInt(code, 16)
      return Number.isNaN(codePoint) ? "" : String.fromCodePoint(codePoint)
    })
}

export const extractMeaningfulText = (html: string) => {
  if (!html) {
    return ""
  }

  return decodeHtmlEntities(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export const hasMeaningfulTextContent = (html: string) => {
  return extractMeaningfulText(html).length > 0
}
