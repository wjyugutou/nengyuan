<script setup lang="ts">
import { Edge, type Graph, type Model } from '@antv/x6'
import dataList from '@/assets/data/index'

const listDialog = ref(false)

const visibleEdgeDialog = ref(false)
const formData = reactive({
  color: '',
})
const currentEdge = ref<Edge>()

const graphR = shallowRef<Graph>()

function edgeChangeColorEventBind(graph: Graph) {
  graph.on('cell:contextmenu', (e) => {
    if (e.cell instanceof Edge) {
      currentEdge.value = e.cell

      formData.color = currentEdge.value.attrs!.line.stroke as string
      visibleEdgeDialog.value = true
    }
  })
}

function handleClickSave() {
  const json = graphR.value!.toJSON()

  downloadJson(json)
}

function handleClickPng() {
  graphR.value!.toPNG((dataURI) => {
    download(dataURI, 'name.png')
  })
}

function handleClickClear() {
  graphR.value?.clearCells()
}

function handleClickConfirm() {
  currentEdge.value?.setAttrByPath('line/stroke', formData.color)
  visibleEdgeDialog.value = false
}

function handleClickJson(json: Model.FromJSONData) {
  listDialog.value = false
  graphR.value?.clearCells()
  graphR.value?.fromJSON(json)
  graphR.value?.zoomToFit()
}

onMounted(() => {
  const graph = initGraph()
  const stencil = initStencil(graph)

  graphR.value = graph
  regNode()
  regEdge()

  initStencilNode(graph, stencil)

  initKeyboard(graph)
  initEvent(graph)
  edgeChangeColorEventBind(graph)
})
</script>

<template>
  <div class="relative h-100vh w-100vw flex">
    <div class="absolute left-50 right-0 top-0 z-10 flex justify-between">
      <div>
        <button class="hover:color-blue-400" @click="listDialog = !listDialog">
          列表
        </button>
      </div>
      <div class="flex gap-10">
        <button class="hover:color-blue-400" @click="handleClickClear">
          清空
        </button>
        <button class="hover:color-blue-400" @click="handleClickSave">
          保存
        </button>
        <button class="hover:color-blue-400" @click="handleClickPng">
          png
        </button>
      </div>
    </div>
    <div id="stencil" class="relative h-full w-50 shrink-0 border border-(1px #dfe3e8 solid)" />
    <div id="container" />

    <dialog :open="visibleEdgeDialog" class="top-30% h-100 w-100 border border-(red solid)" style="box-shadow: 0 0 10px red;">
      <div>
        <label for="color">颜色:</label>
        <input id="color" v-model="formData.color" type="text" class="border border-(gray-400) outline-none">
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-4">
        <button class="hover:color-blue-400" @click="handleClickConfirm">
          确认
        </button>
      </div>
    </dialog>

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
