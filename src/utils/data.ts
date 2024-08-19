import type { Model } from '@antv/x6'

export const dataMap: Record<string, {
  default: Model.FromJSONData
}> = import.meta.glob('/public/data/*.json', { eager: true })

export const dataList = Object.entries(dataMap).map(item => ({
  name: item[0].replaceAll(/(\/public\/data\/)|(\.json)/g, ''),
  data: item[1].default,
}) as {
  name: string
  data: Model.FromJSONData
})

// const map = {
//   './佳华煤化工有限公司压空能源流转图.json': '',
//   './佳华煤化工有限公司循环水能源流转图.json': '',
//   './佳华煤化工有限公司新水能源流转图.json': '',
//   './佳华煤化工有限公司氧气能源流转图.json': '',
//   './佳华煤化工有限公司氮气能源流转图.json': '',
//   './佳华煤化工有限公司焦炉煤气能源流转图.json': '',
//   './佳华煤化工有限公司电力能源流转图.json': '',
//   './佳华煤化工有限公司蒸汽能源流转图.json': '',
//   './佳华煤化工有限公司除盐水能源流转图.json': '',
//   './佳华煤化工有限公司高炉煤气能源流转图.json': '',
// }
