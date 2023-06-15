<script lang="ts" setup>
import Header from "~/components/default/Header.vue";
import Footer from "~/components/default/Footer.vue";
</script>

<template>
  <div>
    <Header />
    <slot />
    <Footer/>
  </div>
</template>