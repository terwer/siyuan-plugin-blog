<!--
  AI Assistant Panel (Unified Chat Design)
  
  Design Philosophy:
  - All AI interactions are chat bubbles in a single conversation
  - "Speed Read" and "Ask Questions" are quick action buttons
  - Continuous context throughout the session
  - Better token efficiency and user experience
-->

<script setup lang="ts">
import {
  Close,
  Promotion,
  RefreshRight,
  DocumentChecked,
  QuestionFilled,
  ChatLineRound,
  Setting,
} from "@element-plus/icons-vue"
import { useAIAssistant, type AIAssistantConfig, type AIModelMode } from "~/composables/useAIAssistant"
import { useAIUsage } from "~/composables/useAIUsage"
import { AI_SUMMARY_TERMS_KEY, AI_CUSTOM_CONFIG_KEY } from "~/utils/Constants"

const props = defineProps<{
  title: string
  content: string
  docId: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const { t } = useI18n()

// Unified AI Assistant
const {
  messages,
  isLoading,
  error,
  sendSpeedRead,
  sendQA,
  sendMessage,
  clearMessages,
} = useAIAssistant(
  computed(() => props.title),
  computed(() => props.content)
)

// Usage management
const { remainingCount, canUse, consume, dailyLimit } = useAIUsage()

// Chat input
const chatInput = ref("")
const chatListRef = ref<HTMLElement | null>(null)

// AI Config (advanced, collapsed by default)
const showConfig = ref(false)
const config = reactive<AIAssistantConfig>({
  baseUrl: "",
  apiKey: "",
  model: "",
  mode: 'builtin' // 默认使用内置配置
})

// 是否有内置 AI 配置（由服务端决定）
const hasBuiltinConfig = ref(true) // 默认假设有，实际调用时如果报错再调整

// Load saved config from localStorage
const loadSavedConfig = () => {
  if (!import.meta.client) return
  try {
    const saved = localStorage.getItem(AI_CUSTOM_CONFIG_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      config.baseUrl = parsed.baseUrl || ""
      config.apiKey = parsed.apiKey || ""
      config.model = parsed.model || ""
      config.mode = parsed.mode || 'builtin'
    }
  } catch {
    // Ignore parse error
  }
}

// Save config to localStorage
const saveConfig = () => {
  if (!import.meta.client) return
  try {
    localStorage.setItem(AI_CUSTOM_CONFIG_KEY, JSON.stringify({
      baseUrl: config.baseUrl,
      apiKey: config.apiKey,
      model: config.model,
      mode: config.mode,
    }))
  } catch {
    // Ignore save error
  }
}

// 切换模式
const toggleMode = () => {
  config.mode = config.mode === 'builtin' ? 'custom' : 'builtin'
  saveConfig()
}

// 检查是否可以使用 AI
const canUseAI = computed(() => {
  // custom 模式：只要有 API Key 就无限制
  if (config.mode === 'custom') {
    return !!config.apiKey?.trim()
  }
  // builtin 模式：受次数限制
  return canUse.value
})

// 当前模式是否受次数限制
const isUsageLimited = computed(() => config.mode === 'builtin')

// Service agreement confirmation
const termsAccepted = ref(false)
const showTermsDialog = ref(false)

// Check if user has agreed to terms
const checkTermsAccepted = () => {
  if (!import.meta.client) return false
  return localStorage.getItem(AI_SUMMARY_TERMS_KEY) === "true"
}

// Handle speed read action
const handleSpeedRead = async () => {
  if (!canUse.value) return

  const cfg: AIAssistantConfig = {}
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()

  const result = await sendSpeedRead(cfg)
  if (result.success) {
    consume()
    await nextTick()
    scrollToBottom()
  }
}

// Trigger speed read (check terms first)
const triggerSpeedRead = () => {
  if (checkTermsAccepted()) {
    termsAccepted.value = true
    handleSpeedRead()
  } else {
    showTermsDialog.value = true
  }
}

// Handle QA generation
const handleGenerateQA = async () => {
  if (!canUse.value) return

  const cfg: AIAssistantConfig = {}
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()

  const result = await sendQA(cfg)
  if (result.success) {
    consume()
    await nextTick()
    scrollToBottom()
  }
}

// Send chat message
const handleSendMessage = async () => {
  if (!chatInput.value.trim() || !canUse.value) return

  const msg = chatInput.value.trim()
  chatInput.value = ""

  const cfg: AIAssistantConfig = {}
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()

  const result = await sendMessage(msg, cfg)
  if (result.success) {
    consume()
    await nextTick()
    scrollToBottom()
  }
}

// Handle keyboard events
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    handleSendMessage()
  }
}

