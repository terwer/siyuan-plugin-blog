<script setup lang="ts">
const props=defineProps<{error:{statusCode?:number;statusMessage?:string;message?:string}}>()
const {t}=useI18n()
if(import.meta.server && ["CONFIGURATION_REQUIRED","CONFIGURATION_CONFLICT"].includes(props.error?.statusMessage || "")) useResponseHeader("X-Error-Code").value=props.error.statusMessage
const code=computed(()=>props.error?.statusMessage || '')
const title=computed(()=>code.value==='CONFIGURATION_REQUIRED'?t('connection.requiredTitle'):code.value==='CONFIGURATION_CONFLICT'?t('connection.conflictTitle'):t('connection.unavailableTitle'))
const description=computed(()=>code.value==='CONFIGURATION_REQUIRED'?t('connection.requiredDescription'):code.value==='CONFIGURATION_CONFLICT'?t('connection.conflictDescription'):t('connection.unavailableDescription'))
</script>
<template>
  <main class="connection-error">
    <div class="connection-error-card" role="alert">
      <p>{{ error.statusCode || 503 }}</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <button type="button" class="connection-retry" @click="reloadNuxtApp()">{{ t('connection.retry') }}</button>
    </div>
  </main>
</template>
<style scoped>
.connection-error {min-height:80vh;display:grid;place-items:center;padding:24px;background:var(--b3-theme-background);color:var(--b3-theme-on-background);}
.connection-error-card {max-width:640px;padding:24px;border:1px solid var(--b3-border-color);border-radius:12px;line-height:1.6;}
.connection-error-card h1 {font-size:24px;}
.connection-retry {padding:8px 16px;border:1px solid var(--b3-theme-primary);border-radius:6px;background:var(--b3-theme-primary);color:var(--b3-theme-on-primary);cursor:pointer;}
</style>
