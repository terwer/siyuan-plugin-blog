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
  Delete,
  QuestionFilled,
  ChatLineRound,
  Setting,
  Loading,
} from "@element-plus/icons-vue"
import { useAIAssistant, type AIAssistantConfig, type AIModelMode } from "~/composables/useAIAssistant"
import { useAIUsage } from "~/composables/useAIUsage"
import { useLute } from "~/composables/useLute"
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

// Lute Markdown 渲染器
const { renderMarkdown } = useLute()

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

// Button loading states (independent for each button to avoid confusion)
const speedReadLoading = ref(false)
const qaLoading = ref(false)

// Chat input
const chatInput = ref("")
const chatListRef = ref<HTMLElement | null>(null)
const configBtnRef = ref<HTMLElement | null>(null)

// AI Config (advanced, collapsed by default)
const showConfig = ref(false)
const configPopoverStyle = ref({ bottom: '0px', right: '0px' })

// Update config popover position
const updateConfigPosition = () => {
  if (!configBtnRef.value) return
  const rect = configBtnRef.value.getBoundingClientRect()
  // 向上展开，避免被底部遮挡
  configPopoverStyle.value = {
    bottom: `${window.innerHeight - rect.top + 8}px`,
    right: `${window.innerWidth - rect.right}px`,
  }
}

// Watch showConfig to update position
watch(showConfig, (val) => {
  if (val) {
    nextTick(updateConfigPosition)
  }
})
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

// 可用模型列表（完全从API动态获取，禁止硬编码）
const availableModels = ref<{ id: string; name: string; provider: string }[]>([])
const isLoadingModels = ref(false)
const modelsError = ref<string | null>(null)

// 加载模型列表 - 必须从API获取，禁止硬编码，禁止fallback
const loadModels = async () => {
  if (config.mode !== 'custom') return

  isLoadingModels.value = true
  modelsError.value = null
  availableModels.value = []

  try {
    const params = new URLSearchParams({
      mode: config.mode,
    })
    if (config.baseUrl) params.append('baseUrl', config.baseUrl)
    if (config.apiKey) params.append('apiKey', config.apiKey)

    const response = await fetch(`/api/ai/models?${params}`)
    const data = await response.json()

    if (data.success && data.models && data.models.length > 0) {
      availableModels.value = data.models
    } else {
      // API返回错误或空列表，显示错误信息
      modelsError.value = data.error || '无法获取模型列表，请检查API配置'
    }
  } catch (error) {
    // API调用失败，显示错误
    modelsError.value = '网络错误，无法获取模型列表'
  } finally {
    isLoadingModels.value = false
  }
}

// 选择模型
const selectModel = (modelValue: string) => {
  config.model = modelValue
  saveConfig()
}

// 监听模式变化，自动加载模型列表
watch(() => config.mode, (newMode) => {
  if (newMode === 'custom') {
    loadModels()
  }
}, { immediate: true })

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

// 待执行的AI操作（条款确认后执行）
let pendingAIOperation: (() => void) | null = null

// Check terms before any AI operation
const checkTermsBeforeAction = (action: () => void) => {
  if (checkTermsAccepted()) {
    termsAccepted.value = true
    action()
  } else {
    pendingAIOperation = action
    showTermsDialog.value = true
  }
}

// Handle terms confirmation
const handleTermsConfirm = () => {
  termsAccepted.value = true
  showTermsDialog.value = false
  if (pendingAIOperation) {
    pendingAIOperation()
    pendingAIOperation = null
  }
}

// Handle terms cancel
const handleTermsCancel = () => {
  showTermsDialog.value = false
  pendingAIOperation = null
}

// Handle speed read action (with streaming)
const handleSpeedRead = async () => {
  if (!canUseAI.value || speedReadLoading.value) return

  speedReadLoading.value = true
  const cfg: AIAssistantConfig = {
    mode: config.mode,
  }
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()

  try {
    const result = await sendSpeedRead(cfg)
    if (result.success) {
      if (isUsageLimited.value) consume()
    }
  } finally {
    speedReadLoading.value = false
  }
}

