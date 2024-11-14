<script setup lang="ts">
import type { Graph, Model } from '@antv/x6'

const props = defineProps<{
  json: Model.FromJSONData
}>()

// 画布
const graphR = shallowRef<Graph>()

const data = ref<any[]>()

onMounted(() => {
  const graph = initGraph(false)
  graphR.value = graph
  regNode()
  regEdge()

  // 获取数据
  // data.value = [
  //   {
  //     id: '',
  //     shunshiliuliang: 10,
  //   },
  // ]

  // data.value.forEach((item) => {
  // 根据id获取 node
  //   const cell = graphR.value.getCellById(item.id)
  // 设置node 的 text
  //   cell.setAttrByPath('shunshiliuliang/text', item.shunshiliuliang)
  // })
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
