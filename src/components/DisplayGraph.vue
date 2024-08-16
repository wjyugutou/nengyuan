<script setup lang="ts">
import type { Graph, Model } from '@antv/x6'
import dataList from '@/assets/data/index'

const listDialog = ref(false)

const graphR = shallowRef<Graph>()

function handleClickJson(json: Model.FromJSONData) {
  listDialog.value = false
  graphR.value?.clearCells()
  graphR.value?.fromJSON(json)
  graphR.value?.zoomToFit()
}

onMounted(() => {
  const graph = initGraph(false)
  graphR.value = graph
  regNode()
  regEdge()
})
</script>

<template>
  <div class="relative h-100vh w-100vw flex">
    <div class="absolute left-0 right-0 top-0 z-10 flex gap-10">
      <button class="hover:color-blue-400" @click="listDialog = !listDialog">
        列表
      </button>
    </div>
    <div id="container" />

    <dialog :open="listDialog" class="top-30% h-100 w-100 border border-(red solid)" style="box-shadow: 0 0 10px red;">
      <ul class="">
        <li v-for="item, index in dataList" :key="index" class="m-t-2 cursor-pointer hover:color-blue-400" @click="handleClickJson(item.default)">
          {{ index }}
        </li>
      </ul>

      <div class="absolute bottom-0 left-0 right-0 p-4">
        <button class="hover:color-blue-400" @click="listDialog = false">
          关闭
        </button>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
