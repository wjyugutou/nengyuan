<script setup lang="ts">
import { Graph } from '@antv/x6';
import { onMounted, shallowRef } from 'vue';
import { initPorts, regNode, regEdge, initGraph, initStencilNode, initStencil } from './utils';
import data from '@/assets/data.json'

const graphR = shallowRef<Graph>()

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
}

function initevent(graph: Graph) {
  // 双击添加线段
  // graph.on('blank:dblclick', (e) => {
  //   // 线段
  //   const edge = graph.createEdge({
  //     shape: 'dashed-line',
  //     // shape: 'pipe',
  //     source: [e.x, e.y],
  //     target: [e.x + 80, e.y],
  //   })

  //   graph.addEdge(edge)
  // })

  // 邮件添加箭头线
  // graph.on('blank:contextmenu', (e) => {
  //   const edge = graph.createEdge({
  //     shape: 'arrow-pipe',
  //     source: [e.x, e.y],
  //     target: [e.x + 80, e.y],
  //   })
  //   graph.addEdge(edge)
  // })

  // 工具
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

  graph.on('edge:mouseleave', ({ cell }) => {
    cell.removeTools()
  })

}

function handleClickSave() {

  const json = graphR.value!.toJSON()

  console.log('save', json);
}

function handleClickPng() {
  graphR.value!.toPNG((dataURI) => {
    const save_link = document.createElement('a');
    save_link.href = dataURI
    save_link.download = 'name.png';
    save_link.click();

  })
}

onMounted(() => {

  const graph = initGraph()
  const stencil = initStencil(graph)
  const ports = initPorts(graph)

  graphR.value = graph
  regNode(ports)
  regEdge()

  initStencilNode(graph, stencil)

  initKeyboard(graph)
  initevent(graph)

  graph.fromJSON(data)

})
</script>

<template>
  <div class="w-100vw h-100vh relative flex">
    <div class="absolute top-0 right-0 z-10 flex gap-10">
      <button @click="handleClickSave">保存</button>
      <button @click="handleClickPng">png</button>
    </div>
    <div id="stencil" class="w-50 h-full shrink-0 relative border-(~ 1px solid #dfe3e8)"></div>
    <div id="container">

    </div>
  </div>
</template>

<style scoped></style>
