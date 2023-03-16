/*
 Copyright (c) 2023 Terwer. All rights reserved.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Translucify
 *
 * jim.yang@thisplace.com, terwer
 * 20/4/2015
 */
class Translucify {
  init() {
    const DEFAULT_TOLERANCE_VALUE = 0.05

    // Tolerance threshold for flood fill.
    let _toleranceValue = DEFAULT_TOLERANCE_VALUE

    /**
     * @param {HTMLImageElement} image
     * @returns {boolean}
     */
    function isImageLoaded(image: any) {
      if (image.nodeType === 1 && image.tagName.toLowerCase() === "img" && image.src !== null && image.src !== "") {
        return image.complete || image.readyState === 4 || image.naturalWidth + image.naturalHeight > 0
      } else {
        return false
      }
    }

    /**
     * Generates a set of <canvas>, <img> which is untainted by Cross-Origin image data.
     * @param {HTMLImageElement} image
     * @returns {{canvas: HTMLCanvasElement, imageCORS: HTMLImageElement}}
     */
    function getCanvasAndCORSImage(image: any) {
      /*
       Get CORS image without triggering security exceptions
       which occur when accessing pixel data even on an image
       with response header 'Access-Control-Allow-Origin: *'
       */
      const imageCORS = new Image()
      imageCORS.crossOrigin = "use-credentials"

      const canvas = document.createElement("canvas")

      const w = image.naturalWidth
      const h = image.naturalHeight

      canvas.width = w
      canvas.height = h

      return {
        canvas: canvas,
        imageCORS: imageCORS,
      }
    }

    /**
     * @param {HTMLImageElement} image
     */
    function modifyImagePixels(image: any) {
      const created = getCanvasAndCORSImage(image)
      created.imageCORS.onload = function () {
        applyFloodFill(image, created.imageCORS, created.canvas)
      }
      created.imageCORS.src = image.src

      // Apply filter immediately if imageCORS is loaded from cache
      // and doesn't fire the load event.
      if (isImageLoaded(created.imageCORS)) {
        applyFloodFill(image, created.imageCORS, created.canvas)
      }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {CanvasRenderingContext2D} context
     * @param {number} tolerance
     */
    function floodFill(x: number, y: number, context: any, tolerance: number) {
      const pixelStack = [[x, y]]
      const width = context.canvas.width
      const height = context.canvas.height
      let pixelPos = (y * width + x) * 4
      const imageData = context.getImageData(0, 0, width, height)

      const rMax = imageData.data[pixelPos] * (1 + tolerance)
      const gMax = imageData.data[pixelPos + 1] * (1 + tolerance)
      const bMax = imageData.data[pixelPos + 2] * (1 + tolerance)

      const rMin = imageData.data[pixelPos] * (1 - tolerance)
      const gMin = imageData.data[pixelPos + 1] * (1 - tolerance)
      const bMin = imageData.data[pixelPos + 2] * (1 - tolerance)

      /**
       * Returns true if within tolerance bounds of flood-fill origin.
       * @param pixelIndex
       * @returns {boolean}
       */
      function matchTolerance(pixelIndex: any) {
        const r = imageData.data[pixelIndex]
        const g = imageData.data[pixelIndex + 1]
        const b = imageData.data[pixelIndex + 2]

        return r >= rMin && r <= rMax && g >= gMin && g <= gMax && b >= bMin && b <= bMax
      }

      while (pixelStack.length) {
        const newPos: any = pixelStack.pop()
        x = newPos[0]
        y = newPos[1]
        pixelPos = (y * width + x) * 4
        while (y-- >= 0 && matchTolerance(pixelPos)) {
          pixelPos -= width * 4
        }
        pixelPos += width * 4
        ++y
        let reachLeft = false
        let reachRight = false
        while (y++ < height - 1 && matchTolerance(pixelPos)) {
          imageData.data[pixelPos] = 0
          imageData.data[pixelPos + 1] = 0
          imageData.data[pixelPos + 2] = 0
          imageData.data[pixelPos + 3] = 0

          if (x > 0) {
            if (matchTolerance(pixelPos - 4)) {
              if (!reachLeft) {
                pixelStack.push([x - 1, y])
                reachLeft = true
              }
            } else if (reachLeft) {
              reachLeft = false
            }
          }
          if (x < width - 1) {
            if (matchTolerance(pixelPos + 4)) {
              if (!reachRight) {
                pixelStack.push([x + 1, y])
                reachRight = true
              }
            } else if (matchTolerance(pixelPos + 4 - width * 4)) {
              if (!reachLeft) {
                pixelStack.push([x + 1, y - 1])
                reachLeft = true
              }
            } else if (reachRight) {
              reachRight = false
            }
          }
          pixelPos += width * 4
        }
      }
      context.putImageData(imageData, 0, 0)
    }

    /**
     * Flood-fill from (0,0).
     * @param {HTMLImageElement} originalImage
     * @param {HTMLImageElement} imageCORS
     * @param {HTMLCanvasElement} canvas
     */
    function applyFloodFill(originalImage: any, imageCORS: any, canvas: any) {
      const ctx = canvas.getContext("2d")
      ctx.drawImage(imageCORS, 0, 0)
      floodFill(0, 0, ctx, _toleranceValue)
      if (originalImage.parentNode) {
        originalImage.parentNode.insertBefore(canvas, originalImage)
        originalImage.parentNode.removeChild(originalImage)
      }
    }

    function translucifyOneFloodFill(image: any) {
      if (isImageLoaded(image)) {
        modifyImagePixels(image)
      } else {
        image.onload = function () {
          modifyImagePixels(image)
        }
      }
    }

    /**
     * Translucifies one HTMLImageElement or a set of them via NodeList.
     * Specifies which modifier to use.
     * @param {HTMLImageElement | NodeList | jQuery} queryResult
     * @param {number} [tolerance]
     */
    function translucifyAll(queryResult: any, tolerance: number) {
      if (typeof tolerance !== "undefined") {
        _toleranceValue = tolerance
      } else {
        _toleranceValue = DEFAULT_TOLERANCE_VALUE
      }

      if (queryResult instanceof HTMLImageElement) {
        // <img> passed in directly
        translucifyOneFloodFill(queryResult)
      } else if (queryResult instanceof NodeList) {
        // document.querySelectorAll support
        Array.prototype.slice.call(queryResult).forEach(translucifyOneFloodFill)
      } else {
        // jQuery object support
        if (queryResult && queryResult.toArray) {
          queryResult.toArray().forEach(translucifyOneFloodFill)
        }
      }
    }

    return translucifyAll
  }
}

export default Translucify