// Trigger speed read (check terms first)
const triggerSpeedRead = () => {
  // 立即滚动到底部，让用户看到加载状态
  nextTick(() => scrollToBottom())
  checkTermsBeforeAction(handleSpeedRead)
}

// Handle QA generation (with streaming)
const handleGenerateQA = async () => {
  if (!canUseAI.value || qaLoading.value) return

  qaLoading.value = true
  const cfg: AIAssistantConfig = {
    mode: config.mode,
  }
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()

  try {
    const result = await sendQA(cfg)
    if (result.success) {
      if (isUsageLimited.value) consume()
    }
  } finally {
    qaLoading.value = false
  }
}

// Trigger QA generation (check terms first)
const triggerQA = () => {
  // 立即滚动到底部，让用户看到加载状态
  nextTick(() => scrollToBottom())
  checkTermsBeforeAction(handleGenerateQA)
}

// Execute chat message send
const executeSendMessage = async () => {
  if (!chatInput.value.trim() || !canUseAI.value) return

  const msg = chatInput.value.trim()
  chatInput.value = ""

  const cfg: AIAssistantConfig = {
    mode: config.mode,
  }
  if (config.baseUrl?.trim()) cfg.baseUrl = config.baseUrl.trim()
  if (config.apiKey?.trim()) cfg.apiKey = config.apiKey.trim()
  if (config.model?.trim()) cfg.model = config.model.trim()

  const result = await sendMessage(msg, cfg)
  if (result.success) {
    if (isUsageLimited.value) consume()
    await nextTick()
    scrollToBottom()
  }
}

// Send chat message (check terms first)
const handleSendMessage = () => {
  // 立即滚动到底部，让用户看到加载状态
  nextTick(() => scrollToBottom())
  checkTermsBeforeAction(executeSendMessage)
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
    // 使用 scrollTop 直接滚动到底部，更可靠
    const scrollHeight = chatListRef.value.scrollHeight
    chatListRef.value.scrollTo({
      top: scrollHeight,
      behavior: 'smooth'
    })
  }
}

