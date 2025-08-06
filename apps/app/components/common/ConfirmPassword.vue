<template>
  <div class="password-confirm">
    <div class="password-card">
      <div class="card-header">
        <el-icon class="lock-icon"><Lock /></el-icon>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>

      <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          @submit.prevent="handleSubmit"
      >
        <el-form-item prop="password">
          <el-input
              v-model="form.password"
              :placeholder="placeholder"
              type="password"
              show-password
              size="large"
              clearable
          />
        </el-form-item>

        <el-button
            type="primary"
            native-type="submit"
            size="large"
            :loading="isLoading"
            class="submit-btn"
            :disabled="form.lock"
        >
          {{ form.lock ? t("share.password.confirm.password.loading") : submitText }}
        </el-button>
      </el-form>

      <p class="footer-hint" v-if="hint">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock } from "@element-plus/icons-vue"
import { reactive, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"

interface Props {
  title?: string
  description?: string
  placeholder?: string
  submitText?: string
  hint?: string
  initialValue?: string
}

const logger = createAppLogger("static-share-page")
const { t } = useI18n()

const props = withDefaults(defineProps<Props>(), {
  title: "",
  description: "",
  placeholder: "",
  submitText: "",
  initialValue: ""
})

const emit = defineEmits<{
  (e: "submit", password: string): void
  (e: "cancel"): void
}>()

const form = reactive({
  password: props.initialValue,
  lock:true
})

const rules: FormRules = {
  password: [
    { required: true, message: t("share.password.confirm.password.rule.pwd.notEmpty"), trigger: "blur" },
    { min: 4, message: t("share.password.confirm.password.rule.pwd.4less"), trigger: "blur" }
  ]
}

const formRef = ref<FormInstance>()
const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    isLoading.value = true
    const valid = await formRef.value?.validate()
    if (valid) {
      emit("submit", form.password)
    }
  } catch (e) {
    logger.error(t("share.password.confirm.password.rule.form.error"), e)
  } finally {
    isLoading.value = false
  }
}

// 暴露的方法
defineExpose({
  reset: () => {
    form.password = ""
    formRef.value?.resetFields()
  },
  setValue: (value: string) => {
    form.password = value
  }
})

onMounted(()=>{
  setTimeout(()=>{
    form.lock = false
  }, 50)
})
</script>

<style lang="stylus" scoped>
.password-confirm
  --pc-primary: #1890ff
  --pc-text: rgba(0, 0, 0, 0.85)
  --pc-text-secondary: rgba(0, 0, 0, 0.45)
  --pc-border-radius: 4px
  --pc-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px -8px rgba(0, 0, 0, 0.08),
      0 9px 28px 0 rgba(0, 0, 0, 0.05)

  font-family: "Helvetica Neue", Arial, sans-serif
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  background-color: #f8f8f8
  padding: 20px

.password-card
  width: 100%
  max-width: 420px
  background: #fff
  border-radius: calc(var(--pc-border-radius) * 2)
  box-shadow: var(--pc-shadow)
  padding: 40px
  text-align: center

.card-header
  margin-bottom: 30px

  .lock-icon
    font-size: 48px
    color: var(--pc-primary)
    margin-bottom: 16px

  h3
    font-size: 20px
    font-weight: 500
    color: var(--pc-text)
    margin: 0 0 8px
    line-height: 1.4

  p
    color: var(--pc-text-secondary)
    font-size: 14px
    margin: 0
    line-height: 1.5

.submit-btn
  width: 100%
  height: 40px
  font-size: 16px
  border-radius: var(--pc-border-radius)
  margin-top: 12px

.footer-hint
  color: var(--pc-text-secondary)
  font-size: 12px
  margin: 16px 0 0
  line-height: 1.5
</style>