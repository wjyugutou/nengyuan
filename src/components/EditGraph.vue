<script setup lang="ts">
import type { Edge, Graph, Model } from '@antv/x6'
import { Rect } from '@antv/x6/lib/shape'

const props = defineProps<{
  json: Model.FromJSONData
}>()

const visibleEdgeDialog = ref(false)
const formData = reactive({
  id: '',
})
const currentEdge = ref<Edge>()

const graphR = shallowRef<Graph>()

function edgeChangeColorEventBind(graph: Graph) {
  graph.on('cell:contextmenu', (e) => {
    currentEdge.value = e.cell

    formData.id = currentEdge.value.id
    visibleEdgeDialog.value = true
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
  // currentEdge.value?.setAttrByPath('line/strokeWidth', formData.id)
  currentEdge.value?.setPropByPath('id', formData.id)
  visibleEdgeDialog.value = false
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
    <div class="absolute right-0 top-0 z-10 flex gap-10">
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
    <div id="stencil" class="relative h-full w-50 shrink-0 border border-(1px #dfe3e8 solid)" />
    <div id="container" />

    <dialog :open="visibleEdgeDialog" class="top-30% h-100 w-100 border border-(red solid)" style="box-shadow: 0 0 10px red;">
      <div>
        <label for="color">id:</label>
        <input id="color" v-model="formData.id" type="text" class="border border-(gray-400) outline-none">
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-4">
        <button class="hover:color-blue-400" @click="handleClickConfirm">
          确认
        </button>
      </div>
    </dialog>
  </div>
</template>

<style scoped></style>
