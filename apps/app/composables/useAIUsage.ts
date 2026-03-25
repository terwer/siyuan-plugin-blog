/**
 * useAIUsage - AI 功能每日使用次数管理
 *
 * - localStorage 持久化
 * - 按日期重置
 * - 默认每日 30 次限制
 */

import { AI_DAILY_LIMIT, AI_USAGE_KEY } from "~/utils/Constants"

// ==================== 类型定义 ====================

interface UsageData {
  date: string  // YYYY-MM-DD
  count: number
}

// ==================== 工具函数 ====================

function getTodayDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function loadUsageData(): UsageData {
  if (typeof window === 'undefined') {
    return { date: getTodayDate(), count: 0 }
  }

  try {
    const stored = localStorage.getItem(AI_USAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored) as UsageData
      // 如果日期不同，重置计数
      if (data.date !== getTodayDate()) {
        return { date: getTodayDate(), count: 0 }
      }
      return data
    }
  } catch {
    // JSON 解析失败，返回默认值
  }

  return { date: getTodayDate(), count: 0 }
}

function saveUsageData(data: UsageData): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(AI_USAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage 写入失败，忽略
  }
}

// ==================== Composable ====================

export function useAIUsage(limit?: number) {
  const dailyLimit = limit ?? AI_DAILY_LIMIT

  // 初始化使用数据
  const usageData = ref<UsageData>(loadUsageData())

  // 已使用次数
  const usedCount = computed(() => {
    // 检查日期是否仍然是今天
    if (usageData.value.date !== getTodayDate()) {
      // 日期已变，重置
      usageData.value = { date: getTodayDate(), count: 0 }
    }
    return usageData.value.count
  })

  // 今日剩余次数
  const remainingCount = computed(() => Math.max(0, dailyLimit - usedCount.value))

  // 是否还能使用
  const canUse = computed(() => remainingCount.value > 0)

  // 消耗一次使用次数
  const consume = () => {
    const today = getTodayDate()

    // 如果日期变了，先重置
    if (usageData.value.date !== today) {
      usageData.value = { date: today, count: 0 }
    }

    // 增加计数
    usageData.value = {
      date: today,
      count: usageData.value.count + 1,
    }

    // 持久化
    saveUsageData(usageData.value)
  }

  // 客户端挂载时重新加载数据
  onMounted(() => {
    usageData.value = loadUsageData()
  })

  return {
    remainingCount,
    canUse,
    consume,
    dailyLimit,
  }
}
