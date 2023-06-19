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
    <Footer />
  </el-container>
</template>

<style lang="stylus">
.el-container
  display block !important
</style>
