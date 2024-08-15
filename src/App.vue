<script setup lang="ts">
import { Edge, type Graph, type Model } from '@antv/x6'
import data from '@/assets/data/data.json'

const visibleEdgeDialog = ref(false)
const formData = reactive({
  color: '',
})
const currentEdge = ref<Edge>()

const graphR = shallowRef<Graph>()

let edgeShape: string

function initKeyboard(graph: Graph) {
  // undo redo
  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.canUndo()) {
      graph.undo()
    }
    return false
  })
  graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.canRedo()) {
      graph.redo()
    }
    return false
  })

  // select all
  graph.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.getNodes()
    if (nodes) {
      graph.select(nodes)
    }
  })

  // delete
  graph.bindKey(['backspace', 'delete'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })

  //
  graph.bindKey(['ctrl+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells && cells.length) {
      graph.copy(cells)
    }
    else {
      console.log('请先选中节点再复制')
    }
  })

  graph.bindKey(['ctrl+v'], () => {
    // { offset: 30 }
    if (graph.isClipboardEmpty()) {
      graph.cleanClipboard()
      console.log('剪切板为空，不可粘贴')
    }
    else {
      const cells = graph.paste({ offset: 30 })
      graph.cleanSelection()
      graph.select(cells)
    }
  })

  graph.bindKey('1', () => {
    edgeShape = 'dashed-line'
  })

  graph.bindKey('2', () => {
    edgeShape = 'arrow-pipe'
  })

  graph.bindKey('3', () => {
    edgeShape = 'pipe'
  })
}

function initEvent(graph: Graph) {
  // 双击添加线段
  graph.on('blank:dblclick', (e) => {
    // 线段
    const edge = graph.createEdge({
      shape: edgeShape,
      source: [e.x, e.y],
      target: [e.x + 80, e.y],
    })
    graph.addEdge(edge)
  })

  graph.on('node:contextmenu', (e) => {
    e.node.addTools([
      { name: 'node-editor' },
    ])
  })

  graph.on('cell:contextmenu', (e) => {
    if (e.cell instanceof Edge) {
      currentEdge.value = e.cell

      formData.color = currentEdge.value.attrs!.line.stroke as string
      visibleEdgeDialog.value = true
    }
  })

  // edge工具
  graph.on('edge:click', ({ cell }) => {
    cell.addTools([
      { name: 'vertices' },
      {
        name: 'button-remove',
        args: { distance: 20 },
      },
      { name: 'source-arrowhead' },
      { name: 'target-arrowhead' },
    ])
  })

  graph.on('blank:click', () => {
    graph.getCells().forEach(item => item.removeTools())
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

onMounted(() => {
  const graph = initGraph()
  const stencil = initStencil(graph)

  graphR.value = graph
  regNode()
  regEdge()

  initStencilNode(graph, stencil)

  initKeyboard(graph)
  initEvent(graph)

  graph.fromJSON(data as Model.FromJSONData)
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
        <label for="color">颜色:</label>
        <input id="color" v-model="formData.color" type="text" class="border border-(gray-400) outline-none">
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
