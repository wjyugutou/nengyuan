import { Graph, Shape } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { Export } from '@antv/x6-plugin-export'
import { Stencil } from '@antv/x6-plugin-stencil'
import zhengqibiao from '@/assets/zhengqibiao.png'
import yibiao from '@/assets/yibiao.png'

export function regNode() {
  // 椭圆
  Graph.registerNode('custom-rect', {
    inherit: 'rect',
    width: 100,
    height: 100,
    attrs: {
      body: {
        strokeWidth: 1,
        stroke: '#5F95FF',
        fill: '#EFF4FF',
      },
      text: {
        fontSize: 28,
        fill: '#262626',
      },
    },
  }, true)
  // 1级标题
  Graph.registerNode('custom-title', {
    inherit: 'rect',
    width: 100,
    height: 35,
    attrs: {
      body: {
        strokeWidth: 0,
        fillOpacity: 0,
      },
      text: {
        fontSize: 60,
        fill: '#000',
        fontWeight: 900,
      },
    },
  }, true)
  // 2级标题
  Graph.registerNode('custom-label', {
    inherit: 'rect',
    width: 100,
    height: 35,
    attrs: {
      body: {
        strokeWidth: 0,
        fillOpacity: 0,
      },
      text: {
        fontSize: 44,
        fill: '#000',
      },
    },
  }, true)
  // 蒸汽仪表
  Graph.registerNode('zhengqibiao', {
    inherit: 'rect',
    width: 200,
    height: 100,
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'image' },
    ],
    attrs: {
      body: {
        stroke: 'transtarent',
        fillOpacity: 0,
      },
      image: {
        'ref': 'body',
        'refWidth': 1,
        'refHeight': 1,
        'xlink:href': zhengqibiao,
      },
    },
  }, true)
  // 蒸汽仪表-label
  Graph.registerNode('zhengqiyibiao_label', {
    inherit: 'rect',
    width: 165,
    height: 134,
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'rect', selector: 'shunshiliuliangBG' },
      { tagName: 'rect', selector: 'leijiliuliangBG' },
      { tagName: 'text', selector: 'shunshiliuliang' },
      { tagName: 'text', selector: 'leijiliuliang' },
      { tagName: 'text', selector: 'wendu' },
      { tagName: 'text', selector: 'yaqiang' },
    ],
    attrs: {
      body: {
        stroke: 'transparent',
        fill: 'transparent',
      },
      shunshiliuliang: {
        ref: 'body',
        refX: 0,
        refY: 0,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 24,
        fill: '#000',
      },
      shunshiliuliangBG: {
        ref: 'shunshiliuliang',
        refX: 0,
        refY: 0,
        refWidth: 1,
        refHeight: 1,
        fill: '#00FFFF',
        stroke: 'transtarent',
      },
      leijiliuliang: {
        ref: 'shunshiliuliang',
        refX: 0,
        refY: 40,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 24,
        fill: '#000',
      },
      leijiliuliangBG: {
        ref: 'leijiliuliang',
        refX: 0,
        refY: 0,
        refWidth: 1,
        refHeight: 1,
        fill: '#81D3F8',
        stroke: 'transtarent',
      },
      wendu: {
        ref: 'leijiliuliang',
        refX: 0,
        refY: 40,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 24,
        fill: '#FF6464',
      },
      yaqiang: {
        ref: 'wendu',
        refX: 0,
        refY: 40,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 24,
        fill: '#007DFE',
      },
    },

  }, true)

  // 电表-label
  Graph.registerNode('dianbiao_label', {
    inherit: 'rect',
    width: 100,
    height: 60,
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'text', selector: 'dianya' },
      { tagName: 'text', selector: 'dianliu' },
    ],
    attrs: {
      body: {
        stroke: 'transparent',
        fill: 'transparent',
      },
      dianya: {
        ref: 'body',
        refX: 0,
        refY: 0,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 24,
        fill: '#FF6464',
      },
      dianliu: {
        ref: 'dianya',
        refX: 0,
        refY: 40,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 24,
        fill: '#007DFE',
      },
    },

  }, true)

  // 仪表
  Graph.registerNode('yibiao', {
    inherit: 'rect',
    width: 100,
    height: 52,
    markup: [
      { tagName: 'rect', selector: 'body' },
      { tagName: 'image' },
    ],
    attrs: {
      body: {
        stroke: 'transparent',
      },
      image: {
        ref: 'body',
        refWidth: 1,
        refHeight: 1,
      },
    },
  }, true)
}

