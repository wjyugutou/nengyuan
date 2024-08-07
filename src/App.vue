<script setup lang="ts">
import { Graph, Shape } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { onMounted, ref } from 'vue';
import { PortManager } from '@antv/x6/lib/model/port';
import zhengqibiao from '@/assets/zhengqibiao.png'
import yibiao from '@/assets/yibiao.png'
import { Export } from '@antv/x6-plugin-export';
import data from '@/assets/data.json'

const graphR = ref<Graph>()

function regNode(ports: Partial<PortManager.Metadata>) {
  // 椭圆
  Graph.registerNode(
    'custom-rect',
    {
      inherit: 'rect',
      width: 100,
      height: 35,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
      tools: [
        {
          name: 'node-editor',
        },
      ],
    },
    true,
  )
  // zhengqibiao
  Graph.registerNode(
    'zhengqibiao',
    {
      inherit: 'rect',
      width: 100,
      height: 50,
      markup: [
        { tagName: 'rect', selector: 'body', },
        { tagName: 'image', },
        { tagName: 'text', selector: 'shunshiliuliang', },
        { tagName: 'text', selector: 'leijiliuliang', },
        { tagName: 'text', selector: 'wendu', },
        { tagName: 'text', selector: 'yaqiang', },
      ],
      attrs: {
        body: {
          stroke: 'transtarent',
          fillOpacity: 0
        },
        image: {
          ref: 'body',
          refWidth: 1,
          refHeight: 1,
        },
        shunshiliuliang: {
          refX: -80,
          refY: 2,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 14,
          fill: '#000',
        },
        leijiliuliang: {
          refX: -80,
          refY: 15,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 14,
          fill: '#000',
        },
        wendu: {
          refX: -80,
          refY: 30,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 14,
          fill: '#EE9CA7',
        },
        yaqiang: {
          refX: -80,
          refY: 45,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 14,
          fill: '#EE9CA7',
        },
      },
      ports: { ...ports },
    },
    true,
  )
  // yibiao
  Graph.registerNode(
    'yibiao',
    {
      inherit: 'rect',
      width: 100,
      height: 52,
      markup: [
        { tagName: 'rect', selector: 'body', },
        { tagName: 'image', },
      ],
      attrs: {
        body: {
          stroke: '#5F95FF',
        },
        image: {
          ref: 'body',
          refWidth: 1,
          refHeight: 1,
        },
      },
      ports: { ...ports },
    },
    true,
  )
}

function regEdge() {
  Graph.registerEdge('pipe', {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#A2B1C3',
        strokeWidth: 2,
        targetMarker: null
      },
    },
    zIndex: 0,
  })

  Graph.registerEdge('arrow-pipe', {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#A2B1C3',
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  })
}

function initGraph() {
  const graph = new Graph({
    container: document.getElementById('container')!,
    autoResize: true, grid: {
      visible: true,
      size: 5
    }, panning: {
      enabled: true,
      eventTypes: ['rightMouseDown']
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.1,
      maxScale: 3,
    },
    connecting: {
      router: 'manhattan',
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          tools: [
            { name: 'vertices' },
            {
              name: 'button-remove',
              args: { distance: 20 },
            },
          ],
          zIndex: 0,
        })
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF',
          },
        },
      },
    },
  })
  // 加载插件
  graph
    .use(
      new Transform({
        resizing: true,
        rotating: true,
      }),
    )
    .use(
      new Selection({
        rubberband: true,
        showNodeSelectionBox: true,
      }),
    )
    .use(new Snapline())
    .use(new Keyboard())
    .use(new Clipboard())
    .use(new History())
    .use(new Export())
  graphR.value = graph
  return graph
}

function initStencil(graph: Graph) {
  const stencil = new Stencil({
    title: '流程图',
    target: graph,
    stencilGraphWidth: 200,
    stencilGraphHeight: 180,
    collapsable: true,
    groups: [
      {
        title: '基础流程图',
        name: 'group1',
      },
    ],
    layoutOptions: {
      columns: 2,
      columnWidth: 80,
      rowHeight: 55,
    },
  })
  document.getElementById('stencil')!.appendChild(stencil.container)
  return stencil
}

function initStencilNode(graph: Graph, stencil: Stencil) {
  const n1 = graph.createNode({
    shape: 'custom-rect',
    label: '开始',
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },
    },
  })

  const n2 = graph.createNode({
    shape: 'zhengqibiao',
    attrs: {
      image: {
        'xlink:href': zhengqibiao
      },
      shunshiliuliang: {
        text: '瞬时流量'
      },
      leijiliuliang: {
        text: '累计流量'
      },
      wendu: {
        text: '温度'
      },
      yaqiang: {
        text: '压强'
      }
    }
  })

  const n3 = graph.createNode({
    shape: 'yibiao',
    attrs: {
      image: {
        'xlink:href': yibiao
      },
    }
  })

  const n4 = graph.createNode({
    shape: 'custom-rect',
    label: '减温减压'
  })

  stencil.load([n1, n2, n3, n4], 'group1')
}

function initPorts(graph: Graph) {
  // #region 初始化图形
  const ports: Partial<PortManager.Metadata> = {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  }

  // 控制连接桩显示/隐藏
  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
  graph.on('node:mouseenter', () => {
    const container = document.getElementById('container')!
    const ports = container.querySelectorAll(
      '.x6-port-body',
    ) as NodeListOf<SVGElement>
    showPorts(ports, true)
  })
  graph.on('node:mouseleave', () => {
    const container = document.getElementById('container')!
    const ports = container.querySelectorAll(
      '.x6-port-body',
    ) as NodeListOf<SVGElement>
    showPorts(ports, false)
  })

  return ports
}

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
  graph.on('blank:dblclick', (e) => {
    console.log(111);

    const edge = graph.createEdge({
      shape: 'pipe',
      source: [e.x, e.y],
      target: [e.x + 80, e.y],
    })
    graph.addEdge(edge)
  })

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

async function handleClickSave() {

  const json = graphR.value!.toJSON()

  console.log('save', json);
}

onMounted(() => {

  const graph = initGraph()
  const stencil = initStencil(graph)
  const ports = initPorts(graph)


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
    <button class="absolute top-0 right-0 z-10" @click="handleClickSave">保存</button>
    <div id="stencil" class="w-50 h-full shrink-0 relative border-(~ 1px solid #dfe3e8)"></div>
    <div id="container">

    </div>
  </div>
</template>

<style scoped></style>
