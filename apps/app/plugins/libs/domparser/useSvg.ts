/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

export const useSvg = () => {
  /**
   * 将SVG数据添加到页面中。
   * @param svgDataArray 一个包含SVG数据字符串的数组。
   */
  const addSvgToPage = (svgDataArray: string[]): void => {
    const wrapper = `
    <svg data-name="siyuan-blog" style="position: absolute; width: 0; height: 0; overflow: hidden;">
      <defs>
        ${svgDataArray.map(svgData => `<symbol>${svgData}</symbol>`).join("")}
      </defs>
    </svg>
  `

    document.body.insertAdjacentHTML("afterbegin", wrapper)
  }

  /**
   * 注入完整的思源原生 symbol 精灵，元素本身已包含 symbol 标签。
   */
  const addSymbolsToPage = (symbols: string[]): void => {
    if (document.querySelector('svg[data-name="siyuan-symbols"]')) {
      return
    }
    const wrapper = `
    <svg data-name="siyuan-symbols" style="position: absolute; width: 0; height: 0; overflow: hidden;">
      <defs>
        ${symbols.join("")}
      </defs>
    </svg>
  `
    document.body.insertAdjacentHTML("afterbegin", wrapper)
  }

  return { addSvgToPage, addSymbolsToPage }
}
