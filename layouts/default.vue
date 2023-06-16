<script lang="ts" setup>
import Header from "~/components/default/Header.vue"
import Footer from "~/components/default/Footer.vue"
</script>

<template>
  <el-container>
    <Header />
    <el-main>
      <slot />
    </el-main>
    <el-footer>
      <Footer />
    </el-footer>
  </el-container>
</template>
