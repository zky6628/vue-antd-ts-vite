<!--
 * @file 字典配置
 * 
 * @date 2024/06/05
-->
<template>
  <a-drawer v-model:open="openModal" v-bind="$attrs" title="字典列表" width="800px">
    <DictList :key="state.dictId" :dict-id="state.dictId" />
  </a-drawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import DictList from './DictList.vue'
import type { IDictRow } from '@/services/dict/types/index.types'

const openModal = ref(false)
const state = reactive({
  dictId: ''
})

const init = (record?: IDictRow) => {
  openModal.value = true
  state.dictId = record?.id || ''
}

defineExpose({
  init
})
</script>
