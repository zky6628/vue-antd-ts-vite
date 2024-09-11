<!--
 * @file 根组件
 * 
 * @date 2024/05/13
-->
<template>
  <a-config-provider :locale="locale" :theme="themeStore.theme">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// 日期选择器的语言
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { useThemeStore } from '@/stores/theme'

dayjs.locale('zh-cn')
const locale = zhCN
const themeStore = useThemeStore()
</script>