// Scroll to bottom
const scrollToBottom = () => {
  if (chatListRef.value) {
    const lastMsg = chatListRef.value.lastElementChild as HTMLElement
    lastMsg?.scrollIntoView({ behavior: "smooth", block: "end" })
  }
}

// Accept terms
const acceptTerms = () => {
  if (import.meta.client) localStorage.setItem(AI_SUMMARY_TERMS_KEY, "true")
  termsAccepted.value = true
  showTermsDialog.value = false
  handleSpeedRead()
}

const declineTerms = () => {
  showTermsDialog.value = false
}

// Auto-scroll on message change
watch(messages, () => {
  nextTick(() => scrollToBottom())
}, { deep: true })

// Auto-trigger on mount
onMounted(() => {
  loadSavedConfig()
  if (checkTermsAccepted()) {
    termsAccepted.value = true
    // Show welcome message if no history
    if (messages.value.length === 0) {
      // Welcome message already in template
    }
  } else {
    showTermsDialog.value = true
  }
})
</script>

<template>
  <div class="ai-panel">
    <!-- Header -->
    <div class="ai-panel-header">
      <div class="panel-title">
        <el-icon class="panel-title-icon">
          <Promotion />
        </el-icon>
        <span>{{ t("ai.assistant.title") }}</span>
      </div>
      <div class="panel-header-actions">
        <!-- Clear conversation -->
        <button class="header-btn" :title="t('ai.chat.clear')" :disabled="isLoading || messages.length === 0"
          @click="clearMessages">
          <el-icon>
            <DocumentChecked />
          </el-icon>
        </button>
        <!-- Close -->
        <button class="header-btn header-btn--close" :title="t('main.opt.cancel')" @click="emit('close')">
          <el-icon>
            <Close />
          </el-icon>
        </button>
      </div>
    </div>

    <!-- Quick Action Buttons -->
    <div class="quick-actions-bar">
      <button class="action-btn" :disabled="isLoading || !canUseAI" @click="triggerSpeedRead">
        <el-icon>
          <Promotion />
        </el-icon>
        <span>{{ t("ai.assistant.speedread") }}</span>
      </button>
      <button class="action-btn" :disabled="isLoading || !canUseAI" @click="handleGenerateQA">
        <el-icon>
          <QuestionFilled />
        </el-icon>
        <span>{{ t("ai.assistant.ask") }}</span>
      </button>
    </div>

    <!-- Chat Message List -->
    <div ref="chatListRef" class="chat-list">
      <!-- Welcome message (only shown when empty) -->
      <div v-if="messages.length === 0 && !isLoading" class="chat-msg chat-msg--assistant">
        <div class="chat-bubble">
          {{ t("ai.chat.welcome") }}
        </div>
      </div>

      <!-- Message bubbles -->
      <div v-for="msg in messages" :key="msg.id" class="chat-msg"
        :class="msg.role === 'user' ? 'chat-msg--user' : 'chat-msg--assistant'">
        <div class="chat-bubble">
          <!-- Rich HTML content for summary/QA -->
          <div v-if="msg.type === 'summary'" v-html="msg.content"></div>
          <div v-else-if="msg.type === 'qa'" v-html="msg.content"></div>
          <div v-else>{{ msg.content }}</div>
        </div>
        <div class="msg-time">{{ new Date(msg.timestamp).toLocaleTimeString() }}</div>
      </div>

      <!-- Loading indicator -->
      <div v-if="isLoading" class="chat-msg chat-msg--assistant">
        <div class="chat-bubble chat-bubble--loading">
          <div class="loading-dots loading-dots--small"><span /><span /><span /></div>
        </div>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="chat-error">
      <el-icon class="error-icon">
        <DocumentChecked />
      </el-icon>
      <span>{{ error }}</span>
      <button class="retry-btn" @click="handleSpeedRead">
        {{ t("ai.summary.retry") }}
      </button>
    </div>

    <!-- Input Area -->
    <div class="chat-input-area">
      <textarea v-model="chatInput" class="chat-textarea" :placeholder="t('ai.chat.placeholder')" rows="1"
        @keydown="handleKeyDown" />
      <button class="chat-send-btn" :disabled="!chatInput.trim() || isLoading || !canUseAI" @click="handleSendMessage">
        <span v-if="isLoading" class="loading-dots loading-dots--tiny"><span /><span /><span /></span>
        <span v-else>{{ t("ai.chat.send") }}</span>
      </button>
    </div>

    <!-- Usage counter + Config -->
    <div class="panel-usage-bar">
      <div class="usage-left">
        <span class="usage-icon">💡</span>
        <span v-if="isUsageLimited" :title="'内置模式使用系统资源，每日限 ' + dailyLimit + ' 次'" class="usage-text">
          {{ canUse
            ? t("ai.assistant.usage.remaining", { count: remainingCount }) + "（每日限次）"
            : t("ai.assistant.usage.exhausted")
          }}
        </span>
        <span v-else :title="'自定义模式使用您自己的 API Key，无次数限制'" class="usage-text unlimited">
          自定义模式 · 无限制
        </span>
      </div>
      <button class="config-link" @click="showConfig = !showConfig">
        <el-icon>
          <Setting />
        </el-icon>
        <span>配置</span>
      </button>
    </div>

    <!-- Config Panel (Bottom Sheet) -->
    <div v-show="showConfig" class="config-bottom-sheet">
      <div class="config-sheet-header">
        <span class="sheet-title">AI 配置</span>
        <button class="sheet-close" @click="showConfig = false">
          <el-icon>
            <Close />
          </el-icon>
        </button>
      </div>
      <div class="config-sheet-body">
        <!-- 模式切换 -->
        <div class="config-field">
          <label>AI 模式</label>
          <div class="mode-switch">
            <button class="mode-btn" :class="{ active: config.mode === 'builtin' }"
              @click="config.mode = 'builtin'; saveConfig()">
              内置
            </button>
            <button class="mode-btn" :class="{ active: config.mode === 'custom' }"
              @click="config.mode = 'custom'; saveConfig()">
              自定义
            </button>
          </div>
          <div class="mode-hint">
            <template v-if="config.mode === 'builtin'">
              使用系统 AI · 每日限 {{ dailyLimit }} 次
            </template>
            <template v-else>
              使用您的 API Key · 无次数限制
            </template>
          </div>
        </div>

        <!-- 自定义配置 -->
        <template v-if="config.mode === 'custom'">
          <div class="config-field">
            <label>API Base URL</label>
            <input v-model="config.baseUrl" type="text" placeholder="https://api.openai.com" @blur="saveConfig">
          </div>
          <div class="config-field">
            <label>API Key <span class="required">*</span></label>
            <input v-model="config.apiKey" type="password" placeholder="sk-..." @blur="saveConfig">
          </div>
          <div class="config-field">
            <label>模型</label>
            <input v-model="config.model" type="text" placeholder="gpt-3.5-turbo" @blur="saveConfig">
          </div>
        </template>
      </div>
    </div>

    <!-- Terms Dialog -->
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
/* ===== Panel Container ===== */
.ai-panel
  height 100%
  display flex
  flex-direction column
  font-family var(--b3-font-family, "Helvetica Neue", Arial, sans-serif)
  background var(--background, #fff)

/* ===== Header ===== */
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

/* ===== Quick Actions Bar ===== */
.quick-actions-bar
  flex-shrink 0
  display flex
  gap 8px
  padding 10px 14px
  border-bottom 1px solid rgba(0, 0, 0, 0.04)

.config-field
  display flex
  flex-direction column
  gap 4px
  
  label
    font-size 11px
    color var(--text-color-secondary, #8a8f99)
    font-weight 500
    
    .required
      color var(--el-color-danger, #f56c6c)
  
  input
    padding 6px 10px
    border 1px solid var(--el-border-color, rgba(0, 0, 0, 0.1))
    border-radius 4px
    font-size 12px
    background var(--background, #fff)
    color var(--text-color-primary, #1f2329)
    
    &:focus
      outline none
      border-color var(--el-color-primary, #409eff)
    
    &::placeholder
      color var(--text-color-secondary, #8a8f99)

// Mode switch
.mode-switch
  display flex
  gap 8px
  
.mode-btn
  flex 1
  padding 6px 12px
  border 1px solid var(--el-border-color, rgba(0, 0, 0, 0.1))
  border-radius 4px
  background var(--background, #fff)
  cursor pointer
  font-size 12px
  color var(--text-color-secondary, #8a8f99)
  transition all 0.2s ease
  
  &:hover
    border-color var(--el-color-primary, #409eff)
    color var(--el-color-primary, #409eff)
  
  &.active
    background var(--el-color-primary, #409eff)
    border-color var(--el-color-primary, #409eff)
    color white

.mode-hint
  font-size 11px
  color var(--text-color-secondary, #8a8f99)
  margin-top 4px

.action-btn
  flex 1
  display inline-flex
  align-items center
  justify-content center
  gap 6px
  padding 8px 12px
  border 1px solid var(--el-border-color, rgba(0, 0, 0, 0.1))
  background var(--el-fill-color-blank, #fff)
  border-radius 6px
  cursor pointer
  font-size 13px
  font-weight 500
  color var(--text-color-primary, #1f2329)
  transition all 0.2s ease
  &:hover:not(:disabled)
    border-color var(--el-color-primary, #409eff)
    color var(--el-color-primary, #409eff)
    background var(--el-color-primary-light-9, rgba(64, 158, 255, 0.1))
  &:disabled
    opacity 0.5
    cursor not-allowed

/* ===== Chat List ===== */
.chat-list
  flex 1
  overflow-y auto
  padding 14px
  display flex
  flex-direction column
  gap 12px
  overscroll-behavior contain
  
  &::-webkit-scrollbar
    width 4px
  
  &::-webkit-scrollbar-thumb
    background rgba(0, 0, 0, 0.1)
    border-radius 2px

/* ===== Chat Messages ===== */
.chat-msg
  display flex
  flex-direction column
  gap 4px
  max-width 85%
  
  &--user
    align-self flex-end
    align-items flex-end
  
  &--assistant
    align-self flex-start
    align-items flex-start

.chat-bubble
  padding 10px 14px
  border-radius 12px
  font-size 13px
  line-height 1.6
  word-break break-word
  
  &--user
    background var(--el-color-primary, #409eff)
    color white
  
  &--assistant
    background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))
    color var(--text-color-primary, #1f2329)
  
  &--loading
    padding 12px 16px

.msg-time
  font-size 11px
  color var(--text-color-secondary, #8a8f99)
  padding 0 4px

/* ===== Loading Dots ===== */
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

/* ===== Error State ===== */
.chat-error
  margin 0 14px
  padding 10px 14px
  background var(--el-color-warning-light-9, rgba(230, 162, 60, 0.1))
  border-left 3px solid var(--el-color-warning, #e6a23c)
  border-radius 6px
  display flex
  align-items center
  gap 8px
  font-size 13px
  color var(--text-color-primary, #1f2329)
  
  .error-icon
    font-size 16px
    color var(--el-color-warning, #e6a23c)
  
  .retry-btn
    margin-left auto
    padding 4px 10px
    border-radius 4px
    border 1px solid var(--el-color-warning, #e6a23c)
    background transparent
    color var(--el-color-warning, #e6a23c)
    cursor pointer
    font-size 12px
    
    &:hover
      background var(--el-color-warning, #e6a23c)
      color white

/* ===== Input Area ===== */
.chat-input-area
  flex-shrink 0
  display flex
  gap 8px
  padding 12px 14px
  border-top 1px solid rgba(0, 0, 0, 0.04)

.chat-textarea
  flex 1
  padding 8px 12px
  border 1px solid var(--el-border-color, rgba(0, 0, 0, 0.1))
  border-radius 6px
  resize none
  font-family inherit
  font-size 13px
  line-height 1.5
  min-height 36px
  max-height 80px
  
  &:focus
    outline none
    border-color var(--el-color-primary, #409eff)

.chat-send-btn
  flex-shrink 0
  padding 0 16px
  border none
  background var(--el-color-primary, #409eff)
  color white
  border-radius 6px
  cursor pointer
  font-size 13px
  font-weight 500
  transition all 0.2s ease
  
  &:hover:not(:disabled)
    background var(--el-color-primary-light-3, #66b1ff)
  
  &:disabled
    opacity 0.5
    cursor not-allowed

/* ===== Usage Bar ===== */
.panel-usage-bar
  flex-shrink 0
  display flex
  align-items center
  justify-content space-between
  padding 8px 14px
  border-top 1px solid rgba(0, 0, 0, 0.04)
  font-size 12px
  color var(--text-color-secondary, #8a8f99)
  background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))

.usage-left
  display flex
  align-items center
  gap 6px

.usage-icon
  font-size 14px

.usage-text
  flex 1
  
  &.unlimited
    color var(--el-color-success, #67c23a)

.config-link
  display flex
  align-items center
  gap 4px
  padding 4px 8px
  border none
  background transparent
  cursor pointer
  font-size 12px
  color var(--text-color-secondary, #8a8f99)
  border-radius 4px
  transition all 0.2s ease
  
  &:hover
    color var(--el-color-primary, #409eff)
    background rgba(64, 158, 255, 0.1)
  
  .el-icon
    font-size 14px

/* ===== Config Bottom Sheet ===== */
.config-bottom-sheet
  flex-shrink 0
  border-top 1px solid rgba(0, 0, 0, 0.08)
  background var(--background, #fff)
  max-height 300px
  overflow-y auto

.config-sheet-header
  display flex
  align-items center
  justify-content space-between
  padding 10px 14px
  border-bottom 1px solid rgba(0, 0, 0, 0.04)

.sheet-title
  font-size 13px
  font-weight 600
  color var(--text-color-primary, #1f2329)

.sheet-close
  width 24px
  height 24px
  display flex
  align-items center
  justify-content center
  border none
  background transparent
  cursor pointer
  color var(--text-color-secondary, #8a8f99)
  border-radius 4px
  
  &:hover
    color var(--text-color-primary, #1f2329)
    background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))

.config-sheet-body
  padding 12px 14px
  display flex
  flex-direction column
  gap 12px

/* ===== Terms Dialog ===== */
.terms-overlay
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0, 0, 0, 0.5)
  display flex
  align-items center
  justify-content center
  z-index 9999

.terms-dialog
  width 90%
  max-width 420px
  background var(--background, #fff)
  border-radius 12px
  box-shadow 0 8px 32px rgba(0, 0, 0, 0.2)
  display flex
  flex-direction column
  max-height 80vh

.terms-header
  padding 16px 20px
  border-bottom 1px solid rgba(0, 0, 0, 0.06)
  
  .terms-title
    font-size 16px
    font-weight 600
    color var(--text-color-primary, #1f2329)

.terms-body
  padding 20px
  overflow-y auto
  flex 1
  
  .terms-paragraph
    font-size 13px
    line-height 1.7
    color var(--text-color-secondary, #8a8f99)
    margin-bottom 12px
    
    &:last-child
      margin-bottom 0

.terms-footer
  display flex
  justify-content flex-end
  gap 8px
  padding 12px 20px
  border-top 1px solid rgba(0, 0, 0, 0.06)

.terms-btn
  padding 8px 16px
  border-radius 6px
  font-size 13px
  font-weight 500
  cursor pointer
  transition all 0.2s ease
  
  &--cancel
    background transparent
    border 1px solid var(--el-border-color, rgba(0, 0, 0, 0.1))
    color var(--text-color-primary, #1f2329)
    
    &:hover
      background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))
  
  &--confirm
    background var(--el-color-primary, #409eff)
    border 1px solid var(--el-color-primary, #409eff)
    color white
    
    &:hover
      background var(--el-color-primary-light-3, #66b1ff)

/* ===== Fade Transition ===== */
.fade-enter-active,
.fade-leave-active
  transition opacity 0.2s ease

.fade-enter-from,
.fade-leave-to
  opacity 0
</style>
