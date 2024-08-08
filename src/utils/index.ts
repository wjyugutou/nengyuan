import { Graph, Shape } from "@antv/x6"
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { PortManager } from '@antv/x6/lib/model/port';
import { Export } from '@antv/x6-plugin-export';
import zhengqibiao from '@/assets/zhengqibiao.png'
import yibiao from '@/assets/yibiao.png'
import { Stencil } from "@antv/x6-plugin-stencil"

export function initPorts(graph: Graph) {
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

export function regNode(ports: Partial<PortManager.Metadata>) {
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
      ports: { ...ports },
      tools: [
        {
          name: 'node-editor',
        },
      ],
    },
    true,
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
          fillOpacity: 0
        },
        text: {
          fontSize: 60,
          fill: '#000',
          fontWeight: 900
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
          fillOpacity: 0
        },
        text: {
          fontSize: 44,
          fill: '#000',
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
  // 蒸汽仪表
  Graph.registerNode(
    'zhengqibiao',
    {
      inherit: 'rect',
      width: 200,
      height: 100,
      markup: [
        { tagName: 'rect', selector: 'body', },
        { tagName: 'rect', selector: 'shunshiliuliangBG', },
        { tagName: 'rect', selector: 'leijiliuliangBG', },
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
          ref: 'body',
          refX: -110,
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
      ports: { ...ports },

    },
    true,
  )
  // 蒸汽仪表-label_right
  Graph.registerNode('zhengqiyibiao_label-right', {
    inherit: 'zhengqibiao',
    attrs: {
      shunshiliuliang: {
        ref: 'body',
        refX: 160,
      },
    },
    ports: { ...ports },
  }, true)

  // 仪表
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

export function regEdge() {
  Graph.registerEdge('pipe', {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#A2B1C3',
        strokeWidth: 8,
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
        strokeWidth: 8,
        targetMarker: {
          name: 'block',
          width: 24,
          height: 16,
          offset: 2
        }
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
        targetMarker: null
      },
    },
    zIndex: 0,
  })
}

export function initGraph() {
  const graph = new Graph({
    container: document.getElementById('container')!,
    autoResize: true, grid: {
      visible: false,
      size: 1
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
    .use(new Clipboard())
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
        text: '压力'
      }
    }
  })

  const zhengqiyibiao_labelRight = graph.createNode({
    shape: 'zhengqiyibiao_label-right',
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
        text: '压力'
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

  const title = graph.createNode({
    shape: 'custom-title',
    label: '标题'
  })

  const label = graph.createNode({
    shape: 'custom-label',
    label: 'label',
  })

  stencil.load([n1, zhengqibiaoNode,zhengqiyibiao_labelRight, n3, n4, title, label], 'group1')
}
