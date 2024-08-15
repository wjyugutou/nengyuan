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
  Graph.registerNode(
    'custom-rect',
    {
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
    },
    false,
  )
  // 1级标题
  Graph.registerNode(
    'custom-title',
    {
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
    },
    false,
  )
  // 2级标题
  Graph.registerNode(
    'custom-label',
    {
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
    },
    false,
  )
  // 蒸汽仪表
  Graph.registerNode(
    'zhengqibiao',
    {
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
          ref: 'body',
          refWidth: 1,
          refHeight: 1,
        },
      },
    },
    false,
  )
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

  }, false)

  // 仪表
  Graph.registerNode(
    'yibiao',
    {
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
    },
    false,
  )
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
  })

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
  })

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
  })
}

export function initGraph() {
  const graph = new Graph({
    container: document.getElementById('container')!,
    autoResize: true,
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
    .use(new Clipboard({ enabled: true }))
    .use(new History())
    .use(new Export())
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
    attrs: {
      image: {
        'xlink:href': zhengqibiao,
      },
    },
  })

  const zhengqiyibiao_labelRight = graph.createNode({
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

  const n3 = graph.createNode({
    shape: 'yibiao',
    attrs: {
      image: {
        'xlink:href': yibiao,
      },
    },
  })

  const n4 = graph.createNode({
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

  stencil.load([n1, zhengqibiaoNode, zhengqiyibiao_labelRight, n3, n4, title, label], 'group1')
}