export function regEdge() {
  Graph.registerEdge('pipe', {
    inherit: 'edge',
    connector: {
      name: 'jumpover',
      args: {
        size: 10,
      },
    },
    attrs: {
      line: {
        stroke: '#0099CC',
        strokeWidth: 8,
        targetMarker: null,
      },
    },
    zIndex: 0,
  }, true)

  Graph.registerEdge('arrow-pipe', {
    inherit: 'edge',
    connector: {
      name: 'jumpover',
      args: {
        size: 10,
      },
    },
    attrs: {
      line: {
        stroke: '#0099CC',
        strokeWidth: 8,
        targetMarker: {
          name: 'block',
          width: 24,
          height: 16,
          offset: 2,
        },
      },
    },
    zIndex: 0,
  }, true)

  Graph.registerEdge('dashed-line', {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#797979',
        strokeWidth: 8,
        strokeDasharray: 15,
        targetMarker: null,
      },
    },
    zIndex: 0,
  }, true)
}

export function initGraph(editable: boolean = true) {
  const graph = new Graph({
    container: document.getElementById('container')!,
    autoResize: true,
    interacting: editable,
    grid: {
      visible: false,
      size: 1,
    },
    panning: {
      enabled: true,
      eventTypes: ['rightMouseDown'],
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.1,
      maxScale: 3,
    },
    connecting: {
      router: 'orth',
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
              stroke: '#0099CC',
              strokeWidth: 8,
              targetMarker: {
                name: 'block',
                width: 24,
                height: 16,
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
  })
  if (editable) {
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
      .use(new Clipboard({ enabled: true }))
      .use(new History())
      .use(new Export())
  }
  return graph
}

export function initStencil(graph: Graph) {
  const stencil = new Stencil({
    title: '流程图',
    target: graph,
    collapsable: true,
    groups: [
      {
        title: '基础流程图',
        name: 'group1',
      },
    ],
    layoutOptions: {
      columns: 1,
      columnWidth: 100,
      rowHeight: 100,
    },
  })
  document.getElementById('stencil')!.appendChild(stencil.container)
  return stencil
}

export function initStencilNode(graph: Graph, stencil: Stencil) {
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

  const zhengqibiaoNode = graph.createNode({
    shape: 'zhengqibiao',
  })

  const zhengqiyibiaoLabel = graph.createNode({
    shape: 'zhengqiyibiao_label',
    attrs: {
      shunshiliuliang: {
        text: '瞬时流量 XX ㎡',
      },
      leijiliuliang: {
        text: '累计流量 XX ㎡',
      },
      wendu: {
        text: '温度 XX ℃',
      },
      yaqiang: {
        text: '压力 XX Pa',
      },
    },
  })

  const yibiaoNode = graph.createNode({
    shape: 'yibiao',
    attrs: {
      image: {
        'xlink:href': yibiao,
      },
    },
  })

  const customRectNode = graph.createNode({
    shape: 'custom-rect',
    label: '减温减压',
  })

  const title = graph.createNode({
    shape: 'custom-title',
    label: '标题',
  })

  const label = graph.createNode({
    shape: 'custom-label',
    label: 'label',
  })

  const dbLabel = graph.createNode({
    shape: 'dianbiao_label',
    attrs: {
      dianya: {
        text: '电压',
      },
      dianliu: {
        text: '电流',
      },
    },
  })

  stencil.load([n1, zhengqibiaoNode, zhengqiyibiaoLabel, yibiaoNode, customRectNode, title, label, dbLabel], 'group1')
}

let edgeShape: string

export function initKeyboard(graph: Graph) {
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

export function initEvent(graph: Graph) {
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
