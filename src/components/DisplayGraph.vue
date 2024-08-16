<script setup lang="ts">
import type { Graph, Model } from '@antv/x6'

const props = defineProps<{
  json: Model.FromJSONData
}>()

const graphR = shallowRef<Graph>()

onMounted(() => {
  const graph = initGraph(false)
  graphR.value = graph
  regNode()
  regEdge()
})

watchEffect(() => {
  if (!props.json)
    return
  nextTick(() => {
    setTimeout(() => {
      graphR.value?.fromJSON(props.json)
      graphR.value?.zoomToFit()
    }, 500)
  })
})
</script>

<template>
  <div class="relative h-100vh w-100vw flex">
    <div id="container" />
  </div>
</template>

<style scoped></style>
