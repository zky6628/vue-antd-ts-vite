<!--
 * @file 
 * 
 * @date 2024/06/30
-->
<template>
  <a-modal
    v-model:open="openModal"
    v-bind="$attrs"
    title="选择图标"
    :mask-closable="false"
    :width="1000"
    @ok="onSubmit"
  >
    <a-input-group compact>
      <a-select v-model:value="type" style="width: 100px" @change="getIcons">
        <a-select-option value="outlined">线框风格</a-select-option>
        <a-select-option value="filled">实底风格</a-select-option>
        <a-select-option value="twoTone"> 双色风格</a-select-option>
      </a-select>
      <a-input
        v-model:value.trim="keywords"
        style="width: calc(100% - 100px)"
        placeholder="在此搜索图标"
        @change="getIcons"
        allow-clear
      />
    </a-input-group>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane v-for="(item, i) in icons" :key="i" :tab="item.name">
        <ul class="icons-ul">
          <li
            v-for="icon in item.icons"
            :key="icon"
            class="icons-ul__item"
            :style="{ border: selectedIcon === icon ? `1px solid ${themeStore.theme.token.colorPrimary}` : undefined }"
            @click="selectedIcon = icon"
          >
            <component :is="icon"></component>
            <p class="icons-ul__item-name">{{ icon }}</p>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ICONS_ENUM } from '@/assets/ts/constant/icons'
import { useThemeStore } from '@/stores/theme'
import type { IEmits } from './types/iconSelectModal.types'

const emit = defineEmits<IEmits>()

const themeStore = useThemeStore()

const openModal = ref(false)

const icons = ref<typeof ICONS_ENUM.outlined>([])

const type = ref('outlined')
const keywords = ref('')
const activeKey = ref(0)
const selectedIcon = ref('')

const init = async () => {
  openModal.value = true
}

const getIcons = () => {
  const list: typeof ICONS_ENUM.outlined = JSON.parse(JSON.stringify(ICONS_ENUM[type.value as keyof typeof ICONS_ENUM]))
  if (keywords.value.trim()) {
    list.forEach((x) => {
      x.icons = x.icons.filter((y) => y.toLowerCase().includes(keywords.value.toLowerCase()))
    })
  }
  icons.value = list
}

const onSubmit = () => {
  emit('change', selectedIcon.value)
  openModal.value = false
}

getIcons()

defineExpose({
  init
})
</script>

<style scoped lang="less">
.icons-ul {
  display: flex;
  flex-wrap: wrap;
}

.icons-ul__item {
  width: calc(100% / 5);
  font-size: 32px;
  text-align: center;
  padding-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    box-shadow: var(--its-box-shadow);
  }
}

.icons-ul__item-name {
  font-size: 12px;
}
</style>
