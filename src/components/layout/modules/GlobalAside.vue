<!--
 * @file 全局侧边栏
 * 
 * @date 2024/05/22
-->
<template>
  <div class="global-aside-cnt">
    <div class="global-aside-header">
      <img class="logo" :src="require('@/assets/img/logo.png')" alt="PC管理后台" />
    </div>
    <div class="global-aside-main">
      <a-menu v-model:selectedKeys="defaultActive" :openKeys="openKeys" mode="inline" @select="handleSelect">
        <template v-for="item in menu" :key="item.name">
          <a-sub-menu v-if="item.children" :key="item.name">
            <template #title>
              <component :is="item.icon"></component>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="ite in item.children" :key="ite.name">
              <a-sub-menu v-if="ite.children" :key="ite.name">
                <template #title>{{ ite.title }}</template>
                <a-menu-item v-for="it in ite.children" :key="it.name">{{ it.title }}</a-menu-item>
              </a-sub-menu>
              <template v-else>
                <a-menu-item :key="ite.name">
                  {{ ite.title }}
                </a-menu-item>
              </template>
            </template>
          </a-sub-menu>

          <template v-else>
            <a-menu-item :key="item.name">
              <component :is="item.icon"></component>
              <span>{{ item.title }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, ref } from 'vue'
import { useWhiteListStore } from '@/store/whiteList'

export default defineComponent({
  name: 'GlobalAside',
  props: {
    isClose: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const defaultActive = ref([proxy.$route.name])
    const setDefaultActive = (val) => {
      defaultActive.value = val
    }
    const openKeys = ref([])
    const setOpenKeys = (val) => {
      openKeys.value = val
    }
    return {
      defaultActive,
      setDefaultActive,
      openKeys,
      setOpenKeys
    }
  },
  computed: {
    menu() {
      const whiteListStore = useWhiteListStore()
      const menu = whiteListStore.menu
      return menu
    }
  },
  created() {
    this.onRouteChange(this.$route)
  },
  methods: {
    /**
     * 选中菜单的事件
     * @param {string} index 选中菜单项的 index
     */
    handleSelect({ key }) {
      const { name } = this.$route
      if (name !== key) {
        this.$router.push({ name: key })
      }
    },
    /**
     * 路由变化
     */
    onRouteChange(newRoute) {
      const whiteListStore = useWhiteListStore()
      const { name, meta } = newRoute
      const { pNames } = meta
      let keys = [name]

      if (pNames?.length) {
        keys = [...pNames, name]
      }

      // 路由变化时更新菜单激活状态
      this.setDefaultActive([name])
      this.setOpenKeys(keys)
      const menuList = []
      const _getMenus = (menus) => {
        for (let i = 0, l = menus.length; i < l; i++) {
          if (keys.includes(menus[i].name)) {
            const breadcrumbItem = {
              title: menus[i].title,
              name: menus[i].name,
              path: menus[i].children?.length ? '' : menus[i].path
            }
            menuList.push(breadcrumbItem)
            if (menus[i].children) {
              _getMenus(menus[i].children)
            }
            break
          }
        }
      }
      _getMenus(this.menu)
      whiteListStore.setBreadcrumb(menuList)
    }
  },
  watch: {
    $route: function (newRoute) {
      this.onRouteChange(newRoute)
    }
  }
})
</script>

<style scoped lang="less">
.global-aside-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 63px;
  border-bottom: 1px solid #eee;

  .logo {
    height: 40px;
  }
}

.global-aside-main {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>
