import type { Model } from '@antv/x6'

const dataList: Record<string, {
  default: Model.FromJSONData
}> = import.meta.glob(['./*.json', '!./data.json'], { eager: true })

const map = {
  './佳华煤化工有限公司压空能源流转图.json': '',
  './佳华煤化工有限公司循环水能源流转图.json': '',
  './佳华煤化工有限公司新水能源流转图.json': '',
  './佳华煤化工有限公司氧气能源流转图.json': '',
  './佳华煤化工有限公司氮气能源流转图.json': '',
  './佳华煤化工有限公司焦炉煤气能源流转图.json': '',
  './佳华煤化工有限公司电力能源流转图.json': '',
  './佳华煤化工有限公司蒸汽能源流转图.json': '',
  './佳华煤化工有限公司除盐水能源流转图.json': '',
  './佳华煤化工有限公司高炉煤气能源流转图.json': '',
}

export default dataList
