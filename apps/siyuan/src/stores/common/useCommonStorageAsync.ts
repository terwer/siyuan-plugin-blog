/*
 *            GNU GENERAL PUBLIC LICENSE
 *               Version 3, 29 June 2007
 *
 *  Copyright (C) 2024 Terwer, Inc. <https://terwer.space/>
 *  Everyone is permitted to copy and distribute verbatim copies
 *  of this license document, but changing it is not allowed.
 */

import {StorageSerializers, toValue} from "@vueuse/core"
import {ObjectUtil} from "zhi-common"
import {createAppLogger} from "../../utils/appLogger.ts"
import CommonStorage from "./commonStorage.ts"

/**
 * https://vueuse.org/core/useStorageAsync/
 *
 * @param storageKey - 存储key
 * @param initialValue - 默认值
 */
export const useCommonStorageAsync = <T extends string | number | boolean | object | null>(
  storageKey: string,
  initialValue: T
) => {
  const logger = createAppLogger("common-storage-async")
  const commonStorage = new CommonStorage(storageKey)

  // 获取 initialValue 类型对应的序列化器，如果不存在则使用默认序列化器
  const rawInit: T = toValue(initialValue)
  const type = guessSerializerType<T>(rawInit) as
    | "boolean"
    | "object"
    | "number"
    | "any"
    | "string"
    | "map"
    | "set"
    | "date"
  logger.info(`It is detected that the serialization type is ${type}`)
  const serializer = StorageSerializers[type]

  // 定义 commonStore 对象
  const commonStore = {
    async get(): Promise<T> {
      logger.debug("Fetching data from common storage...")
      const rawValue = (await commonStorage.getItem(commonStorage.key)) ?? "{}"
      let ret = (await serializer.read(rawValue)) ?? {}

      if (ObjectUtil.isEmptyObject(ret)) {
        logger.info("Initial data not found in common storage. Setting initial value...")
        await commonStorage.setItem(commonStorage.key, serializer.write(initialValue))
        logger.info("Initial value set:", initialValue)
        ret = initialValue
      }
      return ret
    },
    async set(value: T): Promise<void> {
      await commonStorage.setItem(commonStorage.key, serializer.write(value))
    },
  }

  return {commonStore}
}

function guessSerializerType<T extends string | number | boolean | object | null>(rawInit: T) {
  // eslint-disable-next-line no-nested-ternary,eqeqeq
  return rawInit == null
    ? "any"
    // eslint-disable-next-line no-nested-ternary
    : rawInit instanceof Set
      ? "set"
      // eslint-disable-next-line no-nested-ternary
      : rawInit instanceof Map
        ? "map"
        // eslint-disable-next-line no-nested-ternary
        : rawInit instanceof Date
          ? "date"
          // eslint-disable-next-line no-nested-ternary
          : typeof rawInit === "boolean"
            ? "boolean"
            // eslint-disable-next-line no-nested-ternary
            : typeof rawInit === "string"
              ? "string"
              // eslint-disable-next-line no-nested-ternary
              : typeof rawInit === "object"
                ? "object"
                : !Number.isNaN(rawInit)
                  ? "number"
                  : "any"
}
