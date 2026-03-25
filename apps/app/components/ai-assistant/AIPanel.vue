<!--
  AI 助手面板（嵌入侧边栏）
  定位：阅读辅助工具，支持速读和自由聊天
  设计参考：语雀 AI 助手
  - 速读：摘要 + 要点 + 延伸思考
  - 聊天：多轮对话
-->

<script setup lang="ts">
import {
  ChatLineRound,
  Close,
  DocumentChecked,
  Promotion,
  QuestionFilled,
  RefreshRight,
  Setting,
} from "@element-plus/icons-vue"
import { useAIChat, type AIChatConfig } from "~/composables/useAIChat"
import { useAIQA, type AIQAConfig } from "~/composables/useAIQA"
import { useAISummary, type AISummaryConfig } from "~/composables/useAISummary"
import { useAIUsage } from "~/composables/useAIUsage"
import { AI_SUMMARY_TERMS_KEY } from "~/utils/Constants"

const props = defineProps<{
  title: string
  content: string
  docId: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const { t } = useI18n()

// 当前模式：速读 或 QA
type PanelMode = "speedread" | "qa"
const activeMode = ref<PanelMode>("speedread")

// AI 速读
const {
  result: summaryResult,
  isLoading: summaryLoading,
  error: summaryError,
  hasSummary,
  generate: generateSummary,
  clear: clearSummary,
} = useAISummary(
  computed(() => props.title),
  computed(() => props.content)
)

// AI 聊天
const {
  messages,
  isLoading: chatLoading,
  error: chatError,
  sendMessage,
  clearMessages,
} = useAIChat(
  computed(() => props.title),
  computed(() => props.content)
)

// AI 问答
const {
  qaList,
  isLoading: qaLoading,
  error: qaError,
  hasQA,
  generate: generateQA,
  clear: clearQA,
} = useAIQA(
  computed(() => props.title),
  computed(() => props.content)
)

// 使用次数
const { remainingCount, canUse, consume } = useAIUsage()

// 聊天输入
const chatInput = ref("")
const chatListRef = ref<HTMLElement | null>(null)

// AI 配置（高级，默认折叠）
const showConfig = ref(false)
const config = reactive<AISummaryConfig>({ baseUrl: "", apiKey: "", model: "" })

// 延伸思考答案折叠
const showThinkingAnswer = ref(false)

// QA 答案折叠状态（按索引）
const expandedQA = ref<Set<number>>(new Set())

// 服务协议确认
const termsAccepted = ref(false)
const showTermsDialog = ref(false)

// 检查协议
const checkTermsAccepted = () => {
  if (!import.meta.client) return false
  return localStorage.getItem(AI_SUMMARY_TERMS_KEY) === "true"
}

// 速读触发
const handleSpeedRead = () => {
  if (!canUse.value) return
  activeMode.value = "speedread"
  const cfg: AISummaryConfig = {}
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()
  generateSummary(cfg)
  consume()
}

// 触发速读（先检查协议）
const triggerSpeedRead = () => {
  if (checkTermsAccepted()) {
    termsAccepted.value = true
    handleSpeedRead()
  } else {
    showTermsDialog.value = true
  }
}

// 发送聊天消息
const handleSendMessage = async () => {
  if (!chatInput.value.trim() || !canUse.value) return
  const msg = chatInput.value.trim()
  chatInput.value = ""
  const cfg: AIChatConfig = {}
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()
  await sendMessage(msg, cfg)
  consume()
  // 滚动到底部
  await nextTick()
  scrollToBottom()
}

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    handleSendMessage()
  }
}

// 滚动到底部
const scrollToBottom = () => {
  if (chatListRef.value) {
    const lastMsg = chatListRef.value.lastElementChild as HTMLElement
    lastMsg?.scrollIntoView({ behavior: "smooth", block: "end" })
  }
}

// 协议确认后触发速读
const acceptTerms = () => {
  if (import.meta.client) localStorage.setItem(AI_SUMMARY_TERMS_KEY, "true")
  termsAccepted.value = true
  showTermsDialog.value = false
  handleSpeedRead()
}

const declineTerms = () => {
  showTermsDialog.value = false
}