// Get localized error message
const getErrorMessage = (errorCode: string | null): string => {
  if (!errorCode) return ""

  const errorMap: Record<string, string> = {
    'EMPTY_CONTENT': t('ai.assistant.error.empty.content'),
    'EMPTY_MESSAGE': t('ai.assistant.error.empty.message'),
    'GENERATE_FAILED': t('ai.assistant.error.generate.failed'),
    'INVALID_FORMAT': t('ai.assistant.error.format.invalid'),
    'SEND_FAILED': t('ai.assistant.error.send.failed'),
    'NETWORK_ERROR': t('ai.assistant.error.network'),
    'EMPTY_AI_RESPONSE': t('ai.assistant.error.empty.ai.response'),
  }

  return errorMap[errorCode] || errorCode
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

// Auto-scroll when any button loading state changes to true
watch([speedReadLoading, qaLoading], ([speedLoading, qaLoading]) => {
  if (speedLoading || qaLoading) {
    nextTick(() => scrollToBottom())
  }
})

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
      <div class="panel-header-actions">
        <!-- Clear conversation -->
        <button class="header-btn" :title="t('ai.chat.clear')" :disabled="isLoading || messages.length === 0"
          @click="clearMessages">
          <el-icon>
            <Delete />
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
          <!-- All assistant messages (summary/qa/chat) render Markdown -->
          <div v-if="msg.role === 'assistant'" v-html="renderMarkdown(msg.content)"></div>
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
      <span>{{ getErrorMessage(error) }}</span>
      <button class="retry-btn" @click="handleSpeedRead">
        {{ t("ai.summary.retry") }}
      </button>
    </div>

    <!-- Quick Action Buttons (above input) -->
    <div class="quick-actions-bar">
      <button class="action-btn" :disabled="speedReadLoading || qaLoading || !canUseAI" @click="triggerSpeedRead">
        <el-icon v-if="speedReadLoading" class="is-loading">
          <Loading />
        </el-icon>
        <el-icon v-else>
          <Promotion />
        </el-icon>
        <span>{{ t("ai.assistant.speedread") }}</span>
      </button>
      <button class="action-btn" :disabled="speedReadLoading || qaLoading || !canUseAI" @click="triggerQA">
        <el-icon v-if="qaLoading" class="is-loading">
          <Loading />
        </el-icon>
        <el-icon v-else>
          <QuestionFilled />
        </el-icon>
        <span>{{ t("ai.assistant.ask") }}</span>
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

    <!-- Model Selector (Custom Mode Only) -->
    <div v-if="config.mode === 'custom'" class="model-selector">
      <div class="model-selector-label">
        <el-icon>
          <DocumentChecked />
        </el-icon>
        <span>{{ t("ai.assistant.config.model") }}</span>
      </div>
      <div v-if="isLoadingModels" class="model-loading">
        <span class="loading-text">加载中...</span>
      </div>
      <div v-else-if="modelsError" class="model-error">
        <span class="error-text">{{ modelsError }}</span>
      </div>
      <div v-else-if="availableModels.length === 0" class="model-empty">
        <span class="empty-text">未获取到模型，请检查API配置</span>
      </div>
      <el-select v-else v-model="config.model" class="model-select" placeholder="选择模型" size="small"
        @change="saveConfig">
        <el-option v-for="model in availableModels" :key="model.id" :label="model.name" :value="model.id" />
      </el-select>
    </div>

    <!-- Usage counter + Config -->
    <div class="panel-usage-bar">
      <div class="usage-left">
        <span class="usage-icon">💡</span>
        <span v-if="isUsageLimited" :title="t('ai.assistant.usage.builtin.tooltip', { limit: dailyLimit })"
          :class="['usage-text', !canUse && 'usage-text--exhausted']">
          <template v-if="canUse">
            {{ t("ai.assistant.usage.remaining", { count: remainingCount }) + t("ai.assistant.usage.limited") }}
          </template>
          <template v-else>
            <span class="exhausted-main">{{ t("ai.assistant.usage.exhausted") }}</span>
            <span class="exhausted-hint">{{ t("ai.assistant.usage.switch.hint") }}</span>
          </template>
        </span>
        <span v-else :title="t('ai.assistant.usage.custom.tooltip')" class="usage-text unlimited">
          {{ t("ai.assistant.usage.custom.unlimited") }}
        </span>
      </div>
      <button ref="configBtnRef" :class="['config-link', !canUse && isUsageLimited && 'config-link--highlight']"
        @click="showConfig = !showConfig">
        <el-icon>
          <Setting />
        </el-icon>
        <span>{{ t("ai.assistant.config") }}</span>
      </button>
    </div>

    <!-- Config Panel (Dropdown Popover) -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showConfig" class="config-popover-overlay" @click.self="showConfig = false">
          <div class="config-popover" :style="configPopoverStyle">
            <div class="config-popover-header">
              <span class="popover-title">{{ t("ai.assistant.config.title") }}</span>
              <button class="popover-close" @click="showConfig = false">
                <el-icon>
                  <Close />
                </el-icon>
              </button>
            </div>
            <div class="config-popover-body">
              <!-- 模式切换 -->
              <div class="config-field">
                <label>{{ t("ai.assistant.config.mode") }}</label>
                <div class="mode-switch">
                  <button class="mode-btn" :class="{ active: config.mode === 'builtin' }"
                    @click="config.mode = 'builtin'; saveConfig()">
                    {{ t("ai.assistant.config.mode.builtin") }}
                  </button>
                  <button class="mode-btn" :class="{ active: config.mode === 'custom' }"
                    @click="config.mode = 'custom'; saveConfig()">
                    {{ t("ai.assistant.config.mode.custom") }}
                  </button>
                </div>
                <div class="mode-hint">
                  <template v-if="config.mode === 'builtin'">
                    {{ t("ai.assistant.config.mode.builtin.hint", { limit: dailyLimit }) }}
                  </template>
                  <template v-else>
                    {{ t("ai.assistant.config.mode.custom.hint") }}
                  </template>
                </div>
              </div>

              <!-- 自定义配置 -->
              <template v-if="config.mode === 'custom'">
                <div class="config-field">
                  <label>{{ t("ai.assistant.config.baseurl") }}</label>
                  <input v-model="config.baseUrl" type="text" placeholder="https://api.openai.com" @blur="saveConfig">
                </div>
                <div class="config-field">
                  <label>{{ t("ai.assistant.config.apikey") }} <span class="required">{{
                    t("ai.assistant.config.required") }}</span></label>
                  <input v-model="config.apiKey" type="password" placeholder="sk-..." @blur="saveConfig">
                </div>
                <div class="config-field">
                  <label>{{ t("ai.assistant.config.model") }}</label>
                  <input v-model="config.model" type="text" placeholder="gpt-3.5-turbo" @blur="saveConfig">
                </div>
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

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
              <button class="terms-btn terms-btn--cancel" @click="handleTermsCancel">
                {{ t("ai.assistant.terms.cancel") }}
              </button>
              <button class="terms-btn terms-btn--confirm" @click="handleTermsConfirm">
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
  overflow hidden
  position relative
  
  // Dark mode
  html[data-theme-mode="dark"] &
    background var(--b3-theme-background, #1e1e1e)

/* ===== Header ===== */
.ai-panel-header
  flex-shrink 0
  display flex
  align-items center
  justify-content flex-end
  padding 10px 14px
  border-bottom 1px solid rgba(0, 0, 0, 0.04)
  
  html[data-theme-mode="dark"] &
    border-bottom-color rgba(255, 255, 255, 0.08)

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
  
  html[data-theme-mode="dark"] &
    color rgba(255, 255, 255, 0.5)
    
    &:hover:not(:disabled)
      background rgba(255, 255, 255, 0.08)
      color rgba(255, 255, 255, 0.85)

.header-btn--close
  font-size 16px

/* ===== Quick Actions Bar ===== */
.quick-actions-bar
  flex-shrink 0
  display flex
  gap 8px
  padding 10px 14px
  border-bottom 1px solid rgba(0, 0, 0, 0.04)
  
  html[data-theme-mode="dark"] &
    border-bottom-color rgba(255, 255, 255, 0.08)

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
  
  html[data-theme-mode="dark"] &
    label
      color rgba(255, 255, 255, 0.5)
    
    input
      background rgba(255, 255, 255, 0.05)
      border-color rgba(255, 255, 255, 0.1)
      color var(--b3-theme-on-background, #d1d5db)
      
      &::placeholder
        color rgba(255, 255, 255, 0.35)

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
  
  html[data-theme-mode="dark"] &
    background rgba(255, 255, 255, 0.05)
    border-color rgba(255, 255, 255, 0.1)
    color rgba(255, 255, 255, 0.6)
    
    &:hover
      border-color var(--el-color-primary, #409eff)
      color var(--el-color-primary, #79bbff)
    
    &.active
      background var(--el-color-primary, #409eff)
      border-color var(--el-color-primary, #409eff)
      color white

.mode-hint
  font-size 11px
  color var(--text-color-secondary, #8a8f99)
  margin-top 4px
  
  html[data-theme-mode="dark"] &
    color rgba(255, 255, 255, 0.4)

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
  white-space nowrap
  min-width 0
  overflow hidden
  &:hover:not(:disabled)
    border-color var(--el-color-primary, #409eff)
    color var(--el-color-primary, #409eff)
    background var(--el-color-primary-light-9, rgba(64, 158, 255, 0.1))
  &:disabled
    opacity 0.6
    cursor not-allowed
    background var(--el-fill-color-light, rgba(0, 0, 0, 0.04))
  
  html[data-theme-mode="dark"] &
    background rgba(255, 255, 255, 0.05)
    border-color rgba(255, 255, 255, 0.1)
    color rgba(255, 255, 255, 0.7)
    
    &:hover:not(:disabled)
      background rgba(255, 255, 255, 0.1)
      border-color var(--el-color-primary, #409eff)
      color var(--el-color-primary, #79bbff)
    
    &:disabled
      background rgba(255, 255, 255, 0.03)
      color rgba(255, 255, 255, 0.3)
  
  .el-icon
    width 16px
    height 16px
    display flex
    align-items center
    justify-content center
    flex-shrink 0
  
  .is-loading
    animation rotating 1s linear infinite
    
  @keyframes rotating
    from
      transform rotate(0deg)
    to
      transform rotate(360deg)

/* ===== Chat List ===== */
.chat-list
  flex 1
  overflow-y auto
  overflow-x hidden
  padding 14px
  display flex
  flex-direction column
  gap 12px
  overscroll-behavior contain
  scrollbar-width none
  -ms-overflow-style none
  
  &::-webkit-scrollbar
    display none
    width 0
    height 0

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
    
    html[data-theme-mode="dark"] &
      background rgba(255, 255, 255, 0.08)
      color var(--b3-theme-on-background, #d1d5db)
  
  &--loading
    padding 12px 16px
  
  /* Details/Summary 样式修复 */
  :deep(details)
    margin 8px 0
    
  :deep(summary)
    cursor pointer
    user-select none
    color var(--el-color-primary, #409eff)
    font-weight 500
    display flex
    align-items center
    gap 6px
    
    /* 隐藏默认的三角形标记 */
    list-style none
    &::-webkit-details-marker
      display none
    
    /* 自定义展开图标 */
    &::before
      content '▸'
      font-size 12px
      transition transform 0.2s ease
    
  :deep(details[open] summary::before)
    content '▾'
    
  :deep(details p)
    margin 8px 0 0 0
    padding 8px 12px
    background rgba(0, 0, 0, 0.03)
    border-radius 6px
    line-height 1.6
  
  html[data-theme-mode="dark"] &
    :deep(details p)
      background rgba(255, 255, 255, 0.05)
      color var(--b3-theme-on-background, #d1d5db)
  
  /* Markdown 渲染内容样式 */
  :deep(.markdown-content)
    h1, h2, h3, h4, h5, h6
      margin 12px 0 8px 0
      font-weight 600
      line-height 1.4
      
    h1
      font-size 16px
      
    h2
      font-size 15px
      
    h3, h4, h5, h6
      font-size 14px
    
    p
      margin 8px 0
      line-height 1.6
    
    ul, ol
      margin 8px 0
      padding-left 20px
      
    li
      margin 4px 0
      line-height 1.5
    
    code
      background rgba(0, 0, 0, 0.05)
      padding 2px 6px
      border-radius 4px
      font-family monospace
      font-size 12px
    
    pre
      background rgba(0, 0, 0, 0.05)
      padding 12px
      border-radius 6px
      overflow-x auto
      margin 8px 0
      
      code
        background none
        padding 0
    
    blockquote
      border-left 3px solid var(--el-color-primary, #409eff)
      padding-left 12px
      margin 8px 0
      color var(--text-color-secondary, #606266)
    
    a
      color var(--el-color-primary, #409eff)
      text-decoration none
      
      &:hover
        text-decoration underline
    
    table
      width 100%
      border-collapse collapse
      margin 8px 0
      
    th, td
      border 1px solid var(--el-border-color, #dcdfe6)
      padding 8px 12px
      text-align left
      
    th
      background rgba(0, 0, 0, 0.03)
      font-weight 600
    
    hr
      border none
      border-top 1px solid var(--el-border-color, #dcdfe6)
      margin 16px 0
  
  html[data-theme-mode="dark"] &
    :deep(.markdown-content)
      code
        background rgba(255, 255, 255, 0.1)
        color var(--b3-theme-on-background, #d1d5db)
      
      pre
        background rgba(255, 255, 255, 0.08)
        
        code
          color var(--b3-theme-on-background, #d1d5db)
      
      blockquote
        border-left-color var(--el-color-primary, #409eff)
        color rgba(255, 255, 255, 0.6)
      
      a
        color var(--el-color-primary, #79bbff)
        
        &:hover
          color var(--el-color-primary-light-3, #a0cfff)
      
      th, td
        border-color rgba(255, 255, 255, 0.15)
      
      th
        background rgba(255, 255, 255, 0.08)
      
      hr
        border-top-color rgba(255, 255, 255, 0.15)

.msg-time
  font-size 11px
  color var(--text-color-secondary, #8a8f99)
  padding 0 4px
  
  html[data-theme-mode="dark"] &
    color rgba(255, 255, 255, 0.4)

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
  
  html[data-theme-mode="dark"] &
    background rgba(230, 162, 60, 0.15)
    color var(--b3-theme-on-background, #d1d5db)
  
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
  
  html[data-theme-mode="dark"] &
    border-top-color rgba(255, 255, 255, 0.08)

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
  
  html[data-theme-mode="dark"] &
    background rgba(255, 255, 255, 0.05)
    border-color rgba(255, 255, 255, 0.1)
    color var(--b3-theme-on-background, #d1d5db)
    
    &::placeholder
      color rgba(255, 255, 255, 0.35)

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

/* ===== Model Selector ===== */
.model-selector
  flex-shrink 0
  display flex
  align-items center
  gap 10px
  padding 8px 14px
  border-top 1px solid rgba(0, 0, 0, 0.04)
  background rgba(0, 0, 0, 0.02)
  
  html[data-theme-mode="dark"] &
    background rgba(255, 255, 255, 0.03)
    border-top-color rgba(255, 255, 255, 0.08)

.model-selector-label
  display flex
  align-items center
  gap 4px
  font-size 12px
  color var(--text-color-secondary, #606266)
  flex-shrink 0
  
  html[data-theme-mode="dark"] &
    color rgba(255, 255, 255, 0.5)

.model-options
  display flex
  flex-wrap wrap
  gap 6px
  flex 1

.model-option
  padding 3px 10px
  border 1px solid var(--el-border-color, rgba(0, 0, 0, 0.1))
  border-radius 12px
  background white
  font-size 11px
  color var(--text-color-regular, #606266)
  cursor pointer
  transition all 0.2s ease
  white-space nowrap

  &:hover
    border-color var(--el-color-primary, #409eff)
    color var(--el-color-primary, #409eff)

  &.active
    background var(--el-color-primary, #409eff)
    border-color var(--el-color-primary, #409eff)
    color white
    cursor not-allowed

.model-loading
  flex 1
  display flex
  align-items center
  justify-content center

  .loading-text
    font-size 11px
    color var(--text-color-secondary, #606266)

.model-empty
  flex 1
  display flex
  align-items center
  justify-content center

  .empty-text
    font-size 11px
    color var(--text-color-secondary, #606266)
    font-style italic

.model-error
  flex 1
  display flex
  align-items center
  justify-content center

  .error-text
    font-size 11px
    color var(--el-color-danger, #f56c6c)

// Element Plus Select 样式
.model-select
  flex 1
  max-width 200px
  
  :deep(.el-input__wrapper)
    background var(--background, #fff)
    
  :deep(.el-input__inner)
    font-size 12px
    color var(--text-color-primary, #1f2329)
  
  html[data-theme-mode="dark"] &
    :deep(.el-input__wrapper)
      background rgba(255, 255, 255, 0.05)
      box-shadow 0 0 0 1px rgba(255, 255, 255, 0.1) inset
    
    :deep(.el-input__inner)
      color var(--b3-theme-on-background, #d1d5db)
    
    :deep(.el-input__inner::placeholder)
      color rgba(255, 255, 255, 0.35)

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
  
  html[data-theme-mode="dark"] &
    background rgba(255, 255, 255, 0.05)
    border-top-color rgba(255, 255, 255, 0.08)

.usage-left
  display flex
  align-items center
  gap 6px

.usage-icon
  font-size 14px

.usage-text
  flex 1
  display flex
  flex-direction column
  gap 2px
  
  &.unlimited
    color var(--el-color-success, #67c23a)
  
  &--exhausted
    .exhausted-main
      color var(--el-color-danger, #f56c6c)
      font-weight 600
      font-size 13px
    
    .exhausted-hint
      color var(--el-color-danger-light-3, #f89898)
      font-size 11px
  
  html[data-theme-mode="dark"] &
    color rgba(255, 255, 255, 0.5)

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
  
  &--highlight
    color var(--el-color-danger, #f56c6c)
    background var(--el-color-danger-light-9, rgba(245, 108, 108, 0.1))
    font-weight 500
    animation pulse 2s infinite
    
    &:hover
      color var(--el-color-danger, #f56c6c)
      background var(--el-color-danger-light-8, rgba(245, 108, 108, 0.2))
  
  @keyframes pulse
    0%, 100%
      opacity 1
    50%
      opacity 0.7
  
  .el-icon
    font-size 14px
  
  html[data-theme-mode="dark"] &
    color rgba(255, 255, 255, 0.5)
    
    &:hover
      color var(--el-color-primary, #79bbff)
      background rgba(64, 158, 255, 0.15)

/* ===== Config Popover ===== */
.config-popover-overlay
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 9998

.config-popover
  position fixed
  width 280px
  max-height calc(100vh - 200px)
  overflow-y auto
  background var(--background, #fff)
  border-radius 8px
  box-shadow 0 4px 20px rgba(0, 0, 0, 0.15)
  border 1px solid rgba(0, 0, 0, 0.08)
  z-index 9999
  
  html[data-theme-mode="dark"] &
    background var(--b3-theme-background, #1e1e1e)
    border-color rgba(255, 255, 255, 0.1)
    box-shadow 0 4px 20px rgba(0, 0, 0, 0.4)

.config-popover-header
  display flex
  align-items center
  justify-content space-between
  padding 12px 16px
  border-bottom 1px solid rgba(0, 0, 0, 0.06)
  
  html[data-theme-mode="dark"] &
    border-bottom-color rgba(255, 255, 255, 0.08)

.popover-title
  font-size 14px
  font-weight 600
  color var(--text-color-primary, #1f2329)
  
  html[data-theme-mode="dark"] &
    color var(--b3-theme-on-background, #d1d5db)

.popover-close
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
  
  html[data-theme-mode="dark"] &
    color rgba(255, 255, 255, 0.5)
    
    &:hover
      color rgba(255, 255, 255, 0.85)
      background rgba(255, 255, 255, 0.08)

.config-popover-body
  padding 16px
  display flex
  flex-direction column
  gap 16px

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
  
  html[data-theme-mode="dark"] &
    background var(--b3-theme-background, #1e1e1e)

.terms-header
  padding 16px 20px
  border-bottom 1px solid rgba(0, 0, 0, 0.06)
  
  .terms-title
    font-size 16px
    font-weight 600
    color var(--text-color-primary, #1f2329)
  
  html[data-theme-mode="dark"] &
    border-bottom-color rgba(255, 255, 255, 0.08)
    
    .terms-title
      color var(--b3-theme-on-background, #d1d5db)

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
  
  html[data-theme-mode="dark"] &
    .terms-paragraph
      color rgba(255, 255, 255, 0.6)

.terms-footer
  display flex
  justify-content flex-end
  gap 8px
  padding 12px 20px
  border-top 1px solid rgba(0, 0, 0, 0.06)
  
  html[data-theme-mode="dark"] &
    border-top-color rgba(255, 255, 255, 0.08)

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
  
  html[data-theme-mode="dark"] &
    &--cancel
      border-color rgba(255, 255, 255, 0.15)
      color rgba(255, 255, 255, 0.7)
      
      &:hover
        background rgba(255, 255, 255, 0.08)

/* ===== Fade Transition ===== */
.fade-enter-active,
.fade-leave-active
  transition opacity 0.2s ease

.fade-enter-from,
.fade-leave-to
  opacity 0
</style>
