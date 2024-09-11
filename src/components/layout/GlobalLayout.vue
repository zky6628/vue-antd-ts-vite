<!--
 * @file 全局布局
 * 
 * @date 2024/05/22
-->
<template>
  <a-layout class="global-layout">
    <a-layout-sider
      v-if="navPosition === 'left'"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="global-aside"
    >
      <!-- <global-aside :isClose="collapsed"></global-aside> -->
      哈哈
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="global-header">
        <template v-if="navPosition === 'left'">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            :style="{ color: colorTrigger }"
            @click="() => (collapsed = !collapsed)"
            @mouseenter="triggerMouseEnter"
            @mouseleave="triggerMouseLeave"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            :style="{ color: colorTrigger }"
            @click="() => (collapsed = !collapsed)"
            @mouseenter="triggerMouseEnter"
            @mouseleave="triggerMouseLeave"
          />
        </template>
        <global-header :nav-position="navPosition"></global-header>
      </a-layout-header>
      <a-layout-content class="global-content">
        <!-- <global-tabs v-if="showTabs"></global-tabs> -->
        <!-- <global-breadcrumb v-else></global-breadcrumb> -->
        <main class="global-container">
          <RouterView>
            <template #default="{ Component, route }">
              <Transition name="slide-in-left">
                <KeepAlive :include="keepList">
                  <component :is="Component" :key="getKeepList(Component, route)"></component>
                </KeepAlive>
              </Transition>
            </template>
          </RouterView>
        </main>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { theme } from 'ant-design-vue'
import GlobalHeader from './modules/GlobalHeader.vue'

const { useToken } = theme
const { token } = useToken()
const colorTrigger = ref('')
const triggerMouseEnter = () => {
  colorTrigger.value = token.value.colorPrimary
}
const triggerMouseLeave = () => {
  colorTrigger.value = ''
}

const collapsed = ref<boolean>(false)
// true: 展示 tabs 标签页  false: 展示面包屑
const showTabs = ref(false)
// 导航菜单的位置，left / top
const navPosition = ref('left')
// keepAlive 的列表，存组件名（！！！并非路由名），非 <script setup> 类型的组件必须加 name 属性才能缓存
const keepList = ref<Array<string>>([])
const getKeepList = (component: any, route: any) => {
  const componentName: string = component.type.name || component.type.__name
  console.log('-->', component)
  const { keepAlive } = route.meta
  if (keepAlive) {
    if (!keepList.value.includes(componentName)) {
      keepList.value.push(componentName)
    }
  } else {
    const i = keepList.value.indexOf(componentName)
    if (i > -1) {
      keepList.value.splice(i, 1)
    }
  }
  return route.fullPath
}
</script>
<style scoped lang="less">
.global-layout {
  overflow: hidden;
}

.trigger {
  padding: 0 24px;
  font-size: 26px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}

.global-header {
  display: flex;
  justify-content: space-between;
  padding: 0;
  background: var(--its-white);
  border-bottom: 1px solid var(--color-border);
}

.global-aside {
  height: 100vh;
  user-select: none;
  background: var(--color-background);
  box-shadow: var(--its-box-shadow);
}

.global-content {
  background: #f0f2f5;
}

.global-container {
  position: relative;
  height: calc(100vh - 64px - 43px);
  padding: 12px;
  overflow: auto;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */

@keyframes slide-in-left {
  from {
    visibility: visible;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slide-in-left-enter-active {
  animation: slide-in-left 0.5s ease;
}
</style>
