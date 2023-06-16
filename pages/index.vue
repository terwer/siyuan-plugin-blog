<script setup lang="ts">
const goSetting = async () => {
  await navigateTo("/setting")
}
</script>

<template>
  <div>
    <el-empty description="啊哦，您还没设置自己的主页哟！">
      <el-button type="primary" @click="goSetting">马上去设置我的主页</el-button>
    </el-empty>
  </div>
</template>

<style scoped></style>
