<!--
 * @file 查询的按钮
 * 
 * @date 2024/06/04
-->
<template>
  <span class="page-search-buttons">
    <a-button type="primary" @click="onSearch">
      <template #icon><search-outlined /></template>
      查询
    </a-button>
    <a-button @click="onResetSearch">
      <template #icon><reload-outlined /></template>
      重置
    </a-button>
  </span>
</template>

<script lang="ts" setup>
import type { IEmits } from './types/itsSearchBtns.types'
const emit = defineEmits<IEmits>()

const onSearch = () => {
  emit('search')
}

const onResetSearch = () => {
  emit('resetSearch')
}
</script>
