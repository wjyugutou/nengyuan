import type { Model } from '@antv/x6'

const dataList: Record<string, {
  default: Model.FromJSONData
}> = import.meta.glob(['./*.json', '!./data.json'], { eager: true })

export default dataList
