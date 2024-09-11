<!--
 * @file 表格里的删除按钮
 * 
 * @date 2024/06/04
-->
<template>
  <a-popconfirm title="确定删除吗？" placement="topRight" v-bind="$attrs" @confirm="onConfirm">
    <a-button type="link" danger>删除</a-button>
  </a-popconfirm>
</template>

<script lang="ts" setup>
import type { IEmits } from './types/itsDel.types'
const emit = defineEmits<IEmits>()
const onConfirm = () => {
  emit('confirm')
}
</script>
