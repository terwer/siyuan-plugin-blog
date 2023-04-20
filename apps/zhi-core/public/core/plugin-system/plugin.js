!(function () {
  "use strict"
  try {
    if ("undefined" != typeof document) {
      var e = document.createElement("style")
      e.appendChild(
        document.createTextNode(
          ".command.svelte-1bq7axd{padding:8px 12px}.command.svelte-1bq7axd:hover{cursor:pointer;background-color:#0003;color:var(--b3-theme-primary)}.command-selected.svelte-1bq7axd{color:var(--b3-theme-primary);background-color:#0003}.command-plugin.svelte-1bq7axd{font-size:14px}.command-shortcut.svelte-1bq7axd{font-size:12px;color:var(--color-text-3)}.plugin.svelte-bwhxpp span.remove.svelte-bwhxpp{display:none;color:var(--b3-theme-error);margin-left:4px}.plugin.svelte-bwhxpp:hover span.remove.svelte-bwhxpp{display:inline;cursor:pointer}.plugin.svelte-bwhxpp:hover span.remove.svelte-bwhxpp:hover{text-decoration:underline}.plugin-info.svelte-bj9chc{display:flex;align-items:center}.plugin-detail.svelte-bj9chc{margin-top:12px;width:100%}.plugin-name.svelte-bj9chc{display:inline;margin-right:6px;font-size:24px}.plugin-key.svelte-bj9chc{display:inline;font-size:16px}.plugin-manifest.svelte-bj9chc{margin-top:12px}.plugin-readme.svelte-bj9chc{margin-top:20px}.go-back.svelte-bj9chc{margin-left:12px;font-size:12px;height:24px}.go-back-icon.svelte-bj9chc{height:12px;width:12px;margin-right:4px}"
        )
      ),
        document.head.appendChild(e)
    }
  } catch (t) {
    console.error("vite-plugin-css-injected-by-js", t)
  }
})()
var _a
var commonjsGlobal =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : {}
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect$1
;(function (Reflect2) {
  ;(function (factory2) {
    var root =
      typeof commonjsGlobal === "object"
        ? commonjsGlobal
        : typeof self === "object"
        ? self
        : typeof this === "object"
        ? this
        : Function("return this;")()
    var exporter = makeExporter(Reflect2)
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect2
    } else {
      exporter = makeExporter(root.Reflect, exporter)
    }
    factory2(exporter)
    function makeExporter(target, previous) {
      return function (key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, { configurable: true, writable: true, value })
        }
        if (previous) previous(key, value)
      }
    }
  })(function (exporter) {
    var hasOwn = Object.prototype.hasOwnProperty
    var supportsSymbol = typeof Symbol === "function"
    var toPrimitiveSymbol =
      supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive"
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator"
    var supportsCreate = typeof Object.create === "function"
    var supportsProto = { __proto__: [] } instanceof Array
    var downLevel = !supportsCreate && !supportsProto
    var HashMap = {
      // create an object in dictionary mode (a.k.a. "slow" mode in v8)
      create: supportsCreate
        ? function () {
            return MakeDictionary(/* @__PURE__ */ Object.create(null))
          }
        : supportsProto
        ? function () {
            return MakeDictionary({ __proto__: null })
          }
        : function () {
            return MakeDictionary({})
          },
      has: downLevel
        ? function (map, key) {
            return hasOwn.call(map, key)
          }
        : function (map, key) {
            return key in map
          },
      get: downLevel
        ? function (map, key) {
            return hasOwn.call(map, key) ? map[key] : void 0
          }
        : function (map, key) {
            return map[key]
          },
    }
    var functionPrototype = Object.getPrototypeOf(Function)
    var usePolyfill =
      typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true"
    var _Map =
      !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function"
        ? Map
        : CreateMapPolyfill()
    var _Set =
      !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function"
        ? Set
        : CreateSetPolyfill()
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill()
    var Metadata2 = new _WeakMap()
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators)) throw new TypeError()
        if (!IsObject(target)) throw new TypeError()
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError()
        if (IsNull(attributes)) attributes = void 0
        propertyKey = ToPropertyKey(propertyKey)
        return DecorateProperty(decorators, target, propertyKey, attributes)
      } else {
        if (!IsArray(decorators)) throw new TypeError()
        if (!IsConstructor(target)) throw new TypeError()
        return DecorateConstructor(decorators, target)
      }
    }
    exporter("decorate", decorate)
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError()
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError()
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey)
      }
      return decorator
    }
    exporter("metadata", metadata)
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError()
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey)
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey)
    }
    exporter("defineMetadata", defineMetadata)
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError()
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey)
      return OrdinaryHasMetadata(metadataKey, target, propertyKey)
    }
    exporter("hasMetadata", hasMetadata)
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError()
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey)
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey)
    }
    exporter("hasOwnMetadata", hasOwnMetadata)
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError()
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey)
      return OrdinaryGetMetadata(metadataKey, target, propertyKey)
    }
    exporter("getMetadata", getMetadata)
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError()
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey)
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey)
    }
    exporter("getOwnMetadata", getOwnMetadata)
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError()
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey)
      return OrdinaryMetadataKeys(target, propertyKey)
    }
    exporter("getMetadataKeys", getMetadataKeys)
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError()
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey)
      return OrdinaryOwnMetadataKeys(target, propertyKey)
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys)
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError()
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey)
      var metadataMap = GetOrCreateMetadataMap(
        target,
        propertyKey,
        /*Create*/
        false
      )
      if (IsUndefined(metadataMap)) return false
      if (!metadataMap.delete(metadataKey)) return false
      if (metadataMap.size > 0) return true
      var targetMetadata = Metadata2.get(target)
      targetMetadata.delete(propertyKey)
      if (targetMetadata.size > 0) return true
      Metadata2.delete(target)
      return true
    }
    exporter("deleteMetadata", deleteMetadata)
    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i]
        var decorated = decorator(target)
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated)) throw new TypeError()
          target = decorated
        }
      }
      return target
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i]
        var decorated = decorator(target, propertyKey, descriptor)
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated)) throw new TypeError()
          descriptor = decorated
        }
      }
      return descriptor
    }
    function GetOrCreateMetadataMap(O, P2, Create) {
      var targetMetadata = Metadata2.get(O)
      if (IsUndefined(targetMetadata)) {
        if (!Create) return void 0
        targetMetadata = new _Map()
        Metadata2.set(O, targetMetadata)
      }
      var metadataMap = targetMetadata.get(P2)
      if (IsUndefined(metadataMap)) {
        if (!Create) return void 0
        metadataMap = new _Map()
        targetMetadata.set(P2, metadataMap)
      }
      return metadataMap
    }
    function OrdinaryHasMetadata(MetadataKey, O, P2) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P2)
      if (hasOwn2) return true
      var parent = OrdinaryGetPrototypeOf(O)
      if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P2)
      return false
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P2) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P2,
        /*Create*/
        false
      )
      if (IsUndefined(metadataMap)) return false
      return ToBoolean(metadataMap.has(MetadataKey))
    }
    function OrdinaryGetMetadata(MetadataKey, O, P2) {
      var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P2)
      if (hasOwn2) return OrdinaryGetOwnMetadata(MetadataKey, O, P2)
      var parent = OrdinaryGetPrototypeOf(O)
      if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P2)
      return void 0
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P2) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P2,
        /*Create*/
        false
      )
      if (IsUndefined(metadataMap)) return void 0
      return metadataMap.get(MetadataKey)
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P2) {
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P2,
        /*Create*/
        true
      )
      metadataMap.set(MetadataKey, MetadataValue)
    }
    function OrdinaryMetadataKeys(O, P2) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P2)
      var parent = OrdinaryGetPrototypeOf(O)
      if (parent === null) return ownKeys
      var parentKeys = OrdinaryMetadataKeys(parent, P2)
      if (parentKeys.length <= 0) return ownKeys
      if (ownKeys.length <= 0) return parentKeys
      var set = new _Set()
      var keys = []
      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i]
        var hasKey = set.has(key)
        if (!hasKey) {
          set.add(key)
          keys.push(key)
        }
      }
      for (var _a2 = 0, parentKeys_1 = parentKeys; _a2 < parentKeys_1.length; _a2++) {
        var key = parentKeys_1[_a2]
        var hasKey = set.has(key)
        if (!hasKey) {
          set.add(key)
          keys.push(key)
        }
      }
      return keys
    }
    function OrdinaryOwnMetadataKeys(O, P2) {
      var keys = []
      var metadataMap = GetOrCreateMetadataMap(
        O,
        P2,
        /*Create*/
        false
      )
      if (IsUndefined(metadataMap)) return keys
      var keysObj = metadataMap.keys()
      var iterator2 = GetIterator(keysObj)
      var k2 = 0
      while (true) {
        var next = IteratorStep(iterator2)
        if (!next) {
          keys.length = k2
          return keys
        }
        var nextValue = IteratorValue(next)
        try {
          keys[k2] = nextValue
        } catch (e) {
          try {
            IteratorClose(iterator2)
          } finally {
            throw e
          }
        }
        k2++
      }
    }
    function Type(x) {
      if (x === null) return 1
      switch (typeof x) {
        case "undefined":
          return 0
        case "boolean":
          return 2
        case "string":
          return 3
        case "symbol":
          return 4
        case "number":
          return 5
        case "object":
          return x === null ? 1 : 6
        default:
          return 6
      }
    }
    function IsUndefined(x) {
      return x === void 0
    }
    function IsNull(x) {
      return x === null
    }
    function IsSymbol(x) {
      return typeof x === "symbol"
    }
    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function"
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0:
          return input
        case 1:
          return input
        case 2:
          return input
        case 3:
          return input
        case 4:
          return input
        case 5:
          return input
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default"
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol)
      if (exoticToPrim !== void 0) {
        var result = exoticToPrim.call(input, hint)
        if (IsObject(result)) throw new TypeError()
        return result
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint)
    }
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O)
          if (!IsObject(result)) return result
        }
        var valueOf = O.valueOf
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O)
          if (!IsObject(result)) return result
        }
      } else {
        var valueOf = O.valueOf
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O)
          if (!IsObject(result)) return result
        }
        var toString_2 = O.toString
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O)
          if (!IsObject(result)) return result
        }
      }
      throw new TypeError()
    }
    function ToBoolean(argument) {
      return !!argument
    }
    function ToString(argument) {
      return "" + argument
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(
        argument,
        3
        /* String */
      )
      if (IsSymbol(key)) return key
      return ToString(key)
    }
    function IsArray(argument) {
      return Array.isArray
        ? Array.isArray(argument)
        : argument instanceof Object
        ? argument instanceof Array
        : Object.prototype.toString.call(argument) === "[object Array]"
    }
    function IsCallable(argument) {
      return typeof argument === "function"
    }
    function IsConstructor(argument) {
      return typeof argument === "function"
    }
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3:
          return true
        case 4:
          return true
        default:
          return false
      }
    }
    function GetMethod(V, P2) {
      var func = V[P2]
      if (func === void 0 || func === null) return void 0
      if (!IsCallable(func)) throw new TypeError()
      return func
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol)
      if (!IsCallable(method)) throw new TypeError()
      var iterator2 = method.call(obj)
      if (!IsObject(iterator2)) throw new TypeError()
      return iterator2
    }
    function IteratorValue(iterResult) {
      return iterResult.value
    }
    function IteratorStep(iterator2) {
      var result = iterator2.next()
      return result.done ? false : result
    }
    function IteratorClose(iterator2) {
      var f = iterator2["return"]
      if (f) f.call(iterator2)
    }
    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O)
      if (typeof O !== "function" || O === functionPrototype) return proto
      if (proto !== functionPrototype) return proto
      var prototype2 = O.prototype
      var prototypeProto = prototype2 && Object.getPrototypeOf(prototype2)
      if (prototypeProto == null || prototypeProto === Object.prototype) return proto
      var constructor = prototypeProto.constructor
      if (typeof constructor !== "function") return proto
      if (constructor === O) return proto
      return constructor
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {}
      var arraySentinel = []
      var MapIterator =
        /** @class */
        (function () {
          function MapIterator2(keys, values, selector) {
            this._index = 0
            this._keys = keys
            this._values = values
            this._selector = selector
          }
          MapIterator2.prototype["@@iterator"] = function () {
            return this
          }
          MapIterator2.prototype[iteratorSymbol] = function () {
            return this
          }
          MapIterator2.prototype.next = function () {
            var index = this._index
            if (index >= 0 && index < this._keys.length) {
              var result = this._selector(this._keys[index], this._values[index])
              if (index + 1 >= this._keys.length) {
                this._index = -1
                this._keys = arraySentinel
                this._values = arraySentinel
              } else {
                this._index++
              }
              return { value: result, done: false }
            }
            return { value: void 0, done: true }
          }
          MapIterator2.prototype.throw = function (error2) {
            if (this._index >= 0) {
              this._index = -1
              this._keys = arraySentinel
              this._values = arraySentinel
            }
            throw error2
          }
          MapIterator2.prototype.return = function (value) {
            if (this._index >= 0) {
              this._index = -1
              this._keys = arraySentinel
              this._values = arraySentinel
            }
            return { value, done: true }
          }
          return MapIterator2
        })()
      return (
        /** @class */
        (function () {
          function Map2() {
            this._keys = []
            this._values = []
            this._cacheKey = cacheSentinel
            this._cacheIndex = -2
          }
          Object.defineProperty(Map2.prototype, "size", {
            get: function () {
              return this._keys.length
            },
            enumerable: true,
            configurable: true,
          })
          Map2.prototype.has = function (key) {
            return (
              this._find(
                key,
                /*insert*/
                false
              ) >= 0
            )
          }
          Map2.prototype.get = function (key) {
            var index = this._find(
              key,
              /*insert*/
              false
            )
            return index >= 0 ? this._values[index] : void 0
          }
          Map2.prototype.set = function (key, value) {
            var index = this._find(
              key,
              /*insert*/
              true
            )
            this._values[index] = value
            return this
          }
          Map2.prototype.delete = function (key) {
            var index = this._find(
              key,
              /*insert*/
              false
            )
            if (index >= 0) {
              var size = this._keys.length
              for (var i = index + 1; i < size; i++) {
                this._keys[i - 1] = this._keys[i]
                this._values[i - 1] = this._values[i]
              }
              this._keys.length--
              this._values.length--
              if (key === this._cacheKey) {
                this._cacheKey = cacheSentinel
                this._cacheIndex = -2
              }
              return true
            }
            return false
          }
          Map2.prototype.clear = function () {
            this._keys.length = 0
            this._values.length = 0
            this._cacheKey = cacheSentinel
            this._cacheIndex = -2
          }
          Map2.prototype.keys = function () {
            return new MapIterator(this._keys, this._values, getKey3)
          }
          Map2.prototype.values = function () {
            return new MapIterator(this._keys, this._values, getValue)
          }
          Map2.prototype.entries = function () {
            return new MapIterator(this._keys, this._values, getEntry)
          }
          Map2.prototype["@@iterator"] = function () {
            return this.entries()
          }
          Map2.prototype[iteratorSymbol] = function () {
            return this.entries()
          }
          Map2.prototype._find = function (key, insert2) {
            if (this._cacheKey !== key) {
              this._cacheIndex = this._keys.indexOf((this._cacheKey = key))
            }
            if (this._cacheIndex < 0 && insert2) {
              this._cacheIndex = this._keys.length
              this._keys.push(key)
              this._values.push(void 0)
            }
            return this._cacheIndex
          }
          return Map2
        })()
      )
      function getKey3(key, _2) {
        return key
      }
      function getValue(_2, value) {
        return value
      }
      function getEntry(key, value) {
        return [key, value]
      }
    }
    function CreateSetPolyfill() {
      return (
        /** @class */
        (function () {
          function Set2() {
            this._map = new _Map()
          }
          Object.defineProperty(Set2.prototype, "size", {
            get: function () {
              return this._map.size
            },
            enumerable: true,
            configurable: true,
          })
          Set2.prototype.has = function (value) {
            return this._map.has(value)
          }
          Set2.prototype.add = function (value) {
            return this._map.set(value, value), this
          }
          Set2.prototype.delete = function (value) {
            return this._map.delete(value)
          }
          Set2.prototype.clear = function () {
            this._map.clear()
          }
          Set2.prototype.keys = function () {
            return this._map.keys()
          }
          Set2.prototype.values = function () {
            return this._map.values()
          }
          Set2.prototype.entries = function () {
            return this._map.entries()
          }
          Set2.prototype["@@iterator"] = function () {
            return this.keys()
          }
          Set2.prototype[iteratorSymbol] = function () {
            return this.keys()
          }
          return Set2
        })()
      )
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16
      var keys = HashMap.create()
      var rootKey = CreateUniqueKey()
      return (
        /** @class */
        (function () {
          function WeakMap2() {
            this._key = CreateUniqueKey()
          }
          WeakMap2.prototype.has = function (target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            )
            return table !== void 0 ? HashMap.has(table, this._key) : false
          }
          WeakMap2.prototype.get = function (target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            )
            return table !== void 0 ? HashMap.get(table, this._key) : void 0
          }
          WeakMap2.prototype.set = function (target, value) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              true
            )
            table[this._key] = value
            return this
          }
          WeakMap2.prototype.delete = function (target) {
            var table = GetOrCreateWeakMapTable(
              target,
              /*create*/
              false
            )
            return table !== void 0 ? delete table[this._key] : false
          }
          WeakMap2.prototype.clear = function () {
            this._key = CreateUniqueKey()
          }
          return WeakMap2
        })()
      )
      function CreateUniqueKey() {
        var key
        do key = "@@WeakMap@@" + CreateUUID()
        while (HashMap.has(keys, key))
        keys[key] = true
        return key
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create) return void 0
          Object.defineProperty(target, rootKey, { value: HashMap.create() })
        }
        return target[rootKey]
      }
      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i) buffer[i] = (Math.random() * 255) | 0
        return buffer
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined") return crypto.getRandomValues(new Uint8Array(size))
          if (typeof msCrypto !== "undefined") return msCrypto.getRandomValues(new Uint8Array(size))
          return FillRandomBytes(new Uint8Array(size), size)
        }
        return FillRandomBytes(new Array(size), size)
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE)
        data[6] = (data[6] & 79) | 64
        data[8] = (data[8] & 191) | 128
        var result = ""
        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset]
          if (offset === 4 || offset === 6 || offset === 8) result += "-"
          if (byte < 16) result += "0"
          result += byte.toString(16).toLowerCase()
        }
        return result
      }
    }
    function MakeDictionary(obj) {
      obj.__ = void 0
      delete obj.__
      return obj
    }
  })
})(Reflect$1 || (Reflect$1 = {}))
const VERSION$1 = "0.7.0"
const VERSION_URL = "https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/VERSION"
const SCRIPT_URL = "https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/main.js"
const PLUGIN_SYS_ABS_PATH = "/data/widgets/插件系统/plugin.js"
const config = () => ({ token: window.siyuan.config.api.token })
const TYPES = {
  StorageManager: "StorageManager",
  PluginSystem: "PluginSystem",
  SystemManager: "PluginSystemLocalManager",
  PluginLoader: "PluginLoader",
  PluginFileManager: "PluginFileManager",
  EventBus: "EventBus",
  Shortcut: "Shortcut",
  CommandManager: "CommandManager",
  Store: "Store",
  SettingManager: "SettingManager",
}
async function request$1(url2, data) {
  let resData = null
  await fetch(url2, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      Authorization: `Token ${config().token}`,
    },
  }).then(function (response) {
    resData = response.json()
  })
  return resData
}
async function parseBody(response) {
  let r = await response
  return r.code === 0 ? r.data : null
}
async function transactions(protyle, transactions2 = []) {
  const url2 = "/api/transactions"
  const ws_url = new URL(protyle.ws.ws.url)
  const data = {
    app: ws_url.searchParams.get("app"),
    session: ws_url.searchParams.get("id"),
    transactions: transactions2,
  }
  return parseBody(request$1(url2, data))
}
async function sql(sql2) {
  let sqldata = {
    stmt: sql2,
  }
  let url2 = "/api/query/sql"
  return parseBody(request$1(url2, sqldata))
}
async function lsNotebooks(sql2) {
  let sqldata = { stmt: sql2 }
  let url2 = "/api/notebook/lsNotebooks"
  return parseBody(request$1(url2, sqldata))
}
async function getAnchor(anchorText, name2) {
  anchorText = anchorText.replace("((", "").replace("))", "")
  let sqlScript = `select * from blocks where id = '${anchorText}'`
  let sqlRes = await sql(sqlScript)
  let anchor = ""
  if (sqlRes) {
    try {
      if (sqlRes[0][name2]) {
        anchor = sqlRes[0][name2]
      } else if (sqlRes[0]["content"]) {
        anchor = sqlRes[0]["content"]
      } else {
        anchor = anchorText
      }
    } catch (e) {
      anchor = "解析错误"
    }
  }
  return anchor
}
async function openNotebook(notebookId) {
  let data = {
    notebook: notebookId,
  }
  let url2 = "/api/notebook/openNotebook"
  return parseBody(request$1(url2, data))
}
async function closeNotebook(notebookId) {
  let data = {
    notebook: notebookId,
  }
  let url2 = "/api/notebook/closeNotebook"
  return parseBody(request$1(url2, data))
}
async function renameNotebook(notebookId, notebookNewName) {
  let data = {
    notebook: notebookId,
    name: notebookNewName,
  }
  let url2 = "/api/notebook/renameNotebook"
  return parseBody(request$1(url2, data))
}
async function createNotebook(notebookName) {
  let data = {
    name: notebookName,
  }
  let url2 = "/api/notebook/createNotebook"
  return parseBody(request$1(url2, data))
}
async function removeNotebook(notebookId) {
  let data = { notebook: notebookId }
  let url2 = "/api/notebook/removeNotebook"
  return parseBody(request$1(url2, data))
}
async function getNotebookConf(notebookId) {
  let data = { notebook: notebookId }
  let url2 = "/api/notebook/getNotebookConf"
  return parseBody(request$1(url2, data))
}
async function setNotebookConf(notebookId) {
  let data = { notebook: notebookId }
  let url2 = "/api/notebook/setNotebookConf"
  return parseBody(request$1(url2, data))
}
async function renameDoc(notebookId, path, title) {
  let data = {
    notebook: notebookId,
    path,
    title,
  }
  let url2 = "/api/filetree/renameDoc"
  return parseBody(request$1(url2, data))
}
async function removeDoc(notebookId, path) {
  let data = {
    notebook: notebookId,
    path,
  }
  let url2 = "/api/filetree/removeDoc"
  return parseBody(request$1(url2, data))
}
async function moveDoc(srcNotebookId, srcPath, targetNotebookId, targetPath) {
  let data = {
    fromNotebook: srcNotebookId,
    fromPath: srcPath,
    toNotebook: targetNotebookId,
    toPath: targetPath,
  }
  let url2 = "/api/filetree/moveDoc"
  return parseBody(request$1(url2, data))
}
async function getHPathByPath(notebookId, path) {
  let data = {
    Notebook: notebookId,
    Path: path,
  }
  let url2 = "/api/filetree/getHPathByPath"
  return parseBody(request$1(url2, data))
}
async function getHPathByID(ID) {
  let data = {
    id: ID,
  }
  let url2 = "/api/filetree/getHPathByID"
  return parseBody(request$1(url2, data))
}
async function getBlockAttrs(blockId) {
  let data = {
    id: blockId,
  }
  let url2 = "/api/attr/getBlockAttrs"
  return parseBody(request$1(url2, data))
}
async function getBlockByID(blockId) {
  let sqlScript = `select * from blocks where id ='${blockId}'`
  let data = await sql(sqlScript)
  return data[0]
}
async function getBlockKramdown(blockId) {
  const data = {
    id: blockId,
  }
  const url2 = "/api/block/getBlockKramdown"
  return parseBody(request$1(url2, data))
}
async function getBlockBreadcrumb(ID) {
  const data = {
    id: ID,
  }
  const url2 = "/api/block/getBlockBreadcrumb"
  return parseBody(request$1(url2, data))
}
async function setBlockAttrs(blockId, attrs) {
  let url2 = "/api/attr/setBlockAttrs"
  return parseBody(
    request$1(url2, {
      id: blockId,
      attrs,
    })
  )
}
async function exportMdContent(docId) {
  let data = {
    id: docId,
  }
  let url2 = "/api/export/exportMdContent"
  return parseBody(request$1(url2, data))
}
async function getDocOutline(docId) {
  let data = {
    id: docId,
  }
  let url2 = "/api/outline/getDocOutline"
  return parseBody(request$1(url2, data))
}
async function listDocsByPath(path) {
  let data = {
    path,
  }
  let url2 = "/api/filetree/listDocsByPath"
  return parseBody(request$1(url2, data))
}
async function getBacklink(id2) {
  let data = {
    id: id2,
    beforeLen: 10,
    k: "",
    mk: "",
  }
  let url2 = "/api/ref/getBacklink"
  return parseBody(request$1(url2, data))
}
async function searchEmbedBlock(excludeIds, sql2) {
  let data = {
    stmt: sql2,
    excludeIDs: excludeIds,
  }
  let url2 = "/api/search/searchEmbedBlock"
  return parseBody(request$1(url2, data))
}
async function getDoc(id2) {
  let data = {
    id: id2,
    k: "",
    mode: 2,
    size: 36,
  }
  let url2 = "/api/filetree/getDoc"
  return parseBody(request$1(url2, data))
}
async function getFocusedDoc(id2) {
  let data = {
    id: id2,
    k: "",
    mode: 0,
    size: 36,
  }
  let url2 = "/api/filetree/getDoc"
  return parseBody(request$1(url2, data))
}
async function getTag() {
  let data = {}
  let url2 = "/api/tag/getTag"
  return parseBody(request$1(url2, data))
}
async function getLocalGraph(k2, id2, conf, reqId) {
  let data = {
    id: id2,
    k: k2,
    conf,
    reqId,
  }
  let url2 = "/api/graph/getLocalGraph"
  return parseBody(request$1(url2, data))
}
async function getGraph(k2, conf, reqId) {
  let data = {
    k: k2,
    conf,
    reqId,
  }
  let url2 = "/api/graph/getGraph"
  return parseBody(request$1(url2, data))
}
async function searchDocs(k2) {
  let data = {
    k: k2,
  }
  let url2 = "/api/filetree/searchDocs"
  return parseBody(request$1(url2, data))
}
async function searchBlock(query) {
  let data = {
    query,
  }
  let url2 = "/api/search/searchBlock"
  return parseBody(request$1(url2, data))
}
async function searchTemplate(k2) {
  let data = {
    k: k2,
  }
  let url2 = "/api/search/searchTemplate"
  return parseBody(request$1(url2, data))
}
async function createDocWithMd(notebook, path, markdown) {
  let data = {
    notebook,
    path,
    markdown,
  }
  let url2 = "/api/filetree/createDocWithMd"
  return parseBody(request$1(url2, data))
}
async function docSaveAsTemplate(id2, overwrite = false) {
  let url2 = "/api/template/docSaveAsTemplate"
  let data = {
    id: id2,
    overwrite,
  }
  return parseBody(request$1(url2, data))
}
async function render(data) {
  let url2 = "/api/template/render"
  return parseBody(request$1(url2, data))
}
async function insertBlock(previousID, dataType, data) {
  let url2 = "/api/block/insertBlock"
  return parseBody(
    request$1(
      (url2 = url2),
      (data = {
        previousID,
        dataType,
        data,
      })
    )
  )
}
async function prependBlock(parentID, dataType, data) {
  let url2 = "/api/block/prependBlock"
  return parseBody(
    request$1(
      (url2 = url2),
      (data = {
        parentID,
        dataType,
        data,
      })
    )
  )
}
async function appendBlock(parentID, dataType, data) {
  let url2 = "/api/block/appendBlock"
  return parseBody(
    request$1(
      (url2 = url2),
      (data = {
        parentID,
        dataType,
        data,
      })
    )
  )
}
async function updateBlock(id2, dataType, data) {
  let url2 = "/api/block/updateBlock"
  return parseBody(
    request$1(
      (url2 = url2),
      (data = {
        id: id2,
        dataType,
        data,
      })
    )
  )
}
async function deleteBlock(id2) {
  let url2 = "/api/block/deleteBlock"
  return parseBody(request$1(url2, { id: id2 }))
}
async function moveBlock(id2, previousID, parentID) {
  let url2 = "/api/block/moveBlock"
  return parseBody(request$1(url2, { id: id2, previousID, parentID }))
}
async function getSysFonts() {
  let url2 = "/api/system/getSysFonts"
  return parseBody(request$1(url2, null))
}
async function getFile(path, type = "text") {
  const response = await fetch("/api/file/getFile", {
    method: "POST",
    headers: {
      Authorization: `Token ${config().token}`,
    },
    body: JSON.stringify({
      path,
    }),
  })
  if (response.status === 200) {
    if (type === "text") {
      return await response.text()
    }
    if (type === "json") {
      return (await response.json()).data
    }
  }
  return null
}
async function putFile(path, filedata, isDir = false, modTime = Date.now()) {
  let blob = new Blob([filedata])
  let file = new File([blob], path.split("/").pop())
  let formdata = new FormData()
  formdata.append("path", path)
  formdata.append("file", file)
  formdata.append("isDir", String(isDir))
  formdata.append("modTime", String(modTime))
  const response = await fetch("/api/file/putFile", {
    body: formdata,
    method: "POST",
    headers: {
      Authorization: `Token ${config().token}`,
    },
  })
  if (response.status === 200) return await response.json()
  else return null
}
async function readDir(path) {
  const response = await fetch("/api/file/readDir", {
    method: "POST",
    headers: {
      Authorization: `Token ${config().token}`,
    },
    body: JSON.stringify({
      path,
    }),
  })
  if (response.status === 200) {
    return (await response.json()).data
  }
  return null
}
async function removeFile(path) {
  const response = await fetch("/api/file/removeFile", {
    method: "POST",
    headers: {
      Authorization: `Token ${config().token}`,
    },
    body: JSON.stringify({
      path,
    }),
  })
  if (response.status === 200) return
  else return null
}
const language = (_a = window.theme) == null ? void 0 : _a.languageMode
async function pushMsg(message = null, text2 = null, timeout = 7e3) {
  const url2 = "/api/notification/pushMsg"
  const data = {
    msg: message ? message[language] || message.other : text2,
    timeout,
  }
  return parseBody(request$1(url2, data))
}
async function pushErrMsg(message = null, text2 = null, timeout = 7e3) {
  const url2 = "/api/notification/pushErrMsg"
  const data = {
    msg: message ? message[language] || message.other : text2,
    timeout,
  }
  return parseBody(request$1(url2, data))
}
async function setStorageVal(key, val) {
  const url2 = "/api/storage/setLocalStorageVal"
  const data = {
    app: genUUID(),
    key,
    val,
  }
  return parseBody(request$1(url2, data))
}
async function getLocalStorage() {
  const url2 = "/api/storage/getLocalStorage"
  return parseBody(request$1(url2, null))
}
async function renderSprig(sprig) {
  let url2 = "/api/template/renderSprig"
  return parseBody(request$1(url2, { template: sprig }))
}
async function getBazzarWidget() {
  const url2 = "/api/bazaar/getBazaarWidget"
  return parseBody(request$1(url2, null))
}
const serverApi = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      appendBlock,
      closeNotebook,
      createDocWithMd,
      createNotebook,
      deleteBlock,
      docSaveAsTemplate,
      exportMdContent,
      getAnchor,
      getBacklink,
      getBazzarWidget,
      getBlockAttrs,
      getBlockBreadcrumb,
      getBlockByID,
      getBlockKramdown,
      getDoc,
      getDocOutline,
      getFile,
      getFocusedDoc,
      getGraph,
      getHPathByID,
      getHPathByPath,
      getLocalGraph,
      getLocalStorage,
      getNotebookConf,
      getSysFonts,
      getTag,
      insertBlock,
      listDocsByPath,
      lsNotebooks,
      moveBlock,
      moveDoc,
      openNotebook,
      parseBody,
      prependBlock,
      pushErrMsg,
      pushMsg,
      putFile,
      readDir,
      removeDoc,
      removeFile,
      removeNotebook,
      renameDoc,
      renameNotebook,
      render,
      renderSprig,
      request: request$1,
      searchBlock,
      searchDocs,
      searchEmbedBlock,
      searchTemplate,
      setBlockAttrs,
      setNotebookConf,
      setStorageVal,
      sql,
      transactions,
      updateBlock,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
)
class Notification {
  constructor(option) {
    this.option = option
  }
  show() {
    if (this.option.type === "error") {
      pushErrMsg(null, this.option.message, this.option.timeout)
    } else {
      pushMsg(null, this.option.message, this.option.timeout)
    }
  }
}
var z = Object.defineProperty
var D = (i, e, t2) =>
  e in i ? z(i, e, { enumerable: true, configurable: true, writable: true, value: t2 }) : (i[e] = t2)
var _$1 = (i, e, t2) => (D(i, typeof e != "symbol" ? e + "" : e, t2), t2)
var P =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  b = {},
  W = {
    get exports() {
      return b
    },
    set exports(i) {
      b = i
    },
  }
;(function (i) {
  ;(function (e, t2) {
    i.exports ? (i.exports = t2()) : (e.log = t2())
  })(P, function () {
    var e = function () {},
      t2 = "undefined",
      l = typeof window !== t2 && typeof window.navigator !== t2 && /Trident\/|MSIE /.test(window.navigator.userAgent),
      p = ["trace", "debug", "info", "warn", "error"]
    function c(a2, s) {
      var f = a2[s]
      if (typeof f.bind == "function") return f.bind(a2)
      try {
        return Function.prototype.bind.call(f, a2)
      } catch {
        return function () {
          return Function.prototype.apply.apply(f, [a2, arguments])
        }
      }
    }
    function g() {
      console.log &&
        (console.log.apply
          ? console.log.apply(console, arguments)
          : Function.prototype.apply.apply(console.log, [console, arguments])),
        console.trace && console.trace()
    }
    function w(a2) {
      return (
        a2 === "debug" && (a2 = "log"),
        typeof console === t2
          ? false
          : a2 === "trace" && l
          ? g
          : console[a2] !== void 0
          ? c(console, a2)
          : console.log !== void 0
          ? c(console, "log")
          : e
      )
    }
    function E(a2, s) {
      for (var f = 0; f < p.length; f++) {
        var o = p[f]
        this[o] = f < a2 ? e : this.methodFactory(o, a2, s)
      }
      this.log = this.debug
    }
    function F(a2, s, f) {
      return function () {
        typeof console !== t2 && (E.call(this, s, f), this[a2].apply(this, arguments))
      }
    }
    function r(a2, s, f) {
      return w(a2) || F.apply(this, arguments)
    }
    function v(a2, s, f) {
      var o = this,
        O
      s = s ?? "WARN"
      var u = "loglevel"
      typeof a2 == "string" ? (u += ":" + a2) : typeof a2 == "symbol" && (u = void 0)
      function C(n) {
        var d = (p[n] || "silent").toUpperCase()
        if (!(typeof window === t2 || !u)) {
          try {
            window.localStorage[u] = d
            return
          } catch {}
          try {
            window.document.cookie = encodeURIComponent(u) + "=" + d + ";"
          } catch {}
        }
      }
      function k2() {
        var n
        if (!(typeof window === t2 || !u)) {
          try {
            n = window.localStorage[u]
          } catch {}
          if (typeof n === t2)
            try {
              var d = window.document.cookie,
                m = d.indexOf(encodeURIComponent(u) + "=")
              m !== -1 && (n = /^([^;]+)/.exec(d.slice(m))[1])
            } catch {}
          return o.levels[n] === void 0 && (n = void 0), n
        }
      }
      function V() {
        if (!(typeof window === t2 || !u)) {
          try {
            window.localStorage.removeItem(u)
            return
          } catch {}
          try {
            window.document.cookie = encodeURIComponent(u) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
          } catch {}
        }
      }
      ;(o.name = a2),
        (o.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5,
        }),
        (o.methodFactory = f || r),
        (o.getLevel = function () {
          return O
        }),
        (o.setLevel = function (n, d) {
          if (
            (typeof n == "string" && o.levels[n.toUpperCase()] !== void 0 && (n = o.levels[n.toUpperCase()]),
            typeof n == "number" && n >= 0 && n <= o.levels.SILENT)
          ) {
            if (((O = n), d !== false && C(n), E.call(o, n, a2), typeof console === t2 && n < o.levels.SILENT))
              return "No console available for logging"
          } else throw "log.setLevel() called with invalid level: " + n
        }),
        (o.setDefaultLevel = function (n) {
          ;(s = n), k2() || o.setLevel(n, false)
        }),
        (o.resetLevel = function () {
          o.setLevel(s, false), V()
        }),
        (o.enableAll = function (n) {
          o.setLevel(o.levels.TRACE, n)
        }),
        (o.disableAll = function (n) {
          o.setLevel(o.levels.SILENT, n)
        })
      var y = k2()
      y == null && (y = s), o.setLevel(y, false)
    }
    var L = new v(),
      h = {}
    L.getLogger = function (s) {
      if ((typeof s != "symbol" && typeof s != "string") || s === "")
        throw new TypeError("You must supply a name when creating a logger.")
      var f = h[s]
      return f || (f = h[s] = new v(s, L.getLevel(), L.methodFactory)), f
    }
    var G = typeof window !== t2 ? window.log : void 0
    return (
      (L.noConflict = function () {
        return typeof window !== t2 && window.log === L && (window.log = G), L
      }),
      (L.getLoggers = function () {
        return h
      }),
      (L.default = L),
      L
    )
  })
})(W)
var R = {},
  B = {
    get exports() {
      return R
    },
    set exports(i) {
      R = i
    },
  }
;(function (i) {
  ;(function (e, t2) {
    i.exports ? (i.exports = t2()) : (e.prefix = t2(e))
  })(P, function (e) {
    var t2 = function (r) {
        for (var v = 1, L = arguments.length, h; v < L; v++)
          for (h in arguments[v]) Object.prototype.hasOwnProperty.call(arguments[v], h) && (r[h] = arguments[v][h])
        return r
      },
      l = {
        template: "[%t] %l:",
        levelFormatter: function (r) {
          return r.toUpperCase()
        },
        nameFormatter: function (r) {
          return r || "root"
        },
        timestampFormatter: function (r) {
          return r.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
        },
        format: void 0,
      },
      p,
      c = {},
      g = function (r) {
        if (!r || !r.getLogger) throw new TypeError("Argument is not a root logger")
        p = r
      },
      w = function (r, v) {
        if (!r || !r.setLevel) throw new TypeError("Argument is not a logger")
        var L = r.methodFactory,
          h = r.name || "",
          G = c[h] || c[""] || l
        function a2(s, f, o) {
          var O = L(s, f, o),
            u = c[o] || c[""],
            C = u.template.indexOf("%t") !== -1,
            k2 = u.template.indexOf("%l") !== -1,
            V = u.template.indexOf("%n") !== -1
          return function () {
            for (var y = "", n = arguments.length, d = Array(n), m = 0; m < n; m++) d[m] = arguments[m]
            if (h || !c[o]) {
              var x = u.timestampFormatter(new Date()),
                U = u.levelFormatter(s),
                A = u.nameFormatter(o)
              u.format
                ? (y += u.format(U, A, x))
                : ((y += u.template),
                  C && (y = y.replace(/%t/, x)),
                  k2 && (y = y.replace(/%l/, U)),
                  V && (y = y.replace(/%n/, A))),
                d.length && typeof d[0] == "string" ? (d[0] = y + " " + d[0]) : d.unshift(y)
            }
            O.apply(void 0, d)
          }
        }
        return (
          c[h] || (r.methodFactory = a2),
          (v = v || {}),
          v.template && (v.format = void 0),
          (c[h] = t2({}, G, v)),
          r.setLevel(r.getLevel()),
          p ||
            r.warn(
              "It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"
            ),
          r
        )
      },
      E = {
        reg: g,
        apply: w,
      },
      F
    return (
      e &&
        ((F = e.prefix),
        (E.noConflict = function () {
          return e.prefix === E && (e.prefix = F), E
        })),
      E
    )
  })
})(B)
class T {}
_$1(T, "LOG_LEVEL_KEY", "VITE_LOG_LEVEL"), _$1(T, "LOG_PREFIX_KEY", "VITE_LOG_PREFIX")
var S = /* @__PURE__ */ ((i) => (
  (i.LOG_LEVEL_DEBUG = "DEBUG"),
  (i.LOG_LEVEL_INFO = "INFO"),
  (i.LOG_LEVEL_WARN = "WARN"),
  (i.LOG_LEVEL_ERROR = "ERROR"),
  i
))(S || {})
function K() {
  const i = Error.prepareStackTrace
  Error.prepareStackTrace = (t2, l) => l
  const e = new Error().stack.slice(1)
  return (Error.prepareStackTrace = i), e
}
class I {
  /**
   * 解析日志级别为枚举
   *
   * @param enumObj 枚举对象
   * @param value 配置的值
   */
  static stringToEnumValue(e, t2) {
    return e[Object.keys(e).filter((l) => e[l].toString() === t2)[0]]
  }
  /**
   * 获取配置的日志级别
   */
  static getEnvLevel(e) {
    if (!e) return
    const t2 = e.getEnvOrDefault(T.LOG_LEVEL_KEY, S.LOG_LEVEL_INFO),
      l = I.stringToEnumValue(S, t2.toUpperCase())
    return (
      l ||
        console.warn(
          "[zhi-log] LOG_LEVEL is invalid in you .env file.Must be either debug, info, warn or error, fallback to default info level"
        ),
      l
    )
  }
  /**
   * 获取默认日志
   */
  static getEnvLogger(e) {
    if (e) return e.getEnv(T.LOG_PREFIX_KEY)
  }
}
class Y {
  constructor(e, t2, l) {
    _$1(this, "consoleLogger", "console")
    _$1(this, "stackSize", 1)
    _$1(this, "getLogger", (e2) => {
      let t3
      if (e2) t3 = e2
      else {
        const l2 = this.getCallStack(),
          p2 = [],
          c2 = []
        for (let g = 0; g < l2.length; g++) {
          const w = l2[g],
            E = w.getFileName() ?? "none"
          if (g > this.stackSize - 1) break
          const F = E + "-" + w.getLineNumber() + ":" + w.getColumnNumber()
          p2.push(F)
        }
        c2.length > 0 && (t3 = p2.join(" -> "))
      }
      return (!t3 || t3.trim().length === 0) && (t3 = this.consoleLogger), b.getLogger(t3)
    })
    this.stackSize = 1
    let p
    e ? (p = e) : (p = I.getEnvLevel(l)), (p = p ?? S.LOG_LEVEL_INFO), b.setLevel(p)
    const c = {
      gray: (g) => g.toString(),
      green: (g) => g.toString(),
      yellow: (g) => g.toString(),
      red: (g) => g.toString(),
    }
    R.reg(b),
      R.apply(b, {
        format(g, w, E) {
          const r = ["[" + (t2 ?? I.getEnvLogger(l) ?? "zhi") + "]"]
          switch ((r.push(c.gray("[") + c.green(E).toString() + c.gray("]")), g)) {
            case S.LOG_LEVEL_DEBUG:
              r.push(c.gray(g.toUpperCase().toString()))
              break
            case S.LOG_LEVEL_INFO:
              r.push(c.green(g.toUpperCase().toString()))
              break
            case S.LOG_LEVEL_WARN:
              r.push(c.yellow(g.toUpperCase().toString()))
              break
            case S.LOG_LEVEL_ERROR:
              r.push(c.red(g.toUpperCase().toString()))
              break
          }
          return r.push(c.green(w).toString()), r.push(c.gray(":")), r.join(" ")
        },
      })
  }
  /**
   * 设置输出栈的深度，默认1
   *
   * @param stackSize - 栈的深度
   */
  setStackSize(e) {
    this.stackSize = e ?? 1
  }
  /**
   * 获取调用堆栈，若未获取到直接返回空数组
   *
   * @author terwer
   * @since 1.6.0
   */
  getCallStack() {
    let e
    try {
      e = K()
    } catch {
      e = []
    }
    return e
  }
}
class X {
  /**
   * 默认日志级别
   *
   * @param level - 可选，未设置默认INFO
   * @param sign - 可选前缀，默认zhi
   * @param env - 可选环境变量实例
   */
  constructor(e, t2, l) {
    _$1(this, "logger")
    this.logger = new Y(e, t2, l)
  }
  /**
   * 获取日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   * @protected
   */
  getLogger(e, t2) {
    return this.logger.setStackSize(t2), this.logger.getLogger(e)
  }
}
class N extends X {
  constructor(e, t2, l) {
    super(e, t2, l)
  }
  /**
   * 获取默认的日志记录器
   *
   * @param loggerName - 日志记录器名称
   * @param stackSize - 打印栈的深度
   */
  getLogger(e, t2) {
    return super.getLogger(e, t2)
  }
}
class M {
  /**
   * 默认日志记录器
   *
   * @param stackSize - 栈的深度
   * @param env - 环境变量实例
   */
  static defaultLogger(e, t2) {
    return M.customLogFactory(void 0, void 0, e).getLogger(void 0, t2)
  }
  /**
   * 自定义日志工厂
   */
  static customLogFactory(e, t2, l) {
    return new N(e, t2, l)
  }
  /**
   * 自定义日志工厂，自定义前缀
   */
  static customSignLogFactory(e, t2) {
    return new N(void 0, e, t2)
  }
}
function insertBefore(positionEl, el) {
  return positionEl.insertAdjacentElement("beforebegin", el)
}
function insertAfter(positionEl, el) {
  return positionEl.insertAdjacentElement("afterend", el)
}
function addToolbarLeft(el) {
  var _a2
  const title = (_a2 = document.getElementById("toolbar")) == null ? void 0 : _a2.getElementsByClassName("fn__ellipsis")
  if (!title) {
    return
  }
  insertBefore(title[0], el)
}
function addToolbarRight(el) {
  var _a2
  const title = (_a2 = document.getElementById("toolbar")) == null ? void 0 : _a2.getElementsByClassName("fn__ellipsis")
  if (!title) {
    return
  }
  insertAfter(title[0], el)
}
const createLogger = (name2) => getLogger(name2)
const clientApi = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      addToolbarLeft,
      addToolbarRight,
      createLogger,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
)
class Menu {
  constructor(id2) {
    var _a2, _b
    const menu = (_b = (_a2 = window.siyuan) == null ? void 0 : _a2.menus) == null ? void 0 : _b.menu
    if (!menu) {
      throw Error("Siyuan internal menu not found!")
    }
    this.menu = menu
    if (!id2) {
      throw Error("Menu must has an id, got empty or undefined!")
    }
    menu.remove()
    menu.element.setAttribute("data-name", id2)
  }
  addItem(item) {
    this.menu.append(item.element)
    return this
  }
  addSeparator() {
    this.addItem(new MenuItem({ type: "separator" }))
    return this
  }
  showAtMouseEvent(event) {
    this.menu.popup({ x: event.clientX, y: event.clientY })
    return this
  }
  showAtPosition(position) {
    this.menu.popup({ x: position.x, y: position.y })
    return this
  }
  close() {
    this.menu.remove()
  }
}
class MenuItem {
  constructor(options) {
    this.element = document.createElement("button")
    if (options.disabled) {
      this.element.setAttribute("disabled", "disabled")
    }
    if (options.type === "separator") {
      this.element.classList.add("b3-menu__separator")
      return
    }
    this.element.classList.add("b3-menu__item")
    if (options.current) {
      this.element.classList.add("b3-menu__item--selected")
    }
    if (options.click) {
      this.element.addEventListener("click", (event) => {
        if (this.element.getAttribute("disabled")) {
          return
        }
        options.click(this.element)
        event.preventDefault()
        event.stopImmediatePropagation()
        event.stopPropagation()
        window.siyuan.menus.menu.remove()
      })
    }
    let html = `<span class="b3-menu__label">${options.label}</span>`
    if (options.iconHTML) {
      html = options.iconHTML + html
    } else {
      html = `<svg class="b3-menu__icon${
        ["HTML (SiYuan)", window.siyuan.languages.template].includes(options.label) ? " ft__error" : ""
      }" style="${options.icon === "iconClose" ? "height:10px;" : ""}"><use xlink:href="#${
        options.icon || ""
      }"></use></svg>${html}`
    }
    if (options.action) {
      html += `<svg class="b3-menu__action"><use xlink:href="#${options.action}"></use></svg>`
    }
    if (options.id) {
      this.element.setAttribute("data-id", options.id)
    }
    if (options.type === "readonly") {
      this.element.classList.add("b3-menu__item--readonly")
    }
    this.element.innerHTML = html
    if (options.bind) {
      this.element.classList.add("b3-menu__item--custom")
      options.bind(this.element)
    }
    if (options.submenu) {
      const submenuElement = document.createElement("div")
      submenuElement.classList.add("b3-menu__submenu")
      options.submenu.forEach((item) => {
        submenuElement.append(new MenuItem(item).element)
      })
      this.element.insertAdjacentHTML(
        "beforeend",
        '<svg class="b3-menu__icon b3-menu__icon--arrow"><use xlink:href="#iconRight"></use></svg>'
      )
      this.element.append(submenuElement)
    }
  }
}
class MenuSeparator {}
class Dialog {
  constructor(options) {
    this.disableClose = options.disableClose
    this.id = genUUID()
    window.siyuan.dialogs.push(this)
    this.destroyCallback = options.destroyCallback
    this.element = document.createElement("div")
    this.element.innerHTML = `<div class="b3-dialog">
<div class="b3-dialog__scrim"${options.transparent ? 'style="background-color:transparent"' : ""}></div>
<div class="b3-dialog__container" style="width:${options.width || "auto"}">
  <svg class="b3-dialog__close fn__a${this.disableClose ? " fn__none" : ""}"><use xlink:href="#iconClose"></use></svg>
  <div class="b3-dialog__header${options.title ? "" : " fn__none"}" onselectstart="return false;">${
      options.title || ""
    }</div>
  <div style="height:${options.height || "auto"}">${options.content}</div>
</div></div>`
    this.element.querySelector(".b3-dialog__scrim").addEventListener("click", (event) => {
      if (!this.disableClose) {
        this.destroy()
      }
      event.preventDefault()
      event.stopPropagation()
      window.siyuan.menus.menu.remove()
    })
    if (!this.disableClose) {
      this.element.querySelector(".b3-dialog__close").addEventListener("click", (event) => {
        this.destroy()
        event.preventDefault()
        event.stopPropagation()
      })
    }
    document.body.append(this.element)
    if (options.disableAnimation) {
      this.element.classList.add("b3-dialog--open")
    } else {
      setTimeout(() => {
        this.element.classList.add("b3-dialog--open")
      })
    }
    window.siyuan.menus.menu.remove()
  }
  static destroyAll() {
    window.siyuan.dialogs.forEach((p) => p.destroy())
  }
  destroy() {
    this.element.remove()
    window.siyuan.menus.menu.remove()
    if (this.destroyCallback) {
      this.destroyCallback()
    }
    window.siyuan.dialogs.find((item, index) => {
      if (item.id === this.id) {
        window.siyuan.dialogs.splice(index, 1)
        return true
      }
    })
  }
  bindInput(inputElement, enterEvent) {
    inputElement.focus()
    inputElement.addEventListener("keydown", (event) => {
      if (event.isComposing) {
        event.preventDefault()
        return
      }
      if (event.key === "Escape") {
        this.destroy()
        event.preventDefault()
        event.stopPropagation()
        return
      }
      if (event.key === "Enter" && enterEvent) {
        enterEvent()
        event.preventDefault()
      }
    })
  }
}
class Plugin {
  onload() {}
  onunload() {}
  registerCommand(command) {}
  registerSettingRender(settingRender) {}
  async loadStorage(filename) {
    return null
  }
  async writeStorage(filename, content) {}
}
const api = {
  clientApi,
  serverApi,
  Plugin,
  Menu,
  MenuItem,
  MenuSeparator,
  Notification,
  Dialog,
}
var reExports = {}
var re$3 = {
  get exports() {
    return reExports
  },
  set exports(v) {
    reExports = v
  },
}
const SEMVER_SPEC_VERSION = "2.0.0"
const MAX_LENGTH$2 = 256
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER /* istanbul ignore next */ || 9007199254740991
const MAX_SAFE_COMPONENT_LENGTH = 16
var constants$1 = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$2,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH,
}
const debug$1 =
  typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
    ? (...args) => console.error("SEMVER", ...args)
    : () => {}
var debug_1 = debug$1
;(function (module2, exports2) {
  const { MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2 } = constants$1
  const debug2 = debug_1
  exports2 = module2.exports = {}
  const re2 = (exports2.re = [])
  const src = (exports2.src = [])
  const t2 = (exports2.t = {})
  let R2 = 0
  const createToken = (name2, value, isGlobal) => {
    const index = R2++
    debug2(name2, index, value)
    t2[name2] = index
    src[index] = value
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0)
  }
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*")
  createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+")
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*")
  createToken(
    "MAINVERSION",
    `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`
  )
  createToken(
    "MAINVERSIONLOOSE",
    `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`
  )
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`)
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`)
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`)
  createToken(
    "PRERELEASELOOSE",
    `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`
  )
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+")
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`)
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`)
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`)
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`)
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`)
  createToken("GTLT", "((?:<|>)?=?)")
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`)
  createToken(
    "XRANGEPLAIN",
    `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${
      src[t2.PRERELEASE]
    })?${src[t2.BUILD]}?)?)?`
  )
  createToken(
    "XRANGEPLAINLOOSE",
    `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${
      src[t2.XRANGEIDENTIFIERLOOSE]
    })(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`
  )
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`)
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`)
  createToken(
    "COERCE",
    `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:$|[^\\d])`
  )
  createToken("COERCERTL", src[t2.COERCE], true)
  createToken("LONETILDE", "(?:~>?)")
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true)
  exports2.tildeTrimReplace = "$1~"
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`)
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`)
  createToken("LONECARET", "(?:\\^)")
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true)
  exports2.caretTrimReplace = "$1^"
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`)
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`)
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`)
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`)
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true)
  exports2.comparatorTrimReplace = "$1$2$3"
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`)
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`)
  createToken("STAR", "(<|>)?=?\\s*\\*")
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$")
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$")
})(re$3, reExports)
const opts = ["includePrerelease", "loose", "rtl"]
const parseOptions$2 = (options) =>
  !options
    ? {}
    : typeof options !== "object"
    ? { loose: true }
    : opts
        .filter((k2) => options[k2])
        .reduce((o, k2) => {
          o[k2] = true
          return o
        }, {})
var parseOptions_1 = parseOptions$2
const numeric = /^[0-9]+$/
const compareIdentifiers$1 = (a2, b2) => {
  const anum = numeric.test(a2)
  const bnum = numeric.test(b2)
  if (anum && bnum) {
    a2 = +a2
    b2 = +b2
  }
  return a2 === b2 ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b2 ? -1 : 1
}
const rcompareIdentifiers = (a2, b2) => compareIdentifiers$1(b2, a2)
var identifiers$1 = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers,
}
const debug = debug_1
const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants$1
const { re: re$2, t: t$2 } = reExports
const parseOptions$1 = parseOptions_1
const { compareIdentifiers } = identifiers$1
let SemVer$d = class SemVer2 {
  constructor(version2, options) {
    options = parseOptions$1(options)
    if (version2 instanceof SemVer2) {
      if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
        return version2
      } else {
        version2 = version2.version
      }
    } else if (typeof version2 !== "string") {
      throw new TypeError(`Invalid Version: ${version2}`)
    }
    if (version2.length > MAX_LENGTH$1) {
      throw new TypeError(`version is longer than ${MAX_LENGTH$1} characters`)
    }
    debug("SemVer", version2, options)
    this.options = options
    this.loose = !!options.loose
    this.includePrerelease = !!options.includePrerelease
    const m = version2.trim().match(options.loose ? re$2[t$2.LOOSE] : re$2[t$2.FULL])
    if (!m) {
      throw new TypeError(`Invalid Version: ${version2}`)
    }
    this.raw = version2
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version")
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version")
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version")
    }
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split(".").map((id2) => {
        if (/^[0-9]+$/.test(id2)) {
          const num = +id2
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id2
      })
    }
    this.build = m[5] ? m[5].split(".") : []
    this.format()
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`
    }
    return this.version
  }
  toString() {
    return this.version
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other)
    if (!(other instanceof SemVer2)) {
      if (typeof other === "string" && other === this.version) {
        return 0
      }
      other = new SemVer2(other, this.options)
    }
    if (other.version === this.version) {
      return 0
    }
    return this.compareMain(other) || this.comparePre(other)
  }
  compareMain(other) {
    if (!(other instanceof SemVer2)) {
      other = new SemVer2(other, this.options)
    }
    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }
  comparePre(other) {
    if (!(other instanceof SemVer2)) {
      other = new SemVer2(other, this.options)
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }
    let i = 0
    do {
      const a2 = this.prerelease[i]
      const b2 = other.prerelease[i]
      debug("prerelease compare", i, a2, b2)
      if (a2 === void 0 && b2 === void 0) {
        return 0
      } else if (b2 === void 0) {
        return 1
      } else if (a2 === void 0) {
        return -1
      } else if (a2 === b2) {
        continue
      } else {
        return compareIdentifiers(a2, b2)
      }
    } while (++i)
  }
  compareBuild(other) {
    if (!(other instanceof SemVer2)) {
      other = new SemVer2(other, this.options)
    }
    let i = 0
    do {
      const a2 = this.build[i]
      const b2 = other.build[i]
      debug("prerelease compare", i, a2, b2)
      if (a2 === void 0 && b2 === void 0) {
        return 0
      } else if (b2 === void 0) {
        return 1
      } else if (a2 === void 0) {
        return -1
      } else if (a2 === b2) {
        continue
      } else {
        return compareIdentifiers(a2, b2)
      }
    } while (++i)
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc("pre", identifier)
        break
      case "preminor":
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc("pre", identifier)
        break
      case "prepatch":
        this.prerelease.length = 0
        this.inc("patch", identifier)
        this.inc("pre", identifier)
        break
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier)
        }
        this.inc("pre", identifier)
        break
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            this.prerelease.push(0)
          }
        }
        if (identifier) {
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0]
            }
          } else {
            this.prerelease = [identifier, 0]
          }
        }
        break
      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.format()
    this.raw = this.version
    return this
  }
}
var semver$1 = SemVer$d
const { MAX_LENGTH } = constants$1
const { re: re$1, t: t$1 } = reExports
const SemVer$c = semver$1
const parseOptions = parseOptions_1
const parse$6 = (version2, options) => {
  options = parseOptions(options)
  if (version2 instanceof SemVer$c) {
    return version2
  }
  if (typeof version2 !== "string") {
    return null
  }
  if (version2.length > MAX_LENGTH) {
    return null
  }
  const r = options.loose ? re$1[t$1.LOOSE] : re$1[t$1.FULL]
  if (!r.test(version2)) {
    return null
  }
  try {
    return new SemVer$c(version2, options)
  } catch (er) {
    return null
  }
}
var parse_1 = parse$6
const parse$5 = parse_1
const valid$2 = (version2, options) => {
  const v = parse$5(version2, options)
  return v ? v.version : null
}
var valid_1 = valid$2
const parse$4 = parse_1
const clean$1 = (version2, options) => {
  const s = parse$4(version2.trim().replace(/^[=v]+/, ""), options)
  return s ? s.version : null
}
var clean_1 = clean$1
const SemVer$b = semver$1
const inc$1 = (version2, release, options, identifier) => {
  if (typeof options === "string") {
    identifier = options
    options = void 0
  }
  try {
    return new SemVer$b(version2 instanceof SemVer$b ? version2.version : version2, options).inc(release, identifier)
      .version
  } catch (er) {
    return null
  }
}
var inc_1 = inc$1
const SemVer$a = semver$1
const compare$b = (a2, b2, loose) => new SemVer$a(a2, loose).compare(new SemVer$a(b2, loose))
var compare_1 = compare$b
const compare$a = compare_1
const eq$3 = (a2, b2, loose) => compare$a(a2, b2, loose) === 0
var eq_1 = eq$3
const parse$3 = parse_1
const eq$2 = eq_1
const diff$1 = (version1, version2) => {
  if (eq$2(version1, version2)) {
    return null
  } else {
    const v1 = parse$3(version1)
    const v2 = parse$3(version2)
    const hasPre = v1.prerelease.length || v2.prerelease.length
    const prefix = hasPre ? "pre" : ""
    const defaultResult = hasPre ? "prerelease" : ""
    for (const key in v1) {
      if (key === "major" || key === "minor" || key === "patch") {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult
  }
}
var diff_1 = diff$1
const SemVer$9 = semver$1
const major$1 = (a2, loose) => new SemVer$9(a2, loose).major
var major_1 = major$1
const SemVer$8 = semver$1
const minor$1 = (a2, loose) => new SemVer$8(a2, loose).minor
var minor_1 = minor$1
const SemVer$7 = semver$1
const patch$1 = (a2, loose) => new SemVer$7(a2, loose).patch
var patch_1 = patch$1
const parse$2 = parse_1
const prerelease$1 = (version2, options) => {
  const parsed = parse$2(version2, options)
  return parsed && parsed.prerelease.length ? parsed.prerelease : null
}
var prerelease_1 = prerelease$1
const compare$9 = compare_1
const rcompare$1 = (a2, b2, loose) => compare$9(b2, a2, loose)
var rcompare_1 = rcompare$1
const compare$8 = compare_1
const compareLoose$1 = (a2, b2) => compare$8(a2, b2, true)
var compareLoose_1 = compareLoose$1
const SemVer$6 = semver$1
const compareBuild$3 = (a2, b2, loose) => {
  const versionA = new SemVer$6(a2, loose)
  const versionB = new SemVer$6(b2, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}
var compareBuild_1 = compareBuild$3
const compareBuild$2 = compareBuild_1
const sort$1 = (list, loose) => list.sort((a2, b2) => compareBuild$2(a2, b2, loose))
var sort_1 = sort$1
const compareBuild$1 = compareBuild_1
const rsort$1 = (list, loose) => list.sort((a2, b2) => compareBuild$1(b2, a2, loose))
var rsort_1 = rsort$1
const compare$7 = compare_1
const gt$4 = (a2, b2, loose) => compare$7(a2, b2, loose) > 0
var gt_1 = gt$4
const compare$6 = compare_1
const lt$3 = (a2, b2, loose) => compare$6(a2, b2, loose) < 0
var lt_1 = lt$3
const compare$5 = compare_1
const neq$2 = (a2, b2, loose) => compare$5(a2, b2, loose) !== 0
var neq_1 = neq$2
const compare$4 = compare_1
const gte$3 = (a2, b2, loose) => compare$4(a2, b2, loose) >= 0
var gte_1 = gte$3
const compare$3 = compare_1
const lte$3 = (a2, b2, loose) => compare$3(a2, b2, loose) <= 0
var lte_1 = lte$3
const eq$1 = eq_1
const neq$1 = neq_1
const gt$3 = gt_1
const gte$2 = gte_1
const lt$2 = lt_1
const lte$2 = lte_1
const cmp$1 = (a2, op, b2, loose) => {
  switch (op) {
    case "===":
      if (typeof a2 === "object") {
        a2 = a2.version
      }
      if (typeof b2 === "object") {
        b2 = b2.version
      }
      return a2 === b2
    case "!==":
      if (typeof a2 === "object") {
        a2 = a2.version
      }
      if (typeof b2 === "object") {
        b2 = b2.version
      }
      return a2 !== b2
    case "":
    case "=":
    case "==":
      return eq$1(a2, b2, loose)
    case "!=":
      return neq$1(a2, b2, loose)
    case ">":
      return gt$3(a2, b2, loose)
    case ">=":
      return gte$2(a2, b2, loose)
    case "<":
      return lt$2(a2, b2, loose)
    case "<=":
      return lte$2(a2, b2, loose)
    default:
      throw new TypeError(`Invalid operator: ${op}`)
  }
}
var cmp_1 = cmp$1
const SemVer$5 = semver$1
const parse$1 = parse_1
const { re, t } = reExports
const coerce$1 = (version2, options) => {
  if (version2 instanceof SemVer$5) {
    return version2
  }
  if (typeof version2 === "number") {
    version2 = String(version2)
  }
  if (typeof version2 !== "string") {
    return null
  }
  options = options || {}
  let match = null
  if (!options.rtl) {
    match = version2.match(re[t.COERCE])
  } else {
    let next
    while ((next = re[t.COERCERTL].exec(version2)) && (!match || match.index + match[0].length !== version2.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    re[t.COERCERTL].lastIndex = -1
  }
  if (match === null) {
    return null
  }
  return parse$1(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options)
}
var coerce_1 = coerce$1
var iterator
var hasRequiredIterator
function requireIterator() {
  if (hasRequiredIterator) return iterator
  hasRequiredIterator = 1
  iterator = function (Yallist) {
    Yallist.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next) {
        yield walker.value
      }
    }
  }
  return iterator
}
var yallist
var hasRequiredYallist
function requireYallist() {
  if (hasRequiredYallist) return yallist
  hasRequiredYallist = 1
  yallist = Yallist
  Yallist.Node = Node
  Yallist.create = Yallist
  function Yallist(list) {
    var self2 = this
    if (!(self2 instanceof Yallist)) {
      self2 = new Yallist()
    }
    self2.tail = null
    self2.head = null
    self2.length = 0
    if (list && typeof list.forEach === "function") {
      list.forEach(function (item) {
        self2.push(item)
      })
    } else if (arguments.length > 0) {
      for (var i = 0, l = arguments.length; i < l; i++) {
        self2.push(arguments[i])
      }
    }
    return self2
  }
  Yallist.prototype.removeNode = function (node) {
    if (node.list !== this) {
      throw new Error("removing node which does not belong to this list")
    }
    var next = node.next
    var prev = node.prev
    if (next) {
      next.prev = prev
    }
    if (prev) {
      prev.next = next
    }
    if (node === this.head) {
      this.head = next
    }
    if (node === this.tail) {
      this.tail = prev
    }
    node.list.length--
    node.next = null
    node.prev = null
    node.list = null
    return next
  }
  Yallist.prototype.unshiftNode = function (node) {
    if (node === this.head) {
      return
    }
    if (node.list) {
      node.list.removeNode(node)
    }
    var head = this.head
    node.list = this
    node.next = head
    if (head) {
      head.prev = node
    }
    this.head = node
    if (!this.tail) {
      this.tail = node
    }
    this.length++
  }
  Yallist.prototype.pushNode = function (node) {
    if (node === this.tail) {
      return
    }
    if (node.list) {
      node.list.removeNode(node)
    }
    var tail = this.tail
    node.list = this
    node.prev = tail
    if (tail) {
      tail.next = node
    }
    this.tail = node
    if (!this.head) {
      this.head = node
    }
    this.length++
  }
  Yallist.prototype.push = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      push(this, arguments[i])
    }
    return this.length
  }
  Yallist.prototype.unshift = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      unshift(this, arguments[i])
    }
    return this.length
  }
  Yallist.prototype.pop = function () {
    if (!this.tail) {
      return void 0
    }
    var res = this.tail.value
    this.tail = this.tail.prev
    if (this.tail) {
      this.tail.next = null
    } else {
      this.head = null
    }
    this.length--
    return res
  }
  Yallist.prototype.shift = function () {
    if (!this.head) {
      return void 0
    }
    var res = this.head.value
    this.head = this.head.next
    if (this.head) {
      this.head.prev = null
    } else {
      this.tail = null
    }
    this.length--
    return res
  }
  Yallist.prototype.forEach = function (fn, thisp) {
    thisp = thisp || this
    for (var walker = this.head, i = 0; walker !== null; i++) {
      fn.call(thisp, walker.value, i, this)
      walker = walker.next
    }
  }
  Yallist.prototype.forEachReverse = function (fn, thisp) {
    thisp = thisp || this
    for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
      fn.call(thisp, walker.value, i, this)
      walker = walker.prev
    }
  }
  Yallist.prototype.get = function (n) {
    for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
      walker = walker.next
    }
    if (i === n && walker !== null) {
      return walker.value
    }
  }
  Yallist.prototype.getReverse = function (n) {
    for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
      walker = walker.prev
    }
    if (i === n && walker !== null) {
      return walker.value
    }
  }
  Yallist.prototype.map = function (fn, thisp) {
    thisp = thisp || this
    var res = new Yallist()
    for (var walker = this.head; walker !== null; ) {
      res.push(fn.call(thisp, walker.value, this))
      walker = walker.next
    }
    return res
  }
  Yallist.prototype.mapReverse = function (fn, thisp) {
    thisp = thisp || this
    var res = new Yallist()
    for (var walker = this.tail; walker !== null; ) {
      res.push(fn.call(thisp, walker.value, this))
      walker = walker.prev
    }
    return res
  }
  Yallist.prototype.reduce = function (fn, initial) {
    var acc
    var walker = this.head
    if (arguments.length > 1) {
      acc = initial
    } else if (this.head) {
      walker = this.head.next
      acc = this.head.value
    } else {
      throw new TypeError("Reduce of empty list with no initial value")
    }
    for (var i = 0; walker !== null; i++) {
      acc = fn(acc, walker.value, i)
      walker = walker.next
    }
    return acc
  }
  Yallist.prototype.reduceReverse = function (fn, initial) {
    var acc
    var walker = this.tail
    if (arguments.length > 1) {
      acc = initial
    } else if (this.tail) {
      walker = this.tail.prev
      acc = this.tail.value
    } else {
      throw new TypeError("Reduce of empty list with no initial value")
    }
    for (var i = this.length - 1; walker !== null; i--) {
      acc = fn(acc, walker.value, i)
      walker = walker.prev
    }
    return acc
  }
  Yallist.prototype.toArray = function () {
    var arr = new Array(this.length)
    for (var i = 0, walker = this.head; walker !== null; i++) {
      arr[i] = walker.value
      walker = walker.next
    }
    return arr
  }
  Yallist.prototype.toArrayReverse = function () {
    var arr = new Array(this.length)
    for (var i = 0, walker = this.tail; walker !== null; i++) {
      arr[i] = walker.value
      walker = walker.prev
    }
    return arr
  }
  Yallist.prototype.slice = function (from, to) {
    to = to || this.length
    if (to < 0) {
      to += this.length
    }
    from = from || 0
    if (from < 0) {
      from += this.length
    }
    var ret = new Yallist()
    if (to < from || to < 0) {
      return ret
    }
    if (from < 0) {
      from = 0
    }
    if (to > this.length) {
      to = this.length
    }
    for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
      walker = walker.next
    }
    for (; walker !== null && i < to; i++, walker = walker.next) {
      ret.push(walker.value)
    }
    return ret
  }
  Yallist.prototype.sliceReverse = function (from, to) {
    to = to || this.length
    if (to < 0) {
      to += this.length
    }
    from = from || 0
    if (from < 0) {
      from += this.length
    }
    var ret = new Yallist()
    if (to < from || to < 0) {
      return ret
    }
    if (from < 0) {
      from = 0
    }
    if (to > this.length) {
      to = this.length
    }
    for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
      walker = walker.prev
    }
    for (; walker !== null && i > from; i--, walker = walker.prev) {
      ret.push(walker.value)
    }
    return ret
  }
  Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
    if (start > this.length) {
      start = this.length - 1
    }
    if (start < 0) {
      start = this.length + start
    }
    for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
      walker = walker.next
    }
    var ret = []
    for (var i = 0; walker && i < deleteCount; i++) {
      ret.push(walker.value)
      walker = this.removeNode(walker)
    }
    if (walker === null) {
      walker = this.tail
    }
    if (walker !== this.head && walker !== this.tail) {
      walker = walker.prev
    }
    for (var i = 0; i < nodes.length; i++) {
      walker = insert2(this, walker, nodes[i])
    }
    return ret
  }
  Yallist.prototype.reverse = function () {
    var head = this.head
    var tail = this.tail
    for (var walker = head; walker !== null; walker = walker.prev) {
      var p = walker.prev
      walker.prev = walker.next
      walker.next = p
    }
    this.head = tail
    this.tail = head
    return this
  }
  function insert2(self2, node, value) {
    var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2)
    if (inserted.next === null) {
      self2.tail = inserted
    }
    if (inserted.prev === null) {
      self2.head = inserted
    }
    self2.length++
    return inserted
  }
  function push(self2, item) {
    self2.tail = new Node(item, self2.tail, null, self2)
    if (!self2.head) {
      self2.head = self2.tail
    }
    self2.length++
  }
  function unshift(self2, item) {
    self2.head = new Node(item, null, self2.head, self2)
    if (!self2.tail) {
      self2.tail = self2.head
    }
    self2.length++
  }
  function Node(value, prev, next, list) {
    if (!(this instanceof Node)) {
      return new Node(value, prev, next, list)
    }
    this.list = list
    this.value = value
    if (prev) {
      prev.next = this
      this.prev = prev
    } else {
      this.prev = null
    }
    if (next) {
      next.prev = this
      this.next = next
    } else {
      this.next = null
    }
  }
  try {
    requireIterator()(Yallist)
  } catch (er) {}
  return yallist
}
var lruCache
var hasRequiredLruCache
function requireLruCache() {
  if (hasRequiredLruCache) return lruCache
  hasRequiredLruCache = 1
  const Yallist = requireYallist()
  const MAX = Symbol("max")
  const LENGTH = Symbol("length")
  const LENGTH_CALCULATOR = Symbol("lengthCalculator")
  const ALLOW_STALE = Symbol("allowStale")
  const MAX_AGE = Symbol("maxAge")
  const DISPOSE = Symbol("dispose")
  const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet")
  const LRU_LIST = Symbol("lruList")
  const CACHE = Symbol("cache")
  const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet")
  const naiveLength = () => 1
  class LRUCache {
    constructor(options) {
      if (typeof options === "number") options = { max: options }
      if (!options) options = {}
      if (options.max && (typeof options.max !== "number" || options.max < 0))
        throw new TypeError("max must be a non-negative number")
      this[MAX] = options.max || Infinity
      const lc = options.length || naiveLength
      this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc
      this[ALLOW_STALE] = options.stale || false
      if (options.maxAge && typeof options.maxAge !== "number") throw new TypeError("maxAge must be a number")
      this[MAX_AGE] = options.maxAge || 0
      this[DISPOSE] = options.dispose
      this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
      this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
      this.reset()
    }
    // resize the cache when the max changes.
    set max(mL) {
      if (typeof mL !== "number" || mL < 0) throw new TypeError("max must be a non-negative number")
      this[MAX] = mL || Infinity
      trim2(this)
    }
    get max() {
      return this[MAX]
    }
    set allowStale(allowStale) {
      this[ALLOW_STALE] = !!allowStale
    }
    get allowStale() {
      return this[ALLOW_STALE]
    }
    set maxAge(mA) {
      if (typeof mA !== "number") throw new TypeError("maxAge must be a non-negative number")
      this[MAX_AGE] = mA
      trim2(this)
    }
    get maxAge() {
      return this[MAX_AGE]
    }
    // resize the cache when the lengthCalculator changes.
    set lengthCalculator(lC) {
      if (typeof lC !== "function") lC = naiveLength
      if (lC !== this[LENGTH_CALCULATOR]) {
        this[LENGTH_CALCULATOR] = lC
        this[LENGTH] = 0
        this[LRU_LIST].forEach((hit) => {
          hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
          this[LENGTH] += hit.length
        })
      }
      trim2(this)
    }
    get lengthCalculator() {
      return this[LENGTH_CALCULATOR]
    }
    get length() {
      return this[LENGTH]
    }
    get itemCount() {
      return this[LRU_LIST].length
    }
    rforEach(fn, thisp) {
      thisp = thisp || this
      for (let walker = this[LRU_LIST].tail; walker !== null; ) {
        const prev = walker.prev
        forEachStep(this, fn, walker, thisp)
        walker = prev
      }
    }
    forEach(fn, thisp) {
      thisp = thisp || this
      for (let walker = this[LRU_LIST].head; walker !== null; ) {
        const next = walker.next
        forEachStep(this, fn, walker, thisp)
        walker = next
      }
    }
    keys() {
      return this[LRU_LIST].toArray().map((k2) => k2.key)
    }
    values() {
      return this[LRU_LIST].toArray().map((k2) => k2.value)
    }
    reset() {
      if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
        this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value))
      }
      this[CACHE] = /* @__PURE__ */ new Map()
      this[LRU_LIST] = new Yallist()
      this[LENGTH] = 0
    }
    dump() {
      return this[LRU_LIST].map((hit) =>
        isStale(this, hit)
          ? false
          : {
              k: hit.key,
              v: hit.value,
              e: hit.now + (hit.maxAge || 0),
            }
      )
        .toArray()
        .filter((h) => h)
    }
    dumpLru() {
      return this[LRU_LIST]
    }
    set(key, value, maxAge) {
      maxAge = maxAge || this[MAX_AGE]
      if (maxAge && typeof maxAge !== "number") throw new TypeError("maxAge must be a number")
      const now = maxAge ? Date.now() : 0
      const len = this[LENGTH_CALCULATOR](value, key)
      if (this[CACHE].has(key)) {
        if (len > this[MAX]) {
          del(this, this[CACHE].get(key))
          return false
        }
        const node = this[CACHE].get(key)
        const item = node.value
        if (this[DISPOSE]) {
          if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value)
        }
        item.now = now
        item.maxAge = maxAge
        item.value = value
        this[LENGTH] += len - item.length
        item.length = len
        this.get(key)
        trim2(this)
        return true
      }
      const hit = new Entry(key, value, len, now, maxAge)
      if (hit.length > this[MAX]) {
        if (this[DISPOSE]) this[DISPOSE](key, value)
        return false
      }
      this[LENGTH] += hit.length
      this[LRU_LIST].unshift(hit)
      this[CACHE].set(key, this[LRU_LIST].head)
      trim2(this)
      return true
    }
    has(key) {
      if (!this[CACHE].has(key)) return false
      const hit = this[CACHE].get(key).value
      return !isStale(this, hit)
    }
    get(key) {
      return get(this, key, true)
    }
    peek(key) {
      return get(this, key, false)
    }
    pop() {
      const node = this[LRU_LIST].tail
      if (!node) return null
      del(this, node)
      return node.value
    }
    del(key) {
      del(this, this[CACHE].get(key))
    }
    load(arr) {
      this.reset()
      const now = Date.now()
      for (let l = arr.length - 1; l >= 0; l--) {
        const hit = arr[l]
        const expiresAt = hit.e || 0
        if (expiresAt === 0) this.set(hit.k, hit.v)
        else {
          const maxAge = expiresAt - now
          if (maxAge > 0) {
            this.set(hit.k, hit.v, maxAge)
          }
        }
      }
    }
    prune() {
      this[CACHE].forEach((value, key) => get(this, key, false))
    }
  }
  const get = (self2, key, doUse) => {
    const node = self2[CACHE].get(key)
    if (node) {
      const hit = node.value
      if (isStale(self2, hit)) {
        del(self2, node)
        if (!self2[ALLOW_STALE]) return void 0
      } else {
        if (doUse) {
          if (self2[UPDATE_AGE_ON_GET]) node.value.now = Date.now()
          self2[LRU_LIST].unshiftNode(node)
        }
      }
      return hit.value
    }
  }
  const isStale = (self2, hit) => {
    if (!hit || (!hit.maxAge && !self2[MAX_AGE])) return false
    const diff2 = Date.now() - hit.now
    return hit.maxAge ? diff2 > hit.maxAge : self2[MAX_AGE] && diff2 > self2[MAX_AGE]
  }
  const trim2 = (self2) => {
    if (self2[LENGTH] > self2[MAX]) {
      for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
        const prev = walker.prev
        del(self2, walker)
        walker = prev
      }
    }
  }
  const del = (self2, node) => {
    if (node) {
      const hit = node.value
      if (self2[DISPOSE]) self2[DISPOSE](hit.key, hit.value)
      self2[LENGTH] -= hit.length
      self2[CACHE].delete(hit.key)
      self2[LRU_LIST].removeNode(node)
    }
  }
  class Entry {
    constructor(key, value, length, now, maxAge) {
      this.key = key
      this.value = value
      this.length = length
      this.now = now
      this.maxAge = maxAge || 0
    }
  }
  const forEachStep = (self2, fn, node, thisp) => {
    let hit = node.value
    if (isStale(self2, hit)) {
      del(self2, node)
      if (!self2[ALLOW_STALE]) hit = void 0
    }
    if (hit) fn.call(thisp, hit.value, hit.key, self2)
  }
  lruCache = LRUCache
  return lruCache
}
var range
var hasRequiredRange
function requireRange() {
  if (hasRequiredRange) return range
  hasRequiredRange = 1
  class Range2 {
    constructor(range2, options) {
      options = parseOptions2(options)
      if (range2 instanceof Range2) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2
        } else {
          return new Range2(range2.raw, options)
        }
      }
      if (range2 instanceof Comparator2) {
        this.raw = range2.value
        this.set = [[range2]]
        this.format()
        return this
      }
      this.options = options
      this.loose = !!options.loose
      this.includePrerelease = !!options.includePrerelease
      this.raw = range2
      this.set = range2
        .split("||")
        .map((r) => this.parseRange(r.trim()))
        .filter((c) => c.length)
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${range2}`)
      }
      if (this.set.length > 1) {
        const first = this.set[0]
        this.set = this.set.filter((c) => !isNullSet(c[0]))
        if (this.set.length === 0) {
          this.set = [first]
        } else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c]
              break
            }
          }
        }
      }
      this.format()
    }
    format() {
      this.range = this.set
        .map((comps) => {
          return comps.join(" ").trim()
        })
        .join("||")
        .trim()
      return this.range
    }
    toString() {
      return this.range
    }
    parseRange(range2) {
      range2 = range2.trim()
      const memoOpts = Object.keys(this.options).join(",")
      const memoKey = `parseRange:${memoOpts}:${range2}`
      const cached = cache.get(memoKey)
      if (cached) {
        return cached
      }
      const loose = this.options.loose
      const hr = loose ? re2[t2.HYPHENRANGELOOSE] : re2[t2.HYPHENRANGE]
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease))
      debug2("hyphen replace", range2)
      range2 = range2.replace(re2[t2.COMPARATORTRIM], comparatorTrimReplace)
      debug2("comparator trim", range2)
      range2 = range2.replace(re2[t2.TILDETRIM], tildeTrimReplace)
      range2 = range2.replace(re2[t2.CARETTRIM], caretTrimReplace)
      range2 = range2.split(/\s+/).join(" ")
      let rangeList = range2
        .split(" ")
        .map((comp) => parseComparator(comp, this.options))
        .join(" ")
        .split(/\s+/)
        .map((comp) => replaceGTE0(comp, this.options))
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug2("loose invalid filter", comp, this.options)
          return !!comp.match(re2[t2.COMPARATORLOOSE])
        })
      }
      debug2("range list", rangeList)
      const rangeMap = /* @__PURE__ */ new Map()
      const comparators = rangeList.map((comp) => new Comparator2(comp, this.options))
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp]
        }
        rangeMap.set(comp.value, comp)
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("")
      }
      const result = [...rangeMap.values()]
      cache.set(memoKey, result)
      return result
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range2)) {
        throw new TypeError("a Range is required")
      }
      return this.set.some((thisComparators) => {
        return (
          isSatisfiable(thisComparators, options) &&
          range2.set.some((rangeComparators) => {
            return (
              isSatisfiable(rangeComparators, options) &&
              thisComparators.every((thisComparator) => {
                return rangeComparators.every((rangeComparator) => {
                  return thisComparator.intersects(rangeComparator, options)
                })
              })
            )
          })
        )
      })
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version2) {
      if (!version2) {
        return false
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer3(version2, this.options)
        } catch (er) {
          return false
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version2, this.options)) {
          return true
        }
      }
      return false
    }
  }
  range = Range2
  const LRU = requireLruCache()
  const cache = new LRU({ max: 1e3 })
  const parseOptions2 = parseOptions_1
  const Comparator2 = requireComparator()
  const debug2 = debug_1
  const SemVer3 = semver$1
  const { re: re2, t: t2, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = reExports
  const isNullSet = (c) => c.value === "<0.0.0-0"
  const isAny = (c) => c.value === ""
  const isSatisfiable = (comparators, options) => {
    let result = true
    const remainingComparators = comparators.slice()
    let testComparator = remainingComparators.pop()
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options)
      })
      testComparator = remainingComparators.pop()
    }
    return result
  }
  const parseComparator = (comp, options) => {
    debug2("comp", comp, options)
    comp = replaceCarets(comp, options)
    debug2("caret", comp)
    comp = replaceTildes(comp, options)
    debug2("tildes", comp)
    comp = replaceXRanges(comp, options)
    debug2("xrange", comp)
    comp = replaceStars(comp, options)
    debug2("stars", comp)
    return comp
  }
  const isX = (id2) => !id2 || id2.toLowerCase() === "x" || id2 === "*"
  const replaceTildes = (comp, options) =>
    comp
      .trim()
      .split(/\s+/)
      .map((c) => {
        return replaceTilde(c, options)
      })
      .join(" ")
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re2[t2.TILDELOOSE] : re2[t2.TILDE]
    return comp.replace(r, (_2, M2, m, p, pr) => {
      debug2("tilde", comp, _2, M2, m, p, pr)
      let ret
      if (isX(M2)) {
        ret = ""
      } else if (isX(m)) {
        ret = `>=${M2}.0.0 <${+M2 + 1}.0.0-0`
      } else if (isX(p)) {
        ret = `>=${M2}.${m}.0 <${M2}.${+m + 1}.0-0`
      } else if (pr) {
        debug2("replaceTilde pr", pr)
        ret = `>=${M2}.${m}.${p}-${pr} <${M2}.${+m + 1}.0-0`
      } else {
        ret = `>=${M2}.${m}.${p} <${M2}.${+m + 1}.0-0`
      }
      debug2("tilde return", ret)
      return ret
    })
  }
  const replaceCarets = (comp, options) =>
    comp
      .trim()
      .split(/\s+/)
      .map((c) => {
        return replaceCaret(c, options)
      })
      .join(" ")
  const replaceCaret = (comp, options) => {
    debug2("caret", comp, options)
    const r = options.loose ? re2[t2.CARETLOOSE] : re2[t2.CARET]
    const z2 = options.includePrerelease ? "-0" : ""
    return comp.replace(r, (_2, M2, m, p, pr) => {
      debug2("caret", comp, _2, M2, m, p, pr)
      let ret
      if (isX(M2)) {
        ret = ""
      } else if (isX(m)) {
        ret = `>=${M2}.0.0${z2} <${+M2 + 1}.0.0-0`
      } else if (isX(p)) {
        if (M2 === "0") {
          ret = `>=${M2}.${m}.0${z2} <${M2}.${+m + 1}.0-0`
        } else {
          ret = `>=${M2}.${m}.0${z2} <${+M2 + 1}.0.0-0`
        }
      } else if (pr) {
        debug2("replaceCaret pr", pr)
        if (M2 === "0") {
          if (m === "0") {
            ret = `>=${M2}.${m}.${p}-${pr} <${M2}.${m}.${+p + 1}-0`
          } else {
            ret = `>=${M2}.${m}.${p}-${pr} <${M2}.${+m + 1}.0-0`
          }
        } else {
          ret = `>=${M2}.${m}.${p}-${pr} <${+M2 + 1}.0.0-0`
        }
      } else {
        debug2("no pr")
        if (M2 === "0") {
          if (m === "0") {
            ret = `>=${M2}.${m}.${p}${z2} <${M2}.${m}.${+p + 1}-0`
          } else {
            ret = `>=${M2}.${m}.${p}${z2} <${M2}.${+m + 1}.0-0`
          }
        } else {
          ret = `>=${M2}.${m}.${p} <${+M2 + 1}.0.0-0`
        }
      }
      debug2("caret return", ret)
      return ret
    })
  }
  const replaceXRanges = (comp, options) => {
    debug2("replaceXRanges", comp, options)
    return comp
      .split(/\s+/)
      .map((c) => {
        return replaceXRange(c, options)
      })
      .join(" ")
  }
  const replaceXRange = (comp, options) => {
    comp = comp.trim()
    const r = options.loose ? re2[t2.XRANGELOOSE] : re2[t2.XRANGE]
    return comp.replace(r, (ret, gtlt, M2, m, p, pr) => {
      debug2("xRange", comp, ret, gtlt, M2, m, p, pr)
      const xM = isX(M2)
      const xm = xM || isX(m)
      const xp = xm || isX(p)
      const anyX = xp
      if (gtlt === "=" && anyX) {
        gtlt = ""
      }
      pr = options.includePrerelease ? "-0" : ""
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0"
        } else {
          ret = "*"
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0
        }
        p = 0
        if (gtlt === ">") {
          gtlt = ">="
          if (xm) {
            M2 = +M2 + 1
            m = 0
            p = 0
          } else {
            m = +m + 1
            p = 0
          }
        } else if (gtlt === "<=") {
          gtlt = "<"
          if (xm) {
            M2 = +M2 + 1
          } else {
            m = +m + 1
          }
        }
        if (gtlt === "<") {
          pr = "-0"
        }
        ret = `${gtlt + M2}.${m}.${p}${pr}`
      } else if (xm) {
        ret = `>=${M2}.0.0${pr} <${+M2 + 1}.0.0-0`
      } else if (xp) {
        ret = `>=${M2}.${m}.0${pr} <${M2}.${+m + 1}.0-0`
      }
      debug2("xRange return", ret)
      return ret
    })
  }
  const replaceStars = (comp, options) => {
    debug2("replaceStars", comp, options)
    return comp.trim().replace(re2[t2.STAR], "")
  }
  const replaceGTE0 = (comp, options) => {
    debug2("replaceGTE0", comp, options)
    return comp.trim().replace(re2[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "")
  }
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
    if (isX(fM)) {
      from = ""
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`
    } else if (fpr) {
      from = `>=${from}`
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`
    }
    if (isX(tM)) {
      to = ""
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`
    } else {
      to = `<=${to}`
    }
    return `${from} ${to}`.trim()
  }
  const testSet = (set, version2, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version2)) {
        return false
      }
    }
    if (version2.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++) {
        debug2(set[i].semver)
        if (set[i].semver === Comparator2.ANY) {
          continue
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver
          if (
            allowed.major === version2.major &&
            allowed.minor === version2.minor &&
            allowed.patch === version2.patch
          ) {
            return true
          }
        }
      }
      return false
    }
    return true
  }
  return range
}
var comparator
var hasRequiredComparator
function requireComparator() {
  if (hasRequiredComparator) return comparator
  hasRequiredComparator = 1
  const ANY2 = Symbol("SemVer ANY")
  class Comparator2 {
    static get ANY() {
      return ANY2
    }
    constructor(comp, options) {
      options = parseOptions2(options)
      if (comp instanceof Comparator2) {
        if (comp.loose === !!options.loose) {
          return comp
        } else {
          comp = comp.value
        }
      }
      debug2("comparator", comp, options)
      this.options = options
      this.loose = !!options.loose
      this.parse(comp)
      if (this.semver === ANY2) {
        this.value = ""
      } else {
        this.value = this.operator + this.semver.version
      }
      debug2("comp", this)
    }
    parse(comp) {
      const r = this.options.loose ? re2[t2.COMPARATORLOOSE] : re2[t2.COMPARATOR]
      const m = comp.match(r)
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`)
      }
      this.operator = m[1] !== void 0 ? m[1] : ""
      if (this.operator === "=") {
        this.operator = ""
      }
      if (!m[2]) {
        this.semver = ANY2
      } else {
        this.semver = new SemVer3(m[2], this.options.loose)
      }
    }
    toString() {
      return this.value
    }
    test(version2) {
      debug2("Comparator.test", version2, this.options.loose)
      if (this.semver === ANY2 || version2 === ANY2) {
        return true
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer3(version2, this.options)
        } catch (er) {
          return false
        }
      }
      return cmp2(version2, this.operator, this.semver, this.options)
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator2)) {
        throw new TypeError("a Comparator is required")
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false,
        }
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true
        }
        return new Range2(comp.value, options).test(this.value)
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true
        }
        return new Range2(this.value, options).test(comp.semver)
      }
      const sameDirectionIncreasing =
        (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">")
      const sameDirectionDecreasing =
        (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<")
      const sameSemVer = this.semver.version === comp.semver.version
      const differentDirectionsInclusive =
        (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=")
      const oppositeDirectionsLessThan =
        cmp2(this.semver, "<", comp.semver, options) &&
        (this.operator === ">=" || this.operator === ">") &&
        (comp.operator === "<=" || comp.operator === "<")
      const oppositeDirectionsGreaterThan =
        cmp2(this.semver, ">", comp.semver, options) &&
        (this.operator === "<=" || this.operator === "<") &&
        (comp.operator === ">=" || comp.operator === ">")
      return (
        sameDirectionIncreasing ||
        sameDirectionDecreasing ||
        (sameSemVer && differentDirectionsInclusive) ||
        oppositeDirectionsLessThan ||
        oppositeDirectionsGreaterThan
      )
    }
  }
  comparator = Comparator2
  const parseOptions2 = parseOptions_1
  const { re: re2, t: t2 } = reExports
  const cmp2 = cmp_1
  const debug2 = debug_1
  const SemVer3 = semver$1
  const Range2 = requireRange()
  return comparator
}
const Range$9 = requireRange()
const satisfies$4 = (version2, range2, options) => {
  try {
    range2 = new Range$9(range2, options)
  } catch (er) {
    return false
  }
  return range2.test(version2)
}
var satisfies_1 = satisfies$4
const Range$8 = requireRange()
const toComparators$1 = (range2, options) =>
  new Range$8(range2, options).set.map((comp) =>
    comp
      .map((c) => c.value)
      .join(" ")
      .trim()
      .split(" ")
  )
var toComparators_1 = toComparators$1
const SemVer$4 = semver$1
const Range$7 = requireRange()
const maxSatisfying$1 = (versions, range2, options) => {
  let max = null
  let maxSV = null
  let rangeObj = null
  try {
    rangeObj = new Range$7(range2, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || maxSV.compare(v) === -1) {
        max = v
        maxSV = new SemVer$4(max, options)
      }
    }
  })
  return max
}
var maxSatisfying_1 = maxSatisfying$1
const SemVer$3 = semver$1
const Range$6 = requireRange()
const minSatisfying$1 = (versions, range2, options) => {
  let min = null
  let minSV = null
  let rangeObj = null
  try {
    rangeObj = new Range$6(range2, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v
        minSV = new SemVer$3(min, options)
      }
    }
  })
  return min
}
var minSatisfying_1 = minSatisfying$1
const SemVer$2 = semver$1
const Range$5 = requireRange()
const gt$2 = gt_1
const minVersion$1 = (range2, loose) => {
  range2 = new Range$5(range2, loose)
  let minver = new SemVer$2("0.0.0")
  if (range2.test(minver)) {
    return minver
  }
  minver = new SemVer$2("0.0.0-0")
  if (range2.test(minver)) {
    return minver
  }
  minver = null
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i]
    let setMin = null
    comparators.forEach((comparator2) => {
      const compver = new SemVer$2(comparator2.semver.version)
      switch (comparator2.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
        case "":
        case ">=":
          if (!setMin || gt$2(compver, setMin)) {
            setMin = compver
          }
          break
        case "<":
        case "<=":
          break
        default:
          throw new Error(`Unexpected operation: ${comparator2.operator}`)
      }
    })
    if (setMin && (!minver || gt$2(minver, setMin))) {
      minver = setMin
    }
  }
  if (minver && range2.test(minver)) {
    return minver
  }
  return null
}
var minVersion_1 = minVersion$1
const Range$4 = requireRange()
const validRange$1 = (range2, options) => {
  try {
    return new Range$4(range2, options).range || "*"
  } catch (er) {
    return null
  }
}
var valid$1 = validRange$1
const SemVer$1 = semver$1
const Comparator$2 = requireComparator()
const { ANY: ANY$1 } = Comparator$2
const Range$3 = requireRange()
const satisfies$3 = satisfies_1
const gt$1 = gt_1
const lt$1 = lt_1
const lte$1 = lte_1
const gte$1 = gte_1
const outside$3 = (version2, range2, hilo, options) => {
  version2 = new SemVer$1(version2, options)
  range2 = new Range$3(range2, options)
  let gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case ">":
      gtfn = gt$1
      ltefn = lte$1
      ltfn = lt$1
      comp = ">"
      ecomp = ">="
      break
    case "<":
      gtfn = lt$1
      ltefn = gte$1
      ltfn = gt$1
      comp = "<"
      ecomp = "<="
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }
  if (satisfies$3(version2, range2, options)) {
    return false
  }
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i]
    let high = null
    let low = null
    comparators.forEach((comparator2) => {
      if (comparator2.semver === ANY$1) {
        comparator2 = new Comparator$2(">=0.0.0")
      }
      high = high || comparator2
      low = low || comparator2
      if (gtfn(comparator2.semver, high.semver, options)) {
        high = comparator2
      } else if (ltfn(comparator2.semver, low.semver, options)) {
        low = comparator2
      }
    })
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }
    if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
      return false
    }
  }
  return true
}
var outside_1 = outside$3
const outside$2 = outside_1
const gtr$1 = (version2, range2, options) => outside$2(version2, range2, ">", options)
var gtr_1 = gtr$1
const outside$1 = outside_1
const ltr$1 = (version2, range2, options) => outside$1(version2, range2, "<", options)
var ltr_1 = ltr$1
const Range$2 = requireRange()
const intersects$1 = (r1, r2, options) => {
  r1 = new Range$2(r1, options)
  r2 = new Range$2(r2, options)
  return r1.intersects(r2)
}
var intersects_1 = intersects$1
const satisfies$2 = satisfies_1
const compare$2 = compare_1
var simplify = (versions, range2, options) => {
  const set = []
  let first = null
  let prev = null
  const v = versions.sort((a2, b2) => compare$2(a2, b2, options))
  for (const version2 of v) {
    const included = satisfies$2(version2, range2, options)
    if (included) {
      prev = version2
      if (!first) {
        first = version2
      }
    } else {
      if (prev) {
        set.push([first, prev])
      }
      prev = null
      first = null
    }
  }
  if (first) {
    set.push([first, null])
  }
  const ranges = []
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min)
    } else if (!max && min === v[0]) {
      ranges.push("*")
    } else if (!max) {
      ranges.push(`>=${min}`)
    } else if (min === v[0]) {
      ranges.push(`<=${max}`)
    } else {
      ranges.push(`${min} - ${max}`)
    }
  }
  const simplified = ranges.join(" || ")
  const original = typeof range2.raw === "string" ? range2.raw : String(range2)
  return simplified.length < original.length ? simplified : range2
}
const Range$1 = requireRange()
const Comparator$1 = requireComparator()
const { ANY } = Comparator$1
const satisfies$1 = satisfies_1
const compare$1 = compare_1
const subset$1 = (sub, dom, options = {}) => {
  if (sub === dom) {
    return true
  }
  sub = new Range$1(sub, options)
  dom = new Range$1(dom, options)
  let sawNonNull = false
  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options)
      sawNonNull = sawNonNull || isSub !== null
      if (isSub) {
        continue OUTER
      }
    }
    if (sawNonNull) {
      return false
    }
  }
  return true
}
const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true
  }
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true
    } else if (options.includePrerelease) {
      sub = [new Comparator$1(">=0.0.0-0")]
    } else {
      sub = [new Comparator$1(">=0.0.0")]
    }
  }
  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true
    } else {
      dom = [new Comparator$1(">=0.0.0")]
    }
  }
  const eqSet = /* @__PURE__ */ new Set()
  let gt2, lt2
  for (const c of sub) {
    if (c.operator === ">" || c.operator === ">=") {
      gt2 = higherGT(gt2, c, options)
    } else if (c.operator === "<" || c.operator === "<=") {
      lt2 = lowerLT(lt2, c, options)
    } else {
      eqSet.add(c.semver)
    }
  }
  if (eqSet.size > 1) {
    return null
  }
  let gtltComp
  if (gt2 && lt2) {
    gtltComp = compare$1(gt2.semver, lt2.semver, options)
    if (gtltComp > 0) {
      return null
    } else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<=")) {
      return null
    }
  }
  for (const eq2 of eqSet) {
    if (gt2 && !satisfies$1(eq2, String(gt2), options)) {
      return null
    }
    if (lt2 && !satisfies$1(eq2, String(lt2), options)) {
      return null
    }
    for (const c of dom) {
      if (!satisfies$1(eq2, String(c), options)) {
        return false
      }
    }
    return true
  }
  let higher, lower
  let hasDomLT, hasDomGT
  let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false
  let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false
  if (
    needDomLTPre &&
    needDomLTPre.prerelease.length === 1 &&
    lt2.operator === "<" &&
    needDomLTPre.prerelease[0] === 0
  ) {
    needDomLTPre = false
  }
  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">="
    hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<="
    if (gt2) {
      if (needDomGTPre) {
        if (
          c.semver.prerelease &&
          c.semver.prerelease.length &&
          c.semver.major === needDomGTPre.major &&
          c.semver.minor === needDomGTPre.minor &&
          c.semver.patch === needDomGTPre.patch
        ) {
          needDomGTPre = false
        }
      }
      if (c.operator === ">" || c.operator === ">=") {
        higher = higherGT(gt2, c, options)
        if (higher === c && higher !== gt2) {
          return false
        }
      } else if (gt2.operator === ">=" && !satisfies$1(gt2.semver, String(c), options)) {
        return false
      }
    }
    if (lt2) {
      if (needDomLTPre) {
        if (
          c.semver.prerelease &&
          c.semver.prerelease.length &&
          c.semver.major === needDomLTPre.major &&
          c.semver.minor === needDomLTPre.minor &&
          c.semver.patch === needDomLTPre.patch
        ) {
          needDomLTPre = false
        }
      }
      if (c.operator === "<" || c.operator === "<=") {
        lower = lowerLT(lt2, c, options)
        if (lower === c && lower !== lt2) {
          return false
        }
      } else if (lt2.operator === "<=" && !satisfies$1(lt2.semver, String(c), options)) {
        return false
      }
    }
    if (!c.operator && (lt2 || gt2) && gtltComp !== 0) {
      return false
    }
  }
  if (gt2 && hasDomLT && !lt2 && gtltComp !== 0) {
    return false
  }
  if (lt2 && hasDomGT && !gt2 && gtltComp !== 0) {
    return false
  }
  if (needDomGTPre || needDomLTPre) {
    return false
  }
  return true
}
const higherGT = (a2, b2, options) => {
  if (!a2) {
    return b2
  }
  const comp = compare$1(a2.semver, b2.semver, options)
  return comp > 0 ? a2 : comp < 0 ? b2 : b2.operator === ">" && a2.operator === ">=" ? b2 : a2
}
const lowerLT = (a2, b2, options) => {
  if (!a2) {
    return b2
  }
  const comp = compare$1(a2.semver, b2.semver, options)
  return comp < 0 ? a2 : comp > 0 ? b2 : b2.operator === "<" && a2.operator === "<=" ? b2 : a2
}
var subset_1 = subset$1
const internalRe = reExports
const constants = constants$1
const SemVer = semver$1
const identifiers = identifiers$1
const parse = parse_1
const valid = valid_1
const clean = clean_1
const inc = inc_1
const diff = diff_1
const major = major_1
const minor = minor_1
const patch = patch_1
const prerelease = prerelease_1
const compare = compare_1
const rcompare = rcompare_1
const compareLoose = compareLoose_1
const compareBuild = compareBuild_1
const sort = sort_1
const rsort = rsort_1
const gt = gt_1
const lt = lt_1
const eq = eq_1
const neq = neq_1
const gte = gte_1
const lte = lte_1
const cmp = cmp_1
const coerce = coerce_1
const Comparator = requireComparator()
const Range = requireRange()
const satisfies = satisfies_1
const toComparators = toComparators_1
const maxSatisfying = maxSatisfying_1
const minSatisfying = minSatisfying_1
const minVersion = minVersion_1
const validRange = valid$1
const outside = outside_1
const gtr = gtr_1
const ltr = ltr_1
const intersects = intersects_1
const simplifyRange = simplify
const subset = subset_1
var semver = {
  parse,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers,
}
class FileClient {
  constructor() {
    this.electronApi = {
      readDir(p) {
        const fs = window.require("fs")
        const path = window.require("path")
        const SIYUAN_WORKSPACE = path.join(window.siyuan.config.system.dataDir, "..")
        return new Promise((resolve2) => {
          fs.readdir(path.join(SIYUAN_WORKSPACE, p), (err, files) => {
            if (err) {
              resolve2([])
              return
            }
            const result = files.map((f) => ({
              isDir: fs.statSync(path.join(SIYUAN_WORKSPACE, p, f)).isDirectory(),
              name: f,
            }))
            resolve2(result)
          })
        })
      },
      getFile(f, type = "text") {
        return new Promise((resolve2, reject) => {
          const fs = window.require("fs")
          const path = window.require("path")
          const SIYUAN_WORKSPACE = path.join(window.siyuan.config.system.dataDir, "..")
          fs.readFile(path.join(SIYUAN_WORKSPACE, f), (err, data) => {
            if (err) {
              return reject(err)
            }
            const text2 = data.toString("utf8")
            if (type === "json") {
              try {
                return resolve2(JSON.parse(text2))
              } catch (e) {
                reject(e)
                return
              }
            }
            return resolve2(text2)
          })
        })
      },
      putFile,
      removeFile(f) {
        return new Promise((resolve2, reject) => {
          const fs = window.require("fs")
          const path = window.require("path")
          const SIYUAN_WORKSPACE = path.join(window.siyuan.config.system.dataDir, "..")
          const p = path.join(SIYUAN_WORKSPACE, f)
          log("Remove files from", p)
          fs.rm(p, { recursive: true, force: true }, (err) => {
            if (err) {
              return reject(err)
            }
            resolve2(null)
          })
        })
      },
    }
    this.serverApi = {
      readDir,
      getFile,
      putFile,
      removeFile,
    }
    const v = this.getVersion()
    if (semver.compare(v, "2.8.1") < 0) {
      this.fileApi = this.electronApi
    } else {
      this.fileApi = this.serverApi
    }
  }
  getVersion() {
    return window.siyuan.config.system.kernelVersion
  }
  static getInstanceApi() {
    if (!this.fileClient) {
      this.fileClient = new FileClient()
    }
    return this.fileClient
  }
}
const author$1 = "作者"
const version$1 = "版本"
const description$1 = "描述"
const goBack$1 = "返回"
const url$1 = "地址"
const readme$1 = "README"
const loading$1 = "加载中"
const downloading$1 = "下载中"
const downloaded$1 = "已下载"
const download$1 = "下载"
const upgrade$1 = "升级"
const nodescription$1 = "无描述内容"
const safemode$1 = "安全模式"
const safemodetip$1 = "关闭安全模式允许第三方插件加载"
const autoupgrade$1 = "自动更新"
const autoupgradetip$1 = "从固定位置获取版本并更新本地存储的插件系统脚本"
const store_url$1 = "插件商店地址"
const store_url_tip$1 = "线上插件系统仓库地址, 默认为"
const menu_common$1 = "通用配置"
const menu_list$1 = "插件列表"
const menu_store$1 = "插件商店"
const plugin_system$1 = "插件系统"
const plugin_system_setting$1 = "插件系统设置"
const reload$1 = "重载"
const show_plugin_system_config$1 = "显示插件系统配置"
const reload_window$1 = "重载当前窗口"
const shortcut$1 = "快捷键"
const show_command_panel$1 = "显示控制面板"
const uninstall$1 = "卸载"
const new_version_widget$1 = "集市发现新版本的插件系统,请前往更新并重载"
const zh_CN = {
  author: author$1,
  version: version$1,
  description: description$1,
  goBack: goBack$1,
  url: url$1,
  readme: readme$1,
  loading: loading$1,
  downloading: downloading$1,
  downloaded: downloaded$1,
  download: download$1,
  upgrade: upgrade$1,
  nodescription: nodescription$1,
  safemode: safemode$1,
  safemodetip: safemodetip$1,
  autoupgrade: autoupgrade$1,
  autoupgradetip: autoupgradetip$1,
  store_url: store_url$1,
  store_url_tip: store_url_tip$1,
  menu_common: menu_common$1,
  menu_list: menu_list$1,
  menu_store: menu_store$1,
  plugin_system: plugin_system$1,
  plugin_system_setting: plugin_system_setting$1,
  reload: reload$1,
  show_plugin_system_config: show_plugin_system_config$1,
  reload_window: reload_window$1,
  shortcut: shortcut$1,
  show_command_panel: show_command_panel$1,
  uninstall: uninstall$1,
  new_version_widget: new_version_widget$1,
}
const author = "Author"
const version = "Version"
const description = "Description"
const goBack = "Go Back"
const url = "URL"
const readme = "README"
const loading = "Loading"
const downloading = "Downloading"
const downloaded = "Downloaded"
const download = "Download"
const upgrade = "Upgrade"
const nodescription = "No Description content"
const safemode = "Safe Mode"
const safemodetip = "Turn off safe mode to enable third party plugins."
const autoupgrade = "Auto Upgrade"
const autoupgradetip = "Auto upgrade plugin system online."
const store_url = "Plugin Store URL"
const store_url_tip = "Plugin Store URL, default is"
const menu_common = "Common Setting"
const menu_list = "Plugins"
const menu_store = "Store"
const plugin_system = "Plugin System"
const plugin_system_setting = "Plugin System Setting"
const reload = "Reload"
const show_plugin_system_config = "Show plugin system config"
const reload_window = "Reload current window"
const shortcut = "Shortcut"
const show_command_panel = "Show command panel"
const uninstall = "Uninstall"
const new_version_widget = "New version plugin system found in Bazzar, please upgrade and reload."
const en_US = {
  author,
  version,
  description,
  goBack,
  url,
  readme,
  loading,
  downloading,
  downloaded,
  download,
  upgrade,
  nodescription,
  safemode,
  safemodetip,
  autoupgrade,
  autoupgradetip,
  store_url,
  store_url_tip,
  menu_common,
  menu_list,
  menu_store,
  plugin_system,
  plugin_system_setting,
  reload,
  show_plugin_system_config,
  reload_window,
  shortcut,
  show_command_panel,
  uninstall,
  new_version_widget,
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments)
  }
}
const { toString } = Object.prototype
const { getPrototypeOf } = Object
const kindOf = ((cache) => (thing) => {
  const str = toString.call(thing)
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase())
})(/* @__PURE__ */ Object.create(null))
const kindOfTest = (type) => {
  type = type.toLowerCase()
  return (thing) => kindOf(thing) === type
}
const typeOfTest = (type) => (thing) => typeof thing === type
const { isArray } = Array
const isUndefined = typeOfTest("undefined")
function isBuffer(val) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    isFunction(val.constructor.isBuffer) &&
    val.constructor.isBuffer(val)
  )
}
const isArrayBuffer = kindOfTest("ArrayBuffer")
function isArrayBufferView(val) {
  let result
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val)
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer)
  }
  return result
}
const isString = typeOfTest("string")
const isFunction = typeOfTest("function")
const isNumber = typeOfTest("number")
const isObject = (thing) => thing !== null && typeof thing === "object"
const isBoolean = (thing) => thing === true || thing === false
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false
  }
  const prototype2 = getPrototypeOf(val)
  return (
    (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) &&
    !(Symbol.toStringTag in val) &&
    !(Symbol.iterator in val)
  )
}
const isDate = kindOfTest("Date")
const isFile = kindOfTest("File")
const isBlob = kindOfTest("Blob")
const isFileList = kindOfTest("FileList")
const isStream = (val) => isObject(val) && isFunction(val.pipe)
const isFormData = (thing) => {
  const pattern = "[object FormData]"
  return (
    thing &&
    ((typeof FormData === "function" && thing instanceof FormData) ||
      toString.call(thing) === pattern ||
      (isFunction(thing.toString) && thing.toString() === pattern))
  )
}
const isURLSearchParams = kindOfTest("URLSearchParams")
const trim = (str) => (str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return
  }
  let i
  let l
  if (typeof obj !== "object") {
    obj = [obj]
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj)
    const len = keys.length
    let key
    for (i = 0; i < len; i++) {
      key = keys[i]
      fn.call(null, obj[key], key, obj)
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase()
  const keys = Object.keys(obj)
  let i = keys.length
  let _key
  while (i-- > 0) {
    _key = keys[i]
    if (key === _key.toLowerCase()) {
      return _key
    }
  }
  return null
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global
})()
const isContextDefined = (context) => !isUndefined(context) && context !== _global
function merge() {
  const { caseless } = (isContextDefined(this) && this) || {}
  const result = {}
  const assignValue = (val, key) => {
    const targetKey = (caseless && findKey(result, key)) || key
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val)
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val)
    } else if (isArray(val)) {
      result[targetKey] = val.slice()
    } else {
      result[targetKey] = val
    }
  }
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue)
  }
  return result
}
const extend = (a2, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b2,
    (val, key) => {
      if (thisArg && isFunction(val)) {
        a2[key] = bind(val, thisArg)
      } else {
        a2[key] = val
      }
    },
    { allOwnKeys }
  )
  return a2
}
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1)
  }
  return content
}
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2)
  constructor.prototype.constructor = constructor
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype,
  })
  props && Object.assign(constructor.prototype, props)
}
const toFlatObject = (sourceObj, destObj, filter3, propFilter) => {
  let props
  let i
  let prop
  const merged = {}
  destObj = destObj || {}
  if (sourceObj == null) return destObj
  do {
    props = Object.getOwnPropertyNames(sourceObj)
    i = props.length
    while (i-- > 0) {
      prop = props[i]
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop]
        merged[prop] = true
      }
    }
    sourceObj = filter3 !== false && getPrototypeOf(sourceObj)
  } while (sourceObj && (!filter3 || filter3(sourceObj, destObj)) && sourceObj !== Object.prototype)
  return destObj
}
const endsWith = (str, searchString, position) => {
  str = String(str)
  if (position === void 0 || position > str.length) {
    position = str.length
  }
  position -= searchString.length
  const lastIndex = str.indexOf(searchString, position)
  return lastIndex !== -1 && lastIndex === position
}
const toArray = (thing) => {
  if (!thing) return null
  if (isArray(thing)) return thing
  let i = thing.length
  if (!isNumber(i)) return null
  const arr = new Array(i)
  while (i-- > 0) {
    arr[i] = thing[i]
  }
  return arr
}
const isTypedArray = ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray
  }
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array))
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator]
  const iterator2 = generator.call(obj)
  let result
  while ((result = iterator2.next()) && !result.done) {
    const pair = result.value
    fn.call(obj, pair[0], pair[1])
  }
}
const matchAll = (regExp, str) => {
  let matches
  const arr = []
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches)
  }
  return arr
}
const isHTMLForm = kindOfTest("HTMLFormElement")
const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2
  })
}
const hasOwnProperty = (
  ({ hasOwnProperty: hasOwnProperty2 }) =>
  (obj, prop) =>
    hasOwnProperty2.call(obj, prop)
)(Object.prototype)
const isRegExp = kindOfTest("RegExp")
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj)
  const reducedDescriptors = {}
  forEach(descriptors2, (descriptor, name2) => {
    if (reducer(descriptor, name2, obj) !== false) {
      reducedDescriptors[name2] = descriptor
    }
  })
  Object.defineProperties(obj, reducedDescriptors)
}
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name2) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name2) !== -1) {
      return false
    }
    const value = obj[name2]
    if (!isFunction(value)) return
    descriptor.enumerable = false
    if ("writable" in descriptor) {
      descriptor.writable = false
      return
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name2 + "'")
      }
    }
  })
}
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {}
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true
    })
  }
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter))
  return obj
}
const noop$1 = () => {}
const toFiniteNumber = (value, defaultValue) => {
  value = +value
  return Number.isFinite(value) ? value : defaultValue
}
const ALPHA = "abcdefghijklmnopqrstuvwxyz"
const DIGIT = "0123456789"
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT,
}
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = ""
  const { length } = alphabet
  while (size--) {
    str += alphabet[(Math.random() * length) | 0]
  }
  return str
}
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator])
}
const toJSONObject = (obj) => {
  const stack = new Array(10)
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return
      }
      if (!("toJSON" in source)) {
        stack[i] = source
        const target = isArray(source) ? [] : {}
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1)
          !isUndefined(reducedValue) && (target[key] = reducedValue)
        })
        stack[i] = void 0
        return target
      }
    }
    return source
  }
  return visit(obj, 0)
}
const utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop: noop$1,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
}
function AxiosError(message, code3, config2, request2, response) {
  Error.call(this)
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor)
  } else {
    this.stack = new Error().stack
  }
  this.message = message
  this.name = "AxiosError"
  code3 && (this.code = code3)
  config2 && (this.config = config2)
  request2 && (this.request = request2)
  response && (this.response = response)
}
utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null,
    }
  },
})
const prototype$1 = AxiosError.prototype
const descriptors = {}
;[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
  // eslint-disable-next-line func-names
].forEach((code3) => {
  descriptors[code3] = { value: code3 }
})
Object.defineProperties(AxiosError, descriptors)
Object.defineProperty(prototype$1, "isAxiosError", { value: true })
AxiosError.from = (error2, code3, config2, request2, response, customProps) => {
  const axiosError = Object.create(prototype$1)
  utils.toFlatObject(
    error2,
    axiosError,
    function filter3(obj) {
      return obj !== Error.prototype
    },
    (prop) => {
      return prop !== "isAxiosError"
    }
  )
  AxiosError.call(axiosError, error2.message, code3, config2, request2, response)
  axiosError.cause = error2
  axiosError.name = error2.name
  customProps && Object.assign(axiosError, customProps)
  return axiosError
}
const httpAdapter = null
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing)
}
function removeBrackets(key) {
  return utils.endsWith(key, "[]") ? key.slice(0, -2) : key
}
function renderKey(path, key, dots) {
  if (!path) return key
  return path
    .concat(key)
    .map(function each(token, i) {
      token = removeBrackets(token)
      return !dots && i ? "[" + token + "]" : token
    })
    .join(dots ? "." : "")
}
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable)
}
const predicates = utils.toFlatObject(utils, {}, null, function filter2(prop) {
  return /^is[A-Z]/.test(prop)
})
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError("target must be an object")
  }
  formData = formData || new FormData()
  options = utils.toFlatObject(
    options,
    {
      metaTokens: true,
      dots: false,
      indexes: false,
    },
    false,
    function defined(option, source) {
      return !utils.isUndefined(source[option])
    }
  )
  const metaTokens = options.metaTokens
  const visitor = options.visitor || defaultVisitor
  const dots = options.dots
  const indexes = options.indexes
  const _Blob = options.Blob || (typeof Blob !== "undefined" && Blob)
  const useBlob = _Blob && utils.isSpecCompliantForm(formData)
  if (!utils.isFunction(visitor)) {
    throw new TypeError("visitor must be a function")
  }
  function convertValue(value) {
    if (value === null) return ""
    if (utils.isDate(value)) {
      return value.toISOString()
    }
    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError("Blob is not supported. Use a Buffer instead.")
    }
    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value)
    }
    return value
  }
  function defaultVisitor(value, key, path) {
    let arr = value
    if (value && !path && typeof value === "object") {
      if (utils.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2)
        value = JSON.stringify(value)
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, "[]")) && (arr = utils.toArray(value)))
      ) {
        key = removeBrackets(key)
        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) &&
            formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            )
        })
        return false
      }
    }
    if (isVisitable(value)) {
      return true
    }
    formData.append(renderKey(path, key, dots), convertValue(value))
    return false
  }
  const stack = []
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable,
  })
  function build(value, path) {
    if (utils.isUndefined(value)) return
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."))
    }
    stack.push(value)
    utils.forEach(value, function each(el, key) {
      const result =
        !(utils.isUndefined(el) || el === null) &&
        visitor.call(formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers)
      if (result === true) {
        build(el, path ? path.concat(key) : [key])
      }
    })
    stack.pop()
  }
  if (!utils.isObject(obj)) {
    throw new TypeError("data must be an object")
  }
  build(obj)
  return formData
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  }
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match]
  })
}
function AxiosURLSearchParams(params, options) {
  this._pairs = []
  params && toFormData(params, this, options)
}
const prototype = AxiosURLSearchParams.prototype
prototype.append = function append2(name2, value) {
  this._pairs.push([name2, value])
}
prototype.toString = function toString2(encoder) {
  const _encode = encoder
    ? function (value) {
        return encoder.call(this, value, encode$1)
      }
    : encode$1
  return this._pairs
    .map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1])
    }, "")
    .join("&")
}
function encode(val) {
  return encodeURIComponent(val)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]")
}
function buildURL(url2, params, options) {
  if (!params) {
    return url2
  }
  const _encode = (options && options.encode) || encode
  const serializeFn = options && options.serialize
  let serializedParams
  if (serializeFn) {
    serializedParams = serializeFn(params, options)
  } else {
    serializedParams = utils.isURLSearchParams(params)
      ? params.toString()
      : new AxiosURLSearchParams(params, options).toString(_encode)
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#")
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex)
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams
  }
  return url2
}
class InterceptorManager {
  constructor() {
    this.handlers = []
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null,
    })
    return this.handlers.length - 1
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id2) {
    if (this.handlers[id2]) {
      this.handlers[id2] = null
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = []
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h)
      }
    })
  }
}
const InterceptorManager$1 = InterceptorManager
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
}
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams
const FormData$1 = typeof FormData !== "undefined" ? FormData : null
const Blob$1 = typeof Blob !== "undefined" ? Blob : null
const isStandardBrowserEnv = (() => {
  let product
  if (
    typeof navigator !== "undefined" &&
    ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")
  ) {
    return false
  }
  return typeof window !== "undefined" && typeof document !== "undefined"
})()
const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === "function"
  )
})()
const platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1,
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ["http", "https", "file", "blob", "url", "data"],
}
function toURLEncodedForm(data, options) {
  return toFormData(
    data,
    new platform.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (value, key, path, helpers) {
          if (platform.isNode && utils.isBuffer(value)) {
            this.append(key, value.toString("base64"))
            return false
          }
          return helpers.defaultVisitor.apply(this, arguments)
        },
      },
      options
    )
  )
}
function parsePropPath(name2) {
  return utils.matchAll(/\w+|\[(\w*)]/g, name2).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0]
  })
}
function arrayToObject(arr) {
  const obj = {}
  const keys = Object.keys(arr)
  let i
  const len = keys.length
  let key
  for (i = 0; i < len; i++) {
    key = keys[i]
    obj[key] = arr[key]
  }
  return obj
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name2 = path[index++]
    const isNumericKey = Number.isFinite(+name2)
    const isLast = index >= path.length
    name2 = !name2 && utils.isArray(target) ? target.length : name2
    if (isLast) {
      if (utils.hasOwnProp(target, name2)) {
        target[name2] = [target[name2], value]
      } else {
        target[name2] = value
      }
      return !isNumericKey
    }
    if (!target[name2] || !utils.isObject(target[name2])) {
      target[name2] = []
    }
    const result = buildPath(path, value, target[name2], index)
    if (result && utils.isArray(target[name2])) {
      target[name2] = arrayToObject(target[name2])
    }
    return !isNumericKey
  }
  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {}
    utils.forEachEntry(formData, (name2, value) => {
      buildPath(parsePropPath(name2), value, obj, 0)
    })
    return obj
  }
  return null
}
const DEFAULT_CONTENT_TYPE = {
  "Content-Type": void 0,
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      ;(parser || JSON.parse)(rawValue)
      return utils.trim(rawValue)
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue)
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http"],
  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || ""
      const hasJSONContentType = contentType.indexOf("application/json") > -1
      const isObjectPayload = utils.isObject(data)
      if (isObjectPayload && utils.isHTMLForm(data)) {
        data = new FormData(data)
      }
      const isFormData2 = utils.isFormData(data)
      if (isFormData2) {
        if (!hasJSONContentType) {
          return data
        }
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data
      }
      if (
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer
      }
      if (utils.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false)
        return data.toString()
      }
      let isFileList2
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString()
        }
        if ((isFileList2 = utils.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData
          return toFormData(isFileList2 ? { "files[]": data } : data, _FormData && new _FormData(), this.formSerializer)
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false)
        return stringifySafely(data)
      }
      return data
    },
  ],
  transformResponse: [
    function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing
      const JSONRequested = this.responseType === "json"
      if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing
        const strictJSONParsing = !silentJSONParsing && JSONRequested
        try {
          return JSON.parse(data)
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response)
            }
            throw e
          }
        }
      }
      return data
    },
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob,
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
}
utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults.headers[method] = {}
})
utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE)
})
const defaults$1 = defaults
const ignoreDuplicateOf = utils.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent",
])
const parseHeaders = (rawHeaders) => {
  const parsed = {}
  let key
  let val
  let i
  rawHeaders &&
    rawHeaders.split("\n").forEach(function parser(line) {
      i = line.indexOf(":")
      key = line.substring(0, i).trim().toLowerCase()
      val = line.substring(i + 1).trim()
      if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
        return
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val)
        } else {
          parsed[key] = [val]
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val
      }
    })
  return parsed
}
const $internals = Symbol("internals")
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase()
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value
  }
  return utils.isArray(value) ? value.map(normalizeValue) : String(value)
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null)
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
  let match
  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2]
  }
  return tokens
}
function isValidHeaderName(str) {
  return /^[-_a-zA-Z]+$/.test(str.trim())
}
function matchHeaderValue(context, value, header, filter3, isHeaderNameFilter) {
  if (utils.isFunction(filter3)) {
    return filter3.call(this, value, header)
  }
  if (isHeaderNameFilter) {
    value = header
  }
  if (!utils.isString(value)) return
  if (utils.isString(filter3)) {
    return value.indexOf(filter3) !== -1
  }
  if (utils.isRegExp(filter3)) {
    return filter3.test(value)
  }
}
function formatHeader(header) {
  return header
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str
    })
}
function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(" " + header)
  ;["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function (arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3)
      },
      configurable: true,
    })
  })
}
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers)
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header)
      if (!lHeader) {
        throw new Error("header name must be a non-empty string")
      }
      const key = utils.findKey(self2, lHeader)
      if (!key || self2[key] === void 0 || _rewrite === true || (_rewrite === void 0 && self2[key] !== false)) {
        self2[key || _header] = normalizeValue(_value)
      }
    }
    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite))
    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite)
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite)
    }
    return this
  }
  get(header, parser) {
    header = normalizeHeader(header)
    if (header) {
      const key = utils.findKey(this, header)
      if (key) {
        const value = this[key]
        if (!parser) {
          return value
        }
        if (parser === true) {
          return parseTokens(value)
        }
        if (utils.isFunction(parser)) {
          return parser.call(this, value, key)
        }
        if (utils.isRegExp(parser)) {
          return parser.exec(value)
        }
        throw new TypeError("parser must be boolean|regexp|function")
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header)
    if (header) {
      const key = utils.findKey(this, header)
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)))
    }
    return false
  }
  delete(header, matcher) {
    const self2 = this
    let deleted = false
    function deleteHeader(_header) {
      _header = normalizeHeader(_header)
      if (_header) {
        const key = utils.findKey(self2, _header)
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key]
          deleted = true
        }
      }
    }
    if (utils.isArray(header)) {
      header.forEach(deleteHeader)
    } else {
      deleteHeader(header)
    }
    return deleted
  }
  clear(matcher) {
    const keys = Object.keys(this)
    let i = keys.length
    let deleted = false
    while (i--) {
      const key = keys[i]
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key]
        deleted = true
      }
    }
    return deleted
  }
  normalize(format) {
    const self2 = this
    const headers = {}
    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header)
      if (key) {
        self2[key] = normalizeValue(value)
        delete self2[header]
        return
      }
      const normalized = format ? formatHeader(header) : String(header).trim()
      if (normalized !== header) {
        delete self2[header]
      }
      self2[normalized] = normalizeValue(value)
      headers[normalized] = true
    })
    return this
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets)
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null)
    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(", ") : value)
    })
    return obj
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]()
  }
  toString() {
    return Object.entries(this.toJSON())
      .map(([header, value]) => header + ": " + value)
      .join("\n")
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders"
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing)
  }
  static concat(first, ...targets) {
    const computed = new this(first)
    targets.forEach((target) => computed.set(target))
    return computed
  }
  static accessor(header) {
    const internals =
      (this[$internals] =
      this[$internals] =
        {
          accessors: {},
        })
    const accessors = internals.accessors
    const prototype2 = this.prototype
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header)
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header)
        accessors[lHeader] = true
      }
    }
    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header)
    return this
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"])
utils.freezeMethods(AxiosHeaders.prototype)
utils.freezeMethods(AxiosHeaders)
const AxiosHeaders$1 = AxiosHeaders
function transformData(fns, response) {
  const config2 = this || defaults$1
  const context = response || config2
  const headers = AxiosHeaders$1.from(context.headers)
  let data = context.data
  utils.forEach(fns, function transform(fn) {
    data = fn.call(config2, data, headers.normalize(), response ? response.status : void 0)
  })
  headers.normalize()
  return data
}
function isCancel(value) {
  return !!(value && value.__CANCEL__)
}
function CanceledError(message, config2, request2) {
  AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config2, request2)
  this.name = "CanceledError"
}
utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true,
})
function settle(resolve2, reject, response) {
  const validateStatus2 = response.config.validateStatus
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve2(response)
  } else {
    reject(
      new AxiosError(
        "Request failed with status code " + response.status,
        [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      )
    )
  }
}
const cookies = platform.isStandardBrowserEnv
  ? // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name2, value, expires, path, domain, secure) {
          const cookie = []
          cookie.push(name2 + "=" + encodeURIComponent(value))
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString())
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path)
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain)
          }
          if (secure === true) {
            cookie.push("secure")
          }
          document.cookie = cookie.join("; ")
        },
        read: function read(name2) {
          const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"))
          return match ? decodeURIComponent(match[3]) : null
        },
        remove: function remove(name2) {
          this.write(name2, "", Date.now() - 864e5)
        },
      }
    })()
  : // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() {
          return null
        },
        remove: function remove() {},
      }
    })()
function isAbsoluteURL(url2) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2)
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL)
  }
  return requestedURL
}
const isURLSameOrigin = platform.isStandardBrowserEnv
  ? // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv2() {
      const msie = /(msie|trident)/i.test(navigator.userAgent)
      const urlParsingNode = document.createElement("a")
      let originURL
      function resolveURL(url2) {
        let href = url2
        if (msie) {
          urlParsingNode.setAttribute("href", href)
          href = urlParsingNode.href
        }
        urlParsingNode.setAttribute("href", href)
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname,
        }
      }
      originURL = resolveURL(window.location.href)
      return function isURLSameOrigin2(requestURL) {
        const parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host
      }
    })()
  : // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv2() {
      return function isURLSameOrigin2() {
        return true
      }
    })()
function parseProtocol(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2)
  return (match && match[1]) || ""
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10
  const bytes = new Array(samplesCount)
  const timestamps = new Array(samplesCount)
  let head = 0
  let tail = 0
  let firstSampleTS
  min = min !== void 0 ? min : 1e3
  return function push(chunkLength) {
    const now = Date.now()
    const startedAt = timestamps[tail]
    if (!firstSampleTS) {
      firstSampleTS = now
    }
    bytes[head] = chunkLength
    timestamps[head] = now
    let i = tail
    let bytesCount = 0
    while (i !== head) {
      bytesCount += bytes[i++]
      i = i % samplesCount
    }
    head = (head + 1) % samplesCount
    if (head === tail) {
      tail = (tail + 1) % samplesCount
    }
    if (now - firstSampleTS < min) {
      return
    }
    const passed = startedAt && now - startedAt
    return passed ? Math.round((bytesCount * 1e3) / passed) : void 0
  }
}
function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0
  const _speedometer = speedometer(50, 250)
  return (e) => {
    const loaded = e.loaded
    const total = e.lengthComputable ? e.total : void 0
    const progressBytes = loaded - bytesNotified
    const rate = _speedometer(progressBytes)
    const inRange = loaded <= total
    bytesNotified = loaded
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
    }
    data[isDownloadStream ? "download" : "upload"] = true
    listener(data)
  }
}
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined"
const xhrAdapter =
  isXHRAdapterSupported &&
  function (config2) {
    return new Promise(function dispatchXhrRequest(resolve2, reject) {
      let requestData = config2.data
      const requestHeaders = AxiosHeaders$1.from(config2.headers).normalize()
      const responseType = config2.responseType
      let onCanceled
      function done() {
        if (config2.cancelToken) {
          config2.cancelToken.unsubscribe(onCanceled)
        }
        if (config2.signal) {
          config2.signal.removeEventListener("abort", onCanceled)
        }
      }
      if (utils.isFormData(requestData) && (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv)) {
        requestHeaders.setContentType(false)
      }
      let request2 = new XMLHttpRequest()
      if (config2.auth) {
        const username = config2.auth.username || ""
        const password = config2.auth.password ? unescape(encodeURIComponent(config2.auth.password)) : ""
        requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password))
      }
      const fullPath = buildFullPath(config2.baseURL, config2.url)
      request2.open(config2.method.toUpperCase(), buildURL(fullPath, config2.params, config2.paramsSerializer), true)
      request2.timeout = config2.timeout
      function onloadend() {
        if (!request2) {
          return
        }
        const responseHeaders = AxiosHeaders$1.from(
          "getAllResponseHeaders" in request2 && request2.getAllResponseHeaders()
        )
        const responseData =
          !responseType || responseType === "text" || responseType === "json"
            ? request2.responseText
            : request2.response
        const response = {
          data: responseData,
          status: request2.status,
          statusText: request2.statusText,
          headers: responseHeaders,
          config: config2,
          request: request2,
        }
        settle(
          function _resolve(value) {
            resolve2(value)
            done()
          },
          function _reject(err) {
            reject(err)
            done()
          },
          response
        )
        request2 = null
      }
      if ("onloadend" in request2) {
        request2.onloadend = onloadend
      } else {
        request2.onreadystatechange = function handleLoad() {
          if (!request2 || request2.readyState !== 4) {
            return
          }
          if (request2.status === 0 && !(request2.responseURL && request2.responseURL.indexOf("file:") === 0)) {
            return
          }
          setTimeout(onloadend)
        }
      }
      request2.onabort = function handleAbort() {
        if (!request2) {
          return
        }
        reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config2, request2))
        request2 = null
      }
      request2.onerror = function handleError() {
        reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config2, request2))
        request2 = null
      }
      request2.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = config2.timeout ? "timeout of " + config2.timeout + "ms exceeded" : "timeout exceeded"
        const transitional2 = config2.transitional || transitionalDefaults
        if (config2.timeoutErrorMessage) {
          timeoutErrorMessage = config2.timeoutErrorMessage
        }
        reject(
          new AxiosError(
            timeoutErrorMessage,
            transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config2,
            request2
          )
        )
        request2 = null
      }
      if (platform.isStandardBrowserEnv) {
        const xsrfValue =
          (config2.withCredentials || isURLSameOrigin(fullPath)) &&
          config2.xsrfCookieName &&
          cookies.read(config2.xsrfCookieName)
        if (xsrfValue) {
          requestHeaders.set(config2.xsrfHeaderName, xsrfValue)
        }
      }
      requestData === void 0 && requestHeaders.setContentType(null)
      if ("setRequestHeader" in request2) {
        utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request2.setRequestHeader(key, val)
        })
      }
      if (!utils.isUndefined(config2.withCredentials)) {
        request2.withCredentials = !!config2.withCredentials
      }
      if (responseType && responseType !== "json") {
        request2.responseType = config2.responseType
      }
      if (typeof config2.onDownloadProgress === "function") {
        request2.addEventListener("progress", progressEventReducer(config2.onDownloadProgress, true))
      }
      if (typeof config2.onUploadProgress === "function" && request2.upload) {
        request2.upload.addEventListener("progress", progressEventReducer(config2.onUploadProgress))
      }
      if (config2.cancelToken || config2.signal) {
        onCanceled = (cancel) => {
          if (!request2) {
            return
          }
          reject(!cancel || cancel.type ? new CanceledError(null, config2, request2) : cancel)
          request2.abort()
          request2 = null
        }
        config2.cancelToken && config2.cancelToken.subscribe(onCanceled)
        if (config2.signal) {
          config2.signal.aborted ? onCanceled() : config2.signal.addEventListener("abort", onCanceled)
        }
      }
      const protocol = parseProtocol(fullPath)
      if (protocol && platform.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config2))
        return
      }
      request2.send(requestData || null)
    })
  }
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
}
utils.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value })
    } catch (e) {}
    Object.defineProperty(fn, "adapterName", { value })
  }
})
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils.isArray(adapters2) ? adapters2 : [adapters2]
    const { length } = adapters2
    let nameOrAdapter
    let adapter
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i]
      if ((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break
      }
    }
    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError(`Adapter ${nameOrAdapter} is not supported by the environment`, "ERR_NOT_SUPPORT")
      }
      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter)
          ? `Adapter '${nameOrAdapter}' is not available in the build`
          : `Unknown adapter '${nameOrAdapter}'`
      )
    }
    if (!utils.isFunction(adapter)) {
      throw new TypeError("adapter is not a function")
    }
    return adapter
  },
  adapters: knownAdapters,
}
function throwIfCancellationRequested(config2) {
  if (config2.cancelToken) {
    config2.cancelToken.throwIfRequested()
  }
  if (config2.signal && config2.signal.aborted) {
    throw new CanceledError(null, config2)
  }
}
function dispatchRequest(config2) {
  throwIfCancellationRequested(config2)
  config2.headers = AxiosHeaders$1.from(config2.headers)
  config2.data = transformData.call(config2, config2.transformRequest)
  if (["post", "put", "patch"].indexOf(config2.method) !== -1) {
    config2.headers.setContentType("application/x-www-form-urlencoded", false)
  }
  const adapter = adapters.getAdapter(config2.adapter || defaults$1.adapter)
  return adapter(config2).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config2)
      response.data = transformData.call(config2, config2.transformResponse, response)
      response.headers = AxiosHeaders$1.from(response.headers)
      return response
    },
    function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config2)
        if (reason && reason.response) {
          reason.response.data = transformData.call(config2, config2.transformResponse, reason.response)
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers)
        }
      }
      return Promise.reject(reason)
    }
  )
}
const headersToObject = (thing) => (thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing)
function mergeConfig(config1, config2) {
  config2 = config2 || {}
  const config3 = {}
  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({ caseless }, target, source)
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source)
    } else if (utils.isArray(source)) {
      return source.slice()
    }
    return source
  }
  function mergeDeepProperties(a2, b2, caseless) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(a2, b2, caseless)
    } else if (!utils.isUndefined(a2)) {
      return getMergedValue(void 0, a2, caseless)
    }
  }
  function valueFromConfig2(a2, b2) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(void 0, b2)
    }
  }
  function defaultToConfig2(a2, b2) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(void 0, b2)
    } else if (!utils.isUndefined(a2)) {
      return getMergedValue(void 0, a2)
    }
  }
  function mergeDirectKeys(a2, b2, prop) {
    if (prop in config2) {
      return getMergedValue(a2, b2)
    } else if (prop in config1) {
      return getMergedValue(void 0, a2)
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a2, b2) => mergeDeepProperties(headersToObject(a2), headersToObject(b2), true),
  }
  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties
    const configValue = merge2(config1[prop], config2[prop], prop)
    ;(utils.isUndefined(configValue) && merge2 !== mergeDirectKeys) || (config3[prop] = configValue)
  })
  return config3
}
const VERSION = "1.3.4"
const validators$1 = {}
;["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type
  }
})
const deprecatedWarnings = {}
validators$1.transitional = function transitional(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "")
  }
  return (value, opt, opts2) => {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
        AxiosError.ERR_DEPRECATED
      )
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true
      console.warn(
        formatMessage(opt, " has been deprecated since v" + version2 + " and will be removed in the near future")
      )
    }
    return validator2 ? validator2(value, opt, opts2) : true
  }
}
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE)
  }
  const keys = Object.keys(options)
  let i = keys.length
  while (i-- > 0) {
    const opt = keys[i]
    const validator2 = schema[opt]
    if (validator2) {
      const value = options[opt]
      const result = value === void 0 || validator2(value, opt, options)
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE)
      }
      continue
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION)
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1,
}
const validators = validator.validators
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1(),
    }
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config2) {
    if (typeof configOrUrl === "string") {
      config2 = config2 || {}
      config2.url = configOrUrl
    } else {
      config2 = configOrUrl || {}
    }
    config2 = mergeConfig(this.defaults, config2)
    const { transitional: transitional2, paramsSerializer, headers } = config2
    if (transitional2 !== void 0) {
      validator.assertOptions(
        transitional2,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
        },
        false
      )
    }
    if (paramsSerializer !== void 0) {
      validator.assertOptions(
        paramsSerializer,
        {
          encode: validators.function,
          serialize: validators.function,
        },
        true
      )
    }
    config2.method = (config2.method || this.defaults.method || "get").toLowerCase()
    let contextHeaders
    contextHeaders = headers && utils.merge(headers.common, headers[config2.method])
    contextHeaders &&
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
        delete headers[method]
      })
    config2.headers = AxiosHeaders$1.concat(contextHeaders, headers)
    const requestInterceptorChain = []
    let synchronousRequestInterceptors = true
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
        return
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected)
    })
    const responseInterceptorChain = []
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected)
    })
    let promise
    let i = 0
    let len
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0]
      chain.unshift.apply(chain, requestInterceptorChain)
      chain.push.apply(chain, responseInterceptorChain)
      len = chain.length
      promise = Promise.resolve(config2)
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++])
      }
      return promise
    }
    len = requestInterceptorChain.length
    let newConfig = config2
    i = 0
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++]
      const onRejected = requestInterceptorChain[i++]
      try {
        newConfig = onFulfilled(newConfig)
      } catch (error2) {
        onRejected.call(this, error2)
        break
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig)
    } catch (error2) {
      return Promise.reject(error2)
    }
    i = 0
    len = responseInterceptorChain.length
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++])
    }
    return promise
  }
  getUri(config2) {
    config2 = mergeConfig(this.defaults, config2)
    const fullPath = buildFullPath(config2.baseURL, config2.url)
    return buildURL(fullPath, config2.params, config2.paramsSerializer)
  }
}
utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios.prototype[method] = function (url2, config2) {
    return this.request(
      mergeConfig(config2 || {}, {
        method,
        url: url2,
        data: (config2 || {}).data,
      })
    )
  }
})
utils.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data, config2) {
      return this.request(
        mergeConfig(config2 || {}, {
          method,
          headers: isForm
            ? {
                "Content-Type": "multipart/form-data",
              }
            : {},
          url: url2,
          data,
        })
      )
    }
  }
  Axios.prototype[method] = generateHTTPMethod()
  Axios.prototype[method + "Form"] = generateHTTPMethod(true)
})
const Axios$1 = Axios
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.")
    }
    let resolvePromise
    this.promise = new Promise(function promiseExecutor(resolve2) {
      resolvePromise = resolve2
    })
    const token = this
    this.promise.then((cancel) => {
      if (!token._listeners) return
      let i = token._listeners.length
      while (i-- > 0) {
        token._listeners[i](cancel)
      }
      token._listeners = null
    })
    this.promise.then = (onfulfilled) => {
      let _resolve
      const promise = new Promise((resolve2) => {
        token.subscribe(resolve2)
        _resolve = resolve2
      }).then(onfulfilled)
      promise.cancel = function reject() {
        token.unsubscribe(_resolve)
      }
      return promise
    }
    executor(function cancel(message, config2, request2) {
      if (token.reason) {
        return
      }
      token.reason = new CanceledError(message, config2, request2)
      resolvePromise(token.reason)
    })
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason)
      return
    }
    if (this._listeners) {
      this._listeners.push(listener)
    } else {
      this._listeners = [listener]
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return
    }
    const index = this._listeners.indexOf(listener)
    if (index !== -1) {
      this._listeners.splice(index, 1)
    }
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel
    const token = new CancelToken(function executor(c) {
      cancel = c
    })
    return {
      token,
      cancel,
    }
  }
}
const CancelToken$1 = CancelToken
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}
function isAxiosError(payload) {
  return utils.isObject(payload) && payload.isAxiosError === true
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
}
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key
})
const HttpStatusCode$1 = HttpStatusCode
function createInstance(defaultConfig2) {
  const context = new Axios$1(defaultConfig2)
  const instance2 = bind(Axios$1.prototype.request, context)
  utils.extend(instance2, Axios$1.prototype, context, { allOwnKeys: true })
  utils.extend(instance2, context, null, { allOwnKeys: true })
  instance2.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig2, instanceConfig))
  }
  return instance2
}
const axios = createInstance(defaults$1)
axios.Axios = Axios$1
axios.CanceledError = CanceledError
axios.CancelToken = CancelToken$1
axios.isCancel = isCancel
axios.VERSION = VERSION
axios.toFormData = toFormData
axios.AxiosError = AxiosError
axios.Cancel = axios.CanceledError
axios.all = function all(promises) {
  return Promise.all(promises)
}
axios.spread = spread
axios.isAxiosError = isAxiosError
axios.mergeConfig = mergeConfig
axios.AxiosHeaders = AxiosHeaders$1
axios.formToJSON = (thing) => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing)
axios.HttpStatusCode = HttpStatusCode$1
axios.default = axios
const axios$1 = axios
const factory = M.customLogFactory(S.LOG_LEVEL_INFO, "PluginSystem")
const pluginSystemLogger = factory.getLogger("plugin system")
const log = (...p) => {
  pluginSystemLogger.info(...p)
}
const request = axios$1.create({
  withCredentials: false,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
})
const sleep = async (t2) => {
  return new Promise((resolve2) => {
    setTimeout(() => resolve2(null), t2)
  })
}
const error = (...p) => pluginSystemLogger.error(...p)
const reloadWindow = () => window.location.reload()
const genUUID = () =>
  ([1e7].toString() + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (parseInt(c, 10) ^ (window.crypto.getRandomValues(new Uint32Array(1))[0] & (15 >> (parseInt(c, 10) / 4)))).toString(
      16
    )
  )
async function isExists(p) {
  try {
    const res = await FileClient.getInstanceApi().fileApi.getFile(p)
    return res !== null
  } catch {
    return false
  }
}
let Error$1 = class Error2 {
  constructor(message) {
    this.message = message
  }
}
class Warning {
  constructor(message) {
    this.message = message
  }
}
const showInfoMessage = (message, timeout) => new Notification({ type: "info", message, timeout }).show()
const showErrorMessage = (message, timeout) => new Notification({ type: "error", message, timeout }).show()
const getLogger = (name2) => factory.getLogger(name2)
const langs = {
  zh_CN,
  en_US,
}
const _ = (v) => {
  return langs[window.siyuan.config.lang][v] || "not defined"
}
var NAMED_TAG = "named"
var NAME_TAG = "name"
var UNMANAGED_TAG = "unmanaged"
var OPTIONAL_TAG = "optional"
var INJECT_TAG = "inject"
var MULTI_INJECT_TAG = "multi_inject"
var TAGGED = "inversify:tagged"
var TAGGED_PROP = "inversify:tagged_props"
var PARAM_TYPES = "inversify:paramtypes"
var DESIGN_PARAM_TYPES = "design:paramtypes"
var POST_CONSTRUCT = "post_construct"
var PRE_DESTROY = "pre_destroy"
function getNonCustomTagKeys() {
  return [INJECT_TAG, MULTI_INJECT_TAG, NAME_TAG, UNMANAGED_TAG, NAMED_TAG, OPTIONAL_TAG]
}
var NON_CUSTOM_TAG_KEYS = getNonCustomTagKeys()
var BindingScopeEnum = {
  Request: "Request",
  Singleton: "Singleton",
  Transient: "Transient",
}
var BindingTypeEnum = {
  ConstantValue: "ConstantValue",
  Constructor: "Constructor",
  DynamicValue: "DynamicValue",
  Factory: "Factory",
  Function: "Function",
  Instance: "Instance",
  Invalid: "Invalid",
  Provider: "Provider",
}
var TargetTypeEnum = {
  ClassProperty: "ClassProperty",
  ConstructorArgument: "ConstructorArgument",
  Variable: "Variable",
}
var idCounter = 0
function id() {
  return idCounter++
}
var Binding = (function () {
  function Binding2(serviceIdentifier, scope) {
    this.id = id()
    this.activated = false
    this.serviceIdentifier = serviceIdentifier
    this.scope = scope
    this.type = BindingTypeEnum.Invalid
    this.constraint = function (request2) {
      return true
    }
    this.implementationType = null
    this.cache = null
    this.factory = null
    this.provider = null
    this.onActivation = null
    this.onDeactivation = null
    this.dynamicValue = null
  }
  Binding2.prototype.clone = function () {
    var clone = new Binding2(this.serviceIdentifier, this.scope)
    clone.activated = clone.scope === BindingScopeEnum.Singleton ? this.activated : false
    clone.implementationType = this.implementationType
    clone.dynamicValue = this.dynamicValue
    clone.scope = this.scope
    clone.type = this.type
    clone.factory = this.factory
    clone.provider = this.provider
    clone.constraint = this.constraint
    clone.onActivation = this.onActivation
    clone.onDeactivation = this.onDeactivation
    clone.cache = this.cache
    return clone
  }
  return Binding2
})()
var DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times."
var DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:"
var NULL_ARGUMENT = "NULL argument"
var KEY_NOT_FOUND = "Key Not Found"
var AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:"
var CANNOT_UNBIND = "Could not unbind serviceIdentifier:"
var NOT_REGISTERED = "No matching bindings found for serviceIdentifier:"
var MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:"
var MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:"
var UNDEFINED_INJECT_ANNOTATION = function (name2) {
  return (
    "@inject called with undefined this could mean that the class " +
    name2 +
    " has a circular dependency problem. You can use a LazyServiceIdentifer to  overcome this limitation."
  )
}
var CIRCULAR_DEPENDENCY = "Circular dependency found:"
var INVALID_BINDING_TYPE = "Invalid binding type:"
var NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore."
var INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!"
var INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!"
var LAZY_IN_SYNC = function (key) {
  return "You are attempting to construct '" + key + "' in a synchronous way\n but it has asynchronous dependencies."
}
var INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is used as service identifier"
var INVALID_DECORATOR_OPERATION =
  "The @inject @multiInject @tagged and @named decorators must be applied to the parameters of a class constructor or a class property."
var ARGUMENTS_LENGTH_MISMATCH = function () {
  var values = []
  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i]
  }
  return (
    "The number of constructor arguments in the derived class " +
    (values[0] + " must be >= than the number of constructor arguments of its base class.")
  )
}
var CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options must be an object."
var CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE =
  "Invalid Container option. Default scope must be a string ('singleton' or 'transient')."
var CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must be a boolean"
var CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must be a boolean"
var ASYNC_UNBIND_REQUIRED =
  "Attempting to unbind dependency with asynchronous destruction (@preDestroy or onDeactivation)"
var POST_CONSTRUCT_ERROR = function (clazz, errorMessage) {
  return "@postConstruct error in class " + clazz + ": " + errorMessage
}
var PRE_DESTROY_ERROR = function (clazz, errorMessage) {
  return "@preDestroy error in class " + clazz + ": " + errorMessage
}
var ON_DEACTIVATION_ERROR = function (clazz, errorMessage) {
  return "onDeactivation() error in class " + clazz + ": " + errorMessage
}
var CIRCULAR_DEPENDENCY_IN_FACTORY = function (factoryType, serviceIdentifier) {
  return (
    "It looks like there is a circular dependency in one of the '" +
    factoryType +
    "' bindings. Please investigate bindings with" +
    ("service identifier '" + serviceIdentifier + "'.")
  )
}
var STACK_OVERFLOW = "Maximum call stack size exceeded"
var MetadataReader = (function () {
  function MetadataReader2() {}
  MetadataReader2.prototype.getConstructorMetadata = function (constructorFunc) {
    var compilerGeneratedMetadata = Reflect.getMetadata(PARAM_TYPES, constructorFunc)
    var userGeneratedMetadata = Reflect.getMetadata(TAGGED, constructorFunc)
    return {
      compilerGeneratedMetadata,
      userGeneratedMetadata: userGeneratedMetadata || {},
    }
  }
  MetadataReader2.prototype.getPropertiesMetadata = function (constructorFunc) {
    var userGeneratedMetadata = Reflect.getMetadata(TAGGED_PROP, constructorFunc) || []
    return userGeneratedMetadata
  }
  return MetadataReader2
})()
var BindingCount = {
  MultipleBindingsAvailable: 2,
  NoBindingsAvailable: 0,
  OnlyOneBindingAvailable: 1,
}
function isStackOverflowExeption(error2) {
  return error2 instanceof RangeError || error2.message === STACK_OVERFLOW
}
var tryAndThrowErrorIfStackOverflow = function (fn, errorCallback) {
  try {
    return fn()
  } catch (error2) {
    if (isStackOverflowExeption(error2)) {
      error2 = errorCallback()
    }
    throw error2
  }
}
function getServiceIdentifierAsString(serviceIdentifier) {
  if (typeof serviceIdentifier === "function") {
    var _serviceIdentifier = serviceIdentifier
    return _serviceIdentifier.name
  } else if (typeof serviceIdentifier === "symbol") {
    return serviceIdentifier.toString()
  } else {
    var _serviceIdentifier = serviceIdentifier
    return _serviceIdentifier
  }
}
function listRegisteredBindingsForServiceIdentifier(container2, serviceIdentifier, getBindings2) {
  var registeredBindingsList = ""
  var registeredBindings = getBindings2(container2, serviceIdentifier)
  if (registeredBindings.length !== 0) {
    registeredBindingsList = "\nRegistered bindings:"
    registeredBindings.forEach(function (binding) {
      var name2 = "Object"
      if (binding.implementationType !== null) {
        name2 = getFunctionName(binding.implementationType)
      }
      registeredBindingsList = registeredBindingsList + "\n " + name2
      if (binding.constraint.metaData) {
        registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData
      }
    })
  }
  return registeredBindingsList
}
function alreadyDependencyChain(request2, serviceIdentifier) {
  if (request2.parentRequest === null) {
    return false
  } else if (request2.parentRequest.serviceIdentifier === serviceIdentifier) {
    return true
  } else {
    return alreadyDependencyChain(request2.parentRequest, serviceIdentifier)
  }
}
function dependencyChainToString(request2) {
  function _createStringArr(req, result) {
    if (result === void 0) {
      result = []
    }
    var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier)
    result.push(serviceIdentifier)
    if (req.parentRequest !== null) {
      return _createStringArr(req.parentRequest, result)
    }
    return result
  }
  var stringArr = _createStringArr(request2)
  return stringArr.reverse().join(" --> ")
}
function circularDependencyToException(request2) {
  request2.childRequests.forEach(function (childRequest) {
    if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
      var services = dependencyChainToString(childRequest)
      throw new Error(CIRCULAR_DEPENDENCY + " " + services)
    } else {
      circularDependencyToException(childRequest)
    }
  })
}
function listMetadataForTarget(serviceIdentifierString, target) {
  if (target.isTagged() || target.isNamed()) {
    var m_1 = ""
    var namedTag = target.getNamedTag()
    var otherTags = target.getCustomTags()
    if (namedTag !== null) {
      m_1 += namedTag.toString() + "\n"
    }
    if (otherTags !== null) {
      otherTags.forEach(function (tag) {
        m_1 += tag.toString() + "\n"
      })
    }
    return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1
  } else {
    return " " + serviceIdentifierString
  }
}
function getFunctionName(func) {
  if (func.name) {
    return func.name
  } else {
    var name_1 = func.toString()
    var match = name_1.match(/^function\s*([^\s(]+)/)
    return match ? match[1] : "Anonymous function: " + name_1
  }
}
function getSymbolDescription(symbol) {
  return symbol.toString().slice(7, -1)
}
var Context = (function () {
  function Context2(container2) {
    this.id = id()
    this.container = container2
  }
  Context2.prototype.addPlan = function (plan2) {
    this.plan = plan2
  }
  Context2.prototype.setCurrentRequest = function (currentRequest) {
    this.currentRequest = currentRequest
  }
  return Context2
})()
var Metadata = (function () {
  function Metadata2(key, value) {
    this.key = key
    this.value = value
  }
  Metadata2.prototype.toString = function () {
    if (this.key === NAMED_TAG) {
      return "named: " + String(this.value).toString() + " "
    } else {
      return "tagged: { key:" + this.key.toString() + ", value: " + String(this.value) + " }"
    }
  }
  return Metadata2
})()
var Plan = (function () {
  function Plan2(parentContext, rootRequest) {
    this.parentContext = parentContext
    this.rootRequest = rootRequest
  }
  return Plan2
})()
var LazyServiceIdentifer = (function () {
  function LazyServiceIdentifer2(cb) {
    this._cb = cb
  }
  LazyServiceIdentifer2.prototype.unwrap = function () {
    return this._cb()
  }
  return LazyServiceIdentifer2
})()
var QueryableString = (function () {
  function QueryableString2(str) {
    this.str = str
  }
  QueryableString2.prototype.startsWith = function (searchString) {
    return this.str.indexOf(searchString) === 0
  }
  QueryableString2.prototype.endsWith = function (searchString) {
    var reverseString = ""
    var reverseSearchString = searchString.split("").reverse().join("")
    reverseString = this.str.split("").reverse().join("")
    return this.startsWith.call({ str: reverseString }, reverseSearchString)
  }
  QueryableString2.prototype.contains = function (searchString) {
    return this.str.indexOf(searchString) !== -1
  }
  QueryableString2.prototype.equals = function (compareString) {
    return this.str === compareString
  }
  QueryableString2.prototype.value = function () {
    return this.str
  }
  return QueryableString2
})()
var Target = (function () {
  function Target2(type, identifier, serviceIdentifier, namedOrTagged) {
    this.id = id()
    this.type = type
    this.serviceIdentifier = serviceIdentifier
    var queryableName = typeof identifier === "symbol" ? getSymbolDescription(identifier) : identifier
    this.name = new QueryableString(queryableName || "")
    this.identifier = identifier
    this.metadata = []
    var metadataItem = null
    if (typeof namedOrTagged === "string") {
      metadataItem = new Metadata(NAMED_TAG, namedOrTagged)
    } else if (namedOrTagged instanceof Metadata) {
      metadataItem = namedOrTagged
    }
    if (metadataItem !== null) {
      this.metadata.push(metadataItem)
    }
  }
  Target2.prototype.hasTag = function (key) {
    for (var _i = 0, _a2 = this.metadata; _i < _a2.length; _i++) {
      var m = _a2[_i]
      if (m.key === key) {
        return true
      }
    }
    return false
  }
  Target2.prototype.isArray = function () {
    return this.hasTag(MULTI_INJECT_TAG)
  }
  Target2.prototype.matchesArray = function (name2) {
    return this.matchesTag(MULTI_INJECT_TAG)(name2)
  }
  Target2.prototype.isNamed = function () {
    return this.hasTag(NAMED_TAG)
  }
  Target2.prototype.isTagged = function () {
    return this.metadata.some(function (metadata) {
      return NON_CUSTOM_TAG_KEYS.every(function (key) {
        return metadata.key !== key
      })
    })
  }
  Target2.prototype.isOptional = function () {
    return this.matchesTag(OPTIONAL_TAG)(true)
  }
  Target2.prototype.getNamedTag = function () {
    if (this.isNamed()) {
      return this.metadata.filter(function (m) {
        return m.key === NAMED_TAG
      })[0]
    }
    return null
  }
  Target2.prototype.getCustomTags = function () {
    if (this.isTagged()) {
      return this.metadata.filter(function (metadata) {
        return NON_CUSTOM_TAG_KEYS.every(function (key) {
          return metadata.key !== key
        })
      })
    } else {
      return null
    }
  }
  Target2.prototype.matchesNamedTag = function (name2) {
    return this.matchesTag(NAMED_TAG)(name2)
  }
  Target2.prototype.matchesTag = function (key) {
    var _this = this
    return function (value) {
      for (var _i = 0, _a2 = _this.metadata; _i < _a2.length; _i++) {
        var m = _a2[_i]
        if (m.key === key && m.value === value) {
          return true
        }
      }
      return false
    }
  }
  return Target2
})()
var __spreadArray$2 =
  (globalThis && globalThis.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
function getDependencies(metadataReader, func) {
  var constructorName = getFunctionName(func)
  return getTargets(metadataReader, constructorName, func, false)
}
function getTargets(metadataReader, constructorName, func, isBaseClass) {
  var metadata = metadataReader.getConstructorMetadata(func)
  var serviceIdentifiers = metadata.compilerGeneratedMetadata
  if (serviceIdentifiers === void 0) {
    var msg = MISSING_INJECTABLE_ANNOTATION + " " + constructorName + "."
    throw new Error(msg)
  }
  var constructorArgsMetadata = metadata.userGeneratedMetadata
  var keys = Object.keys(constructorArgsMetadata)
  var hasUserDeclaredUnknownInjections = func.length === 0 && keys.length > 0
  var hasOptionalParameters = keys.length > func.length
  var iterations = hasUserDeclaredUnknownInjections || hasOptionalParameters ? keys.length : func.length
  var constructorTargets = getConstructorArgsAsTargets(
    isBaseClass,
    constructorName,
    serviceIdentifiers,
    constructorArgsMetadata,
    iterations
  )
  var propertyTargets = getClassPropsAsTargets(metadataReader, func, constructorName)
  var targets = __spreadArray$2(__spreadArray$2([], constructorTargets, true), propertyTargets, true)
  return targets
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
  var targetMetadata = constructorArgsMetadata[index.toString()] || []
  var metadata = formatTargetMetadata(targetMetadata)
  var isManaged = metadata.unmanaged !== true
  var serviceIdentifier = serviceIdentifiers[index]
  var injectIdentifier = metadata.inject || metadata.multiInject
  serviceIdentifier = injectIdentifier ? injectIdentifier : serviceIdentifier
  if (serviceIdentifier instanceof LazyServiceIdentifer) {
    serviceIdentifier = serviceIdentifier.unwrap()
  }
  if (isManaged) {
    var isObject2 = serviceIdentifier === Object
    var isFunction2 = serviceIdentifier === Function
    var isUndefined2 = serviceIdentifier === void 0
    var isUnknownType = isObject2 || isFunction2 || isUndefined2
    if (!isBaseClass && isUnknownType) {
      var msg = MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + "."
      throw new Error(msg)
    }
    var target = new Target(TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier)
    target.metadata = targetMetadata
    return target
  }
  return null
}
function getConstructorArgsAsTargets(
  isBaseClass,
  constructorName,
  serviceIdentifiers,
  constructorArgsMetadata,
  iterations
) {
  var targets = []
  for (var i = 0; i < iterations; i++) {
    var index = i
    var target = getConstructorArgsAsTarget(
      index,
      isBaseClass,
      constructorName,
      serviceIdentifiers,
      constructorArgsMetadata
    )
    if (target !== null) {
      targets.push(target)
    }
  }
  return targets
}
function _getServiceIdentifierForProperty(inject2, multiInject, propertyName, className) {
  var serviceIdentifier = inject2 || multiInject
  if (serviceIdentifier === void 0) {
    var msg = MISSING_INJECTABLE_ANNOTATION + " for property " + String(propertyName) + " in class " + className + "."
    throw new Error(msg)
  }
  return serviceIdentifier
}
function getClassPropsAsTargets(metadataReader, constructorFunc, constructorName) {
  var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc)
  var targets = []
  var symbolKeys = Object.getOwnPropertySymbols(classPropsMetadata)
  var stringKeys = Object.keys(classPropsMetadata)
  var keys = stringKeys.concat(symbolKeys)
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i]
    var targetMetadata = classPropsMetadata[key]
    var metadata = formatTargetMetadata(targetMetadata)
    var identifier = metadata.targetName || key
    var serviceIdentifier = _getServiceIdentifierForProperty(
      metadata.inject,
      metadata.multiInject,
      key,
      constructorName
    )
    var target = new Target(TargetTypeEnum.ClassProperty, identifier, serviceIdentifier)
    target.metadata = targetMetadata
    targets.push(target)
  }
  var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor
  if (baseConstructor !== Object) {
    var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor, constructorName)
    targets = __spreadArray$2(__spreadArray$2([], targets, true), baseTargets, true)
  }
  return targets
}
function getBaseClassDependencyCount(metadataReader, func) {
  var baseConstructor = Object.getPrototypeOf(func.prototype).constructor
  if (baseConstructor !== Object) {
    var baseConstructorName = getFunctionName(baseConstructor)
    var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true)
    var metadata = targets.map(function (t2) {
      return t2.metadata.filter(function (m) {
        return m.key === UNMANAGED_TAG
      })
    })
    var unmanagedCount = [].concat.apply([], metadata).length
    var dependencyCount = targets.length - unmanagedCount
    if (dependencyCount > 0) {
      return dependencyCount
    } else {
      return getBaseClassDependencyCount(metadataReader, baseConstructor)
    }
  } else {
    return 0
  }
}
function formatTargetMetadata(targetMetadata) {
  var targetMetadataMap = {}
  targetMetadata.forEach(function (m) {
    targetMetadataMap[m.key.toString()] = m.value
  })
  return {
    inject: targetMetadataMap[INJECT_TAG],
    multiInject: targetMetadataMap[MULTI_INJECT_TAG],
    targetName: targetMetadataMap[NAME_TAG],
    unmanaged: targetMetadataMap[UNMANAGED_TAG],
  }
}
var Request = (function () {
  function Request2(serviceIdentifier, parentContext, parentRequest, bindings, target) {
    this.id = id()
    this.serviceIdentifier = serviceIdentifier
    this.parentContext = parentContext
    this.parentRequest = parentRequest
    this.target = target
    this.childRequests = []
    this.bindings = Array.isArray(bindings) ? bindings : [bindings]
    this.requestScope = parentRequest === null ? /* @__PURE__ */ new Map() : null
  }
  Request2.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
    var child = new Request2(serviceIdentifier, this.parentContext, this, bindings, target)
    this.childRequests.push(child)
    return child
  }
  return Request2
})()
function getBindingDictionary(cntnr) {
  return cntnr._bindingDictionary
}
function _createTarget(isMultiInject, targetType, serviceIdentifier, name2, key, value) {
  var metadataKey = isMultiInject ? MULTI_INJECT_TAG : INJECT_TAG
  var injectMetadata = new Metadata(metadataKey, serviceIdentifier)
  var target = new Target(targetType, name2, serviceIdentifier, injectMetadata)
  if (key !== void 0) {
    var tagMetadata = new Metadata(key, value)
    target.metadata.push(tagMetadata)
  }
  return target
}
function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
  var bindings = getBindings(context.container, target.serviceIdentifier)
  var activeBindings = []
  if (
    bindings.length === BindingCount.NoBindingsAvailable &&
    context.container.options.autoBindInjectable &&
    typeof target.serviceIdentifier === "function" &&
    metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata
  ) {
    context.container.bind(target.serviceIdentifier).toSelf()
    bindings = getBindings(context.container, target.serviceIdentifier)
  }
  if (!avoidConstraints) {
    activeBindings = bindings.filter(function (binding) {
      var request2 = new Request(binding.serviceIdentifier, context, parentRequest, binding, target)
      return binding.constraint(request2)
    })
  } else {
    activeBindings = bindings
  }
  _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container)
  return activeBindings
}
function _validateActiveBindingCount(serviceIdentifier, bindings, target, container2) {
  switch (bindings.length) {
    case BindingCount.NoBindingsAvailable:
      if (target.isOptional()) {
        return bindings
      } else {
        var serviceIdentifierString = getServiceIdentifierAsString(serviceIdentifier)
        var msg = NOT_REGISTERED
        msg += listMetadataForTarget(serviceIdentifierString, target)
        msg += listRegisteredBindingsForServiceIdentifier(container2, serviceIdentifierString, getBindings)
        throw new Error(msg)
      }
    case BindingCount.OnlyOneBindingAvailable:
      return bindings
    case BindingCount.MultipleBindingsAvailable:
    default:
      if (!target.isArray()) {
        var serviceIdentifierString = getServiceIdentifierAsString(serviceIdentifier)
        var msg = AMBIGUOUS_MATCH + " " + serviceIdentifierString
        msg += listRegisteredBindingsForServiceIdentifier(container2, serviceIdentifierString, getBindings)
        throw new Error(msg)
      } else {
        return bindings
      }
  }
}
function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
  var activeBindings
  var childRequest
  if (parentRequest === null) {
    activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target)
    childRequest = new Request(serviceIdentifier, context, null, activeBindings, target)
    var thePlan = new Plan(context, childRequest)
    context.addPlan(thePlan)
  } else {
    activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target)
    childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target)
  }
  activeBindings.forEach(function (binding) {
    var subChildRequest = null
    if (target.isArray()) {
      subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target)
    } else {
      if (binding.cache) {
        return
      }
      subChildRequest = childRequest
    }
    if (binding.type === BindingTypeEnum.Instance && binding.implementationType !== null) {
      var dependencies = getDependencies(metadataReader, binding.implementationType)
      if (!context.container.options.skipBaseClassChecks) {
        var baseClassDependencyCount = getBaseClassDependencyCount(metadataReader, binding.implementationType)
        if (dependencies.length < baseClassDependencyCount) {
          var error2 = ARGUMENTS_LENGTH_MISMATCH(getFunctionName(binding.implementationType))
          throw new Error(error2)
        }
      }
      dependencies.forEach(function (dependency) {
        _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency)
      })
    }
  })
}
function getBindings(container2, serviceIdentifier) {
  var bindings = []
  var bindingDictionary = getBindingDictionary(container2)
  if (bindingDictionary.hasKey(serviceIdentifier)) {
    bindings = bindingDictionary.get(serviceIdentifier)
  } else if (container2.parent !== null) {
    bindings = getBindings(container2.parent, serviceIdentifier)
  }
  return bindings
}
function plan(metadataReader, container2, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
  if (avoidConstraints === void 0) {
    avoidConstraints = false
  }
  var context = new Context(container2)
  var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value)
  try {
    _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target)
    return context
  } catch (error2) {
    if (isStackOverflowExeption(error2)) {
      circularDependencyToException(context.plan.rootRequest)
    }
    throw error2
  }
}
function createMockRequest(container2, serviceIdentifier, key, value) {
  var target = new Target(TargetTypeEnum.Variable, "", serviceIdentifier, new Metadata(key, value))
  var context = new Context(container2)
  var request2 = new Request(serviceIdentifier, context, null, [], target)
  return request2
}
function isPromise(object) {
  var isObjectOrFunction = (typeof object === "object" && object !== null) || typeof object === "function"
  return isObjectOrFunction && typeof object.then === "function"
}
function isPromiseOrContainsPromise(object) {
  if (isPromise(object)) {
    return true
  }
  return Array.isArray(object) && object.some(isPromise)
}
var __awaiter$3 =
  (globalThis && globalThis.__awaiter) ||
  function (thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2
        ? value
        : new P2(function (resolve2) {
            resolve2(value)
          })
    }
    return new (P2 || (P2 = Promise))(function (resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator$3 =
  (globalThis && globalThis.__generator) ||
  function (thisArg, body) {
    var _2 = {
        label: 0,
        sent: function () {
          if (t2[0] & 1) throw t2[1]
          return t2[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t2,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.")
      while (_2)
        try {
          if (
            ((f = 1),
            y &&
              (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) &&
              !(t2 = t2.call(y, op[1])).done)
          )
            return t2
          if (((y = 0), t2)) op = [op[0] & 2, t2.value]
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op
              break
            case 4:
              _2.label++
              return { value: op[1], done: false }
            case 5:
              _2.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _2.ops.pop()
              _2.trys.pop()
              continue
            default:
              if (!((t2 = _2.trys), (t2 = t2.length > 0 && t2[t2.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0
                continue
              }
              if (op[0] === 3 && (!t2 || (op[1] > t2[0] && op[1] < t2[3]))) {
                _2.label = op[1]
                break
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1]
                t2 = op
                break
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2]
                _2.ops.push(op)
                break
              }
              if (t2[2]) _2.ops.pop()
              _2.trys.pop()
              continue
          }
          op = body.call(thisArg, _2)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t2 = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var tryGetFromScope = function (requestScope, binding) {
  if (binding.scope === BindingScopeEnum.Singleton && binding.activated) {
    return binding.cache
  }
  if (binding.scope === BindingScopeEnum.Request && requestScope.has(binding.id)) {
    return requestScope.get(binding.id)
  }
  return null
}
var saveToScope = function (requestScope, binding, result) {
  if (binding.scope === BindingScopeEnum.Singleton) {
    _saveToSingletonScope(binding, result)
  }
  if (binding.scope === BindingScopeEnum.Request) {
    _saveToRequestScope(requestScope, binding, result)
  }
}
var _saveToRequestScope = function (requestScope, binding, result) {
  if (!requestScope.has(binding.id)) {
    requestScope.set(binding.id, result)
  }
}
var _saveToSingletonScope = function (binding, result) {
  binding.cache = result
  binding.activated = true
  if (isPromise(result)) {
    void _saveAsyncResultToSingletonScope(binding, result)
  }
}
var _saveAsyncResultToSingletonScope = function (binding, asyncResult) {
  return __awaiter$3(void 0, void 0, void 0, function () {
    var result, ex_1
    return __generator$3(this, function (_a2) {
      switch (_a2.label) {
        case 0:
          _a2.trys.push([0, 2, , 3])
          return [4, asyncResult]
        case 1:
          result = _a2.sent()
          binding.cache = result
          return [3, 3]
        case 2:
          ex_1 = _a2.sent()
          binding.cache = null
          binding.activated = false
          throw ex_1
        case 3:
          return [2]
      }
    })
  })
}
var FactoryType
;(function (FactoryType2) {
  FactoryType2["DynamicValue"] = "toDynamicValue"
  FactoryType2["Factory"] = "toFactory"
  FactoryType2["Provider"] = "toProvider"
})(FactoryType || (FactoryType = {}))
var ensureFullyBound = function (binding) {
  var boundValue = null
  switch (binding.type) {
    case BindingTypeEnum.ConstantValue:
    case BindingTypeEnum.Function:
      boundValue = binding.cache
      break
    case BindingTypeEnum.Constructor:
    case BindingTypeEnum.Instance:
      boundValue = binding.implementationType
      break
    case BindingTypeEnum.DynamicValue:
      boundValue = binding.dynamicValue
      break
    case BindingTypeEnum.Provider:
      boundValue = binding.provider
      break
    case BindingTypeEnum.Factory:
      boundValue = binding.factory
      break
  }
  if (boundValue === null) {
    var serviceIdentifierAsString = getServiceIdentifierAsString(binding.serviceIdentifier)
    throw new Error(INVALID_BINDING_TYPE + " " + serviceIdentifierAsString)
  }
}
var getFactoryDetails = function (binding) {
  switch (binding.type) {
    case BindingTypeEnum.Factory:
      return { factory: binding.factory, factoryType: FactoryType.Factory }
    case BindingTypeEnum.Provider:
      return { factory: binding.provider, factoryType: FactoryType.Provider }
    case BindingTypeEnum.DynamicValue:
      return { factory: binding.dynamicValue, factoryType: FactoryType.DynamicValue }
    default:
      throw new Error("Unexpected factory type " + binding.type)
  }
}
var __assign$1 =
  (globalThis && globalThis.__assign) ||
  function () {
    __assign$1 =
      Object.assign ||
      function (t2) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t2[p] = s[p]
        }
        return t2
      }
    return __assign$1.apply(this, arguments)
  }
var __awaiter$2 =
  (globalThis && globalThis.__awaiter) ||
  function (thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2
        ? value
        : new P2(function (resolve2) {
            resolve2(value)
          })
    }
    return new (P2 || (P2 = Promise))(function (resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator$2 =
  (globalThis && globalThis.__generator) ||
  function (thisArg, body) {
    var _2 = {
        label: 0,
        sent: function () {
          if (t2[0] & 1) throw t2[1]
          return t2[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t2,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.")
      while (_2)
        try {
          if (
            ((f = 1),
            y &&
              (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) &&
              !(t2 = t2.call(y, op[1])).done)
          )
            return t2
          if (((y = 0), t2)) op = [op[0] & 2, t2.value]
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op
              break
            case 4:
              _2.label++
              return { value: op[1], done: false }
            case 5:
              _2.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _2.ops.pop()
              _2.trys.pop()
              continue
            default:
              if (!((t2 = _2.trys), (t2 = t2.length > 0 && t2[t2.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0
                continue
              }
              if (op[0] === 3 && (!t2 || (op[1] > t2[0] && op[1] < t2[3]))) {
                _2.label = op[1]
                break
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1]
                t2 = op
                break
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2]
                _2.ops.push(op)
                break
              }
              if (t2[2]) _2.ops.pop()
              _2.trys.pop()
              continue
          }
          op = body.call(thisArg, _2)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t2 = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var __spreadArray$1 =
  (globalThis && globalThis.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
function _resolveRequests(childRequests, resolveRequest) {
  return childRequests.reduce(
    function (resolvedRequests, childRequest) {
      var injection = resolveRequest(childRequest)
      var targetType = childRequest.target.type
      if (targetType === TargetTypeEnum.ConstructorArgument) {
        resolvedRequests.constructorInjections.push(injection)
      } else {
        resolvedRequests.propertyRequests.push(childRequest)
        resolvedRequests.propertyInjections.push(injection)
      }
      if (!resolvedRequests.isAsync) {
        resolvedRequests.isAsync = isPromiseOrContainsPromise(injection)
      }
      return resolvedRequests
    },
    { constructorInjections: [], propertyInjections: [], propertyRequests: [], isAsync: false }
  )
}
function _createInstance(constr, childRequests, resolveRequest) {
  var result
  if (childRequests.length > 0) {
    var resolved = _resolveRequests(childRequests, resolveRequest)
    var createInstanceWithInjectionsArg = __assign$1(__assign$1({}, resolved), { constr })
    if (resolved.isAsync) {
      result = createInstanceWithInjectionsAsync(createInstanceWithInjectionsArg)
    } else {
      result = createInstanceWithInjections(createInstanceWithInjectionsArg)
    }
  } else {
    result = new constr()
  }
  return result
}
function createInstanceWithInjections(args) {
  var _a2
  var instance2 = new ((_a2 = args.constr).bind.apply(
    _a2,
    __spreadArray$1([void 0], args.constructorInjections, false)
  ))()
  args.propertyRequests.forEach(function (r, index) {
    var property = r.target.identifier
    var injection = args.propertyInjections[index]
    instance2[property] = injection
  })
  return instance2
}
function createInstanceWithInjectionsAsync(args) {
  return __awaiter$2(this, void 0, void 0, function () {
    var constructorInjections, propertyInjections
    return __generator$2(this, function (_a2) {
      switch (_a2.label) {
        case 0:
          return [4, possiblyWaitInjections(args.constructorInjections)]
        case 1:
          constructorInjections = _a2.sent()
          return [4, possiblyWaitInjections(args.propertyInjections)]
        case 2:
          propertyInjections = _a2.sent()
          return [
            2,
            createInstanceWithInjections(
              __assign$1(__assign$1({}, args), { constructorInjections, propertyInjections })
            ),
          ]
      }
    })
  })
}
function possiblyWaitInjections(possiblePromiseinjections) {
  return __awaiter$2(this, void 0, void 0, function () {
    var injections, _i, possiblePromiseinjections_1, injection
    return __generator$2(this, function (_a2) {
      injections = []
      for (
        _i = 0, possiblePromiseinjections_1 = possiblePromiseinjections;
        _i < possiblePromiseinjections_1.length;
        _i++
      ) {
        injection = possiblePromiseinjections_1[_i]
        if (Array.isArray(injection)) {
          injections.push(Promise.all(injection))
        } else {
          injections.push(injection)
        }
      }
      return [2, Promise.all(injections)]
    })
  })
}
function _getInstanceAfterPostConstruct(constr, result) {
  var postConstructResult = _postConstruct(constr, result)
  if (isPromise(postConstructResult)) {
    return postConstructResult.then(function () {
      return result
    })
  } else {
    return result
  }
}
function _postConstruct(constr, instance2) {
  var _a2, _b
  if (Reflect.hasMetadata(POST_CONSTRUCT, constr)) {
    var data = Reflect.getMetadata(POST_CONSTRUCT, constr)
    try {
      return (_b = (_a2 = instance2)[data.value]) === null || _b === void 0 ? void 0 : _b.call(_a2)
    } catch (e) {
      throw new Error(POST_CONSTRUCT_ERROR(constr.name, e.message))
    }
  }
}
function _validateInstanceResolution(binding, constr) {
  if (binding.scope !== BindingScopeEnum.Singleton) {
    _throwIfHandlingDeactivation(binding, constr)
  }
}
function _throwIfHandlingDeactivation(binding, constr) {
  var scopeErrorMessage =
    "Class cannot be instantiated in " +
    (binding.scope === BindingScopeEnum.Request ? "request" : "transient") +
    " scope."
  if (typeof binding.onDeactivation === "function") {
    throw new Error(ON_DEACTIVATION_ERROR(constr.name, scopeErrorMessage))
  }
  if (Reflect.hasMetadata(PRE_DESTROY, constr)) {
    throw new Error(PRE_DESTROY_ERROR(constr.name, scopeErrorMessage))
  }
}
function resolveInstance(binding, constr, childRequests, resolveRequest) {
  _validateInstanceResolution(binding, constr)
  var result = _createInstance(constr, childRequests, resolveRequest)
  if (isPromise(result)) {
    return result.then(function (resolvedResult) {
      return _getInstanceAfterPostConstruct(constr, resolvedResult)
    })
  } else {
    return _getInstanceAfterPostConstruct(constr, result)
  }
}
var __awaiter$1 =
  (globalThis && globalThis.__awaiter) ||
  function (thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2
        ? value
        : new P2(function (resolve2) {
            resolve2(value)
          })
    }
    return new (P2 || (P2 = Promise))(function (resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator$1 =
  (globalThis && globalThis.__generator) ||
  function (thisArg, body) {
    var _2 = {
        label: 0,
        sent: function () {
          if (t2[0] & 1) throw t2[1]
          return t2[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t2,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.")
      while (_2)
        try {
          if (
            ((f = 1),
            y &&
              (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) &&
              !(t2 = t2.call(y, op[1])).done)
          )
            return t2
          if (((y = 0), t2)) op = [op[0] & 2, t2.value]
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op
              break
            case 4:
              _2.label++
              return { value: op[1], done: false }
            case 5:
              _2.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _2.ops.pop()
              _2.trys.pop()
              continue
            default:
              if (!((t2 = _2.trys), (t2 = t2.length > 0 && t2[t2.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0
                continue
              }
              if (op[0] === 3 && (!t2 || (op[1] > t2[0] && op[1] < t2[3]))) {
                _2.label = op[1]
                break
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1]
                t2 = op
                break
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2]
                _2.ops.push(op)
                break
              }
              if (t2[2]) _2.ops.pop()
              _2.trys.pop()
              continue
          }
          op = body.call(thisArg, _2)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t2 = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var _resolveRequest = function (requestScope) {
  return function (request2) {
    request2.parentContext.setCurrentRequest(request2)
    var bindings = request2.bindings
    var childRequests = request2.childRequests
    var targetIsAnArray = request2.target && request2.target.isArray()
    var targetParentIsNotAnArray =
      !request2.parentRequest ||
      !request2.parentRequest.target ||
      !request2.target ||
      !request2.parentRequest.target.matchesArray(request2.target.serviceIdentifier)
    if (targetIsAnArray && targetParentIsNotAnArray) {
      return childRequests.map(function (childRequest) {
        var _f = _resolveRequest(requestScope)
        return _f(childRequest)
      })
    } else {
      if (request2.target.isOptional() && bindings.length === 0) {
        return void 0
      }
      var binding = bindings[0]
      return _resolveBinding(requestScope, request2, binding)
    }
  }
}
var _resolveFactoryFromBinding = function (binding, context) {
  var factoryDetails = getFactoryDetails(binding)
  return tryAndThrowErrorIfStackOverflow(
    function () {
      return factoryDetails.factory.bind(binding)(context)
    },
    function () {
      return new Error(
        CIRCULAR_DEPENDENCY_IN_FACTORY(factoryDetails.factoryType, context.currentRequest.serviceIdentifier.toString())
      )
    }
  )
}
var _getResolvedFromBinding = function (requestScope, request2, binding) {
  var result
  var childRequests = request2.childRequests
  ensureFullyBound(binding)
  switch (binding.type) {
    case BindingTypeEnum.ConstantValue:
    case BindingTypeEnum.Function:
      result = binding.cache
      break
    case BindingTypeEnum.Constructor:
      result = binding.implementationType
      break
    case BindingTypeEnum.Instance:
      result = resolveInstance(binding, binding.implementationType, childRequests, _resolveRequest(requestScope))
      break
    default:
      result = _resolveFactoryFromBinding(binding, request2.parentContext)
  }
  return result
}
var _resolveInScope = function (requestScope, binding, resolveFromBinding) {
  var result = tryGetFromScope(requestScope, binding)
  if (result !== null) {
    return result
  }
  result = resolveFromBinding()
  saveToScope(requestScope, binding, result)
  return result
}
var _resolveBinding = function (requestScope, request2, binding) {
  return _resolveInScope(requestScope, binding, function () {
    var result = _getResolvedFromBinding(requestScope, request2, binding)
    if (isPromise(result)) {
      result = result.then(function (resolved) {
        return _onActivation(request2, binding, resolved)
      })
    } else {
      result = _onActivation(request2, binding, result)
    }
    return result
  })
}
function _onActivation(request2, binding, resolved) {
  var result = _bindingActivation(request2.parentContext, binding, resolved)
  var containersIterator = _getContainersIterator(request2.parentContext.container)
  var container2
  var containersIteratorResult = containersIterator.next()
  do {
    container2 = containersIteratorResult.value
    var context_1 = request2.parentContext
    var serviceIdentifier = request2.serviceIdentifier
    var activationsIterator = _getContainerActivationsForService(container2, serviceIdentifier)
    if (isPromise(result)) {
      result = _activateContainerAsync(activationsIterator, context_1, result)
    } else {
      result = _activateContainer(activationsIterator, context_1, result)
    }
    containersIteratorResult = containersIterator.next()
  } while (
    containersIteratorResult.done !== true &&
    !getBindingDictionary(container2).hasKey(request2.serviceIdentifier)
  )
  return result
}
var _bindingActivation = function (context, binding, previousResult) {
  var result
  if (typeof binding.onActivation === "function") {
    result = binding.onActivation(context, previousResult)
  } else {
    result = previousResult
  }
  return result
}
var _activateContainer = function (activationsIterator, context, result) {
  var activation = activationsIterator.next()
  while (!activation.done) {
    result = activation.value(context, result)
    if (isPromise(result)) {
      return _activateContainerAsync(activationsIterator, context, result)
    }
    activation = activationsIterator.next()
  }
  return result
}
var _activateContainerAsync = function (activationsIterator, context, resultPromise) {
  return __awaiter$1(void 0, void 0, void 0, function () {
    var result, activation
    return __generator$1(this, function (_a2) {
      switch (_a2.label) {
        case 0:
          return [4, resultPromise]
        case 1:
          result = _a2.sent()
          activation = activationsIterator.next()
          _a2.label = 2
        case 2:
          if (activation.done) return [3, 4]
          return [4, activation.value(context, result)]
        case 3:
          result = _a2.sent()
          activation = activationsIterator.next()
          return [3, 2]
        case 4:
          return [2, result]
      }
    })
  })
}
var _getContainerActivationsForService = function (container2, serviceIdentifier) {
  var activations = container2._activations
  return activations.hasKey(serviceIdentifier) ? activations.get(serviceIdentifier).values() : [].values()
}
var _getContainersIterator = function (container2) {
  var containersStack = [container2]
  var parent = container2.parent
  while (parent !== null) {
    containersStack.push(parent)
    parent = parent.parent
  }
  var getNextContainer = function () {
    var nextContainer = containersStack.pop()
    if (nextContainer !== void 0) {
      return { done: false, value: nextContainer }
    } else {
      return { done: true, value: void 0 }
    }
  }
  var containersIterator = {
    next: getNextContainer,
  }
  return containersIterator
}
function resolve(context) {
  var _f = _resolveRequest(context.plan.rootRequest.requestScope)
  return _f(context.plan.rootRequest)
}
var traverseAncerstors = function (request2, constraint) {
  var parent = request2.parentRequest
  if (parent !== null) {
    return constraint(parent) ? true : traverseAncerstors(parent, constraint)
  } else {
    return false
  }
}
var taggedConstraint = function (key) {
  return function (value) {
    var constraint = function (request2) {
      return request2 !== null && request2.target !== null && request2.target.matchesTag(key)(value)
    }
    constraint.metaData = new Metadata(key, value)
    return constraint
  }
}
var namedConstraint = taggedConstraint(NAMED_TAG)
var typeConstraint = function (type) {
  return function (request2) {
    var binding = null
    if (request2 !== null) {
      binding = request2.bindings[0]
      if (typeof type === "string") {
        var serviceIdentifier = binding.serviceIdentifier
        return serviceIdentifier === type
      } else {
        var constructor = request2.bindings[0].implementationType
        return type === constructor
      }
    }
    return false
  }
}
var BindingWhenSyntax = (function () {
  function BindingWhenSyntax2(binding) {
    this._binding = binding
  }
  BindingWhenSyntax2.prototype.when = function (constraint) {
    this._binding.constraint = constraint
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenTargetNamed = function (name2) {
    this._binding.constraint = namedConstraint(name2)
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenTargetIsDefault = function () {
    this._binding.constraint = function (request2) {
      if (request2 === null) {
        return false
      }
      var targetIsDefault = request2.target !== null && !request2.target.isNamed() && !request2.target.isTagged()
      return targetIsDefault
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenTargetTagged = function (tag, value) {
    this._binding.constraint = taggedConstraint(tag)(value)
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenInjectedInto = function (parent) {
    this._binding.constraint = function (request2) {
      return request2 !== null && typeConstraint(parent)(request2.parentRequest)
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenParentNamed = function (name2) {
    this._binding.constraint = function (request2) {
      return request2 !== null && namedConstraint(name2)(request2.parentRequest)
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenParentTagged = function (tag, value) {
    this._binding.constraint = function (request2) {
      return request2 !== null && taggedConstraint(tag)(value)(request2.parentRequest)
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenAnyAncestorIs = function (ancestor) {
    this._binding.constraint = function (request2) {
      return request2 !== null && traverseAncerstors(request2, typeConstraint(ancestor))
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenNoAncestorIs = function (ancestor) {
    this._binding.constraint = function (request2) {
      return request2 !== null && !traverseAncerstors(request2, typeConstraint(ancestor))
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenAnyAncestorNamed = function (name2) {
    this._binding.constraint = function (request2) {
      return request2 !== null && traverseAncerstors(request2, namedConstraint(name2))
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenNoAncestorNamed = function (name2) {
    this._binding.constraint = function (request2) {
      return request2 !== null && !traverseAncerstors(request2, namedConstraint(name2))
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenAnyAncestorTagged = function (tag, value) {
    this._binding.constraint = function (request2) {
      return request2 !== null && traverseAncerstors(request2, taggedConstraint(tag)(value))
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenNoAncestorTagged = function (tag, value) {
    this._binding.constraint = function (request2) {
      return request2 !== null && !traverseAncerstors(request2, taggedConstraint(tag)(value))
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenAnyAncestorMatches = function (constraint) {
    this._binding.constraint = function (request2) {
      return request2 !== null && traverseAncerstors(request2, constraint)
    }
    return new BindingOnSyntax(this._binding)
  }
  BindingWhenSyntax2.prototype.whenNoAncestorMatches = function (constraint) {
    this._binding.constraint = function (request2) {
      return request2 !== null && !traverseAncerstors(request2, constraint)
    }
    return new BindingOnSyntax(this._binding)
  }
  return BindingWhenSyntax2
})()
var BindingOnSyntax = (function () {
  function BindingOnSyntax2(binding) {
    this._binding = binding
  }
  BindingOnSyntax2.prototype.onActivation = function (handler) {
    this._binding.onActivation = handler
    return new BindingWhenSyntax(this._binding)
  }
  BindingOnSyntax2.prototype.onDeactivation = function (handler) {
    this._binding.onDeactivation = handler
    return new BindingWhenSyntax(this._binding)
  }
  return BindingOnSyntax2
})()
var BindingWhenOnSyntax = (function () {
  function BindingWhenOnSyntax2(binding) {
    this._binding = binding
    this._bindingWhenSyntax = new BindingWhenSyntax(this._binding)
    this._bindingOnSyntax = new BindingOnSyntax(this._binding)
  }
  BindingWhenOnSyntax2.prototype.when = function (constraint) {
    return this._bindingWhenSyntax.when(constraint)
  }
  BindingWhenOnSyntax2.prototype.whenTargetNamed = function (name2) {
    return this._bindingWhenSyntax.whenTargetNamed(name2)
  }
  BindingWhenOnSyntax2.prototype.whenTargetIsDefault = function () {
    return this._bindingWhenSyntax.whenTargetIsDefault()
  }
  BindingWhenOnSyntax2.prototype.whenTargetTagged = function (tag, value) {
    return this._bindingWhenSyntax.whenTargetTagged(tag, value)
  }
  BindingWhenOnSyntax2.prototype.whenInjectedInto = function (parent) {
    return this._bindingWhenSyntax.whenInjectedInto(parent)
  }
  BindingWhenOnSyntax2.prototype.whenParentNamed = function (name2) {
    return this._bindingWhenSyntax.whenParentNamed(name2)
  }
  BindingWhenOnSyntax2.prototype.whenParentTagged = function (tag, value) {
    return this._bindingWhenSyntax.whenParentTagged(tag, value)
  }
  BindingWhenOnSyntax2.prototype.whenAnyAncestorIs = function (ancestor) {
    return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor)
  }
  BindingWhenOnSyntax2.prototype.whenNoAncestorIs = function (ancestor) {
    return this._bindingWhenSyntax.whenNoAncestorIs(ancestor)
  }
  BindingWhenOnSyntax2.prototype.whenAnyAncestorNamed = function (name2) {
    return this._bindingWhenSyntax.whenAnyAncestorNamed(name2)
  }
  BindingWhenOnSyntax2.prototype.whenAnyAncestorTagged = function (tag, value) {
    return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value)
  }
  BindingWhenOnSyntax2.prototype.whenNoAncestorNamed = function (name2) {
    return this._bindingWhenSyntax.whenNoAncestorNamed(name2)
  }
  BindingWhenOnSyntax2.prototype.whenNoAncestorTagged = function (tag, value) {
    return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value)
  }
  BindingWhenOnSyntax2.prototype.whenAnyAncestorMatches = function (constraint) {
    return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint)
  }
  BindingWhenOnSyntax2.prototype.whenNoAncestorMatches = function (constraint) {
    return this._bindingWhenSyntax.whenNoAncestorMatches(constraint)
  }
  BindingWhenOnSyntax2.prototype.onActivation = function (handler) {
    return this._bindingOnSyntax.onActivation(handler)
  }
  BindingWhenOnSyntax2.prototype.onDeactivation = function (handler) {
    return this._bindingOnSyntax.onDeactivation(handler)
  }
  return BindingWhenOnSyntax2
})()
var BindingInSyntax = (function () {
  function BindingInSyntax2(binding) {
    this._binding = binding
  }
  BindingInSyntax2.prototype.inRequestScope = function () {
    this._binding.scope = BindingScopeEnum.Request
    return new BindingWhenOnSyntax(this._binding)
  }
  BindingInSyntax2.prototype.inSingletonScope = function () {
    this._binding.scope = BindingScopeEnum.Singleton
    return new BindingWhenOnSyntax(this._binding)
  }
  BindingInSyntax2.prototype.inTransientScope = function () {
    this._binding.scope = BindingScopeEnum.Transient
    return new BindingWhenOnSyntax(this._binding)
  }
  return BindingInSyntax2
})()
var BindingInWhenOnSyntax = (function () {
  function BindingInWhenOnSyntax2(binding) {
    this._binding = binding
    this._bindingWhenSyntax = new BindingWhenSyntax(this._binding)
    this._bindingOnSyntax = new BindingOnSyntax(this._binding)
    this._bindingInSyntax = new BindingInSyntax(binding)
  }
  BindingInWhenOnSyntax2.prototype.inRequestScope = function () {
    return this._bindingInSyntax.inRequestScope()
  }
  BindingInWhenOnSyntax2.prototype.inSingletonScope = function () {
    return this._bindingInSyntax.inSingletonScope()
  }
  BindingInWhenOnSyntax2.prototype.inTransientScope = function () {
    return this._bindingInSyntax.inTransientScope()
  }
  BindingInWhenOnSyntax2.prototype.when = function (constraint) {
    return this._bindingWhenSyntax.when(constraint)
  }
  BindingInWhenOnSyntax2.prototype.whenTargetNamed = function (name2) {
    return this._bindingWhenSyntax.whenTargetNamed(name2)
  }
  BindingInWhenOnSyntax2.prototype.whenTargetIsDefault = function () {
    return this._bindingWhenSyntax.whenTargetIsDefault()
  }
  BindingInWhenOnSyntax2.prototype.whenTargetTagged = function (tag, value) {
    return this._bindingWhenSyntax.whenTargetTagged(tag, value)
  }
  BindingInWhenOnSyntax2.prototype.whenInjectedInto = function (parent) {
    return this._bindingWhenSyntax.whenInjectedInto(parent)
  }
  BindingInWhenOnSyntax2.prototype.whenParentNamed = function (name2) {
    return this._bindingWhenSyntax.whenParentNamed(name2)
  }
  BindingInWhenOnSyntax2.prototype.whenParentTagged = function (tag, value) {
    return this._bindingWhenSyntax.whenParentTagged(tag, value)
  }
  BindingInWhenOnSyntax2.prototype.whenAnyAncestorIs = function (ancestor) {
    return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor)
  }
  BindingInWhenOnSyntax2.prototype.whenNoAncestorIs = function (ancestor) {
    return this._bindingWhenSyntax.whenNoAncestorIs(ancestor)
  }
  BindingInWhenOnSyntax2.prototype.whenAnyAncestorNamed = function (name2) {
    return this._bindingWhenSyntax.whenAnyAncestorNamed(name2)
  }
  BindingInWhenOnSyntax2.prototype.whenAnyAncestorTagged = function (tag, value) {
    return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value)
  }
  BindingInWhenOnSyntax2.prototype.whenNoAncestorNamed = function (name2) {
    return this._bindingWhenSyntax.whenNoAncestorNamed(name2)
  }
  BindingInWhenOnSyntax2.prototype.whenNoAncestorTagged = function (tag, value) {
    return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value)
  }
  BindingInWhenOnSyntax2.prototype.whenAnyAncestorMatches = function (constraint) {
    return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint)
  }
  BindingInWhenOnSyntax2.prototype.whenNoAncestorMatches = function (constraint) {
    return this._bindingWhenSyntax.whenNoAncestorMatches(constraint)
  }
  BindingInWhenOnSyntax2.prototype.onActivation = function (handler) {
    return this._bindingOnSyntax.onActivation(handler)
  }
  BindingInWhenOnSyntax2.prototype.onDeactivation = function (handler) {
    return this._bindingOnSyntax.onDeactivation(handler)
  }
  return BindingInWhenOnSyntax2
})()
var BindingToSyntax = (function () {
  function BindingToSyntax2(binding) {
    this._binding = binding
  }
  BindingToSyntax2.prototype.to = function (constructor) {
    this._binding.type = BindingTypeEnum.Instance
    this._binding.implementationType = constructor
    return new BindingInWhenOnSyntax(this._binding)
  }
  BindingToSyntax2.prototype.toSelf = function () {
    if (typeof this._binding.serviceIdentifier !== "function") {
      throw new Error("" + INVALID_TO_SELF_VALUE)
    }
    var self2 = this._binding.serviceIdentifier
    return this.to(self2)
  }
  BindingToSyntax2.prototype.toConstantValue = function (value) {
    this._binding.type = BindingTypeEnum.ConstantValue
    this._binding.cache = value
    this._binding.dynamicValue = null
    this._binding.implementationType = null
    this._binding.scope = BindingScopeEnum.Singleton
    return new BindingWhenOnSyntax(this._binding)
  }
  BindingToSyntax2.prototype.toDynamicValue = function (func) {
    this._binding.type = BindingTypeEnum.DynamicValue
    this._binding.cache = null
    this._binding.dynamicValue = func
    this._binding.implementationType = null
    return new BindingInWhenOnSyntax(this._binding)
  }
  BindingToSyntax2.prototype.toConstructor = function (constructor) {
    this._binding.type = BindingTypeEnum.Constructor
    this._binding.implementationType = constructor
    this._binding.scope = BindingScopeEnum.Singleton
    return new BindingWhenOnSyntax(this._binding)
  }
  BindingToSyntax2.prototype.toFactory = function (factory2) {
    this._binding.type = BindingTypeEnum.Factory
    this._binding.factory = factory2
    this._binding.scope = BindingScopeEnum.Singleton
    return new BindingWhenOnSyntax(this._binding)
  }
  BindingToSyntax2.prototype.toFunction = function (func) {
    if (typeof func !== "function") {
      throw new Error(INVALID_FUNCTION_BINDING)
    }
    var bindingWhenOnSyntax = this.toConstantValue(func)
    this._binding.type = BindingTypeEnum.Function
    this._binding.scope = BindingScopeEnum.Singleton
    return bindingWhenOnSyntax
  }
  BindingToSyntax2.prototype.toAutoFactory = function (serviceIdentifier) {
    this._binding.type = BindingTypeEnum.Factory
    this._binding.factory = function (context) {
      var autofactory = function () {
        return context.container.get(serviceIdentifier)
      }
      return autofactory
    }
    this._binding.scope = BindingScopeEnum.Singleton
    return new BindingWhenOnSyntax(this._binding)
  }
  BindingToSyntax2.prototype.toAutoNamedFactory = function (serviceIdentifier) {
    this._binding.type = BindingTypeEnum.Factory
    this._binding.factory = function (context) {
      return function (named) {
        return context.container.getNamed(serviceIdentifier, named)
      }
    }
    return new BindingWhenOnSyntax(this._binding)
  }
  BindingToSyntax2.prototype.toProvider = function (provider) {
    this._binding.type = BindingTypeEnum.Provider
    this._binding.provider = provider
    this._binding.scope = BindingScopeEnum.Singleton
    return new BindingWhenOnSyntax(this._binding)
  }
  BindingToSyntax2.prototype.toService = function (service) {
    this.toDynamicValue(function (context) {
      return context.container.get(service)
    })
  }
  return BindingToSyntax2
})()
var ContainerSnapshot = (function () {
  function ContainerSnapshot2() {}
  ContainerSnapshot2.of = function (bindings, middleware, activations, deactivations, moduleActivationStore) {
    var snapshot = new ContainerSnapshot2()
    snapshot.bindings = bindings
    snapshot.middleware = middleware
    snapshot.deactivations = deactivations
    snapshot.activations = activations
    snapshot.moduleActivationStore = moduleActivationStore
    return snapshot
  }
  return ContainerSnapshot2
})()
function isClonable(obj) {
  return typeof obj === "object" && obj !== null && "clone" in obj && typeof obj.clone === "function"
}
var Lookup = (function () {
  function Lookup2() {
    this._map = /* @__PURE__ */ new Map()
  }
  Lookup2.prototype.getMap = function () {
    return this._map
  }
  Lookup2.prototype.add = function (serviceIdentifier, value) {
    if (serviceIdentifier === null || serviceIdentifier === void 0) {
      throw new Error(NULL_ARGUMENT)
    }
    if (value === null || value === void 0) {
      throw new Error(NULL_ARGUMENT)
    }
    var entry = this._map.get(serviceIdentifier)
    if (entry !== void 0) {
      entry.push(value)
    } else {
      this._map.set(serviceIdentifier, [value])
    }
  }
  Lookup2.prototype.get = function (serviceIdentifier) {
    if (serviceIdentifier === null || serviceIdentifier === void 0) {
      throw new Error(NULL_ARGUMENT)
    }
    var entry = this._map.get(serviceIdentifier)
    if (entry !== void 0) {
      return entry
    } else {
      throw new Error(KEY_NOT_FOUND)
    }
  }
  Lookup2.prototype.remove = function (serviceIdentifier) {
    if (serviceIdentifier === null || serviceIdentifier === void 0) {
      throw new Error(NULL_ARGUMENT)
    }
    if (!this._map.delete(serviceIdentifier)) {
      throw new Error(KEY_NOT_FOUND)
    }
  }
  Lookup2.prototype.removeIntersection = function (lookup) {
    var _this = this
    this.traverse(function (serviceIdentifier, value) {
      var lookupActivations = lookup.hasKey(serviceIdentifier) ? lookup.get(serviceIdentifier) : void 0
      if (lookupActivations !== void 0) {
        var filteredValues = value.filter(function (lookupValue) {
          return !lookupActivations.some(function (moduleActivation) {
            return lookupValue === moduleActivation
          })
        })
        _this._setValue(serviceIdentifier, filteredValues)
      }
    })
  }
  Lookup2.prototype.removeByCondition = function (condition) {
    var _this = this
    var removals = []
    this._map.forEach(function (entries, key) {
      var updatedEntries = []
      for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var entry = entries_1[_i]
        var remove = condition(entry)
        if (remove) {
          removals.push(entry)
        } else {
          updatedEntries.push(entry)
        }
      }
      _this._setValue(key, updatedEntries)
    })
    return removals
  }
  Lookup2.prototype.hasKey = function (serviceIdentifier) {
    if (serviceIdentifier === null || serviceIdentifier === void 0) {
      throw new Error(NULL_ARGUMENT)
    }
    return this._map.has(serviceIdentifier)
  }
  Lookup2.prototype.clone = function () {
    var copy = new Lookup2()
    this._map.forEach(function (value, key) {
      value.forEach(function (b2) {
        return copy.add(key, isClonable(b2) ? b2.clone() : b2)
      })
    })
    return copy
  }
  Lookup2.prototype.traverse = function (func) {
    this._map.forEach(function (value, key) {
      func(key, value)
    })
  }
  Lookup2.prototype._setValue = function (serviceIdentifier, value) {
    if (value.length > 0) {
      this._map.set(serviceIdentifier, value)
    } else {
      this._map.delete(serviceIdentifier)
    }
  }
  return Lookup2
})()
var ModuleActivationStore = (function () {
  function ModuleActivationStore2() {
    this._map = /* @__PURE__ */ new Map()
  }
  ModuleActivationStore2.prototype.remove = function (moduleId) {
    if (this._map.has(moduleId)) {
      var handlers = this._map.get(moduleId)
      this._map.delete(moduleId)
      return handlers
    }
    return this._getEmptyHandlersStore()
  }
  ModuleActivationStore2.prototype.addDeactivation = function (moduleId, serviceIdentifier, onDeactivation) {
    this._getModuleActivationHandlers(moduleId).onDeactivations.add(serviceIdentifier, onDeactivation)
  }
  ModuleActivationStore2.prototype.addActivation = function (moduleId, serviceIdentifier, onActivation) {
    this._getModuleActivationHandlers(moduleId).onActivations.add(serviceIdentifier, onActivation)
  }
  ModuleActivationStore2.prototype.clone = function () {
    var clone = new ModuleActivationStore2()
    this._map.forEach(function (handlersStore, moduleId) {
      clone._map.set(moduleId, {
        onActivations: handlersStore.onActivations.clone(),
        onDeactivations: handlersStore.onDeactivations.clone(),
      })
    })
    return clone
  }
  ModuleActivationStore2.prototype._getModuleActivationHandlers = function (moduleId) {
    var moduleActivationHandlers = this._map.get(moduleId)
    if (moduleActivationHandlers === void 0) {
      moduleActivationHandlers = this._getEmptyHandlersStore()
      this._map.set(moduleId, moduleActivationHandlers)
    }
    return moduleActivationHandlers
  }
  ModuleActivationStore2.prototype._getEmptyHandlersStore = function () {
    var handlersStore = {
      onActivations: new Lookup(),
      onDeactivations: new Lookup(),
    }
    return handlersStore
  }
  return ModuleActivationStore2
})()
var __assign =
  (globalThis && globalThis.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t2) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t2[p] = s[p]
        }
        return t2
      }
    return __assign.apply(this, arguments)
  }
var __awaiter =
  (globalThis && globalThis.__awaiter) ||
  function (thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2
        ? value
        : new P2(function (resolve2) {
            resolve2(value)
          })
    }
    return new (P2 || (P2 = Promise))(function (resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (globalThis && globalThis.__generator) ||
  function (thisArg, body) {
    var _2 = {
        label: 0,
        sent: function () {
          if (t2[0] & 1) throw t2[1]
          return t2[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t2,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.")
      while (_2)
        try {
          if (
            ((f = 1),
            y &&
              (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) &&
              !(t2 = t2.call(y, op[1])).done)
          )
            return t2
          if (((y = 0), t2)) op = [op[0] & 2, t2.value]
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op
              break
            case 4:
              _2.label++
              return { value: op[1], done: false }
            case 5:
              _2.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _2.ops.pop()
              _2.trys.pop()
              continue
            default:
              if (!((t2 = _2.trys), (t2 = t2.length > 0 && t2[t2.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0
                continue
              }
              if (op[0] === 3 && (!t2 || (op[1] > t2[0] && op[1] < t2[3]))) {
                _2.label = op[1]
                break
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1]
                t2 = op
                break
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2]
                _2.ops.push(op)
                break
              }
              if (t2[2]) _2.ops.pop()
              _2.trys.pop()
              continue
          }
          op = body.call(thisArg, _2)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t2 = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
var __spreadArray =
  (globalThis && globalThis.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i)
          ar[i] = from[i]
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from))
  }
var Container = (function () {
  function Container2(containerOptions) {
    var options = containerOptions || {}
    if (typeof options !== "object") {
      throw new Error("" + CONTAINER_OPTIONS_MUST_BE_AN_OBJECT)
    }
    if (options.defaultScope === void 0) {
      options.defaultScope = BindingScopeEnum.Transient
    } else if (
      options.defaultScope !== BindingScopeEnum.Singleton &&
      options.defaultScope !== BindingScopeEnum.Transient &&
      options.defaultScope !== BindingScopeEnum.Request
    ) {
      throw new Error("" + CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE)
    }
    if (options.autoBindInjectable === void 0) {
      options.autoBindInjectable = false
    } else if (typeof options.autoBindInjectable !== "boolean") {
      throw new Error("" + CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE)
    }
    if (options.skipBaseClassChecks === void 0) {
      options.skipBaseClassChecks = false
    } else if (typeof options.skipBaseClassChecks !== "boolean") {
      throw new Error("" + CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK)
    }
    this.options = {
      autoBindInjectable: options.autoBindInjectable,
      defaultScope: options.defaultScope,
      skipBaseClassChecks: options.skipBaseClassChecks,
    }
    this.id = id()
    this._bindingDictionary = new Lookup()
    this._snapshots = []
    this._middleware = null
    this._activations = new Lookup()
    this._deactivations = new Lookup()
    this.parent = null
    this._metadataReader = new MetadataReader()
    this._moduleActivationStore = new ModuleActivationStore()
  }
  Container2.merge = function (container1, container2) {
    var containers = []
    for (var _i = 2; _i < arguments.length; _i++) {
      containers[_i - 2] = arguments[_i]
    }
    var container3 = new Container2()
    var targetContainers = __spreadArray([container1, container2], containers, true).map(function (targetContainer) {
      return getBindingDictionary(targetContainer)
    })
    var bindingDictionary = getBindingDictionary(container3)
    function copyDictionary(origin, destination) {
      origin.traverse(function (_key, value) {
        value.forEach(function (binding) {
          destination.add(binding.serviceIdentifier, binding.clone())
        })
      })
    }
    targetContainers.forEach(function (targetBindingDictionary) {
      copyDictionary(targetBindingDictionary, bindingDictionary)
    })
    return container3
  }
  Container2.prototype.load = function () {
    var modules = []
    for (var _i = 0; _i < arguments.length; _i++) {
      modules[_i] = arguments[_i]
    }
    var getHelpers = this._getContainerModuleHelpersFactory()
    for (var _a2 = 0, modules_1 = modules; _a2 < modules_1.length; _a2++) {
      var currentModule = modules_1[_a2]
      var containerModuleHelpers = getHelpers(currentModule.id)
      currentModule.registry(
        containerModuleHelpers.bindFunction,
        containerModuleHelpers.unbindFunction,
        containerModuleHelpers.isboundFunction,
        containerModuleHelpers.rebindFunction,
        containerModuleHelpers.unbindAsyncFunction,
        containerModuleHelpers.onActivationFunction,
        containerModuleHelpers.onDeactivationFunction
      )
    }
  }
  Container2.prototype.loadAsync = function () {
    var modules = []
    for (var _i = 0; _i < arguments.length; _i++) {
      modules[_i] = arguments[_i]
    }
    return __awaiter(this, void 0, void 0, function () {
      var getHelpers, _a2, modules_2, currentModule, containerModuleHelpers
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            getHelpers = this._getContainerModuleHelpersFactory()
            ;(_a2 = 0), (modules_2 = modules)
            _b.label = 1
          case 1:
            if (!(_a2 < modules_2.length)) return [3, 4]
            currentModule = modules_2[_a2]
            containerModuleHelpers = getHelpers(currentModule.id)
            return [
              4,
              currentModule.registry(
                containerModuleHelpers.bindFunction,
                containerModuleHelpers.unbindFunction,
                containerModuleHelpers.isboundFunction,
                containerModuleHelpers.rebindFunction,
                containerModuleHelpers.unbindAsyncFunction,
                containerModuleHelpers.onActivationFunction,
                containerModuleHelpers.onDeactivationFunction
              ),
            ]
          case 2:
            _b.sent()
            _b.label = 3
          case 3:
            _a2++
            return [3, 1]
          case 4:
            return [2]
        }
      })
    })
  }
  Container2.prototype.unload = function () {
    var _this = this
    var modules = []
    for (var _i = 0; _i < arguments.length; _i++) {
      modules[_i] = arguments[_i]
    }
    modules.forEach(function (module2) {
      var deactivations = _this._removeModuleBindings(module2.id)
      _this._deactivateSingletons(deactivations)
      _this._removeModuleHandlers(module2.id)
    })
  }
  Container2.prototype.unloadAsync = function () {
    var modules = []
    for (var _i = 0; _i < arguments.length; _i++) {
      modules[_i] = arguments[_i]
    }
    return __awaiter(this, void 0, void 0, function () {
      var _a2, modules_3, module_1, deactivations
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            ;(_a2 = 0), (modules_3 = modules)
            _b.label = 1
          case 1:
            if (!(_a2 < modules_3.length)) return [3, 4]
            module_1 = modules_3[_a2]
            deactivations = this._removeModuleBindings(module_1.id)
            return [4, this._deactivateSingletonsAsync(deactivations)]
          case 2:
            _b.sent()
            this._removeModuleHandlers(module_1.id)
            _b.label = 3
          case 3:
            _a2++
            return [3, 1]
          case 4:
            return [2]
        }
      })
    })
  }
  Container2.prototype.bind = function (serviceIdentifier) {
    var scope = this.options.defaultScope || BindingScopeEnum.Transient
    var binding = new Binding(serviceIdentifier, scope)
    this._bindingDictionary.add(serviceIdentifier, binding)
    return new BindingToSyntax(binding)
  }
  Container2.prototype.rebind = function (serviceIdentifier) {
    this.unbind(serviceIdentifier)
    return this.bind(serviceIdentifier)
  }
  Container2.prototype.rebindAsync = function (serviceIdentifier) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            return [4, this.unbindAsync(serviceIdentifier)]
          case 1:
            _a2.sent()
            return [2, this.bind(serviceIdentifier)]
        }
      })
    })
  }
  Container2.prototype.unbind = function (serviceIdentifier) {
    if (this._bindingDictionary.hasKey(serviceIdentifier)) {
      var bindings = this._bindingDictionary.get(serviceIdentifier)
      this._deactivateSingletons(bindings)
    }
    this._removeServiceFromDictionary(serviceIdentifier)
  }
  Container2.prototype.unbindAsync = function (serviceIdentifier) {
    return __awaiter(this, void 0, void 0, function () {
      var bindings
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            if (!this._bindingDictionary.hasKey(serviceIdentifier)) return [3, 2]
            bindings = this._bindingDictionary.get(serviceIdentifier)
            return [4, this._deactivateSingletonsAsync(bindings)]
          case 1:
            _a2.sent()
            _a2.label = 2
          case 2:
            this._removeServiceFromDictionary(serviceIdentifier)
            return [2]
        }
      })
    })
  }
  Container2.prototype.unbindAll = function () {
    var _this = this
    this._bindingDictionary.traverse(function (_key, value) {
      _this._deactivateSingletons(value)
    })
    this._bindingDictionary = new Lookup()
  }
  Container2.prototype.unbindAllAsync = function () {
    return __awaiter(this, void 0, void 0, function () {
      var promises
      var _this = this
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            promises = []
            this._bindingDictionary.traverse(function (_key, value) {
              promises.push(_this._deactivateSingletonsAsync(value))
            })
            return [4, Promise.all(promises)]
          case 1:
            _a2.sent()
            this._bindingDictionary = new Lookup()
            return [2]
        }
      })
    })
  }
  Container2.prototype.onActivation = function (serviceIdentifier, onActivation) {
    this._activations.add(serviceIdentifier, onActivation)
  }
  Container2.prototype.onDeactivation = function (serviceIdentifier, onDeactivation) {
    this._deactivations.add(serviceIdentifier, onDeactivation)
  }
  Container2.prototype.isBound = function (serviceIdentifier) {
    var bound = this._bindingDictionary.hasKey(serviceIdentifier)
    if (!bound && this.parent) {
      bound = this.parent.isBound(serviceIdentifier)
    }
    return bound
  }
  Container2.prototype.isCurrentBound = function (serviceIdentifier) {
    return this._bindingDictionary.hasKey(serviceIdentifier)
  }
  Container2.prototype.isBoundNamed = function (serviceIdentifier, named) {
    return this.isBoundTagged(serviceIdentifier, NAMED_TAG, named)
  }
  Container2.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
    var bound = false
    if (this._bindingDictionary.hasKey(serviceIdentifier)) {
      var bindings = this._bindingDictionary.get(serviceIdentifier)
      var request_1 = createMockRequest(this, serviceIdentifier, key, value)
      bound = bindings.some(function (b2) {
        return b2.constraint(request_1)
      })
    }
    if (!bound && this.parent) {
      bound = this.parent.isBoundTagged(serviceIdentifier, key, value)
    }
    return bound
  }
  Container2.prototype.snapshot = function () {
    this._snapshots.push(
      ContainerSnapshot.of(
        this._bindingDictionary.clone(),
        this._middleware,
        this._activations.clone(),
        this._deactivations.clone(),
        this._moduleActivationStore.clone()
      )
    )
  }
  Container2.prototype.restore = function () {
    var snapshot = this._snapshots.pop()
    if (snapshot === void 0) {
      throw new Error(NO_MORE_SNAPSHOTS_AVAILABLE)
    }
    this._bindingDictionary = snapshot.bindings
    this._activations = snapshot.activations
    this._deactivations = snapshot.deactivations
    this._middleware = snapshot.middleware
    this._moduleActivationStore = snapshot.moduleActivationStore
  }
  Container2.prototype.createChild = function (containerOptions) {
    var child = new Container2(containerOptions || this.options)
    child.parent = this
    return child
  }
  Container2.prototype.applyMiddleware = function () {
    var middlewares = []
    for (var _i = 0; _i < arguments.length; _i++) {
      middlewares[_i] = arguments[_i]
    }
    var initial = this._middleware ? this._middleware : this._planAndResolve()
    this._middleware = middlewares.reduce(function (prev, curr) {
      return curr(prev)
    }, initial)
  }
  Container2.prototype.applyCustomMetadataReader = function (metadataReader) {
    this._metadataReader = metadataReader
  }
  Container2.prototype.get = function (serviceIdentifier) {
    var getArgs = this._getNotAllArgs(serviceIdentifier, false)
    return this._getButThrowIfAsync(getArgs)
  }
  Container2.prototype.getAsync = function (serviceIdentifier) {
    return __awaiter(this, void 0, void 0, function () {
      var getArgs
      return __generator(this, function (_a2) {
        getArgs = this._getNotAllArgs(serviceIdentifier, false)
        return [2, this._get(getArgs)]
      })
    })
  }
  Container2.prototype.getTagged = function (serviceIdentifier, key, value) {
    var getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value)
    return this._getButThrowIfAsync(getArgs)
  }
  Container2.prototype.getTaggedAsync = function (serviceIdentifier, key, value) {
    return __awaiter(this, void 0, void 0, function () {
      var getArgs
      return __generator(this, function (_a2) {
        getArgs = this._getNotAllArgs(serviceIdentifier, false, key, value)
        return [2, this._get(getArgs)]
      })
    })
  }
  Container2.prototype.getNamed = function (serviceIdentifier, named) {
    return this.getTagged(serviceIdentifier, NAMED_TAG, named)
  }
  Container2.prototype.getNamedAsync = function (serviceIdentifier, named) {
    return this.getTaggedAsync(serviceIdentifier, NAMED_TAG, named)
  }
  Container2.prototype.getAll = function (serviceIdentifier) {
    var getArgs = this._getAllArgs(serviceIdentifier)
    return this._getButThrowIfAsync(getArgs)
  }
  Container2.prototype.getAllAsync = function (serviceIdentifier) {
    var getArgs = this._getAllArgs(serviceIdentifier)
    return this._getAll(getArgs)
  }
  Container2.prototype.getAllTagged = function (serviceIdentifier, key, value) {
    var getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value)
    return this._getButThrowIfAsync(getArgs)
  }
  Container2.prototype.getAllTaggedAsync = function (serviceIdentifier, key, value) {
    var getArgs = this._getNotAllArgs(serviceIdentifier, true, key, value)
    return this._getAll(getArgs)
  }
  Container2.prototype.getAllNamed = function (serviceIdentifier, named) {
    return this.getAllTagged(serviceIdentifier, NAMED_TAG, named)
  }
  Container2.prototype.getAllNamedAsync = function (serviceIdentifier, named) {
    return this.getAllTaggedAsync(serviceIdentifier, NAMED_TAG, named)
  }
  Container2.prototype.resolve = function (constructorFunction) {
    var isBound = this.isBound(constructorFunction)
    if (!isBound) {
      this.bind(constructorFunction).toSelf()
    }
    var resolved = this.get(constructorFunction)
    if (!isBound) {
      this.unbind(constructorFunction)
    }
    return resolved
  }
  Container2.prototype._preDestroy = function (constructor, instance2) {
    if (Reflect.hasMetadata(PRE_DESTROY, constructor)) {
      var data = Reflect.getMetadata(PRE_DESTROY, constructor)
      return instance2[data.value]()
    }
  }
  Container2.prototype._removeModuleHandlers = function (moduleId) {
    var moduleActivationsHandlers = this._moduleActivationStore.remove(moduleId)
    this._activations.removeIntersection(moduleActivationsHandlers.onActivations)
    this._deactivations.removeIntersection(moduleActivationsHandlers.onDeactivations)
  }
  Container2.prototype._removeModuleBindings = function (moduleId) {
    return this._bindingDictionary.removeByCondition(function (binding) {
      return binding.moduleId === moduleId
    })
  }
  Container2.prototype._deactivate = function (binding, instance2) {
    var _this = this
    var constructor = Object.getPrototypeOf(instance2).constructor
    try {
      if (this._deactivations.hasKey(binding.serviceIdentifier)) {
        var result = this._deactivateContainer(instance2, this._deactivations.get(binding.serviceIdentifier).values())
        if (isPromise(result)) {
          return this._handleDeactivationError(
            result.then(function () {
              return _this._propagateContainerDeactivationThenBindingAndPreDestroyAsync(binding, instance2, constructor)
            }),
            constructor
          )
        }
      }
      var propagateDeactivationResult = this._propagateContainerDeactivationThenBindingAndPreDestroy(
        binding,
        instance2,
        constructor
      )
      if (isPromise(propagateDeactivationResult)) {
        return this._handleDeactivationError(propagateDeactivationResult, constructor)
      }
    } catch (ex) {
      throw new Error(ON_DEACTIVATION_ERROR(constructor.name, ex.message))
    }
  }
  Container2.prototype._handleDeactivationError = function (asyncResult, constructor) {
    return __awaiter(this, void 0, void 0, function () {
      var ex_1
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            _a2.trys.push([0, 2, , 3])
            return [4, asyncResult]
          case 1:
            _a2.sent()
            return [3, 3]
          case 2:
            ex_1 = _a2.sent()
            throw new Error(ON_DEACTIVATION_ERROR(constructor.name, ex_1.message))
          case 3:
            return [2]
        }
      })
    })
  }
  Container2.prototype._deactivateContainer = function (instance2, deactivationsIterator) {
    var _this = this
    var deactivation = deactivationsIterator.next()
    while (deactivation.value) {
      var result = deactivation.value(instance2)
      if (isPromise(result)) {
        return result.then(function () {
          return _this._deactivateContainerAsync(instance2, deactivationsIterator)
        })
      }
      deactivation = deactivationsIterator.next()
    }
  }
  Container2.prototype._deactivateContainerAsync = function (instance2, deactivationsIterator) {
    return __awaiter(this, void 0, void 0, function () {
      var deactivation
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            deactivation = deactivationsIterator.next()
            _a2.label = 1
          case 1:
            if (!deactivation.value) return [3, 3]
            return [4, deactivation.value(instance2)]
          case 2:
            _a2.sent()
            deactivation = deactivationsIterator.next()
            return [3, 1]
          case 3:
            return [2]
        }
      })
    })
  }
  Container2.prototype._getContainerModuleHelpersFactory = function () {
    var _this = this
    var setModuleId = function (bindingToSyntax, moduleId) {
      bindingToSyntax._binding.moduleId = moduleId
    }
    var getBindFunction = function (moduleId) {
      return function (serviceIdentifier) {
        var bindingToSyntax = _this.bind(serviceIdentifier)
        setModuleId(bindingToSyntax, moduleId)
        return bindingToSyntax
      }
    }
    var getUnbindFunction = function () {
      return function (serviceIdentifier) {
        return _this.unbind(serviceIdentifier)
      }
    }
    var getUnbindAsyncFunction = function () {
      return function (serviceIdentifier) {
        return _this.unbindAsync(serviceIdentifier)
      }
    }
    var getIsboundFunction = function () {
      return function (serviceIdentifier) {
        return _this.isBound(serviceIdentifier)
      }
    }
    var getRebindFunction = function (moduleId) {
      return function (serviceIdentifier) {
        var bindingToSyntax = _this.rebind(serviceIdentifier)
        setModuleId(bindingToSyntax, moduleId)
        return bindingToSyntax
      }
    }
    var getOnActivationFunction = function (moduleId) {
      return function (serviceIdentifier, onActivation) {
        _this._moduleActivationStore.addActivation(moduleId, serviceIdentifier, onActivation)
        _this.onActivation(serviceIdentifier, onActivation)
      }
    }
    var getOnDeactivationFunction = function (moduleId) {
      return function (serviceIdentifier, onDeactivation) {
        _this._moduleActivationStore.addDeactivation(moduleId, serviceIdentifier, onDeactivation)
        _this.onDeactivation(serviceIdentifier, onDeactivation)
      }
    }
    return function (mId) {
      return {
        bindFunction: getBindFunction(mId),
        isboundFunction: getIsboundFunction(),
        onActivationFunction: getOnActivationFunction(mId),
        onDeactivationFunction: getOnDeactivationFunction(mId),
        rebindFunction: getRebindFunction(mId),
        unbindFunction: getUnbindFunction(),
        unbindAsyncFunction: getUnbindAsyncFunction(),
      }
    }
  }
  Container2.prototype._getAll = function (getArgs) {
    return Promise.all(this._get(getArgs))
  }
  Container2.prototype._get = function (getArgs) {
    var planAndResolveArgs = __assign(__assign({}, getArgs), {
      contextInterceptor: function (context) {
        return context
      },
      targetType: TargetTypeEnum.Variable,
    })
    if (this._middleware) {
      var middlewareResult = this._middleware(planAndResolveArgs)
      if (middlewareResult === void 0 || middlewareResult === null) {
        throw new Error(INVALID_MIDDLEWARE_RETURN)
      }
      return middlewareResult
    }
    return this._planAndResolve()(planAndResolveArgs)
  }
  Container2.prototype._getButThrowIfAsync = function (getArgs) {
    var result = this._get(getArgs)
    if (isPromiseOrContainsPromise(result)) {
      throw new Error(LAZY_IN_SYNC(getArgs.serviceIdentifier))
    }
    return result
  }
  Container2.prototype._getAllArgs = function (serviceIdentifier) {
    var getAllArgs = {
      avoidConstraints: true,
      isMultiInject: true,
      serviceIdentifier,
    }
    return getAllArgs
  }
  Container2.prototype._getNotAllArgs = function (serviceIdentifier, isMultiInject, key, value) {
    var getNotAllArgs = {
      avoidConstraints: false,
      isMultiInject,
      serviceIdentifier,
      key,
      value,
    }
    return getNotAllArgs
  }
  Container2.prototype._planAndResolve = function () {
    var _this = this
    return function (args) {
      var context = plan(
        _this._metadataReader,
        _this,
        args.isMultiInject,
        args.targetType,
        args.serviceIdentifier,
        args.key,
        args.value,
        args.avoidConstraints
      )
      context = args.contextInterceptor(context)
      var result = resolve(context)
      return result
    }
  }
  Container2.prototype._deactivateIfSingleton = function (binding) {
    var _this = this
    if (!binding.activated) {
      return
    }
    if (isPromise(binding.cache)) {
      return binding.cache.then(function (resolved) {
        return _this._deactivate(binding, resolved)
      })
    }
    return this._deactivate(binding, binding.cache)
  }
  Container2.prototype._deactivateSingletons = function (bindings) {
    for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
      var binding = bindings_1[_i]
      var result = this._deactivateIfSingleton(binding)
      if (isPromise(result)) {
        throw new Error(ASYNC_UNBIND_REQUIRED)
      }
    }
  }
  Container2.prototype._deactivateSingletonsAsync = function (bindings) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            return [
              4,
              Promise.all(
                bindings.map(function (b2) {
                  return _this._deactivateIfSingleton(b2)
                })
              ),
            ]
          case 1:
            _a2.sent()
            return [2]
        }
      })
    })
  }
  Container2.prototype._propagateContainerDeactivationThenBindingAndPreDestroy = function (
    binding,
    instance2,
    constructor
  ) {
    if (this.parent) {
      return this._deactivate.bind(this.parent)(binding, instance2)
    } else {
      return this._bindingDeactivationAndPreDestroy(binding, instance2, constructor)
    }
  }
  Container2.prototype._propagateContainerDeactivationThenBindingAndPreDestroyAsync = function (
    binding,
    instance2,
    constructor
  ) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            if (!this.parent) return [3, 2]
            return [4, this._deactivate.bind(this.parent)(binding, instance2)]
          case 1:
            _a2.sent()
            return [3, 4]
          case 2:
            return [4, this._bindingDeactivationAndPreDestroyAsync(binding, instance2, constructor)]
          case 3:
            _a2.sent()
            _a2.label = 4
          case 4:
            return [2]
        }
      })
    })
  }
  Container2.prototype._removeServiceFromDictionary = function (serviceIdentifier) {
    try {
      this._bindingDictionary.remove(serviceIdentifier)
    } catch (e) {
      throw new Error(CANNOT_UNBIND + " " + getServiceIdentifierAsString(serviceIdentifier))
    }
  }
  Container2.prototype._bindingDeactivationAndPreDestroy = function (binding, instance2, constructor) {
    var _this = this
    if (typeof binding.onDeactivation === "function") {
      var result = binding.onDeactivation(instance2)
      if (isPromise(result)) {
        return result.then(function () {
          return _this._preDestroy(constructor, instance2)
        })
      }
    }
    return this._preDestroy(constructor, instance2)
  }
  Container2.prototype._bindingDeactivationAndPreDestroyAsync = function (binding, instance2, constructor) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a2) {
        switch (_a2.label) {
          case 0:
            if (!(typeof binding.onDeactivation === "function")) return [3, 2]
            return [4, binding.onDeactivation(instance2)]
          case 1:
            _a2.sent()
            _a2.label = 2
          case 2:
            return [4, this._preDestroy(constructor, instance2)]
          case 3:
            _a2.sent()
            return [2]
        }
      })
    })
  }
  return Container2
})()
function getFirstArrayDuplicate(array) {
  var seenValues = /* @__PURE__ */ new Set()
  for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var entry = array_1[_i]
    if (seenValues.has(entry)) {
      return entry
    } else {
      seenValues.add(entry)
    }
  }
  return void 0
}
function targetIsConstructorFunction(target) {
  return target.prototype !== void 0
}
function _throwIfMethodParameter(parameterName) {
  if (parameterName !== void 0) {
    throw new Error(INVALID_DECORATOR_OPERATION)
  }
}
function tagParameter(annotationTarget, parameterName, parameterIndex, metadata) {
  _throwIfMethodParameter(parameterName)
  _tagParameterOrProperty(TAGGED, annotationTarget, parameterIndex.toString(), metadata)
}
function tagProperty(annotationTarget, propertyName, metadata) {
  if (targetIsConstructorFunction(annotationTarget)) {
    throw new Error(INVALID_DECORATOR_OPERATION)
  }
  _tagParameterOrProperty(TAGGED_PROP, annotationTarget.constructor, propertyName, metadata)
}
function _ensureNoMetadataKeyDuplicates(metadata) {
  var metadatas = []
  if (Array.isArray(metadata)) {
    metadatas = metadata
    var duplicate = getFirstArrayDuplicate(
      metadatas.map(function (md) {
        return md.key
      })
    )
    if (duplicate !== void 0) {
      throw new Error(DUPLICATED_METADATA + " " + duplicate.toString())
    }
  } else {
    metadatas = [metadata]
  }
  return metadatas
}
function _tagParameterOrProperty(metadataKey, annotationTarget, key, metadata) {
  var metadatas = _ensureNoMetadataKeyDuplicates(metadata)
  var paramsOrPropertiesMetadata = {}
  if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
    paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget)
  }
  var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key]
  if (paramOrPropertyMetadata === void 0) {
    paramOrPropertyMetadata = []
  } else {
    var _loop_1 = function (m2) {
      if (
        metadatas.some(function (md) {
          return md.key === m2.key
        })
      ) {
        throw new Error(DUPLICATED_METADATA + " " + m2.key.toString())
      }
    }
    for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
      var m = paramOrPropertyMetadata_1[_i]
      _loop_1(m)
    }
  }
  paramOrPropertyMetadata.push.apply(paramOrPropertyMetadata, metadatas)
  paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata
  Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget)
}
function createTaggedDecorator(metadata) {
  return function (target, targetKey, indexOrPropertyDescriptor) {
    if (typeof indexOrPropertyDescriptor === "number") {
      tagParameter(target, targetKey, indexOrPropertyDescriptor, metadata)
    } else {
      tagProperty(target, targetKey, metadata)
    }
  }
}
function injectable() {
  return function (target) {
    if (Reflect.hasOwnMetadata(PARAM_TYPES, target)) {
      throw new Error(DUPLICATED_INJECTABLE_DECORATOR)
    }
    var types = Reflect.getMetadata(DESIGN_PARAM_TYPES, target) || []
    Reflect.defineMetadata(PARAM_TYPES, types, target)
    return target
  }
}
function injectBase(metadataKey) {
  return function (serviceIdentifier) {
    return function (target, targetKey, indexOrPropertyDescriptor) {
      if (serviceIdentifier === void 0) {
        var className = typeof target === "function" ? target.name : target.constructor.name
        throw new Error(UNDEFINED_INJECT_ANNOTATION(className))
      }
      return createTaggedDecorator(new Metadata(metadataKey, serviceIdentifier))(
        target,
        targetKey,
        indexOrPropertyDescriptor
      )
    }
  }
}
var inject = injectBase(INJECT_TAG)
const PLUGIN_SYSTEM_AUTO_UPDATE = "PLUGIN_SYSTEM_AUTO_UPDATE"
const PLUGIN_SYSTEM_PLUGIN = "PLUGIN_SYSTEM_PLUGIN"
const PLUGIN_SYSTEM_THIRD_PARTY_PLUGIN = "PLUGIN_SYSTEM_THIRD_PARTY_PLUGIN"
const PLUGIN_SYSTEM_SAFE_MODE_ENABLED = "PLUGIN_SYSTEM_SAFE_MODE_ENABLED"
const PLUGIN_STORE_URL = "PLUGIN_STORE_URL"
const defaultConfig = {
  [PLUGIN_SYSTEM_SAFE_MODE_ENABLED]: true,
  [PLUGIN_SYSTEM_AUTO_UPDATE]: true,
  [PLUGIN_SYSTEM_PLUGIN]: [{ key: "setting", enabled: true }],
  [PLUGIN_SYSTEM_THIRD_PARTY_PLUGIN]: [],
  [PLUGIN_STORE_URL]: "https://bitbucket.org/siyuan-plugin/siyuan-plugins/raw/main/",
}
function noop() {}
function assign(tar, src) {
  for (const k2 in src) tar[k2] = src[k2]
  return tar
}
function run(fn) {
  return fn()
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null)
}
function run_all(fns) {
  fns.forEach(run)
}
function is_function(thing) {
  return typeof thing === "function"
}
function safe_not_equal(a2, b2) {
  return a2 != a2 ? b2 == b2 : a2 !== b2 || (a2 && typeof a2 === "object") || typeof a2 === "function"
}
function is_empty(obj) {
  return Object.keys(obj).length === 0
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn)
    return definition[0](slot_ctx)
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty))
    if ($$scope.dirty === void 0) {
      return lets
    }
    if (typeof lets === "object") {
      const merged = []
      const len = Math.max($$scope.dirty.length, lets.length)
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i]
      }
      return merged
    }
    return $$scope.dirty | lets
  }
  return $$scope.dirty
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn)
    slot.p(slot_context, slot_changes)
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = []
    const length = $$scope.ctx.length / 32
    for (let i = 0; i < length; i++) {
      dirty[i] = -1
    }
    return dirty
  }
  return -1
}
function null_to_empty(value) {
  return value == null ? "" : value
}
function append(target, node) {
  target.appendChild(node)
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null)
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node)
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching)
  }
}
function element(name2) {
  return document.createElement(name2)
}
function svg_element(name2) {
  return document.createElementNS("http://www.w3.org/2000/svg", name2)
}
function text(data) {
  return document.createTextNode(data)
}
function space() {
  return text(" ")
}
function empty() {
  return text("")
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options)
  return () => node.removeEventListener(event, handler, options)
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute)
  else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value)
}
function xlink_attr(node, attribute, value) {
  node.setAttributeNS("http://www.w3.org/1999/xlink", attribute, value)
}
function children(element2) {
  return Array.from(element2.childNodes)
}
function set_data(text2, data) {
  data = "" + data
  if (text2.wholeText !== data) text2.data = data
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key)
  } else {
    node.style.setProperty(key, value, important ? "important" : "")
  }
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent")
  e.initCustomEvent(type, bubbles, cancelable, detail)
  return e
}
class HtmlTag {
  constructor(is_svg = false) {
    this.is_svg = false
    this.is_svg = is_svg
    this.e = this.n = null
  }
  c(html) {
    this.h(html)
  }
  m(html, target, anchor = null) {
    if (!this.e) {
      if (this.is_svg) this.e = svg_element(target.nodeName)
      else this.e = element(target.nodeName)
      this.t = target
      this.c(html)
    }
    this.i(anchor)
  }
  h(html) {
    this.e.innerHTML = html
    this.n = Array.from(this.e.childNodes)
  }
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert(this.t, this.n[i], anchor)
    }
  }
  p(html) {
    this.d()
    this.h(html)
    this.i(this.a)
  }
  d() {
    this.n.forEach(detach)
  }
}
function construct_svelte_component(component, props) {
  return new component(props)
}
let current_component
function set_current_component(component) {
  current_component = component
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization")
  return current_component
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn)
}
function createEventDispatcher() {
  const component = get_current_component()
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type]
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable })
      callbacks.slice().forEach((fn) => {
        fn.call(component, event)
      })
      return !event.defaultPrevented
    }
    return true
  }
}
const dirty_components = []
const binding_callbacks = []
const render_callbacks = []
const flush_callbacks = []
const resolved_promise = Promise.resolve()
let update_scheduled = false
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true
    resolved_promise.then(flush)
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn)
}
const seen_callbacks = /* @__PURE__ */ new Set()
let flushidx = 0
function flush() {
  if (flushidx !== 0) {
    return
  }
  const saved_component = current_component
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx]
        flushidx++
        set_current_component(component)
        update(component.$$)
      }
    } catch (e) {
      dirty_components.length = 0
      flushidx = 0
      throw e
    }
    set_current_component(null)
    dirty_components.length = 0
    flushidx = 0
    while (binding_callbacks.length) binding_callbacks.pop()()
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i]
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback)
        callback()
      }
    }
    render_callbacks.length = 0
  } while (dirty_components.length)
  while (flush_callbacks.length) {
    flush_callbacks.pop()()
  }
  update_scheduled = false
  seen_callbacks.clear()
  set_current_component(saved_component)
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update()
    run_all($$.before_update)
    const dirty = $$.dirty
    $$.dirty = [-1]
    $$.fragment && $$.fragment.p($$.ctx, dirty)
    $$.after_update.forEach(add_render_callback)
  }
}
const outroing = /* @__PURE__ */ new Set()
let outros
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros,
    // parent group
  }
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c)
  }
  outros = outros.p
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block)
    block.i(local)
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return
    outroing.add(block)
    outros.c.push(() => {
      outroing.delete(block)
      if (callback) {
        if (detach2) block.d(1)
        callback()
      }
    })
    block.o(local)
  } else if (callback) {
    callback()
  }
}
function create_component(block) {
  block && block.c()
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$
  fragment && fragment.m(target, anchor)
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function)
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy)
      } else {
        run_all(new_on_destroy)
      }
      component.$$.on_mount = []
    })
  }
  after_update.forEach(add_render_callback)
}
function destroy_component(component, detaching) {
  const $$ = component.$$
  if ($$.fragment !== null) {
    run_all($$.on_destroy)
    $$.fragment && $$.fragment.d(detaching)
    $$.on_destroy = $$.fragment = null
    $$.ctx = []
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component)
    schedule_update()
    component.$$.dirty.fill(0)
  }
  component.$$.dirty[(i / 31) | 0] |= 1 << i % 31
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component
  set_current_component(component)
  const $$ = (component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root,
  })
  append_styles && append_styles($$.root)
  let ready = false
  $$.ctx = instance2
    ? instance2(component, options.props || {}, (i, ret, ...rest) => {
        const value = rest.length ? rest[0] : ret
        if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
          if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value)
          if (ready) make_dirty(component, i)
        }
        return ret
      })
    : []
  $$.update()
  ready = true
  run_all($$.before_update)
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target)
      $$.fragment && $$.fragment.l(nodes)
      nodes.forEach(detach)
    } else {
      $$.fragment && $$.fragment.c()
    }
    if (options.intro) transition_in(component.$$.fragment)
    mount_component(component, options.target, options.anchor, options.customElement)
    flush()
  }
  set_current_component(parent_component)
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1)
    this.$destroy = noop
  }
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = [])
    callbacks.push(callback)
    return () => {
      const index = callbacks.indexOf(callback)
      if (index !== -1) callbacks.splice(index, 1)
    }
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true
      this.$$set($$props)
      this.$$.skip_bound = false
    }
  }
}
const commandPanel_svelte_svelte_type_style_lang = ""
function get_each_context$4(ctx, list, i) {
  const child_ctx = ctx.slice()
  child_ctx[11] = list[i]
  child_ctx[13] = i
  return child_ctx
}
function create_if_block$5(ctx) {
  let each_1_anchor
  let each_value =
    /*result*/
    ctx[2]
  let each_blocks = []
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i))
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c()
      }
      each_1_anchor = empty()
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor)
      }
      insert(target, each_1_anchor, anchor)
    },
    p(ctx2, dirty) {
      if (dirty /*currentIndex, onClick, result, _*/ & 22) {
        each_value = /*result*/ ctx2[2]
        let i
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$4(ctx2, each_value, i)
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty)
          } else {
            each_blocks[i] = create_each_block$4(child_ctx)
            each_blocks[i].c()
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor)
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1)
        }
        each_blocks.length = each_value.length
      }
    },
    d(detaching) {
      destroy_each(each_blocks, detaching)
      if (detaching) detach(each_1_anchor)
    },
  }
}
function create_if_block_1$4(ctx) {
  let div
  let t0_value = _("shortcut") + ""
  let t0
  let t1
  let t2_value =
    /*com*/
    ctx[11].shortcut + ""
  let t2
  return {
    c() {
      div = element("div")
      t0 = text(t0_value)
      t1 = text(": ")
      t2 = text(t2_value)
      attr(div, "class", "command-shortcut svelte-1bq7axd")
    },
    m(target, anchor) {
      insert(target, div, anchor)
      append(div, t0)
      append(div, t1)
      append(div, t2)
    },
    p(ctx2, dirty) {
      if (dirty /*result*/ & 4 && t2_value !== (t2_value = /*com*/ ctx2[11].shortcut + "")) set_data(t2, t2_value)
    },
    d(detaching) {
      if (detaching) detach(div)
    },
  }
}
function create_each_block$4(ctx) {
  let div
  let span0
  let t0_value =
    /*com*/
    ctx[11].pluginName + ""
  let t0
  let t1
  let t2_value = ":"
  let t2
  let t3
  let span1
  let t4_value =
    /*com*/
    ctx[11].command + ""
  let t4
  let t5
  let t6_value =
    /*com*/
    (ctx[11].description || "") + ""
  let t6
  let t7
  let t8
  let div_class_value
  let mounted
  let dispose
  let if_block =
    /*com*/
    ctx[11].shortcut && create_if_block_1$4(ctx)
  function click_handler() {
    return (
      /*click_handler*/
      ctx[7](
        /*i*/
        ctx[13]
      )
    )
  }
  return {
    c() {
      div = element("div")
      span0 = element("span")
      t0 = text(t0_value)
      t1 = space()
      t2 = text(t2_value)
      t3 = space()
      span1 = element("span")
      t4 = text(t4_value)
      t5 = space()
      t6 = text(t6_value)
      t7 = space()
      if (if_block) if_block.c()
      t8 = space()
      attr(span0, "class", "command-plugin svelte-1bq7axd")
      attr(span1, "class", "command-description")
      attr(
        div,
        "class",
        (div_class_value =
          null_to_empty(
            /*i*/
            ctx[13] /*currentIndex*/ === ctx[1] ? "command-selected command" : "command"
          ) + " svelte-1bq7axd")
      )
    },
    m(target, anchor) {
      insert(target, div, anchor)
      append(div, span0)
      append(span0, t0)
      append(span0, t1)
      append(span0, t2)
      append(div, t3)
      append(div, span1)
      append(span1, t4)
      append(span1, t5)
      append(span1, t6)
      append(div, t7)
      if (if_block) if_block.m(div, null)
      append(div, t8)
      if (!mounted) {
        dispose = listen(div, "click", click_handler)
        mounted = true
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      if (dirty /*result*/ & 4 && t0_value !== (t0_value = /*com*/ ctx[11].pluginName + "")) set_data(t0, t0_value)
      if (dirty /*result*/ & 4 && t4_value !== (t4_value = /*com*/ ctx[11].command + "")) set_data(t4, t4_value)
      if (dirty /*result*/ & 4 && t6_value !== (t6_value = /*com*/ (ctx[11].description || "") + ""))
        set_data(t6, t6_value)
      if (
        /*com*/
        ctx[11].shortcut
      ) {
        if (if_block) {
          if_block.p(ctx, dirty)
        } else {
          if_block = create_if_block_1$4(ctx)
          if_block.c()
          if_block.m(div, t8)
        }
      } else if (if_block) {
        if_block.d(1)
        if_block = null
      }
      if (
        dirty /*currentIndex*/ & 2 &&
        div_class_value !==
          (div_class_value =
            null_to_empty(
              /*i*/
              ctx[13] /*currentIndex*/ === ctx[1] ? "command-selected command" : "command"
            ) + " svelte-1bq7axd")
      ) {
        attr(div, "class", div_class_value)
      }
    },
    d(detaching) {
      if (detaching) detach(div)
      if (if_block) if_block.d()
      mounted = false
      dispose()
    },
  }
}
function create_fragment$7(ctx) {
  let div1
  let div0
  let svg
  let path
  let t0
  let input
  let t1
  let mounted
  let dispose
  let if_block =
    /*result*/
    ctx[2] && create_if_block$5(ctx)
  return {
    c() {
      div1 = element("div")
      div0 = element("div")
      svg = svg_element("svg")
      path = svg_element("path")
      t0 = space()
      input = element("input")
      t1 = space()
      if (if_block) if_block.c()
      attr(
        path,
        "d",
        "M64 112v800h896V112H64z m846 750H114V162h796v700zM234.6 688.8L411.3 512 234.6 335.2l35.4-35.4L482.1 512 269.9 724.1l-35.3-35.3z m554.8-10.2h-300v-50h300v50z"
      )
      set_style(svg, "left", "14px")
      attr(svg, "class", "b3-form__icon-icon")
      attr(svg, "viewBox", "0 0 1024 1024")
      attr(svg, "version", "1.1")
      attr(svg, "xmlns", "http://www.w3.org/2000/svg")
      attr(svg, "width", "200")
      attr(svg, "height", "200")
      attr(input, "id", "commandPanelInput")
      attr(input, "class", "b3-text-field b3-text-field--text fn__block b3-form__icon-input")
      attr(div0, "class", "b3-form__icon search__header")
      attr(div1, "class", "fn__flex-column")
      set_style(div1, "border-radius", "4px")
      set_style(div1, "overflow", "hidden")
      set_style(div1, "position", "relative")
      set_style(div1, "width", "max(80vw, 1000px)")
    },
    m(target, anchor) {
      insert(target, div1, anchor)
      append(div1, div0)
      append(div0, svg)
      append(svg, path)
      append(div0, t0)
      append(div0, input)
      set_input_value(
        input,
        /*command*/
        ctx[0]
      )
      append(div1, t1)
      if (if_block) if_block.m(div1, null)
      if (!mounted) {
        dispose = [
          listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[6]
          ),
          listen(
            input,
            "keydown",
            /*onkeypress*/
            ctx[3]
          ),
        ]
        mounted = true
      }
    },
    p(ctx2, [dirty]) {
      if (dirty /*command*/ & 1 && input.value /*command*/ !== ctx2[0]) {
        set_input_value(
          input,
          /*command*/
          ctx2[0]
        )
      }
      if (
        /*result*/
        ctx2[2]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty)
        } else {
          if_block = create_if_block$5(ctx2)
          if_block.c()
          if_block.m(div1, null)
        }
      } else if (if_block) {
        if_block.d(1)
        if_block = null
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) detach(div1)
      if (if_block) if_block.d()
      mounted = false
      run_all(dispose)
    },
  }
}
function instance$7($$self, $$props, $$invalidate) {
  const commandManager = container.get("CommandManager")
  let commands = []
  let command = ""
  let currentIndex = 0
  let result = []
  const onkeypress = (e) => {
    if (e.keyCode === 13) {
      onEnter()
      return
    }
    if (e.keyCode === 38) {
      e.preventDefault()
      if (currentIndex === 0) {
        return
      }
      $$invalidate(1, currentIndex--, currentIndex)
      return
    }
    if (e.keyCode === 40) {
      const len = result.length
      e.preventDefault()
      if (currentIndex >= len - 1) {
        return
      }
      $$invalidate(1, currentIndex++, currentIndex)
    }
  }
  const onEnter = () => {
    const com = result[currentIndex]
    Dialog.destroyAll()
    com.callback()
  }
  const onClick = (i) => {
    $$invalidate(1, (currentIndex = i))
    onEnter()
  }
  const hasContent = (v, c) => v && v.toLowerCase().indexOf(c.toLowerCase()) >= 0
  onMount(() => {
    $$invalidate(5, (commands = commandManager.getCommands()))
    const el = document.getElementById("commandPanelInput")
    el.focus()
  })
  function input_input_handler() {
    command = this.value
    $$invalidate(0, command)
  }
  const click_handler = (i) => onClick(i)
  $$self.$$.update = () => {
    if ($$self.$$.dirty /*command, commands*/ & 33) {
      {
        $$invalidate(1, (currentIndex = 0))
        if (!command) {
          $$invalidate(2, (result = commands))
        } else {
          $$invalidate(
            2,
            (result = commands.filter((c) => {
              return (
                hasContent(c.plugin, command) ||
                hasContent(c.pluginName, command) ||
                hasContent(c.command, command) ||
                hasContent(c.description, command)
              )
            }))
          )
        }
      }
    }
  }
  return [command, currentIndex, result, onkeypress, onClick, commands, input_input_handler, click_handler]
}
class Command_panel extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {})
  }
}
class CommandPanelPlugin extends Plugin {
  onload() {
    this.registerCommand({
      command: "Show command panel",
      description: _("show_command_panel"),
      shortcut: "ctrl+shift+o,command+shift+o",
      callback: () => {
        this.showPanel()
      },
    })
  }
  showPanel() {
    Dialog.destroyAll()
    new Dialog({ content: '<div id="command-panel"></div>' })
    setImmediate(() => {
      new Command_panel({
        target: document.getElementById("command-panel"),
      })
    })
  }
}
function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice()
  child_ctx[5] = list[i]
  child_ctx[6] = list
  child_ctx[7] = i
  return child_ctx
}
function create_if_block_1$3(ctx) {
  let input
  let mounted
  let dispose
  function input_input_handler() {
    ctx[2].call(
      input,
      /*each_value*/
      ctx[6],
      /*config_index*/
      ctx[7]
    )
  }
  return {
    c() {
      input = element("input")
      attr(input, "class", "b3-text-field fn__flex-center fn__size200")
      attr(input, "type", "input")
    },
    m(target, anchor) {
      insert(target, input, anchor)
      set_input_value(
        input,
        /*config*/
        ctx[5].value
      )
      if (!mounted) {
        dispose = [
          listen(input, "input", input_input_handler),
          listen(input, "change", function () {
            if (
              is_function(
                /*config*/
                ctx[5].onChange
              )
            )
              ctx[5].onChange.apply(this, arguments)
          }),
        ]
        mounted = true
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      if (dirty /*configs*/ & 1) {
        set_input_value(
          input,
          /*config*/
          ctx[5].value
        )
      }
    },
    d(detaching) {
      if (detaching) detach(input)
      mounted = false
      run_all(dispose)
    },
  }
}
function create_if_block$4(ctx) {
  let input
  let mounted
  let dispose
  function input_change_handler() {
    ctx[1].call(
      input,
      /*each_value*/
      ctx[6],
      /*config_index*/
      ctx[7]
    )
  }
  return {
    c() {
      input = element("input")
      attr(input, "class", "b3-switch fn__flex-center")
      attr(input, "type", "checkbox")
    },
    m(target, anchor) {
      insert(target, input, anchor)
      input.checked = /*config*/ ctx[5].checked
      if (!mounted) {
        dispose = [
          listen(input, "change", input_change_handler),
          listen(input, "change", function () {
            if (
              is_function(
                /*config*/
                ctx[5].onChange
              )
            )
              ctx[5].onChange.apply(this, arguments)
          }),
        ]
        mounted = true
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      if (dirty /*configs*/ & 1) {
        input.checked = /*config*/ ctx[5].checked
      }
    },
    d(detaching) {
      if (detaching) detach(input)
      mounted = false
      run_all(dispose)
    },
  }
}
function create_each_block$3(ctx) {
  let label
  let div1
  let t0_value =
    /*config*/
    ctx[5].label + ""
  let t0
  let t1
  let div0
  let t2_value =
    /*config*/
    ctx[5].tip + ""
  let t2
  let t3
  let span
  let t4
  let t5
  function select_block_type(ctx2, dirty) {
    if (
      /*config*/
      ctx2[5].type === "checkbox"
    )
      return create_if_block$4
    if (
      /*config*/
      ctx2[5].type === "input"
    )
      return create_if_block_1$3
  }
  let current_block_type = select_block_type(ctx)
  let if_block = current_block_type && current_block_type(ctx)
  return {
    c() {
      label = element("label")
      div1 = element("div")
      t0 = text(t0_value)
      t1 = space()
      div0 = element("div")
      t2 = text(t2_value)
      t3 = space()
      span = element("span")
      t4 = space()
      if (if_block) if_block.c()
      t5 = space()
      attr(div0, "class", "b3-label__text")
      attr(div1, "class", "fn__flex-1")
      attr(span, "class", "fn__space")
      attr(label, "class", "fn__flex b3-label config__item")
    },
    m(target, anchor) {
      insert(target, label, anchor)
      append(label, div1)
      append(div1, t0)
      append(div1, t1)
      append(div1, div0)
      append(div0, t2)
      append(label, t3)
      append(label, span)
      append(label, t4)
      if (if_block) if_block.m(label, null)
      append(label, t5)
    },
    p(ctx2, dirty) {
      if (dirty /*configs*/ & 1 && t0_value !== (t0_value = /*config*/ ctx2[5].label + "")) set_data(t0, t0_value)
      if (dirty /*configs*/ & 1 && t2_value !== (t2_value = /*config*/ ctx2[5].tip + "")) set_data(t2, t2_value)
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty)
      } else {
        if (if_block) if_block.d(1)
        if_block = current_block_type && current_block_type(ctx2)
        if (if_block) {
          if_block.c()
          if_block.m(label, t5)
        }
      }
    },
    d(detaching) {
      if (detaching) detach(label)
      if (if_block) {
        if_block.d()
      }
    },
  }
}
function create_fragment$6(ctx) {
  let each_1_anchor
  let each_value =
    /*configs*/
    ctx[0]
  let each_blocks = []
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i))
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c()
      }
      each_1_anchor = empty()
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor)
      }
      insert(target, each_1_anchor, anchor)
    },
    p(ctx2, [dirty]) {
      if (dirty /*configs*/ & 1) {
        each_value = /*configs*/ ctx2[0]
        let i
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$3(ctx2, each_value, i)
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty)
          } else {
            each_blocks[i] = create_each_block$3(child_ctx)
            each_blocks[i].c()
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor)
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1)
        }
        each_blocks.length = each_value.length
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      destroy_each(each_blocks, detaching)
      if (detaching) detach(each_1_anchor)
    },
  }
}
function instance$6($$self, $$props, $$invalidate) {
  const storageManager = container.get(TYPES.StorageManager)
  const pluginSystem = container.get(TYPES.PluginSystem)
  let configs = [
    {
      label: _("safemode"),
      tip: _("safemodetip"),
      checked: true,
      type: "checkbox",
      onChange: (event) => {
        const checked = event.target.checked
        if (checked) {
          pluginSystem.turnOnSafeMode()
        } else {
          pluginSystem.turnOffSafeMode()
        }
      },
    },
    // {
    //     label: _('autoupgrade'),
    //     tip: _('autoupgradetip'),
    //     checked: true,
    //     type: 'checkbox',
    //     onChange: (event) => {
    //         storageManager.set(PLUGIN_SYSTEM_AUTO_UPDATE, event.target.checked);
    //     },
    // },
    {
      label: _("store_url"),
      tip: `${_("store_url_tip")} ${defaultConfig.PLUGIN_STORE_URL}`,
      type: "input",
      value: storageManager.get(PLUGIN_STORE_URL),
      onChange: (event) => {
        storageManager.set(PLUGIN_STORE_URL, event.target.value)
      },
    },
  ]
  onMount(() => {
    const securityMode = storageManager.get(PLUGIN_SYSTEM_SAFE_MODE_ENABLED)
    $$invalidate(0, (configs[0].checked = securityMode), configs)
    const autoUpdate = storageManager.get(PLUGIN_SYSTEM_AUTO_UPDATE)
    $$invalidate(0, (configs[1].checked = autoUpdate), configs)
  })
  function input_change_handler(each_value, config_index) {
    each_value[config_index].checked = this.checked
    $$invalidate(0, configs)
  }
  function input_input_handler(each_value, config_index) {
    each_value[config_index].value = this.value
    $$invalidate(0, configs)
  }
  return [configs, input_change_handler, input_input_handler]
}
class Setting_common extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {})
  }
}
const settingList_svelte_svelte_type_style_lang = ""
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice()
  child_ctx[10] = list[i]
  child_ctx[11] = list
  child_ctx[12] = i
  return child_ctx
}
function create_if_block$3(ctx) {
  let label
  let div1
  let t0_value =
    /*plugin*/
    ctx[10].name + ""
  let t0
  let t1
  let t2_value =
    /*plugin*/
    ctx[10].version + ""
  let t2
  let t3
  let span0
  let t5
  let div0
  let t6_value =
    /*plugin*/
    (ctx[10].description || _("nodescription")) + ""
  let t6
  let t7
  let span1
  let t8
  let input
  let t9
  let mounted
  let dispose
  function click_handler(...args) {
    return (
      /*click_handler*/
      ctx[4](
        /*plugin*/
        ctx[10],
        ...args
      )
    )
  }
  function input_change_handler() {
    ctx[5].call(
      input,
      /*each_value*/
      ctx[11],
      /*plugin_index*/
      ctx[12]
    )
  }
  return {
    c() {
      label = element("label")
      div1 = element("div")
      t0 = text(t0_value)
      t1 = space()
      t2 = text(t2_value)
      t3 = space()
      span0 = element("span")
      span0.textContent = `${_("uninstall")}`
      t5 = space()
      div0 = element("div")
      t6 = text(t6_value)
      t7 = space()
      span1 = element("span")
      t8 = space()
      input = element("input")
      t9 = space()
      attr(span0, "class", "remove svelte-bwhxpp")
      attr(div0, "class", "b3-label__text")
      attr(div1, "class", "plugin fn__flex-1 svelte-bwhxpp")
      attr(span1, "class", "fn__space")
      attr(input, "class", "b3-switch fn__flex-center")
      attr(input, "id", "fullWidth")
      attr(input, "type", "checkbox")
      attr(label, "class", "fn__flex b3-label")
    },
    m(target, anchor) {
      insert(target, label, anchor)
      append(label, div1)
      append(div1, t0)
      append(div1, t1)
      append(div1, t2)
      append(div1, t3)
      append(div1, span0)
      append(div1, t5)
      append(div1, div0)
      append(div0, t6)
      append(label, t7)
      append(label, span1)
      append(label, t8)
      append(label, input)
      input.checked = /*plugin*/ ctx[10].enabled
      append(label, t9)
      if (!mounted) {
        dispose = [
          listen(span0, "click", click_handler),
          listen(input, "change", input_change_handler),
          listen(input, "change", function () {
            if (
              is_function(
                /*onPluginEnabledChange*/
                ctx[1](
                  /*plugin*/
                  ctx[10].key
                )
              )
            )
              ctx[1](
                /*plugin*/
                ctx[10].key
              ).apply(this, arguments)
          }),
        ]
        mounted = true
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      if (dirty /*outsidePlugins*/ & 1 && t0_value !== (t0_value = /*plugin*/ ctx[10].name + "")) set_data(t0, t0_value)
      if (dirty /*outsidePlugins*/ & 1 && t2_value !== (t2_value = /*plugin*/ ctx[10].version + ""))
        set_data(t2, t2_value)
      if (
        dirty /*outsidePlugins*/ & 1 &&
        t6_value !== (t6_value = /*plugin*/ (ctx[10].description || _("nodescription")) + "")
      )
        set_data(t6, t6_value)
      if (dirty /*outsidePlugins*/ & 1) {
        input.checked = /*plugin*/ ctx[10].enabled
      }
    },
    d(detaching) {
      if (detaching) detach(label)
      mounted = false
      run_all(dispose)
    },
  }
}
function create_each_block$2(ctx) {
  let if_block_anchor
  let if_block = !(/*plugin*/ ctx[10].hidden) && create_if_block$3(ctx)
  return {
    c() {
      if (if_block) if_block.c()
      if_block_anchor = empty()
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor)
      insert(target, if_block_anchor, anchor)
    },
    p(ctx2, dirty) {
      if (!(/*plugin*/ ctx2[10].hidden)) {
        if (if_block) {
          if_block.p(ctx2, dirty)
        } else {
          if_block = create_if_block$3(ctx2)
          if_block.c()
          if_block.m(if_block_anchor.parentNode, if_block_anchor)
        }
      } else if (if_block) {
        if_block.d(1)
        if_block = null
      }
    },
    d(detaching) {
      if (if_block) if_block.d(detaching)
      if (detaching) detach(if_block_anchor)
    },
  }
}
function create_fragment$5(ctx) {
  let label
  let div
  let each_value =
    /*outsidePlugins*/
    ctx[0]
  let each_blocks = []
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i))
  }
  return {
    c() {
      label = element("label")
      div = element("div")
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c()
      }
      attr(div, "class", "fn__flex-1")
      attr(label, "class", "b3-label fn__flex")
    },
    m(target, anchor) {
      insert(target, label, anchor)
      append(label, div)
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null)
      }
    },
    p(ctx2, [dirty]) {
      if (dirty /*outsidePlugins, onPluginEnabledChange, _, uninstall*/ & 7) {
        each_value = /*outsidePlugins*/ ctx2[0]
        let i
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i)
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty)
          } else {
            each_blocks[i] = create_each_block$2(child_ctx)
            each_blocks[i].c()
            each_blocks[i].m(div, null)
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1)
        }
        each_blocks.length = each_value.length
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) detach(label)
      destroy_each(each_blocks, detaching)
    },
  }
}
function instance$5($$self, $$props, $$invalidate) {
  let outsidePlugins
  const storageManager = container.get(TYPES.StorageManager)
  const pluginSystem = container.get(TYPES.PluginSystem)
  let plugins = []
  const loadPlugins = () => {
    $$invalidate(3, (plugins = storageManager.getPlugins()))
  }
  const dispatcher = createEventDispatcher()
  const onPluginEnabledChange = (key) => async (event) => {
    const safeMode = storageManager.get(PLUGIN_SYSTEM_SAFE_MODE_ENABLED)
    const checked = event.target.checked
    await storageManager.setPluginEnabled(key, checked)
    if (safeMode) {
      return
    }
    if (checked) {
      pluginSystem.loadPlugin(key)
    } else {
      pluginSystem.unloadPlugin(key)
    }
    dispatcher("update")
  }
  const uninstall2 = async (key, event) => {
    event.preventDefault()
    event.stopPropagation()
    await pluginSystem.unloadPlugin(key)
    await storageManager.uninstallPlugin(key)
    await storageManager.initStorage()
    loadPlugins()
  }
  onMount(async () => {
    await storageManager.initStorage()
    loadPlugins()
  })
  const click_handler = (plugin2, event) => uninstall2(plugin2.key, event)
  function input_change_handler(each_value, plugin_index) {
    each_value[plugin_index].enabled = this.checked
    $$invalidate(0, outsidePlugins), $$invalidate(3, plugins)
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty /*plugins*/ & 8) {
      $$invalidate(0, (outsidePlugins = plugins.filter((p) => p.script)))
    }
  }
  return [outsidePlugins, onPluginEnabledChange, uninstall2, plugins, click_handler, input_change_handler]
}
class Setting_list extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {})
  }
}
var __defProp$9 = Object.defineProperty
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$9(target, key, result)
  return result
}
var __decorateParam$6 = (index, decorator) => (target, key) => decorator(target, key, index)
let Store = class {
  constructor(storageManager) {
    this.storageManager = storageManager
    this.plugins = []
    this.pluginStatus = []
  }
  async init() {
    this.plugins = []
    this.pluginStatus = []
    await Promise.all([this.loadPluginsFromUrl(), this.storageManager.initStorage()])
    const plugins = this.storageManager.getPlugins()
    const storePlugins = []
    for (const plugin2 of this.plugins) {
      const p = { ...plugin2, isExist: false, needUpgrade: false }
      const oldPlugin = plugins.find((p2) => p2.key === plugin2.key)
      if (oldPlugin) {
        p.isExist = true
        const pV = new semver.SemVer(p.version)
        const oldPluginV = new semver.SemVer(oldPlugin.version)
        if (pV.compare(oldPluginV) === 1) {
          p.needUpgrade = true
        }
      }
      storePlugins.push(p)
    }
    this.pluginStatus = storePlugins
  }
  getStoreUrl() {
    return this.storageManager.get(PLUGIN_STORE_URL)
  }
  getPlugins() {
    return this.plugins
  }
  async loadPlugins() {
    await this.init()
    return this.getPluginsWithStatus()
  }
  getPluginsWithStatus() {
    return this.pluginStatus
  }
  async loadPluginsFromUrl() {
    var _a2, _b
    const storeUrl = this.getStoreUrl()
    if (!storeUrl) {
      return
    }
    let res
    try {
      res = await request.get(storeUrl + "/plugins.json", {
        headers: {
          "Cache-Control": "no-cache",
        },
      })
    } catch (e) {
      console.error(e)
      return
    }
    const req = []
    if (Array.isArray((_a2 = res.data) == null ? void 0 : _a2.plugins)) {
      for (const pluginKey of ((_b = res.data) == null ? void 0 : _b.plugins) || {}) {
        const plugin2 = this.getPluginManifest(`${storeUrl}/${pluginKey}`)
        req.push(plugin2)
      }
    }
    this.plugins = await Promise.all(req)
  }
  async getPluginByUrl(url2) {
    return Promise.all([this.getPluginManifest(url2), this.getPluginMainJs(url2)]).then((value) => {
      return {
        manifest: value[0],
        mainJs: value[1],
      }
    })
  }
  async getPluginManifest(url2) {
    try {
      const manifest = await request.get(`${url2}/manifest.json`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      })
      return manifest.data
    } catch (e) {
      console.error(e)
      return null
    }
  }
  async getPluginMainJs(url2) {
    try {
      const res = await request.get(`${url2}/main.js`, {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-cache",
        },
      })
      return res.data
    } catch (e) {
      console.error(e)
      return null
    }
  }
  async getPluginReadme(key) {
    const url2 = `${this.getStoreUrl()}/${key}`
    try {
      const res = await request.get(`${url2}/README.md`, {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-cache",
        },
      })
      return res.data
    } catch (e) {
      console.error(e)
      return null
    }
  }
  async downloadPlugin(key) {
    await sleep(500)
    const files = await this.getPluginByUrl(`${this.getStoreUrl()}/${key}`)
    const manifestJson = files.manifest
    const mainJs = files.mainJs
    return await Promise.all([
      FileClient.getInstanceApi().fileApi.putFile(`/data/plugins/${key}`, null, true),
      FileClient.getInstanceApi().fileApi.putFile(
        `/data/plugins/${key}/manifest.json`,
        JSON.stringify(manifestJson),
        false
      ),
      FileClient.getInstanceApi().fileApi.putFile(`/data/plugins/${key}/main.js`, mainJs, false),
    ])
  }
}
Store = __decorateClass$9([injectable(), __decorateParam$6(0, inject(TYPES.StorageManager))], Store)
function create_fragment$4(ctx) {
  let button
  let current
  let mounted
  let dispose
  const default_slot_template =
    /*#slots*/
    ctx[3].default
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[2],
    null
  )
  return {
    c() {
      button = element("button")
      if (default_slot) default_slot.c()
      button.disabled = /*disabled*/ ctx[1]
      attr(button, "class", "b3-button")
    },
    m(target, anchor) {
      insert(target, button, anchor)
      if (default_slot) {
        default_slot.m(button, null)
      }
      current = true
      if (!mounted) {
        dispose = listen(button, "click", function () {
          if (
            is_function(
              /*onClick*/
              ctx[0]
            )
          )
            ctx[0].apply(this, arguments)
        })
        mounted = true
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx
      if (default_slot) {
        if (default_slot.p && (!current || dirty /*$$scope*/ & 4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[2],
            !current
              ? get_all_dirty_from_scope(
                  /*$$scope*/
                  ctx[2]
                )
              : get_slot_changes(
                  default_slot_template,
                  /*$$scope*/
                  ctx[2],
                  dirty,
                  null
                ),
            null
          )
        }
      }
      if (!current || dirty /*disabled*/ & 2) {
        button.disabled = /*disabled*/ ctx[1]
      }
    },
    i(local) {
      if (current) return
      transition_in(default_slot, local)
      current = true
    },
    o(local) {
      transition_out(default_slot, local)
      current = false
    },
    d(detaching) {
      if (detaching) detach(button)
      if (default_slot) default_slot.d(detaching)
      mounted = false
      dispose()
    },
  }
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props
  let { onClick = null } = $$props
  let { disabled = false } = $$props
  $$self.$$set = ($$props2) => {
    if ("onClick" in $$props2) $$invalidate(0, (onClick = $$props2.onClick))
    if ("disabled" in $$props2) $$invalidate(1, (disabled = $$props2.disabled))
    if ("$$scope" in $$props2) $$invalidate(2, ($$scope = $$props2.$$scope))
  }
  return [onClick, disabled, $$scope, slots]
}
class Button extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { onClick: 0, disabled: 1 })
  }
}
const settingPreview_svelte_svelte_type_style_lang = ""
function create_if_block_4$1(ctx) {
  let div
  let t0_value = _("url") + ""
  let t0
  let t1
  let a2
  let t2_value =
    /*plugin*/
    ctx[0].url + ""
  let t2
  let a_href_value
  return {
    c() {
      div = element("div")
      t0 = text(t0_value)
      t1 = text(": ")
      a2 = element("a")
      t2 = text(t2_value)
      attr(a2, "href", (a_href_value = /*plugin*/ ctx[0].url))
      attr(a2, "target", "_blank")
      attr(a2, "rel", "noreferrer")
      attr(div, "class", "plugin-item")
    },
    m(target, anchor) {
      insert(target, div, anchor)
      append(div, t0)
      append(div, t1)
      append(div, a2)
      append(a2, t2)
    },
    p(ctx2, dirty) {
      if (dirty /*plugin*/ & 1 && t2_value !== (t2_value = /*plugin*/ ctx2[0].url + "")) set_data(t2, t2_value)
      if (dirty /*plugin*/ & 1 && a_href_value !== (a_href_value = /*plugin*/ ctx2[0].url)) {
        attr(a2, "href", a_href_value)
      }
    },
    d(detaching) {
      if (detaching) detach(div)
    },
  }
}
function create_if_block_3$1(ctx) {
  let div
  let t0_value = _("author") + ""
  let t0
  let t1
  let t2_value =
    /*plugin*/
    ctx[0].author + ""
  let t2
  return {
    c() {
      div = element("div")
      t0 = text(t0_value)
      t1 = text(": ")
      t2 = text(t2_value)
      attr(div, "class", "plugin-item")
    },
    m(target, anchor) {
      insert(target, div, anchor)
      append(div, t0)
      append(div, t1)
      append(div, t2)
    },
    p(ctx2, dirty) {
      if (dirty /*plugin*/ & 1 && t2_value !== (t2_value = /*plugin*/ ctx2[0].author + "")) set_data(t2, t2_value)
    },
    d(detaching) {
      if (detaching) detach(div)
    },
  }
}
function create_if_block_2$1(ctx) {
  let div
  let t0_value = _("version") + ""
  let t0
  let t1
  let t2_value =
    /*plugin*/
    ctx[0].version + ""
  let t2
  return {
    c() {
      div = element("div")
      t0 = text(t0_value)
      t1 = text(": ")
      t2 = text(t2_value)
      attr(div, "class", "plugin-item")
    },
    m(target, anchor) {
      insert(target, div, anchor)
      append(div, t0)
      append(div, t1)
      append(div, t2)
    },
    p(ctx2, dirty) {
      if (dirty /*plugin*/ & 1 && t2_value !== (t2_value = /*plugin*/ ctx2[0].version + "")) set_data(t2, t2_value)
    },
    d(detaching) {
      if (detaching) detach(div)
    },
  }
}
function create_if_block_1$2(ctx) {
  let div
  let t0_value = _("description") + ""
  let t0
  let t1
  let t2_value =
    /*plugin*/
    ctx[0].description + ""
  let t2
  return {
    c() {
      div = element("div")
      t0 = text(t0_value)
      t1 = text(": ")
      t2 = text(t2_value)
      attr(div, "class", "plugin-item")
    },
    m(target, anchor) {
      insert(target, div, anchor)
      append(div, t0)
      append(div, t1)
      append(div, t2)
    },
    p(ctx2, dirty) {
      if (dirty /*plugin*/ & 1 && t2_value !== (t2_value = /*plugin*/ ctx2[0].description + "")) set_data(t2, t2_value)
    },
    d(detaching) {
      if (detaching) detach(div)
    },
  }
}
function create_else_block$2(ctx) {
  let html_tag
  let raw_value =
    /*previewHTML*/
    ctx[2]() + ""
  let html_anchor
  return {
    c() {
      html_tag = new HtmlTag(false)
      html_anchor = empty()
      html_tag.a = html_anchor
    },
    m(target, anchor) {
      html_tag.m(raw_value, target, anchor)
      insert(target, html_anchor, anchor)
    },
    p(ctx2, dirty) {
      if (dirty /*previewHTML*/ & 4 && raw_value !== (raw_value = /*previewHTML*/ ctx2[2]() + "")) html_tag.p(raw_value)
    },
    d(detaching) {
      if (detaching) detach(html_anchor)
      if (detaching) html_tag.d()
    },
  }
}
function create_if_block$2(ctx) {
  let span
  return {
    c() {
      span = element("span")
      span.textContent = `${_("readme")}`
    },
    m(target, anchor) {
      insert(target, span, anchor)
    },
    p: noop,
    d(detaching) {
      if (detaching) detach(span)
    },
  }
}
function create_fragment$3(ctx) {
  let div6
  let div4
  let div2
  let div0
  let t0_value =
    /*plugin*/
    ctx[0].name + ""
  let t0
  let t1
  let div1
  let t2
  let t3_value =
    /*plugin*/
    ctx[0].key + ""
  let t3
  let t4
  let t5
  let button
  let svg
  let use
  let t6_value = _("goBack") + ""
  let t6
  let t7
  let div3
  let t8
  let t9
  let t10
  let t11
  let hr
  let t12
  let div5
  let mounted
  let dispose
  let if_block0 =
    /*plugin*/
    ctx[0].url && create_if_block_4$1(ctx)
  let if_block1 =
    /*plugin*/
    ctx[0].author && create_if_block_3$1(ctx)
  let if_block2 =
    /*plugin*/
    ctx[0].version && create_if_block_2$1(ctx)
  let if_block3 =
    /*plugin*/
    ctx[0].description && create_if_block_1$2(ctx)
  function select_block_type(ctx2, dirty) {
    if (
      /*loading*/
      ctx2[1]
    )
      return create_if_block$2
    return create_else_block$2
  }
  let current_block_type = select_block_type(ctx)
  let if_block4 = current_block_type(ctx)
  return {
    c() {
      div6 = element("div")
      div4 = element("div")
      div2 = element("div")
      div0 = element("div")
      t0 = text(t0_value)
      t1 = space()
      div1 = element("div")
      t2 = text("(")
      t3 = text(t3_value)
      t4 = text(")")
      t5 = space()
      button = element("button")
      svg = svg_element("svg")
      use = svg_element("use")
      t6 = text(t6_value)
      t7 = space()
      div3 = element("div")
      if (if_block0) if_block0.c()
      t8 = space()
      if (if_block1) if_block1.c()
      t9 = space()
      if (if_block2) if_block2.c()
      t10 = space()
      if (if_block3) if_block3.c()
      t11 = space()
      hr = element("hr")
      t12 = space()
      div5 = element("div")
      if_block4.c()
      attr(div0, "class", "plugin-name svelte-bj9chc")
      attr(div1, "class", "plugin-key svelte-bj9chc")
      xlink_attr(use, "xlink:href", "#iconBack")
      attr(svg, "class", "go-back-icon svelte-bj9chc")
      attr(button, "class", "go-back b3-button svelte-bj9chc")
      attr(div2, "class", "plugin-info svelte-bj9chc")
      attr(div3, "class", "plugin-manifest svelte-bj9chc")
      attr(div4, "class", "plugin-basic")
      attr(div5, "class", "plugin-readme b3-typography svelte-bj9chc")
      attr(div6, "class", "plugin-detail svelte-bj9chc")
    },
    m(target, anchor) {
      insert(target, div6, anchor)
      append(div6, div4)
      append(div4, div2)
      append(div2, div0)
      append(div0, t0)
      append(div2, t1)
      append(div2, div1)
      append(div1, t2)
      append(div1, t3)
      append(div1, t4)
      append(div2, t5)
      append(div2, button)
      append(button, svg)
      append(svg, use)
      append(button, t6)
      append(div4, t7)
      append(div4, div3)
      if (if_block0) if_block0.m(div3, null)
      append(div3, t8)
      if (if_block1) if_block1.m(div3, null)
      append(div3, t9)
      if (if_block2) if_block2.m(div3, null)
      append(div3, t10)
      if (if_block3) if_block3.m(div3, null)
      append(div6, t11)
      append(div6, hr)
      append(div6, t12)
      append(div6, div5)
      if_block4.m(div5, null)
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[5]
        )
        mounted = true
      }
    },
    p(ctx2, [dirty]) {
      if (dirty /*plugin*/ & 1 && t0_value !== (t0_value = /*plugin*/ ctx2[0].name + "")) set_data(t0, t0_value)
      if (dirty /*plugin*/ & 1 && t3_value !== (t3_value = /*plugin*/ ctx2[0].key + "")) set_data(t3, t3_value)
      if (
        /*plugin*/
        ctx2[0].url
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty)
        } else {
          if_block0 = create_if_block_4$1(ctx2)
          if_block0.c()
          if_block0.m(div3, t8)
        }
      } else if (if_block0) {
        if_block0.d(1)
        if_block0 = null
      }
      if (
        /*plugin*/
        ctx2[0].author
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty)
        } else {
          if_block1 = create_if_block_3$1(ctx2)
          if_block1.c()
          if_block1.m(div3, t9)
        }
      } else if (if_block1) {
        if_block1.d(1)
        if_block1 = null
      }
      if (
        /*plugin*/
        ctx2[0].version
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty)
        } else {
          if_block2 = create_if_block_2$1(ctx2)
          if_block2.c()
          if_block2.m(div3, t10)
        }
      } else if (if_block2) {
        if_block2.d(1)
        if_block2 = null
      }
      if (
        /*plugin*/
        ctx2[0].description
      ) {
        if (if_block3) {
          if_block3.p(ctx2, dirty)
        } else {
          if_block3 = create_if_block_1$2(ctx2)
          if_block3.c()
          if_block3.m(div3, null)
        }
      } else if (if_block3) {
        if_block3.d(1)
        if_block3 = null
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block4) {
        if_block4.p(ctx2, dirty)
      } else {
        if_block4.d(1)
        if_block4 = current_block_type(ctx2)
        if (if_block4) {
          if_block4.c()
          if_block4.m(div5, null)
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) detach(div6)
      if (if_block0) if_block0.d()
      if (if_block1) if_block1.d()
      if (if_block2) if_block2.d()
      if (if_block3) if_block3.d()
      if_block4.d()
      mounted = false
      dispose()
    },
  }
}
function instance$3($$self, $$props, $$invalidate) {
  let previewHTML
  const dispatch2 = createEventDispatcher()
  let loading2 = true
  let { plugin: plugin2 } = $$props
  const getPluginReadme = async () => {
    $$invalidate(4, (readme2 = await container.get("Store").getPluginReadme(plugin2.key)))
    $$invalidate(1, (loading2 = false))
  }
  let readme2
  const LuteMdConverter = window.Lute.New()
  onMount(() => {
    getPluginReadme()
  })
  const goBack2 = () => {
    dispatch2("goback")
  }
  const click_handler = () => goBack2()
  $$self.$$set = ($$props2) => {
    if ("plugin" in $$props2) $$invalidate(0, (plugin2 = $$props2.plugin))
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty /*readme*/ & 16) {
      $$invalidate(
        2,
        (previewHTML = () => {
          return readme2 ? LuteMdConverter.Md2HTML(readme2) : ""
        })
      )
    }
  }
  return [plugin2, loading2, previewHTML, goBack2, readme2, click_handler]
}
class Setting_preview extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { plugin: 0 })
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice()
  child_ctx[11] = list[i]
  return child_ctx
}
function create_else_block_2(ctx) {
  let settingpreview
  let current
  settingpreview = new Setting_preview({
    props: {
      plugin:
        /*selectedPlugin*/
        ctx[3],
    },
  })
  settingpreview.$on(
    "goback",
    /*goback_handler*/
    ctx[9]
  )
  return {
    c() {
      create_component(settingpreview.$$.fragment)
    },
    m(target, anchor) {
      mount_component(settingpreview, target, anchor)
      current = true
    },
    p(ctx2, dirty) {
      const settingpreview_changes = {}
      if (dirty /*selectedPlugin*/ & 8) settingpreview_changes.plugin = /*selectedPlugin*/ ctx2[3]
      settingpreview.$set(settingpreview_changes)
    },
    i(local) {
      if (current) return
      transition_in(settingpreview.$$.fragment, local)
      current = true
    },
    o(local) {
      transition_out(settingpreview.$$.fragment, local)
      current = false
    },
    d(detaching) {
      destroy_component(settingpreview, detaching)
    },
  }
}
function create_if_block_1$1(ctx) {
  let div
  let current
  let each_value =
    /*plugins*/
    ctx[0]
  let each_blocks = []
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i))
  }
  const out = (i) =>
    transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null
    })
  return {
    c() {
      div = element("div")
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c()
      }
      attr(div, "class", "fn__flex-1")
    },
    m(target, anchor) {
      insert(target, div, anchor)
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null)
      }
      current = true
    },
    p(ctx2, dirty) {
      if (dirty /*_, loadingMap, plugins, downloadPlugin, previewPlugin*/ & 53) {
        each_value = /*plugins*/ ctx2[0]
        let i
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i)
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty)
            transition_in(each_blocks[i], 1)
          } else {
            each_blocks[i] = create_each_block$1(child_ctx)
            each_blocks[i].c()
            transition_in(each_blocks[i], 1)
            each_blocks[i].m(div, null)
          }
        }
        group_outros()
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i)
        }
        check_outros()
      }
    },
    i(local) {
      if (current) return
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i])
      }
      current = true
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean)
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i])
      }
      current = false
    },
    d(detaching) {
      if (detaching) detach(div)
      destroy_each(each_blocks, detaching)
    },
  }
}
function create_if_block$1(ctx) {
  let div
  return {
    c() {
      div = element("div")
      div.textContent = `${_("loading")}`
    },
    m(target, anchor) {
      insert(target, div, anchor)
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) detach(div)
    },
  }
}
function create_else_block_1(ctx) {
  let button
  let current
  function func_1() {
    return (
      /*func_1*/
      ctx[8](
        /*plugin*/
        ctx[11]
      )
    )
  }
  button = new Button({
    props: {
      onClick: func_1,
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx },
    },
  })
  return {
    c() {
      create_component(button.$$.fragment)
    },
    m(target, anchor) {
      mount_component(button, target, anchor)
      current = true
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      const button_changes = {}
      if (dirty /*plugins*/ & 1) button_changes.onClick = func_1
      if (dirty /*$$scope*/ & 16384) {
        button_changes.$$scope = { dirty, ctx }
      }
      button.$set(button_changes)
    },
    i(local) {
      if (current) return
      transition_in(button.$$.fragment, local)
      current = true
    },
    o(local) {
      transition_out(button.$$.fragment, local)
      current = false
    },
    d(detaching) {
      destroy_component(button, detaching)
    },
  }
}
function create_if_block_3(ctx) {
  let current_block_type_index
  let if_block
  let if_block_anchor
  let current
  const if_block_creators = [create_if_block_4, create_else_block$1]
  const if_blocks = []
  function select_block_type_2(ctx2, dirty) {
    if (
      /*plugin*/
      ctx2[11].needUpgrade
    )
      return 0
    return 1
  }
  current_block_type_index = select_block_type_2(ctx)
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx)
  return {
    c() {
      if_block.c()
      if_block_anchor = empty()
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor)
      insert(target, if_block_anchor, anchor)
      current = true
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index
      current_block_type_index = select_block_type_2(ctx2)
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty)
      } else {
        group_outros()
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null
        })
        check_outros()
        if_block = if_blocks[current_block_type_index]
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2)
          if_block.c()
        } else {
          if_block.p(ctx2, dirty)
        }
        transition_in(if_block, 1)
        if_block.m(if_block_anchor.parentNode, if_block_anchor)
      }
    },
    i(local) {
      if (current) return
      transition_in(if_block)
      current = true
    },
    o(local) {
      transition_out(if_block)
      current = false
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching)
      if (detaching) detach(if_block_anchor)
    },
  }
}
function create_if_block_2(ctx) {
  let button
  let current
  button = new Button({
    props: {
      disabled: true,
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx },
    },
  })
  return {
    c() {
      create_component(button.$$.fragment)
    },
    m(target, anchor) {
      mount_component(button, target, anchor)
      current = true
    },
    p(ctx2, dirty) {
      const button_changes = {}
      if (dirty /*$$scope*/ & 16384) {
        button_changes.$$scope = { dirty, ctx: ctx2 }
      }
      button.$set(button_changes)
    },
    i(local) {
      if (current) return
      transition_in(button.$$.fragment, local)
      current = true
    },
    o(local) {
      transition_out(button.$$.fragment, local)
      current = false
    },
    d(detaching) {
      destroy_component(button, detaching)
    },
  }
}
function create_default_slot_3(ctx) {
  let t_value = _("download") + ""
  let t2
  return {
    c() {
      t2 = text(t_value)
    },
    m(target, anchor) {
      insert(target, t2, anchor)
    },
    p: noop,
    d(detaching) {
      if (detaching) detach(t2)
    },
  }
}
function create_else_block$1(ctx) {
  let button
  let current
  button = new Button({
    props: {
      disabled: true,
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx },
    },
  })
  return {
    c() {
      create_component(button.$$.fragment)
    },
    m(target, anchor) {
      mount_component(button, target, anchor)
      current = true
    },
    p(ctx2, dirty) {
      const button_changes = {}
      if (dirty /*$$scope*/ & 16384) {
        button_changes.$$scope = { dirty, ctx: ctx2 }
      }
      button.$set(button_changes)
    },
    i(local) {
      if (current) return
      transition_in(button.$$.fragment, local)
      current = true
    },
    o(local) {
      transition_out(button.$$.fragment, local)
      current = false
    },
    d(detaching) {
      destroy_component(button, detaching)
    },
  }
}
function create_if_block_4(ctx) {
  let button
  let current
  function func() {
    return (
      /*func*/
      ctx[7](
        /*plugin*/
        ctx[11]
      )
    )
  }
  button = new Button({
    props: {
      onClick: func,
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx },
    },
  })
  return {
    c() {
      create_component(button.$$.fragment)
    },
    m(target, anchor) {
      mount_component(button, target, anchor)
      current = true
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      const button_changes = {}
      if (dirty /*plugins*/ & 1) button_changes.onClick = func
      if (dirty /*$$scope*/ & 16384) {
        button_changes.$$scope = { dirty, ctx }
      }
      button.$set(button_changes)
    },
    i(local) {
      if (current) return
      transition_in(button.$$.fragment, local)
      current = true
    },
    o(local) {
      transition_out(button.$$.fragment, local)
      current = false
    },
    d(detaching) {
      destroy_component(button, detaching)
    },
  }
}
function create_default_slot_2(ctx) {
  let t_value = _("downloaded") + ""
  let t2
  return {
    c() {
      t2 = text(t_value)
    },
    m(target, anchor) {
      insert(target, t2, anchor)
    },
    p: noop,
    d(detaching) {
      if (detaching) detach(t2)
    },
  }
}
function create_default_slot_1(ctx) {
  let t_value = _("upgrade") + ""
  let t2
  return {
    c() {
      t2 = text(t_value)
    },
    m(target, anchor) {
      insert(target, t2, anchor)
    },
    p: noop,
    d(detaching) {
      if (detaching) detach(t2)
    },
  }
}
function create_default_slot(ctx) {
  let t_value = _("downloading") + ""
  let t2
  return {
    c() {
      t2 = text(t_value)
    },
    m(target, anchor) {
      insert(target, t2, anchor)
    },
    p: noop,
    d(detaching) {
      if (detaching) detach(t2)
    },
  }
}
function create_each_block$1(ctx) {
  let label
  let div1
  let a2
  let t0_value =
    /*plugin*/
    ctx[11].name + ""
  let t0
  let t1
  let t2_value =
    /*plugin*/
    ctx[11].version + ""
  let t2
  let t3
  let div0
  let t4_value =
    /*plugin*/
    (ctx[11].description || "") + ""
  let t4
  let t5
  let span
  let t6
  let current_block_type_index
  let if_block
  let t7
  let current
  let mounted
  let dispose
  function click_handler(...args) {
    return (
      /*click_handler*/
      ctx[6](
        /*plugin*/
        ctx[11],
        ...args
      )
    )
  }
  const if_block_creators = [create_if_block_2, create_if_block_3, create_else_block_1]
  const if_blocks = []
  function select_block_type_1(ctx2, dirty) {
    if (
      /*loadingMap*/
      ctx2[2][
        /*plugin*/
        ctx2[11].key
      ]
    )
      return 0
    if (
      /*plugin*/
      ctx2[11].isExist
    )
      return 1
    return 2
  }
  current_block_type_index = select_block_type_1(ctx)
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx)
  return {
    c() {
      label = element("label")
      div1 = element("div")
      a2 = element("a")
      t0 = text(t0_value)
      t1 = space()
      t2 = text(t2_value)
      t3 = space()
      div0 = element("div")
      t4 = text(t4_value)
      t5 = space()
      span = element("span")
      t6 = space()
      if_block.c()
      t7 = space()
      attr(a2, "href", "javascript:void(0)")
      attr(a2, "class", "")
      attr(div0, "class", "b3-label__text")
      attr(div1, "class", "fn__flex-1")
      attr(span, "class", "fn__space")
      attr(label, "class", "fn__flex b3-label")
    },
    m(target, anchor) {
      insert(target, label, anchor)
      append(label, div1)
      append(div1, a2)
      append(a2, t0)
      append(div1, t1)
      append(div1, t2)
      append(div1, t3)
      append(div1, div0)
      append(div0, t4)
      append(label, t5)
      append(label, span)
      append(label, t6)
      if_blocks[current_block_type_index].m(label, null)
      append(label, t7)
      current = true
      if (!mounted) {
        dispose = listen(a2, "click", click_handler)
        mounted = true
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      if ((!current || dirty /*plugins*/ & 1) && t0_value !== (t0_value = /*plugin*/ ctx[11].name + ""))
        set_data(t0, t0_value)
      if ((!current || dirty /*plugins*/ & 1) && t2_value !== (t2_value = /*plugin*/ ctx[11].version + ""))
        set_data(t2, t2_value)
      if ((!current || dirty /*plugins*/ & 1) && t4_value !== (t4_value = /*plugin*/ (ctx[11].description || "") + ""))
        set_data(t4, t4_value)
      let previous_block_index = current_block_type_index
      current_block_type_index = select_block_type_1(ctx)
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty)
      } else {
        group_outros()
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null
        })
        check_outros()
        if_block = if_blocks[current_block_type_index]
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx)
          if_block.c()
        } else {
          if_block.p(ctx, dirty)
        }
        transition_in(if_block, 1)
        if_block.m(label, t7)
      }
    },
    i(local) {
      if (current) return
      transition_in(if_block)
      current = true
    },
    o(local) {
      transition_out(if_block)
      current = false
    },
    d(detaching) {
      if (detaching) detach(label)
      if_blocks[current_block_type_index].d()
      mounted = false
      dispose()
    },
  }
}
function create_fragment$2(ctx) {
  let div
  let current_block_type_index
  let if_block
  let current
  const if_block_creators = [create_if_block$1, create_if_block_1$1, create_else_block_2]
  const if_blocks = []
  function select_block_type(ctx2, dirty) {
    if (
      /*loading*/
      ctx2[1]
    )
      return 0
    if (!(/*selectedPlugin*/ ctx2[3])) return 1
    return 2
  }
  current_block_type_index = select_block_type(ctx)
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx)
  return {
    c() {
      div = element("div")
      if_block.c()
      attr(div, "class", "b3-label fn__flex")
    },
    m(target, anchor) {
      insert(target, div, anchor)
      if_blocks[current_block_type_index].m(div, null)
      current = true
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index
      current_block_type_index = select_block_type(ctx2)
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty)
      } else {
        group_outros()
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null
        })
        check_outros()
        if_block = if_blocks[current_block_type_index]
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2)
          if_block.c()
        } else {
          if_block.p(ctx2, dirty)
        }
        transition_in(if_block, 1)
        if_block.m(div, null)
      }
    },
    i(local) {
      if (current) return
      transition_in(if_block)
      current = true
    },
    o(local) {
      transition_out(if_block)
      current = false
    },
    d(detaching) {
      if (detaching) detach(div)
      if_blocks[current_block_type_index].d()
    },
  }
}
function instance$2($$self, $$props, $$invalidate) {
  const store = container.get(TYPES.Store)
  let plugins = []
  let loading2 = true
  const loadingMap = {}
  onMount(async () => {
    $$invalidate(0, (plugins = await store.loadPlugins()))
    $$invalidate(1, (loading2 = false))
  })
  const downloadPlugin = async (key) => {
    if (loadingMap[key]) {
      return
    }
    try {
      $$invalidate(2, (loadingMap[key] = true), loadingMap)
      await store.downloadPlugin(key)
      const p = plugins.find((k2) => k2.key === key)
      if (p) {
        p.isExist = true
        p.needUpgrade = false
      }
    } finally {
      $$invalidate(2, (loadingMap[key] = false), loadingMap)
    }
  }
  let selectedPlugin = null
  const previewPlugin = (event, plugin2) => {
    $$invalidate(3, (selectedPlugin = plugin2))
    event.stopPropagation()
    event.preventDefault()
  }
  const click_handler = (plugin2, event) => previewPlugin(event, plugin2)
  const func = (plugin2) => downloadPlugin(plugin2.key)
  const func_1 = (plugin2) => downloadPlugin(plugin2.key)
  const goback_handler = () => $$invalidate(3, (selectedPlugin = null))
  return [
    plugins,
    loading2,
    loadingMap,
    selectedPlugin,
    downloadPlugin,
    previewPlugin,
    click_handler,
    func,
    func_1,
    goback_handler,
  ]
}
class Setting_store extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {})
  }
}
function create_fragment$1(ctx) {
  let div
  return {
    c() {
      div = element("div")
      attr(div, "id", "setting-custom-render")
    },
    m(target, anchor) {
      insert(target, div, anchor)
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) detach(div)
    },
  }
}
function instance$1($$self, $$props, $$invalidate) {
  let root
  let { render: render2 } = $$props
  onMount(() => {
    $$invalidate(1, (root = document.createElement("div")))
    document.getElementById("setting-custom-render").appendChild(root)
    render2(root)
  })
  $$self.$$set = ($$props2) => {
    if ("render" in $$props2) $$invalidate(0, (render2 = $$props2.render))
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty /*root, render*/ & 3) {
      {
        const el = document.getElementById("setting-custom-render")
        if (el) {
          if (root) {
            root.remove()
          }
          $$invalidate(1, (root = document.createElement("div")))
          document.getElementById("setting-custom-render").appendChild(root)
          render2(root)
        }
      }
    }
  }
  return [render2, root]
}
class Setting_custom extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { render: 0 })
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice()
  child_ctx[13] = list[i]
  return child_ctx
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice()
  child_ctx[13] = list[i]
  return child_ctx
}
function create_each_block_1(ctx) {
  let li
  let span
  let t_value =
    /*menu*/
    ctx[13].name + ""
  let t2
  let li_class_value
  let mounted
  let dispose
  function click_handler() {
    return (
      /*click_handler*/
      ctx[6](
        /*menu*/
        ctx[13]
      )
    )
  }
  return {
    c() {
      li = element("li")
      span = element("span")
      t2 = text(t_value)
      attr(span, "class", "b3-list-item__text")
      attr(
        li,
        "data-name",
        /*menu*/
        ctx[13].key
      )
      attr(
        li,
        "class",
        (li_class_value =
          /*currentSelection*/
          ctx[0].key /*menu*/ === ctx[13].key
            ? "b3-list-item--focus b3-list-item b3-list-item--big"
            : "b3-list-item b3-list-item--big")
      )
    },
    m(target, anchor) {
      insert(target, li, anchor)
      append(li, span)
      append(span, t2)
      if (!mounted) {
        dispose = listen(li, "click", click_handler)
        mounted = true
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      if (
        dirty /*currentSelection*/ & 1 &&
        li_class_value !==
          (li_class_value =
            /*currentSelection*/
            ctx[0].key /*menu*/ === ctx[13].key
              ? "b3-list-item--focus b3-list-item b3-list-item--big"
              : "b3-list-item b3-list-item--big")
      ) {
        attr(li, "class", li_class_value)
      }
    },
    d(detaching) {
      if (detaching) detach(li)
      mounted = false
      dispose()
    },
  }
}
function create_if_block_1(ctx) {
  let hr
  return {
    c() {
      hr = element("hr")
      set_style(hr, "margin", "12px")
    },
    m(target, anchor) {
      insert(target, hr, anchor)
    },
    d(detaching) {
      if (detaching) detach(hr)
    },
  }
}
function create_each_block(ctx) {
  let li
  let span
  let t0_value =
    /*menu*/
    ctx[13].name + ""
  let t0
  let t1
  let li_data_name_value
  let li_class_value
  let mounted
  let dispose
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[7](
        /*menu*/
        ctx[13]
      )
    )
  }
  return {
    c() {
      li = element("li")
      span = element("span")
      t0 = text(t0_value)
      t1 = space()
      attr(span, "class", "b3-list-item__text")
      attr(li, "data-name", (li_data_name_value = /*menu*/ ctx[13].key))
      attr(
        li,
        "class",
        (li_class_value =
          /*currentSelection*/
          ctx[0].key /*menu*/ === ctx[13].key
            ? "b3-list-item--focus b3-list-item b3-list-item--big"
            : "b3-list-item b3-list-item--big")
      )
    },
    m(target, anchor) {
      insert(target, li, anchor)
      append(li, span)
      append(span, t0)
      append(li, t1)
      if (!mounted) {
        dispose = listen(li, "click", click_handler_1)
        mounted = true
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx
      if (dirty /*thirdMenus*/ & 2 && t0_value !== (t0_value = /*menu*/ ctx[13].name + "")) set_data(t0, t0_value)
      if (dirty /*thirdMenus*/ & 2 && li_data_name_value !== (li_data_name_value = /*menu*/ ctx[13].key)) {
        attr(li, "data-name", li_data_name_value)
      }
      if (
        dirty /*currentSelection, thirdMenus*/ & 3 &&
        li_class_value !==
          (li_class_value =
            /*currentSelection*/
            ctx[0].key /*menu*/ === ctx[13].key
              ? "b3-list-item--focus b3-list-item b3-list-item--big"
              : "b3-list-item b3-list-item--big")
      ) {
        attr(li, "class", li_class_value)
      }
    },
    d(detaching) {
      if (detaching) detach(li)
      mounted = false
      dispose()
    },
  }
}
function create_else_block(ctx) {
  let settingcustom
  let current
  settingcustom = new Setting_custom({
    props: {
      render:
        /*currentSelection*/
        ctx[0].render,
    },
  })
  return {
    c() {
      create_component(settingcustom.$$.fragment)
    },
    m(target, anchor) {
      mount_component(settingcustom, target, anchor)
      current = true
    },
    p(ctx2, dirty) {
      const settingcustom_changes = {}
      if (dirty /*currentSelection*/ & 1) settingcustom_changes.render = /*currentSelection*/ ctx2[0].render
      settingcustom.$set(settingcustom_changes)
    },
    i(local) {
      if (current) return
      transition_in(settingcustom.$$.fragment, local)
      current = true
    },
    o(local) {
      transition_out(settingcustom.$$.fragment, local)
      current = false
    },
    d(detaching) {
      destroy_component(settingcustom, detaching)
    },
  }
}
function create_if_block(ctx) {
  let switch_instance
  let switch_instance_anchor
  let current
  var switch_value =
    /*currentSelection*/
    ctx[0].component
  function switch_props(ctx2) {
    return {}
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props())
    switch_instance.$on(
      "update",
      /*update_handler*/
      ctx[8]
    )
  }
  return {
    c() {
      if (switch_instance) create_component(switch_instance.$$.fragment)
      switch_instance_anchor = empty()
    },
    m(target, anchor) {
      if (switch_instance) mount_component(switch_instance, target, anchor)
      insert(target, switch_instance_anchor, anchor)
      current = true
    },
    p(ctx2, dirty) {
      if (switch_value !== (switch_value = /*currentSelection*/ ctx2[0].component)) {
        if (switch_instance) {
          group_outros()
          const old_component = switch_instance
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1)
          })
          check_outros()
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props())
          switch_instance.$on(
            "update",
            /*update_handler*/
            ctx2[8]
          )
          create_component(switch_instance.$$.fragment)
          transition_in(switch_instance.$$.fragment, 1)
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor)
        } else {
          switch_instance = null
        }
      }
    },
    i(local) {
      if (current) return
      if (switch_instance) transition_in(switch_instance.$$.fragment, local)
      current = true
    },
    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local)
      current = false
    },
    d(detaching) {
      if (detaching) detach(switch_instance_anchor)
      if (switch_instance) destroy_component(switch_instance, detaching)
    },
  }
}
function create_fragment(ctx) {
  let div2
  let div1
  let ul
  let t0
  let t1
  let t2
  let div0
  let current_block_type_index
  let if_block1
  let div0_data_name_value
  let current
  let each_value_1 =
    /*menus*/
    ctx[2]
  let each_blocks_1 = []
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i))
  }
  let if_block0 =
    /*thirdMenus*/
    ctx[1].length > 0 && create_if_block_1()
  let each_value =
    /*thirdMenus*/
    ctx[1]
  let each_blocks = []
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i))
  }
  const if_block_creators = [create_if_block, create_else_block]
  const if_blocks = []
  function select_block_type(ctx2, dirty) {
    if (
      /*currentSelection*/
      ctx2[0].type === "internal"
    )
      return 0
    return 1
  }
  current_block_type_index = select_block_type(ctx)
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx)
  return {
    c() {
      div2 = element("div")
      div1 = element("div")
      ul = element("ul")
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c()
      }
      t0 = space()
      if (if_block0) if_block0.c()
      t1 = space()
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c()
      }
      t2 = space()
      div0 = element("div")
      if_block1.c()
      attr(ul, "class", "b3-tab-bar b3-list b3-list--background")
      set_style(ul, "height", "unset", 1)
      attr(div0, "class", "config__tab-container")
      set_style(div0, "height", "unset", 1)
      attr(div0, "data-name", (div0_data_name_value = /*currentSelection*/ ctx[0].key))
      attr(div1, "class", "fn__flex-1 fn__flex config__panel")
      attr(div2, "class", "fn__flex-column")
      set_style(div2, "border-radius", "4px")
      set_style(div2, "overflow", "auto")
      set_style(div2, "position", "relative")
      set_style(div2, "height", "80vh")
    },
    m(target, anchor) {
      insert(target, div2, anchor)
      append(div2, div1)
      append(div1, ul)
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(ul, null)
      }
      append(ul, t0)
      if (if_block0) if_block0.m(ul, null)
      append(ul, t1)
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null)
      }
      append(div1, t2)
      append(div1, div0)
      if_blocks[current_block_type_index].m(div0, null)
      current = true
    },
    p(ctx2, [dirty]) {
      if (dirty /*menus, currentSelection, setCurrentSelection*/ & 13) {
        each_value_1 = /*menus*/ ctx2[2]
        let i
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i)
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty)
          } else {
            each_blocks_1[i] = create_each_block_1(child_ctx)
            each_blocks_1[i].c()
            each_blocks_1[i].m(ul, t0)
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1)
        }
        each_blocks_1.length = each_value_1.length
      }
      if (
        /*thirdMenus*/
        ctx2[1].length > 0
      ) {
        if (if_block0);
        else {
          if_block0 = create_if_block_1()
          if_block0.c()
          if_block0.m(ul, t1)
        }
      } else if (if_block0) {
        if_block0.d(1)
        if_block0 = null
      }
      if (dirty /*thirdMenus, currentSelection, setCurrentSelection*/ & 11) {
        each_value = /*thirdMenus*/ ctx2[1]
        let i
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i)
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty)
          } else {
            each_blocks[i] = create_each_block(child_ctx)
            each_blocks[i].c()
            each_blocks[i].m(ul, null)
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1)
        }
        each_blocks.length = each_value.length
      }
      let previous_block_index = current_block_type_index
      current_block_type_index = select_block_type(ctx2)
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty)
      } else {
        group_outros()
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null
        })
        check_outros()
        if_block1 = if_blocks[current_block_type_index]
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2)
          if_block1.c()
        } else {
          if_block1.p(ctx2, dirty)
        }
        transition_in(if_block1, 1)
        if_block1.m(div0, null)
      }
      if (
        !current ||
        (dirty /*currentSelection*/ & 1 &&
          div0_data_name_value !== (div0_data_name_value = /*currentSelection*/ ctx2[0].key))
      ) {
        attr(div0, "data-name", div0_data_name_value)
      }
    },
    i(local) {
      if (current) return
      transition_in(if_block1)
      current = true
    },
    o(local) {
      transition_out(if_block1)
      current = false
    },
    d(detaching) {
      if (detaching) detach(div2)
      destroy_each(each_blocks_1, detaching)
      if (if_block0) if_block0.d()
      destroy_each(each_blocks, detaching)
      if_blocks[current_block_type_index].d()
    },
  }
}
function instance($$self, $$props, $$invalidate) {
  let thirdMenus
  const menus = [
    {
      key: "common",
      name: _("menu_common"),
      type: "internal",
      component: Setting_common,
    },
    {
      key: "list",
      name: _("menu_list"),
      type: "internal",
      component: Setting_list,
    },
    {
      key: "store",
      name: _("menu_store"),
      type: "internal",
      component: Setting_store,
    },
  ]
  const sm = container.get(TYPES.SettingManager)
  const sm1 = container.get(TYPES.StorageManager)
  const plugins = sm1.getThirdPartyPlugins()
  let settingRenders = sm.getSettingRenders()
  const getName = (key) => {
    var _a2
    return (_a2 = plugins.find((p) => p.key === key)) == null ? void 0 : _a2.name
  }
  const setCurrentSelection = (menu) => $$invalidate(0, (currentSelection = menu))
  const updateMenus = () => {
    $$invalidate(5, (settingRenders = [...sm.getSettingRenders()]))
  }
  let currentSelection = menus[0]
  const click_handler = (menu) => setCurrentSelection(menu)
  const click_handler_1 = (menu) => setCurrentSelection(menu)
  const update_handler = () => updateMenus()
  $$self.$$.update = () => {
    if ($$self.$$.dirty /*settingRenders*/ & 32) {
      $$invalidate(
        1,
        (thirdMenus = settingRenders.map((s) => {
          return {
            key: s.key,
            name: getName(s.key),
            component: Setting_common,
            type: "custom",
            render: s.value,
          }
        }))
      )
    }
  }
  return [
    currentSelection,
    thirdMenus,
    menus,
    setCurrentSelection,
    updateMenus,
    settingRenders,
    click_handler,
    click_handler_1,
    update_handler,
  ]
}
class Setting extends SvelteComponent {
  constructor(options) {
    super()
    init(this, options, instance, create_fragment, safe_not_equal, {})
  }
}
class InternalSettingPlugin extends Plugin {
  constructor() {
    super()
    this.svg =
      '<svg t="1679703027227" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24715" width="200" height="200"><path d="M512 1023.99984a75.519988 75.519988 0 0 1-53.679992-22.207997L22.368077 565.455912c-29.487995-29.679995-29.487995-77.919988-0.064-107.519984l159.711975-159.839975a31.951995 31.951995 0 0 1 54.047991 28.207996 131.10398 131.10398 0 0 0-2.368 23.135996c0 69.951989 56.895991 128.11198 126.847981 128.11198 69.999989 0 121.119981-58.159991 121.119981-128.11198 0-70.079989-51.119992-127.07198-121.119981-127.07198a130.87998 130.87998 0 0 0-23.007997 2.384 31.759995 31.759995 0 0 1-33.919994-16.671998 31.999995 31.999995 0 0 1 5.743999-37.423994l148.895976-149.103976c28.847995-28.719996 78.719988-28.655996 107.423984-0.064l109.023983 109.183983C697.439971 59.887991 763.871961 8.479999 842.015948 8.479999c96.911985 0 175.743973 78.959988 175.743973 175.967972 0 78.239988-51.295992 144.719977-122.063981 167.471974l105.887984 105.951983a76.351988 76.351988 0 0 1 0.031999 107.551984L565.743992 1001.775843A75.759988 75.759988 0 0 1 512 1023.99984z" fill="" p-id="24716"></path></svg>'
  }
  onload() {
    const internalSettingButton = document.createElement("button")
    internalSettingButton.setAttribute("aria-label", _("plugin_system"))
    internalSettingButton.classList.add("toolbar__item", "b3-tooltips", "b3-tooltips__sw")
    internalSettingButton.insertAdjacentHTML("beforeend", this.svg)
    internalSettingButton.addEventListener("click", (event) => {
      new Menu("internalSettingButton")
        .addItem(
          new MenuItem({
            label: _("plugin_system_setting"),
            icon: "iconEdit",
            click: () => showSettingDialog(),
          })
        )
        .addSeparator()
        .addItem(
          new MenuItem({
            label: _("reload"),
            icon: "iconRefresh",
            click: () => window.location.reload(),
          })
        )
        .showAtMouseEvent(event)
      event.stopPropagation()
    })
    addToolbarRight(internalSettingButton)
    this.registerCommand({
      command: "Show plugin system conifg",
      description: _("show_plugin_system_config"),
      shortcut: "command+option+p",
      callback: () => showSettingDialog(),
    })
    this.registerCommand({
      command: "Reload Window",
      description: _("reload_window"),
      callback: () => window.location.reload(),
    })
  }
}
function showSettingDialog() {
  new Dialog({
    title: _("plugin_system_setting"),
    content: '<div id="plugin-settings"></div>',
    width: "90vw",
    height: "80vh",
  })
  setTimeout(() => {
    new Setting({
      target: document.getElementById("plugin-settings"),
    })
  })
}
const internalPlugins = [
  { key: "setting", name: "setting", plugin: InternalSettingPlugin, enabled: true, hidden: true, version: "1.0.0" },
  {
    key: "commandPanel",
    name: "commandPanel",
    plugin: CommandPanelPlugin,
    enabled: true,
    hidden: true,
    version: "1.0.0",
  },
]
function isHighSurrogate$1(codePoint) {
  return codePoint >= 55296 && codePoint <= 56319
}
function isLowSurrogate$1(codePoint) {
  return codePoint >= 56320 && codePoint <= 57343
}
var truncate$2 = function truncate2(getLength2, string, byteLength) {
  if (typeof string !== "string") {
    throw new Error("Input must be string")
  }
  var charLength = string.length
  var curByteLength = 0
  var codePoint
  var segment
  for (var i = 0; i < charLength; i += 1) {
    codePoint = string.charCodeAt(i)
    segment = string[i]
    if (isHighSurrogate$1(codePoint) && isLowSurrogate$1(string.charCodeAt(i + 1))) {
      i += 1
      segment += string[i]
    }
    curByteLength += getLength2(segment)
    if (curByteLength === byteLength) {
      return string.slice(0, i + 1)
    } else if (curByteLength > byteLength) {
      return string.slice(0, i - segment.length + 1)
    }
  }
  return string
}
function isHighSurrogate(codePoint) {
  return codePoint >= 55296 && codePoint <= 56319
}
function isLowSurrogate(codePoint) {
  return codePoint >= 56320 && codePoint <= 57343
}
var browser$1 = function getByteLength(string) {
  if (typeof string !== "string") {
    throw new Error("Input must be string")
  }
  var charLength = string.length
  var byteLength = 0
  var codePoint = null
  var prevCodePoint = null
  for (var i = 0; i < charLength; i++) {
    codePoint = string.charCodeAt(i)
    if (isLowSurrogate(codePoint)) {
      if (prevCodePoint != null && isHighSurrogate(prevCodePoint)) {
        byteLength += 1
      } else {
        byteLength += 3
      }
    } else if (codePoint <= 127) {
      byteLength += 1
    } else if (codePoint >= 128 && codePoint <= 2047) {
      byteLength += 2
    } else if (codePoint >= 2048 && codePoint <= 65535) {
      byteLength += 3
    }
    prevCodePoint = codePoint
  }
  return byteLength
}
var truncate$1 = truncate$2
var getLength = browser$1
var browser = truncate$1.bind(null, getLength)
var truncate = browser
var illegalRe = /[\/\?<>\\:\*\|"]/g
var controlRe = /[\x00-\x1f\x80-\x9f]/g
var reservedRe = /^\.+$/
var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i
var windowsTrailingRe = /[\. ]+$/
function sanitize(input, replacement) {
  if (typeof input !== "string") {
    throw new Error("Input must be string")
  }
  var sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement)
  return truncate(sanitized, 255)
}
var sanitizeFilename = function (input, options) {
  var replacement = (options && options.replacement) || ""
  var output = sanitize(input, replacement)
  if (replacement === "") {
    return output
  }
  return sanitize(output, "")
}
var __defProp$8 = Object.defineProperty
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$8(target, key, result)
  return result
}
var __decorateParam$5 = (index, decorator) => (target, key) => decorator(target, key, index)
let StorageManager = class {
  constructor(pluginFileManager) {
    this.config = Object.assign({}, defaultConfig)
    this.pluginFileManager = pluginFileManager
  }
  get(key) {
    return this.config[key]
  }
  async set(key, val) {
    this.config[key] = val
    return setStorageVal(key, val)
  }
  async initStorage() {
    const all2 = await getLocalStorage()
    const configKeys = Object.keys(defaultConfig)
    for (const key of configKeys) {
      if (all2[key] !== void 0) {
        this.config[key] = all2[key]
      } else {
        await setStorageVal(key, defaultConfig[key])
      }
    }
    this.thirdPartyPlugins = await this.pluginFileManager.getAllPlugins()
    this.internalPlugins = [...internalPlugins]
    this.init3rdPartyEnabled()
    this.initInternalEnabled()
    await this.savePluginsEnabled()
    return this
  }
  init3rdPartyEnabled() {
    const enabledPlugins = this.get(PLUGIN_SYSTEM_THIRD_PARTY_PLUGIN)
    for (const ep of enabledPlugins) {
      for (const p of this.thirdPartyPlugins) {
        if (p.key === ep.key) {
          p.enabled = ep.enabled || false
          break
        }
      }
    }
  }
  initInternalEnabled() {
    const enabledPlugins = this.get(PLUGIN_SYSTEM_PLUGIN)
    for (const ep of enabledPlugins) {
      for (const p of this.internalPlugins) {
        if (p.key === ep.key) {
          p.enabled = ep.enabled || false
          break
        }
      }
    }
  }
  getPlugins() {
    return [...this.internalPlugins, ...this.thirdPartyPlugins]
  }
  getInternalPlugins() {
    return this.internalPlugins
  }
  getThirdPartyPlugins() {
    return this.thirdPartyPlugins
  }
  getPluginByKey(key) {
    return this.getPlugins().find((p) => p.key === key)
  }
  async setPluginEnabled(key, enabled) {
    for (const p of [...this.internalPlugins, ...this.thirdPartyPlugins]) {
      if (p.key === key) {
        p.enabled = enabled
        break
      }
    }
    await this.savePluginsEnabled()
  }
  async setSafeModeEnabled(enabled) {
    return this.set(PLUGIN_SYSTEM_SAFE_MODE_ENABLED, enabled)
  }
  async savePluginsEnabled() {
    await this.set(
      PLUGIN_SYSTEM_PLUGIN,
      this.internalPlugins.map((p) => ({ key: p.key, enabled: p.enabled }))
    )
    return this.set(
      PLUGIN_SYSTEM_THIRD_PARTY_PLUGIN,
      this.thirdPartyPlugins.map((p) => ({ key: p.key, enabled: p.enabled }))
    )
  }
  async setPluginStorage(pluginKey, filename, content) {
    try {
      if (this.isFileNameIllegal(filename)) {
        showErrorMessage(`插件${pluginKey}存储文件名不合法`)
        return
      }
      await this.addPluginStorageFolderIfNotExist(pluginKey)
      await FileClient.getInstanceApi().fileApi.putFile(`/data/plugins/.storage/${pluginKey}/${filename}`, content)
    } catch (e) {
      showErrorMessage(`插件${pluginKey}存储保存失败`, 2e3)
    }
  }
  async getPluginStorage(pluginKey, filename) {
    try {
      return await FileClient.getInstanceApi().fileApi.getFile(`/data/plugins/.storage/${pluginKey}/${filename}`)
    } catch (e) {
      showErrorMessage(`插件${pluginKey}存储保存失败`, 2e3)
      return null
    }
  }
  async uninstallPlugin(pluginKey) {
    await FileClient.getInstanceApi().fileApi.removeFile(`/data/plugins/${pluginKey}`)
    await FileClient.getInstanceApi().fileApi.removeFile(`/data/plugins//.storage/${pluginKey}`)
  }
  async addPluginStorageFolderIfNotExist(pluginKey) {
    const folder = `/data/plugins/.storage/${pluginKey}`
    await FileClient.getInstanceApi().fileApi.putFile(folder, null, true)
  }
  isFileNameIllegal(filename) {
    return filename !== sanitizeFilename(filename)
  }
}
StorageManager = __decorateClass$8(
  [injectable(), __decorateParam$5(0, inject(TYPES.PluginFileManager))],
  StorageManager
)
var __defProp$7 = Object.defineProperty
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$7(target, key, result)
  return result
}
var __decorateParam$4 = (index, decorator) => (target, key) => decorator(target, key, index)
let PluginSystem = class {
  constructor(pluginLoader, pslm, storageManager, commandManager, store) {
    this.pluginLoader = pluginLoader
    this.pslm = pslm
    this.storageManager = storageManager
    this.commandManager = commandManager
    this.store = store
    this.version = VERSION$1
  }
  async init() {
    await this.storageManager.initStorage()
    const internalPlugins2 = this.storageManager.getInternalPlugins()
    this.pluginLoader.loadEnabledPlugins(internalPlugins2)
    log(`Loading internal enabled plugins: ${internalPlugins2.map((p) => p.key).join(",")}`)
    const securityModeEnabled = this.storageManager.get(PLUGIN_SYSTEM_SAFE_MODE_ENABLED)
    if (!securityModeEnabled) {
      const plugins = this.storageManager.getThirdPartyPlugins()
      log(`Loading 3rd party enabled plugins: ${plugins.map((p) => p.key).join(",")}`)
      this.pluginLoader.loadEnabledPlugins(plugins)
    }
    this.pslm.localCacheInit()
    return this
  }
  async loadPlugin(key) {
    this.storageManager.setPluginEnabled(key, true)
    const plugin2 = this.storageManager.getPluginByKey(key)
    this.pluginLoader.loadPlugin(plugin2)
  }
  async unloadPlugin(key) {
    this.storageManager.setPluginEnabled(key, false)
    this.pluginLoader.unloadPlugin(key)
  }
  async turnOffSafeMode() {
    this.storageManager.setSafeModeEnabled(false)
    const plugins = this.storageManager.getThirdPartyPlugins()
    return this.pluginLoader.loadEnabledPlugins(plugins)
  }
  async turnOnSafeMode() {
    this.storageManager.setSafeModeEnabled(true)
    const plugins = this.storageManager.getThirdPartyPlugins()
    return this.pluginLoader.unloadThirdPartyPlugins(plugins)
  }
}
PluginSystem = __decorateClass$7(
  [
    injectable(),
    __decorateParam$4(0, inject(TYPES.PluginLoader)),
    __decorateParam$4(1, inject(TYPES.SystemManager)),
    __decorateParam$4(2, inject(TYPES.StorageManager)),
    __decorateParam$4(3, inject(TYPES.CommandManager)),
    __decorateParam$4(4, inject(TYPES.Store)),
  ],
  PluginSystem
)
const migrate = async () => {
  const SNIPPET_NAME = "plugin-system-bazzar"
  const content = `(async () => {
        window.pluginSystemSource = 'bazzar';
        const response = await fetch('/api/file/getFile', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ path: '/data/widgets/插件系统/plugin.js' }),
        });
        const js = await response.text();
        eval(js);
    })()`
  const request2 = async (url2, body) => {
    const response = await fetch(url2, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    })
    return response.json()
  }
  const res = await request2("/api/snippet/getSnippet", { enabled: 2, type: "all" })
  const snippets = res.data.snippets
  for (const snippet of snippets) {
    if (snippet.type !== "js") {
      continue
    }
    if (snippet.content.indexOf("https://gitee.com/zuoez02/siyuan-plugin-system/raw/main/main.js") !== -1) {
      snippet.enabled = false
    }
    if (snippet.name === SNIPPET_NAME) {
      snippet.enabled = true
      snippet.content = content
      await request2("/api/snippet/setSnippet", { snippets })
      return
    }
  }
  snippets.splice(0, 0, {
    id: "20230324100959-plugind",
    name: SNIPPET_NAME,
    type: "js",
    enabled: true,
    content,
  })
  await request2("/api/snippet/setSnippet", { snippets })
  setTimeout(() => window.parent.location.reload(), 1e3)
}
var __defProp$6 = Object.defineProperty
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$6(target, key, result)
  return result
}
var __decorateParam$3 = (index, decorator) => (target, key) => decorator(target, key, index)
const pluginScriptPosition = PLUGIN_SYS_ABS_PATH
let SystemManager = class {
  constructor(storageManager) {
    this.storageMangager = storageManager
  }
  async saveToLocal(p, content) {
    FileClient.getInstanceApi().fileApi.putFile(p, content)
  }
  async localCacheInit() {
    try {
      const plugin2 = FileClient.getInstanceApi().fileApi.getFile(pluginScriptPosition)
      if (plugin2 !== null) {
        this.delayAutoUpgrade()
      }
      return
    } catch (e) {
      log("Plugin system not found")
    }
    const script2 = window.siyuanPluginScript
    if (!script2) {
      return
    }
    await this.saveToLocal(pluginScriptPosition, script2)
    this.delayAutoUpgrade()
  }
  delayAutoUpgrade() {
    return false
  }
  async tryUpgrade() {
    log("Plugin bundled with zhi theme, upgrade skip")
    return
    if (window.pluginSystemSource === "bazzar") {
      log("Plugin installed from bazzar version, upgrade skip")
      this.compareWidgetVersion()
      return
    }
    log("Try getting online version")
    const onlineVersion = await this.getOnlineVersion()
    if (onlineVersion !== VERSION$1) {
      showInfoMessage(`插件系统获取到最新版本 ${onlineVersion}，即将自动更新`)
      log("Online Version: " + onlineVersion + ", local version: " + VERSION$1)
      log("Downloading new version of Plugin System")
      this.upgrade()
    } else {
      log("Version is " + VERSION$1 + ", OK")
    }
  }
  async getOnlineVersion() {
    return fetch(VERSION_URL, { cache: "no-cache" }).then((res) => res.text())
  }
  async upgrade() {
    const script2 = await fetch(SCRIPT_URL, { cache: "no-cache" }).then((res) => res.text())
    if (!script2) {
      return
    }
    migrate()
    showInfoMessage("插件系统升级中，即将自动重载...")
    await this.saveToLocal(pluginScriptPosition, script2)
    log("Plugin system upgraded, reloading...")
    setTimeout(() => reloadWindow(), 3e3)
  }
  async compareWidgetVersion() {
    const res = await getBazzarWidget()
    const packages = res.packages
    const ps = packages.find((p) => p.name === "插件系统")
    if (!ps) {
      return
    }
    const latestVersion = ps.version
    const result = new semver.SemVer(VERSION$1).compare(latestVersion)
    if (result < 0) {
      new Notification({ message: _("new_version_widget"), type: "info" }).show()
    }
  }
}
SystemManager = __decorateClass$6([injectable(), __decorateParam$3(0, inject(TYPES.StorageManager))], SystemManager)
var __defProp$5 = Object.defineProperty
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$5(target, key, result)
  return result
}
var __decorateParam$2 = (index, decorator) => (target, key) => decorator(target, key, index)
let components
let PluginLoader = class {
  constructor(pluginFileManager) {
    this.pluginFileManager = pluginFileManager
    this.loadedPlugins = /* @__PURE__ */ new Map()
  }
  async loadEnabledPlugins(plugins) {
    if (!plugins || !plugins.length) {
      return
    }
    for (const p of plugins) {
      if (!p.enabled) {
        continue
      }
      await this.loadPlugin(p)
    }
  }
  async loadAllInternalPlugins() {
    internalPlugins.forEach(async (p) => {
      const plug2 = new p.plugin()
      if (!(plug2 instanceof Plugin)) {
        throw new Error(`Failed to load plugin ${p.name}`)
      }
      log(`Load internal plugin: ${p.key}(${p.name})`)
      this.addAdditionalMethod(plug2, p.key, p.name)
      await plug2.onload()
      this.loadedPlugins.set(p.key, plug2)
    })
  }
  async loadAllLocalPlugins() {
    const plugins = await this.pluginFileManager.getAllPlugins()
    if (!plugins) {
      return
    }
    for (const p of plugins) {
      await this.loadPlugin(p)
    }
  }
  async loadPlugin(plugin) {
    if (!components) {
      this.generateRequiredModules()
    }
    if (!plugin.enabled || (!plugin.plugin && !plugin.script)) {
      return
    }
    if (plugin.plugin) {
      const plug2 = new plugin.plugin()
      if (!(plug2 instanceof Plugin)) {
        throw new Error(`Failed to load plugin ${plugin.name}`)
      }
      log(`Load internal plugin: ${plugin.key}(${plugin.name})`)
      this.addAdditionalMethod(plug2, plugin.key, plugin.name)
      await plug2.onload()
      this.loadedPlugins.set(plugin.key, plug2)
      return
    }
    const exports = {}
    const module = { exports }
    function run(script, name) {
      return eval(
        "(function anonymous(require,module,exports){".concat(script, "\n})\n//# sourceURL=").concat(name, "\n")
      )
    }
    const __require = (name2) => {
      if (components[name2]) {
        return components[name2]
      }
      throw new Error(`module ${name2} not found`)
    }
    const pluginName = plugin.key
    try {
      run(plugin.script, plugin.key)(__require, module, exports)
    } catch (e) {
      error("Error plugin:" + plugin.key + " ->", e)
      return
    }
    let pluginConstructor
    if (!(pluginConstructor = (module.exports || exports).default || module.exports)) {
      throw new Error(`Failed to load plugin ${pluginName}. No exports detected.`)
    }
    const plug = new pluginConstructor()
    if (!(plug instanceof Plugin)) {
      throw new Error(`Failed to load plugin ${pluginName}`)
    }
    this.addAdditionalMethod(plug, plugin.key, pluginName)
    try {
      await plug.onload()
      this.loadedPlugins.set(plugin.key, plug)
    } catch (e) {
      error("Error plugin:" + plugin.key + " ->", e)
    }
  }
  async unloadPlugin(key) {
    const plugin2 = this.loadedPlugins.get(key)
    if (!plugin2) {
      return
    }
    plugin2.onunload()
    container.get(TYPES.CommandManager).unregisterCommandByPlugin(key)
    container.get(TYPES.SettingManager).unregisterSetting(key)
    this.loadedPlugins.delete(key)
  }
  async unloadThirdPartyPlugins(plugins) {
    const keys = plugins.filter((p) => p.enabled).map((p) => p.key)
    for (const k2 of keys) {
      log(`unload third party plugin: ${k2}`)
      await this.unloadPlugin(k2)
    }
  }
  async loadThirdPartyEnabledPlugins(plugins) {
    return this.loadEnabledPlugins(plugins)
  }
  generateRequiredModules() {
    components = {
      siyuan: api,
      axios: axios$1,
    }
  }
  addAdditionalMethod(plugin2, pluginKey, pluginName2) {
    plugin2.registerCommand = (command) => {
      const cm = container.get(TYPES.CommandManager)
      cm.registerCommand({
        ...command,
        plugin: pluginKey,
        pluginName: pluginName2,
      })
    }
    const sm = container.get(TYPES.StorageManager)
    plugin2.writeStorage = async (filename, content) => {
      return await sm.setPluginStorage(pluginKey, filename, content)
    }
    plugin2.loadStorage = async (filename) => {
      return await sm.getPluginStorage(pluginKey, filename)
    }
    plugin2.registerSettingRender = (settingRender) => {
      const cm = container.get(TYPES.SettingManager)
      cm.registerSetting(pluginKey, settingRender)
    }
  }
}
PluginLoader = __decorateClass$5([injectable(), __decorateParam$2(0, inject(TYPES.PluginFileManager))], PluginLoader)
var __defProp$4 = Object.defineProperty
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$4(target, key, result)
  return result
}
let PluginFileManager = class {
  async scanPlugins(pluginFolder) {
    const res = await FileClient.getInstanceApi().fileApi.readDir(pluginFolder)
    if (!res) {
      return []
    }
    const files = res
    const result = []
    for (const f of files) {
      if (f.name.startsWith(".")) {
        continue
      }
      if (
        f.isDir &&
        (await isExists(`/data/plugins/${f.name}/manifest.json`)) &&
        (await isExists(`/data/plugins/${f.name}/main.js`))
      ) {
        result.push(`/data/plugins/${f.name}`)
      }
    }
    return result
  }
  async getFileContent(f) {
    const res = await FileClient.getInstanceApi().fileApi.getFile(f)
    return res || ""
  }
  async getManifest(manifest) {
    const content = await this.getFileContent(manifest)
    try {
      return JSON.parse(content)
    } catch (e) {
      error("loading manifest: " + manifest, e)
      return null
    }
  }
  async getScript(script2) {
    return await this.getFileContent(script2)
  }
  async getAllPlugins() {
    const plugins = await this.scanPlugins("/data/plugins")
    if (!plugins || !plugins.length) {
      log("No plugin found in /data/plugins")
      return []
    }
    const req = []
    for (const p of plugins) {
      log("Reading plugin from filesystem: " + p)
      const key = this.getFolderName(p)
      const f = async () => {
        const [manifest, script2] = await Promise.all([
          this.getManifest(`${p}/manifest.json`),
          this.getScript(`${p}/main.js`),
        ])
        return { ...manifest, script: script2, enabled: false, key }
      }
      req.push(f())
    }
    const result = await Promise.all(req)
    return result || []
  }
  getFolderName(p) {
    const f = p.split("/")
    for (let i = f.length - 1; i >= 0; i--) {
      if (f[i]) {
        return f[i]
      }
    }
    return ""
  }
}
PluginFileManager = __decorateClass$4([injectable()], PluginFileManager)
var __defProp$3 = Object.defineProperty
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$3(target, key, result)
  return result
}
let EventBus = class {
  constructor() {
    this.eventListeners = {}
  }
  destroy() {
    delete this.eventListeners
  }
  on(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = []
    }
    this.eventListeners[eventName].push(callback)
    return () => this.off(eventName, callback)
  }
  off(eventName, callback) {
    if (!callback) {
      delete this.eventListeners[eventName]
      return
    }
    for (let i = 0; i < this.eventListeners[eventName].length; i++) {
      if (this.eventListeners[eventName][i] === callback) {
        this.eventListeners[eventName].splice(i, 1)
        return
      }
    }
  }
  emit(eventName, ...args) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach((cb) => {
        cb(...args)
      })
    }
  }
}
EventBus = __decorateClass$3([injectable()], EventBus)
var __defProp$2 = Object.defineProperty
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$2(target, key, result)
  return result
}
var __decorateParam$1 = (index, decorator) => (target, key) => decorator(target, key, index)
let CommandManager = class {
  constructor(shortcut2) {
    this.commandList = []
    this.shortcut = shortcut2
  }
  registerCommand(command) {
    if (
      this.commandList.some((com) => {
        com.plugin === command.plugin && com.command === command.command
      })
    ) {
      return new Error$1("Command is already registered, do not register command repeatly")
    }
    if (
      command.shortcut &&
      this.commandList.some((com) => {
        com.shortcut === command.shortcut
      })
    ) {
      return new Warning("shortcut has already registered")
    }
    this.commandList.push(command)
    this.shortcut.registerKeyboardEventFromPlugin(command)
    log(`Register plugin: ${command.plugin} command: ${command.command}`)
  }
  unregisterCommandByPlugin(plugin2) {
    for (let i = 0; i < this.commandList.length; i++) {
      if (plugin2 === this.commandList[i].plugin) {
        const com = this.commandList[i]
        log(`Unregister plugin: ${plugin2} command: ${com.command}`)
        this.commandList.splice(i, 1)
        if (com.shortcut) {
          this.shortcut.unregisterKeyboardEvent(com.shortcut)
        }
      }
    }
  }
  unregisterCommand(command) {
    for (let i = 0; i < this.commandList.length; i++) {
      if (command.command === this.commandList[i].command && command.plugin === this.commandList[i].plugin) {
        this.commandList.splice(i, 1)
        break
      }
    }
    this.shortcut.registerKeyboardEventFromPlugin(command)
  }
  getCommands() {
    return this.commandList
  }
}
CommandManager = __decorateClass$2([injectable(), __decorateParam$1(0, inject(TYPES.Shortcut))], CommandManager)
var isff = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false
function addEvent(object, event, method, useCapture) {
  if (object.addEventListener) {
    object.addEventListener(event, method, useCapture)
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function () {
      method(window.event)
    })
  }
}
function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1)
  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()]
  }
  return mods
}
function getKeys(key) {
  if (typeof key !== "string") key = ""
  key = key.replace(/\s/g, "")
  var keys = key.split(",")
  var index = keys.lastIndexOf("")
  for (; index >= 0; ) {
    keys[index - 1] += ","
    keys.splice(index, 1)
    index = keys.lastIndexOf("")
  }
  return keys
}
function compareArray(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2
  var arr2 = a1.length >= a2.length ? a2 : a1
  var isIndex = true
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) isIndex = false
  }
  return isIndex
}
var _keyMap = {
  backspace: 8,
  "⌫": 8,
  tab: 9,
  clear: 12,
  enter: 13,
  "↩": 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  "⇪": 20,
  ",": 188,
  ".": 190,
  "/": 191,
  "`": 192,
  "-": isff ? 173 : 189,
  "=": isff ? 61 : 187,
  ";": isff ? 59 : 186,
  "'": 222,
  "[": 219,
  "]": 221,
  "\\": 220,
}
var _modifier = {
  // shiftKey
  "⇧": 16,
  shift: 16,
  // altKey
  "⌥": 18,
  alt: 18,
  option: 18,
  // ctrlKey
  "⌃": 17,
  ctrl: 17,
  control: 17,
  // metaKey
  "⌘": 91,
  cmd: 91,
  command: 91,
}
var modifierMap = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91,
}
var _mods = {
  16: false,
  18: false,
  17: false,
  91: false,
}
var _handlers = {}
for (var k = 1; k < 20; k++) {
  _keyMap["f".concat(k)] = 111 + k
}
var _downKeys = []
var winListendFocus = false
var _scope = "all"
var elementHasBindEvent = []
var code = function code2(x) {
  return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0)
}
var getKey = function getKey2(x) {
  return Object.keys(_keyMap).find(function (k2) {
    return _keyMap[k2] === x
  })
}
var getModifier = function getModifier2(x) {
  return Object.keys(_modifier).find(function (k2) {
    return _modifier[k2] === x
  })
}
function setScope(scope) {
  _scope = scope || "all"
}
function getScope() {
  return _scope || "all"
}
function getPressedKeyCodes() {
  return _downKeys.slice(0)
}
function getPressedKeyString() {
  return _downKeys.map(function (c) {
    return getKey(c) || getModifier(c) || String.fromCharCode(c)
  })
}
function filter(event) {
  var target = event.target || event.srcElement
  var tagName = target.tagName
  var flag = true
  if (
    target.isContentEditable ||
    ((tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") && !target.readOnly)
  ) {
    flag = false
  }
  return flag
}
function isPressed(keyCode) {
  if (typeof keyCode === "string") {
    keyCode = code(keyCode)
  }
  return _downKeys.indexOf(keyCode) !== -1
}
function deleteScope(scope, newScope) {
  var handlers
  var i
  if (!scope) scope = getScope()
  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key]
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1)
        else i++
      }
    }
  }
  if (getScope() === scope) setScope(newScope || "all")
}
function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode
  var i = _downKeys.indexOf(key)
  if (i >= 0) {
    _downKeys.splice(i, 1)
  }
  if (event.key && event.key.toLowerCase() === "meta") {
    _downKeys.splice(0, _downKeys.length)
  }
  if (key === 93 || key === 224) key = 91
  if (key in _mods) {
    _mods[key] = false
    for (var k2 in _modifier) {
      if (_modifier[k2] === key) hotkeys[k2] = false
    }
  }
}
function unbind(keysInfo) {
  if (typeof keysInfo === "undefined") {
    Object.keys(_handlers).forEach(function (key) {
      return delete _handlers[key]
    })
  } else if (Array.isArray(keysInfo)) {
    keysInfo.forEach(function (info) {
      if (info.key) eachUnbind(info)
    })
  } else if (typeof keysInfo === "object") {
    if (keysInfo.key) eachUnbind(keysInfo)
  } else if (typeof keysInfo === "string") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key]
    }
    var scope = args[0],
      method = args[1]
    if (typeof scope === "function") {
      method = scope
      scope = ""
    }
    eachUnbind({
      key: keysInfo,
      scope,
      method,
      splitKey: "+",
    })
  }
}
var eachUnbind = function eachUnbind2(_ref) {
  var key = _ref.key,
    scope = _ref.scope,
    method = _ref.method,
    _ref$splitKey = _ref.splitKey,
    splitKey = _ref$splitKey === void 0 ? "+" : _ref$splitKey
  var multipleKeys = getKeys(key)
  multipleKeys.forEach(function (originKey) {
    var unbindKeys = originKey.split(splitKey)
    var len = unbindKeys.length
    var lastKey = unbindKeys[len - 1]
    var keyCode = lastKey === "*" ? "*" : code(lastKey)
    if (!_handlers[keyCode]) return
    if (!scope) scope = getScope()
    var mods = len > 1 ? getMods(_modifier, unbindKeys) : []
    _handlers[keyCode] = _handlers[keyCode].filter(function (record) {
      var isMatchingMethod = method ? record.method === method : true
      return !(isMatchingMethod && record.scope === scope && compareArray(record.mods, mods))
    })
  })
}
function eventHandler(event, handler, scope, element2) {
  if (handler.element !== element2) {
    return
  }
  var modifiersMatch
  if (handler.scope === scope || handler.scope === "all") {
    modifiersMatch = handler.mods.length > 0
    for (var y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if ((!_mods[y] && handler.mods.indexOf(+y) > -1) || (_mods[y] && handler.mods.indexOf(+y) === -1)) {
          modifiersMatch = false
        }
      }
    }
    if (
      (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) ||
      modifiersMatch ||
      handler.shortcut === "*"
    ) {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault) event.preventDefault()
        else event.returnValue = false
        if (event.stopPropagation) event.stopPropagation()
        if (event.cancelBubble) event.cancelBubble = true
      }
    }
  }
}
function dispatch(event, element2) {
  var asterisk = _handlers["*"]
  var key = event.keyCode || event.which || event.charCode
  if (!hotkeys.filter.call(this, event)) return
  if (key === 93 || key === 224) key = 91
  if (_downKeys.indexOf(key) === -1 && key !== 229) _downKeys.push(key)
  ;["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function (keyName) {
    var keyNum = modifierMap[keyName]
    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum)
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1)
    } else if (keyName === "metaKey" && event[keyName] && _downKeys.length === 3) {
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum))
      }
    }
  })
  if (key in _mods) {
    _mods[key] = true
    for (var k2 in _modifier) {
      if (_modifier[k2] === key) hotkeys[k2] = true
    }
    if (!asterisk) return
  }
  for (var e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]]
    }
  }
  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState("AltGraph")) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17)
    }
    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18)
    }
    _mods[17] = true
    _mods[18] = true
  }
  var scope = getScope()
  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (
        asterisk[i].scope === scope &&
        ((event.type === "keydown" && asterisk[i].keydown) || (event.type === "keyup" && asterisk[i].keyup))
      ) {
        eventHandler(event, asterisk[i], scope, element2)
      }
    }
  }
  if (!(key in _handlers)) return
  for (var _i = 0; _i < _handlers[key].length; _i++) {
    if (
      (event.type === "keydown" && _handlers[key][_i].keydown) ||
      (event.type === "keyup" && _handlers[key][_i].keyup)
    ) {
      if (_handlers[key][_i].key) {
        var record = _handlers[key][_i]
        var splitKey = record.splitKey
        var keyShortcut = record.key.split(splitKey)
        var _downKeysCurrent = []
        for (var a2 = 0; a2 < keyShortcut.length; a2++) {
          _downKeysCurrent.push(code(keyShortcut[a2]))
        }
        if (_downKeysCurrent.sort().join("") === _downKeys.sort().join("")) {
          eventHandler(event, record, scope, element2)
        }
      }
    }
  }
}
function isElementBind(element2) {
  return elementHasBindEvent.indexOf(element2) > -1
}
function hotkeys(key, option, method) {
  _downKeys = []
  var keys = getKeys(key)
  var mods = []
  var scope = "all"
  var element2 = document
  var i = 0
  var keyup = false
  var keydown = true
  var splitKey = "+"
  var capture = false
  if (method === void 0 && typeof option === "function") {
    method = option
  }
  if (Object.prototype.toString.call(option) === "[object Object]") {
    if (option.scope) scope = option.scope
    if (option.element) element2 = option.element
    if (option.keyup) keyup = option.keyup
    if (option.keydown !== void 0) keydown = option.keydown
    if (option.capture !== void 0) capture = option.capture
    if (typeof option.splitKey === "string") splitKey = option.splitKey
  }
  if (typeof option === "string") scope = option
  for (; i < keys.length; i++) {
    key = keys[i].split(splitKey)
    mods = []
    if (key.length > 1) mods = getMods(_modifier, key)
    key = key[key.length - 1]
    key = key === "*" ? "*" : code(key)
    if (!(key in _handlers)) _handlers[key] = []
    _handlers[key].push({
      keyup,
      keydown,
      scope,
      mods,
      shortcut: keys[i],
      method,
      key: keys[i],
      splitKey,
      element: element2,
    })
  }
  if (typeof element2 !== "undefined" && !isElementBind(element2) && window) {
    elementHasBindEvent.push(element2)
    addEvent(
      element2,
      "keydown",
      function (e) {
        dispatch(e, element2)
      },
      capture
    )
    if (!winListendFocus) {
      winListendFocus = true
      addEvent(
        window,
        "focus",
        function () {
          _downKeys = []
        },
        capture
      )
    }
    addEvent(
      element2,
      "keyup",
      function (e) {
        dispatch(e, element2)
        clearModifier(e)
      },
      capture
    )
  }
}
function trigger(shortcut2) {
  var scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all"
  Object.keys(_handlers).forEach(function (key) {
    var dataList = _handlers[key].filter(function (item) {
      return item.scope === scope && item.shortcut === shortcut2
    })
    dataList.forEach(function (data) {
      if (data && data.method) {
        data.method()
      }
    })
  })
}
var _api = {
  getPressedKeyString,
  setScope,
  getScope,
  deleteScope,
  getPressedKeyCodes,
  isPressed,
  filter,
  trigger,
  unbind,
  keyMap: _keyMap,
  modifier: _modifier,
  modifierMap,
}
for (var a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a]
  }
}
if (typeof window !== "undefined") {
  var _hotkeys = window.hotkeys
  hotkeys.noConflict = function (deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys
    }
    return hotkeys
  }
  window.hotkeys = hotkeys
}
var __defProp$1 = Object.defineProperty
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp$1(target, key, result)
  return result
}
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index)
hotkeys.filter = function () {
  return true
}
let Shortcut = class {
  constructor(eventBus) {
    this.option = {
      capture: true,
    }
    log("Initialize shortcut subsystem")
    this.eventBus = eventBus
  }
  registerKeyboardEvent(shortcut2, callback) {
    hotkeys(shortcut2, this.option, callback)
    this.eventBus.on(shortcut2.toString(), callback)
  }
  unregisterKeyboardEvent(shortcut2) {
    hotkeys.unbind(shortcut2)
    this.eventBus.off(shortcut2.toString())
  }
  registerKeyboardEventFromPlugin(command) {
    if (command.shortcut && command.callback) {
      this.registerKeyboardEvent(command.shortcut, command.callback)
    }
  }
  unregisterKeyboardEventFromPlugin(command) {
    if (command.shortcut && command.callback) {
      this.unregisterKeyboardEvent(command.shortcut)
    }
  }
}
Shortcut = __decorateClass$1([injectable(), __decorateParam(0, inject(TYPES.EventBus))], Shortcut)
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i])) result = (kind ? decorator(target, key, result) : decorator(result)) || result
  if (kind && result) __defProp(target, key, result)
  return result
}
let SettingManager = class {
  constructor() {
    this.settingRenders = /* @__PURE__ */ new Map()
  }
  registerSetting(pluginKey, settingRender) {
    this.settingRenders.set(pluginKey, settingRender)
  }
  unregisterSetting(key) {
    this.settingRenders.delete(key)
  }
  getSettingRenders() {
    const result = []
    this.settingRenders.forEach((value, key) => {
      result.push({ key, value })
    })
    return result
  }
}
SettingManager = __decorateClass([injectable()], SettingManager)
const container = new Container()
container.bind(TYPES.StorageManager).to(StorageManager).inSingletonScope()
container.bind(TYPES.SystemManager).to(SystemManager).inSingletonScope()
container.bind(TYPES.PluginSystem).to(PluginSystem).inSingletonScope()
container.bind(TYPES.PluginLoader).to(PluginLoader).inSingletonScope()
container.bind(TYPES.PluginFileManager).to(PluginFileManager).inSingletonScope()
container.bind(TYPES.EventBus).to(EventBus)
container.bind(TYPES.Shortcut).to(Shortcut).inSingletonScope()
container.bind(TYPES.CommandManager).to(CommandManager).inSingletonScope()
container.bind(TYPES.Store).to(Store).inSingletonScope()
container.bind(TYPES.SettingManager).to(SettingManager).inSingletonScope()
function initPluginSystem() {
  if (!window.pluginSystem) {
    log("Siyuan Plugin System loading...")
    window.pluginSystemVersion = VERSION$1
    window.pluginSystem = container.get(TYPES.PluginSystem).init()
    window.pluginSystemIocContainer = container
  }
}
export { initPluginSystem as default, initPluginSystem }