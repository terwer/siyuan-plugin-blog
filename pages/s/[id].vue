<script setup lang="ts">
const route = useRoute()

const postid = route.params.id
</script>

<template>
<div>{{ postid }}</div>
</template>

<style scoped>

</style>