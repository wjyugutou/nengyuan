<script setup lang="ts">
const isEdit = ref(false)
</script>

<template>
  <EditGraph v-if="isEdit" />
  <DisplayGraph v-else />
  <button class="absolute bottom-0 right-0 hover:color-blue-400" @click="isEdit = !isEdit">
    {{ isEdit ? '编辑' : '展示' }}
  </button>
</template>

<style scoped></style>
