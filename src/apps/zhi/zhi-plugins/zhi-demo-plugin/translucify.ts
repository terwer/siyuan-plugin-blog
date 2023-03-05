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

const DEFAULT_TOLERANCE_VALUE = 0.05

/**
 * Translucify
 *
 * jim.yang@thisplace.com, terwer
 * 20/4/2015
 */
class Translucify {
  init() {
    var DEFAULT_TOLERANCE_VALUE = 0.05

    // Tolerance threshold for flood fill.
    var _toleranceValue = DEFAULT_TOLERANCE_VALUE

    /**
     * @param {HTMLImageElement} image
     * @returns {boolean}
     */
    function isImageLoaded(image: any) {
      if (
        image.nodeType === 1 &&
        image.tagName.toLowerCase() === "img" &&
        image.src !== null &&
        image.src !== ""
      ) {
        return (
          image.complete ||
          image.readyState === 4 ||
          image.naturalWidth + image.naturalHeight > 0
        )
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
      var imageCORS = new Image()
      imageCORS.crossOrigin = "use-credentials"

      var canvas = document.createElement("canvas")

      var w = image.naturalWidth
      var h = image.naturalHeight

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
      var created = getCanvasAndCORSImage(image)
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
      var pixelStack = [[x, y]]
      var width = context.canvas.width
      var height = context.canvas.height
      var pixelPos = (y * width + x) * 4
      var imageData = context.getImageData(0, 0, width, height)

      var rMax = imageData.data[pixelPos] * (1 + tolerance)
      var gMax = imageData.data[pixelPos + 1] * (1 + tolerance)
      var bMax = imageData.data[pixelPos + 2] * (1 + tolerance)

      var rMin = imageData.data[pixelPos] * (1 - tolerance)
      var gMin = imageData.data[pixelPos + 1] * (1 - tolerance)
      var bMin = imageData.data[pixelPos + 2] * (1 - tolerance)

      /**
       * Returns true if within tolerance bounds of flood-fill origin.
       * @param pixelIndex
       * @returns {boolean}
       */
      function matchTolerance(pixelIndex: any) {
        var r = imageData.data[pixelIndex]
        var g = imageData.data[pixelIndex + 1]
        var b = imageData.data[pixelIndex + 2]

        return (
          r >= rMin &&
          r <= rMax &&
          g >= gMin &&
          g <= gMax &&
          b >= bMin &&
          b <= bMax
        )
      }

      while (pixelStack.length) {
        var newPos: any = pixelStack.pop()
        x = newPos[0]
        y = newPos[1]
        pixelPos = (y * width + x) * 4
        while (y-- >= 0 && matchTolerance(pixelPos)) {
          pixelPos -= width * 4
        }
        pixelPos += width * 4
        ++y
        var reachLeft = false
        var reachRight = false
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
      var ctx = canvas.getContext("2d")
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
