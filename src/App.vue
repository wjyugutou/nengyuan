<script setup lang="ts">
import type { Model } from '@antv/x6'

const isEdit = ref(false)
const listDialog = ref(false)

const jsonDataList = dataList
const jsonData = shallowRef(dataList[0].data)

function handleClickJson(json: Model.FromJSONData) {
  listDialog.value = false

  jsonData.value = json
}
</script>

<template>
  <div class="absolute top-0 z-1" :class="isEdit ? 'left-50' : 'left-0'">
    <button class="hover:color-blue-400" @click="listDialog = !listDialog">
      列表
    </button>
  </div>
  <EditGraph v-if="isEdit" :json="jsonData" />
  <DisplayGraph v-else :json="jsonData" />
  <button class="absolute bottom-0 right-0 hover:color-blue-400" @click="isEdit = !isEdit">
    {{ isEdit ? '编辑' : '展示' }}
  </button>
  <dialog :open="listDialog" class="top-30% h-100 w-100 border border-(red solid)" style="box-shadow: 0 0 10px red;">
    <ul class="p-x-4">
      <li v-for="item, index in jsonDataList" :key="index" class="m-t-2 cursor-pointer hover:color-blue-400" @click="handleClickJson(item.data)">
        {{ item.name }}
      </li>
    </ul>

    <div class="absolute bottom-0 left-0 right-0 p-4">
      <button class="hover:color-blue-400" @click="listDialog = false">
        关闭
      </button>
    </div>
  </dialog>
</template>

<style scoped></style>