// QA 答案展开/折叠
const toggleQAAnswer = (idx: number) => {
  if (expandedQA.value.has(idx)) {
    expandedQA.value.delete(idx)
  } else {
    expandedQA.value.add(idx)
  }
  // 触发响应式更新
  expandedQA.value = new Set(expandedQA.value)
}

// QA 生成触发
const handleGenerateQA = () => {
  if (!canUse.value) return
  activeMode.value = "qa"
  const cfg: AIQAConfig = {}
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()
  generateQA(cfg)
  consume()
}

// 组件挂载时自动触发
onMounted(() => {
  if (checkTermsAccepted()) {
    termsAccepted.value = true
    if (!hasSummary.value && !summaryLoading.value) {
      handleSpeedRead()
    }
  } else {
    showTermsDialog.value = true
  }
})

// 监听消息变化，自动滚动
watch(messages, () => {
  nextTick(() => scrollToBottom())
}, { deep: true })
</script>

<template>
  <div class="ai-panel">
    <!-- 顶部标题栏 -->
    <div class="ai-panel-header">
      <div class="panel-title">
        <el-icon class="panel-title-icon"><Promotion /></el-icon>
        <span>{{ t("ai.assistant.title") }}</span>
      </div>
      <div class="panel-header-actions">
        <!-- 重新生成 -->
        <button
          class="header-btn"
          :title="activeMode === 'speedread' ? t('ai.summary.regenerate') : t('ai.qa.regenerate')"
          :disabled="(activeMode === 'speedread' ? summaryLoading : qaLoading) || !canUse"
          @click="activeMode === 'speedread' ? handleSpeedRead() : handleGenerateQA()"
        >
          <el-icon :class="{ 'is-spinning': summaryLoading || qaLoading }"><RefreshRight /></el-icon>
        </button>
        <!-- 关闭 -->
        <button class="header-btn header-btn--close" :title="t('main.opt.cancel')" @click="emit('close')">
          <el-icon><Close /></el-icon>
        </button>
      </div>
    </div>

    <!-- 功能切换按钮区 -->
    <div class="mode-switch-bar">
      <button
        class="mode-btn"
        :class="{ 'mode-btn--active': activeMode === 'speedread' }"
        :disabled="summaryLoading || !canUse"
        @click="triggerSpeedRead"
      >
        {{ hasSummary ? t("ai.assistant.speedread.again") : t("ai.assistant.speedread") }}
      </button>
      <button
        class="mode-btn"
        :class="{ 'mode-btn--active': activeMode === 'qa' }"
        :disabled="qaLoading || !canUse"
        @click="handleGenerateQA"
      >
        {{ t("ai.assistant.ask") }}
      </button>
    </div>

    <!-- 内容区 -->
    <div class="ai-panel-content">
      <!-- ========== 速读模式 ========== -->
      <template v-if="activeMode === 'speedread'">
        <!-- 加载态 -->
        <div v-if="summaryLoading" class="loading-state">
          <div class="loading-dots">
            <span /><span /><span />
          </div>
          <div class="loading-text">{{ t("ai.summary.loading") }}</div>
        </div>

        <!-- 错误态 -->
        <div v-else-if="summaryError" class="error-state">
          <el-icon class="error-icon"><DocumentChecked /></el-icon>
          <div class="error-text">{{ summaryError }}</div>
          <button class="retry-btn" @click="handleSpeedRead">
            {{ t("ai.summary.retry") }}
          </button>
        </div>

        <!-- 摘要内容 -->
        <template v-else-if="hasSummary && summaryResult">
          <!-- 核心摘要 -->
          <div class="section">
            <div class="section-header">
              <el-icon class="section-icon"><DocumentChecked /></el-icon>
              <span class="section-title">{{ t("ai.summary.section.summary") }}</span>
            </div>
            <div class="summary-text">{{ summaryResult.summary }}</div>
          </div>

          <!-- 关键要点 -->
          <div v-if="summaryResult.keyPoints.length > 0" class="section">
            <div class="section-header">
              <el-icon class="section-icon"><Promotion /></el-icon>
              <span class="section-title">{{ t("ai.summary.section.keypoints") }}</span>
            </div>
            <ul class="keypoints-list">
              <li v-for="(point, idx) in summaryResult.keyPoints" :key="idx" class="keypoint-item">
                <span class="keypoint-dot">{{ idx + 1 }}</span>
                <span class="keypoint-text">{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- 延伸思考 -->
          <div v-if="summaryResult.thinkingQuestion" class="section section--thinking">
            <div class="section-header">
              <el-icon class="section-icon"><ChatLineRound /></el-icon>
              <span class="section-title">{{ t("ai.summary.section.thinking") }}</span>
            </div>
            <div class="thinking-text">{{ summaryResult.thinkingQuestion }}</div>

            <!-- 折叠答案 -->
            <button
              v-if="summaryResult.thinkingAnswer"
              class="answer-toggle"
              @click="showThinkingAnswer = !showThinkingAnswer"
            >
              <span>{{ showThinkingAnswer ? t("ai.summary.thinking.answer.hide") : t("ai.summary.thinking.answer.show") }}</span>
              <span class="answer-toggle-arrow" :class="{ 'is-open': showThinkingAnswer }">▾</span>
            </button>

            <Transition name="fade">
              <div v-if="showThinkingAnswer && summaryResult.thinkingAnswer" class="thinking-answer">
                {{ summaryResult.thinkingAnswer }}
              </div>
            </Transition>
          </div>

          <!-- 底部配置 -->
          <div class="panel-footer">
            <button class="config-toggle" @click="showConfig = !showConfig" :title="t('ai.summary.config.title')">
              <el-icon><Setting /></el-icon>
              <span>{{ t("ai.summary.config.title") }}</span>
            </button>
          </div>

          <!-- AI 配置折叠区 -->
          <Transition name="fade">
            <div v-if="showConfig" class="config-box">
              <div class="config-row">
                <label>API Key</label>
                <input
                  v-model="config.apiKey"
                  type="password"
                  class="config-input"
                  :placeholder="t('ai.summary.config.apikey.placeholder')"
                  autocomplete="off"
                />
              </div>
              <div class="config-row">
                <label>{{ t("ai.summary.config.model") }}</label>
                <input v-model="config.model" type="text" class="config-input" placeholder="qwen3-max" />
              </div>
              <div class="config-row">
                <label>Base URL</label>
                <input v-model="config.baseUrl" type="text" class="config-input" placeholder="https://ai.terwer.space" />
              </div>
            </div>
          </Transition>
        </template>

        <!-- 空态 -->
        <div v-else class="empty-state">
          <div class="empty-text">{{ t("ai.summary.empty") }}</div>
          <button class="start-btn" @click="triggerSpeedRead" :disabled="!canUse">
            {{ t("ai.summary.start.btn") }}
          </button>
        </div>
      </template>

      <!-- ========== QA 模式 ========== -->
      <template v-else-if="activeMode === 'qa'">
        <!-- 加载态 -->
        <div v-if="qaLoading" class="loading-state">
          <div class="loading-dots"><span /><span /><span /></div>
          <div class="loading-text">{{ t("ai.qa.loading") }}</div>
        </div>

        <!-- 错误态 -->
        <div v-else-if="qaError" class="error-state">
          <el-icon class="error-icon"><QuestionFilled /></el-icon>
          <div class="error-text">{{ qaError }}</div>
          <button class="retry-btn" @click="handleGenerateQA">{{ t("ai.qa.retry") }}</button>
        </div>

        <!-- QA 列表 -->
        <template v-else-if="hasQA">
          <div class="section qa-section">
            <div class="section-header">
              <el-icon class="section-icon"><QuestionFilled /></el-icon>
              <span class="section-title">{{ t("ai.qa.section.title") }}</span>
            </div>
            <div class="qa-list">
              <div v-for="(item, idx) in qaList" :key="idx" class="qa-card">
                <div class="qa-question" @click="toggleQAAnswer(idx)">
                  <span class="qa-num">Q{{ idx + 1 }}</span>
                  <span class="qa-question-text">{{ item.question }}</span>
                  <span class="qa-toggle-arrow" :class="{ 'is-open': expandedQA.has(idx) }">▾</span>
                </div>
                <Transition name="fade">
                  <div v-if="expandedQA.has(idx)" class="qa-answer">
                    <span class="qa-answer-label">A:</span>
                    <span class="qa-answer-text">{{ item.answer }}</span>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </template>

        <!-- 空态 -->
        <div v-else class="empty-state">
          <div class="empty-text">{{ t("ai.qa.empty") }}</div>
          <button class="start-btn" @click="handleGenerateQA" :disabled="!canUse">
            {{ t("ai.assistant.ask") }}
          </button>
        </div>
      </template>
    </div>

    <!-- ========== 聊天区域（始终可见） ========== -->
    <div class="chat-section">
      <div class="chat-section-divider">
        <span class="divider-text">{{ t("ai.chat.title") }}</span>
      </div>
      
      <!-- 消息列表 -->
      <div ref="chatListRef" class="chat-list">
        <div class="chat-msg chat-msg--assistant">
          <div class="chat-bubble">{{ t("ai.chat.welcome") }}</div>
        </div>
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="chat-msg"
          :class="msg.role === 'user' ? 'chat-msg--user' : 'chat-msg--assistant'"
        >
          <div class="chat-bubble">{{ msg.content }}</div>
        </div>
        <div v-if="chatLoading" class="chat-msg chat-msg--assistant">
          <div class="chat-bubble chat-bubble--loading">
            <div class="loading-dots loading-dots--small"><span /><span /><span /></div>
          </div>
        </div>
      </div>

      <!-- 错误提示 -->
      <div v-if="chatError" class="chat-error">{{ chatError }}</div>

      <!-- 输入区 -->
      <div class="chat-input-area">
        <textarea
          v-model="chatInput"
          class="chat-textarea"
          :placeholder="t('ai.chat.placeholder')"
          rows="1"
          @keydown="handleKeyDown"
        />
        <button
          class="chat-send-btn"
          :disabled="!chatInput.trim() || chatLoading || !canUse"
          @click="handleSendMessage"
        >
          <span v-if="chatLoading" class="loading-dots loading-dots--tiny"><span /><span /><span /></span>
          <span v-else>{{ t("ai.chat.send") }}</span>
        </button>
      </div>
    </div>

    <!-- 底部使用次数 -->
    <div class="panel-usage-bar">
      <span class="usage-icon">💡</span>
      <span class="usage-text">
        {{ canUse ? t("ai.assistant.usage.remaining", { count: remainingCount }) : t("ai.assistant.usage.exhausted") }}
      </span>
    </div>

    <!-- 服务协议确认对话框 -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showTermsDialog" class="terms-overlay" @click.self="declineTerms">
          <div class="terms-dialog" role="dialog" :aria-label="t('ai.assistant.terms.title')">
            <div class="terms-header">
              <span class="terms-title">{{ t("ai.assistant.terms.title") }}</span>
            </div>
            <div class="terms-body">
              <p v-for="(line, idx) in t('ai.assistant.terms.body').split('\n\n')" :key="idx" class="terms-paragraph">
                {{ line }}
              </p>
            </div>
            <div class="terms-footer">
              <button class="terms-btn terms-btn--cancel" @click="declineTerms">
                {{ t("ai.assistant.terms.cancel") }}
              </button>
              <button class="terms-btn terms-btn--confirm" @click="acceptTerms">
                {{ t("ai.assistant.terms.confirm") }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="stylus" scoped>
/* ===== 面板容器 ===== */
.ai-panel
  height 100%
  display flex
  flex-direction column
  font-family var(--b3-font-family, "Helvetica Neue", Arial, sans-serif)
  background var(--background, #fff)

/* ===== 顶部标题栏 ===== */
.ai-panel-header
  flex-shrink 0
  display flex
  align-items center
  justify-content space-between
  padding 10px 14px
  border-bottom 1px solid rgba(0, 0, 0, 0.04)

.panel-title
  display flex
  align-items center
  gap 6px
  font-size 14px
  font-weight 600
  color var(--text-color-primary, #1f2329)

.panel-title-icon
  font-size 16px
  color var(--el-color-primary, #409eff)

.panel-header-actions
  display flex
  align-items center
  gap 2px

.header-btn
  width 28px
  height 28px
  border none
  background transparent
  cursor pointer
  color var(--text-color-secondary, #8a8f99)
  border-radius 6px
  display flex
  align-items center
  justify-content center
  transition all 0.15s ease
  font-size 15px
  padding 0
  &:hover:not(:disabled)
    background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))
    color var(--text-color-primary, #1f2329)
  &:disabled
    opacity 0.4
    cursor not-allowed

.header-btn--close
  font-size 16px

/* ===== 内容区 ===== */
.ai-panel-content
  flex 1
  overflow-y auto
  padding 14px
  overscroll-behavior contain
  display flex
  flex-direction column
  gap 14px
  &::-webkit-scrollbar
    width 4px
  &::-webkit-scrollbar-thumb
    background rgba(0, 0, 0, 0.1)
    border-radius 2px

/* ===== 加载态 ===== */
.loading-state
  display flex
  flex-direction column
  align-items center
  justify-content center
  padding 48px 16px
  gap 16px

.loading-dots
  display flex
  gap 6px
  span
    width 7px
    height 7px
    background var(--el-color-primary, #409eff)
    border-radius 50%
    animation bounce 1.2s infinite ease-in-out
    &:nth-child(1)
      animation-delay -0.32s
    &:nth-child(2)
      animation-delay -0.16s

.loading-dots--small
  span
    width 5px
    height 5px

.loading-dots--tiny
  gap 3px
  span
    width 4px
    height 4px

@keyframes bounce
  0%, 80%, 100%
    transform scale(0.6)
    opacity 0.5
  40%
    transform scale(1)
    opacity 1

.loading-text
  font-size 13px
  color var(--text-color-secondary, #8a8f99)

/* ===== 错误态 ===== */
.error-state
  display flex
  flex-direction column
  align-items center
  gap 10px
  padding 36px 16px
  text-align center

.error-icon
  font-size 28px
  color var(--el-color-warning, #e6a23c)

.error-text
  font-size 13px
  color var(--text-color-secondary, #8a8f99)
  line-height 1.5

.retry-btn
  padding 6px 14px
  border-radius 6px
  border 1px solid var(--el-color-primary, #409eff)
  background transparent
  color var(--el-color-primary, #409eff)
  font-size 12px
  cursor pointer
  transition all 0.15s ease
  &:hover
    background var(--el-color-primary-light-9, #ecf5ff)

/* ===== 内容区块 ===== */
.section
  border-radius 10px
  padding 14px
  background var(--el-fill-color-lighter, rgba(0, 0, 0, 0.018))
  border 1px solid var(--border-color, rgba(0, 0, 0, 0.06))

.section--thinking
  background var(--el-color-primary-light-9, #ecf5ff)
  border-color var(--el-color-primary-light-7, #c6e2ff)

.section-header
  display flex
  align-items center
  gap 6px
  margin-bottom 10px

.section-icon
  font-size 14px
  color var(--el-color-primary, #409eff)
  flex-shrink 0

.section--thinking .section-icon
  color var(--el-color-primary, #409eff)

.section-title
  font-size 12px
  font-weight 600
  color var(--text-color-secondary, #8a8f99)
  text-transform uppercase
  letter-spacing 0.04em

/* ===== 摘要文本 ===== */
.summary-text
  font-size 14px
  color var(--text-color-primary, #1f2329)
  line-height 1.75
  word-break break-word

/* ===== 要点列表 ===== */
.keypoints-list
  list-style none
  padding 0
  margin 0
  display flex
  flex-direction column
  gap 8px

.keypoint-item
  display flex
  align-items flex-start
  gap 8px

.keypoint-dot
  flex-shrink 0
  width 18px
  height 18px
  background var(--el-color-primary-light-8, #d9ecff)
  color var(--el-color-primary, #409eff)
  border-radius 50%
  font-size 11px
  font-weight 700
  display flex
  align-items center
  justify-content center
  margin-top 1px

.keypoint-text
  font-size 13.5px
  color var(--text-color-primary, #1f2329)
  line-height 1.6
  word-break break-word

/* ===== 延伸思考 ===== */
.thinking-text
  font-size 13.5px
  color var(--text-color-primary, #1f2329)
  line-height 1.75
  font-style italic
  word-break break-word

.answer-toggle
  display inline-flex
  align-items center
  gap 4px
  margin-top 10px
  padding 4px 10px
  border 1px solid var(--el-color-primary-light-5, #a0cfff)
  background var(--el-color-primary-light-9, #ecf5ff)
  color var(--el-color-primary, #409eff)
  border-radius 20px
  font-size 12px
  cursor pointer
  transition all 0.15s ease
  font-family inherit
  &:hover
    background var(--el-color-primary-light-8, #d9ecff)

.answer-toggle-arrow
  font-style normal
  transition transform 0.2s ease
  display inline-block
  &.is-open
    transform rotate(180deg)

.thinking-answer
  margin-top 10px
  padding 10px 12px
  background var(--el-color-primary-light-9, #ecf5ff)
  border-left 3px solid var(--el-color-primary-light-5, #a0cfff)
  border-radius 0 6px 6px 0
  font-size 13px
  color var(--text-color-primary, #1f2329)
  line-height 1.75
  word-break break-word

/* ===== 底部配置 ===== */
.panel-footer
  display flex
  justify-content flex-end

.config-toggle
  display inline-flex
  align-items center
  gap 4px
  padding 4px 8px
  border none
  background transparent
  cursor pointer
  font-size 11px
  color var(--text-color-tertiary, #bbbfc4)
  border-radius 4px
  transition all 0.15s ease
  font-family inherit
  &:hover
    color var(--text-color-secondary, #8a8f99)
    background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))

/* ===== 配置折叠区 ===== */
.config-box
  border 1px solid var(--border-color, rgba(0, 0, 0, 0.08))
  border-radius 8px
  padding 12px 14px
  background var(--el-fill-color-lighter, rgba(0, 0, 0, 0.015))
  display flex
  flex-direction column
  gap 8px

.config-row
  display flex
  align-items center
  gap 8px
  label
    font-size 12px
    color var(--text-color-secondary, #8a8f99)
    white-space nowrap
    min-width 52px
    text-align right

.config-input
  flex 1
  height 28px
  padding 0 8px
  border 1px solid var(--border-color, rgba(0, 0, 0, 0.1))
  border-radius 5px
  background var(--background, #fff)
  color var(--text-color-primary, #1f2329)
  font-size 12px
  font-family inherit
  outline none
  transition border-color 0.15s ease
  &:focus
    border-color var(--el-color-primary, #409eff)
  &::placeholder
    color var(--text-color-tertiary, #bbbfc4)

/* ===== 空态 ===== */
.empty-state
  display flex
  flex-direction column
  align-items center
  gap 12px
  padding 48px 16px
  text-align center

.empty-text
  font-size 13px
  color var(--text-color-secondary, #8a8f99)
  line-height 1.5

.start-btn
  padding 8px 18px
  border-radius 6px
  border none
  background var(--el-color-primary, #409eff)
  color #fff
  font-size 13px
  cursor pointer
  transition all 0.15s ease
  &:hover:not(:disabled)
    background var(--el-color-primary-dark-2, #337ecc)
  &:disabled
    opacity 0.5
    cursor not-allowed

/* ===== 聊天列表 ===== */
.chat-list
  flex 1
  display flex
  flex-direction column
  gap 12px
  overflow-y auto
  padding-bottom 10px

.chat-msg
  display flex

.chat-msg--user
  justify-content flex-end

.chat-msg--assistant
  justify-content flex-start

.chat-bubble
  max-width 85%
  padding 10px 14px
  font-size 13.5px
  line-height 1.6
  word-break break-word

.chat-msg--user .chat-bubble
  background var(--el-color-primary, #409eff)
  color #fff
  border-radius 12px 12px 2px 12px

.chat-msg--assistant .chat-bubble
  background var(--el-fill-color-lighter, rgba(0, 0, 0, 0.02))
  color var(--text-color-primary, #1f2329)
  border-radius 12px 12px 12px 2px
  border 1px solid var(--border-color, rgba(0, 0, 0, 0.06))

.chat-bubble--loading
  padding 12px 16px

/* ===== 聊天错误 ===== */
.chat-error
  padding 8px 12px
  background var(--el-color-danger-light-9, #fef0f0)
  border 1px solid var(--el-color-danger-light-5, #fab6b6)
  border-radius 6px
  font-size 12px
  color var(--el-color-danger, #f56c6c)
  margin-top -6px

/* ===== 聊天输入区 ===== */
.chat-input-area
  flex-shrink 0
  display flex
  gap 8px
  align-items flex-end
  margin-top auto
  padding-top 10px
  border-top 1px solid var(--border-color, rgba(0, 0, 0, 0.04))

.chat-textarea
  flex 1
  min-height 36px
  max-height 80px
  padding 8px 12px
  border 1px solid var(--border-color, rgba(0, 0, 0, 0.1))
  border-radius 8px
  background var(--background, #fff)
  color var(--text-color-primary, #1f2329)
  font-size 13px
  font-family inherit
  resize none
  outline none
  transition border-color 0.15s ease
  &:focus
    border-color var(--el-color-primary, #409eff)
  &::placeholder
    color var(--text-color-tertiary, #bbbfc4)

.chat-send-btn
  flex-shrink 0
  height 36px
  min-width 60px
  padding 0 14px
  border none
  border-radius 8px
  background var(--el-color-primary, #409eff)
  color #fff
  font-size 13px
  cursor pointer
  transition all 0.15s ease
  display flex
  align-items center
  justify-content center
  &:hover:not(:disabled)
    background var(--el-color-primary-dark-2, #337ecc)
  &:disabled
    opacity 0.5
    cursor not-allowed

/* ===== 功能切换按钮区 ===== */
.mode-switch-bar
  flex-shrink 0
  display flex
  gap 8px
  padding 8px 14px
  border-bottom 1px solid rgba(0, 0, 0, 0.04)

.mode-btn
  padding 6px 14px
  border-radius 6px
  border 1px solid var(--border-color, rgba(0, 0, 0, 0.12))
  background var(--background, #fff)
  cursor pointer
  font-size 12px
  color var(--text-color-primary, #1f2329)
  transition all 0.15s ease
  font-family inherit
  &:hover:not(:disabled)
    border-color var(--el-color-primary, #409eff)
    color var(--el-color-primary, #409eff)
  &:disabled
    opacity 0.4
    cursor not-allowed

.mode-btn--active
  border-color var(--el-color-primary, #409eff)
  color var(--el-color-primary, #409eff)
  background var(--el-color-primary-light-9, #ecf5ff)

/* ===== QA 卡片 ===== */
.qa-list
  display flex
  flex-direction column
  gap 8px

.qa-card
  border 1px solid var(--border-color, rgba(0, 0, 0, 0.08))
  border-radius 8px
  overflow hidden
  background var(--background, #fff)

.qa-question
  display flex
  align-items flex-start
  gap 8px
  padding 10px 12px
  cursor pointer
  transition background 0.15s ease
  &:hover
    background var(--el-fill-color-lighter, rgba(0, 0, 0, 0.02))

.qa-num
  flex-shrink 0
  width 24px
  height 24px
  background var(--el-color-primary-light-8, #d9ecff)
  color var(--el-color-primary, #409eff)
  border-radius 50%
  font-size 11px
  font-weight 700
  display flex
  align-items center
  justify-content center

.qa-question-text
  flex 1
  font-size 13.5px
  font-weight 600
  color var(--text-color-primary, #1f2329)
  line-height 1.6

.qa-toggle-arrow
  flex-shrink 0
  font-size 12px
  color var(--text-color-secondary, #8a8f99)
  transition transform 0.2s ease
  margin-top 4px
  &.is-open
    transform rotate(180deg)

.qa-answer
  padding 8px 12px 12px 44px
  border-top 1px solid var(--border-color, rgba(0, 0, 0, 0.04))
  background var(--el-fill-color-lighter, rgba(0, 0, 0, 0.015))

.qa-answer-label
  font-size 12px
  font-weight 700
  color var(--el-color-primary, #409eff)
  margin-right 4px

.qa-answer-text
  font-size 13px
  color var(--text-color-primary, #1f2329)
  line-height 1.7

/* ===== 聊天区域 ===== */
.chat-section
  flex-shrink 0
  display flex
  flex-direction column
  max-height 280px
  border-top 1px solid rgba(0, 0, 0, 0.06)

.chat-section-divider
  flex-shrink 0
  display flex
  align-items center
  padding 8px 14px 4px
  .divider-text
    font-size 11px
    font-weight 600
    color var(--text-color-tertiary, #bbbfc4)
    text-transform uppercase
    letter-spacing 0.04em

/* ===== 底部使用次数 ===== */
.panel-usage-bar
  flex-shrink 0
  display flex
  align-items center
  gap 4px
  padding 6px 14px
  border-top 1px solid rgba(0, 0, 0, 0.04)
  background var(--background, #fff)

.usage-icon
  font-size 13px

.usage-text
  font-size 11px
  color var(--el-color-warning, #e6a23c)

/* ===== 旋转动画 ===== */
.is-spinning
  animation spin 1s linear infinite

@keyframes spin
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)

/* ===== 淡入淡出动画 ===== */
.fade-enter-active,
.fade-leave-active
  transition opacity 0.2s ease

.fade-enter-from,
.fade-leave-to
  opacity 0

/* ===== 服务协议对话框 ===== */
.terms-overlay
  position fixed
  inset 0
  z-index 2000
  background rgba(0, 0, 0, 0.45)
  display flex
  align-items center
  justify-content center
  padding 16px

.terms-dialog
  background var(--background, #fff)
  border-radius 12px
  width 100%
  max-width 400px
  box-shadow 0 8px 32px rgba(0, 0, 0, 0.18)
  overflow hidden

.terms-header
  padding 16px 20px 12px
  border-bottom 1px solid var(--border-color, rgba(0, 0, 0, 0.06))

.terms-title
  font-size 15px
  font-weight 600
  color var(--text-color-primary, #1f2329)

.terms-body
  padding 16px 20px
  max-height 260px
  overflow-y auto
  &::-webkit-scrollbar
    width 4px
  &::-webkit-scrollbar-thumb
    background rgba(0, 0, 0, 0.1)
    border-radius 2px

.terms-paragraph
  font-size 13px
  color var(--text-color-secondary, #646a73)
  line-height 1.75
  margin 0 0 10px
  &:last-child
    margin-bottom 0

.terms-footer
  display flex
  gap 8px
  justify-content flex-end
  padding 12px 20px 16px
  border-top 1px solid var(--border-color, rgba(0, 0, 0, 0.06))

.terms-btn
  height 32px
  padding 0 16px
  border-radius 6px
  font-size 13px
  cursor pointer
  border none
  font-family inherit
  transition all 0.15s ease

.terms-btn--cancel
  background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))
  color var(--text-color-secondary, #646a73)
  &:hover
    background var(--el-fill-color, rgba(0, 0, 0, 0.08))

.terms-btn--confirm
  background var(--el-color-primary, #409eff)
  color #fff
  &:hover
    background var(--el-color-primary-dark-2, #337ecc)

/* ===== 暗色模式 ===== */
:global(.dark) .ai-panel,
:global([data-theme-mode="dark"]) .ai-panel
  background var(--background, #1e1e1e)

:global(.dark) .section--thinking,
:global([data-theme-mode="dark"]) .section--thinking
  background rgba(64, 158, 255, 0.08)
  border-color rgba(64, 158, 255, 0.2)

:global(.dark) .chat-msg--assistant .chat-bubble,
:global([data-theme-mode="dark"]) .chat-msg--assistant .chat-bubble
  background rgba(255, 255, 255, 0.04)
  border-color rgba(255, 255, 255, 0.08)

:global(.dark) .terms-dialog,
:global([data-theme-mode="dark"]) .terms-dialog
  box-shadow 0 8px 32px rgba(0, 0, 0, 0.4)

:global(.dark) .mode-btn--active,
:global([data-theme-mode="dark"]) .mode-btn--active
  background rgba(64, 158, 255, 0.15)

:global(.dark) .qa-card,
:global([data-theme-mode="dark"]) .qa-card
  border-color rgba(255, 255, 255, 0.08)
  background rgba(255, 255, 255, 0.02)

:global(.dark) .qa-answer,
:global([data-theme-mode="dark"]) .qa-answer
  background rgba(255, 255, 255, 0.03)
  border-color rgba(255, 255, 255, 0.06)
</style>
