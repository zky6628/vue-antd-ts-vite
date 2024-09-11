<!--
 * @file 全局头部
 * 
 * @date 2024/05/22
-->
<template>
  <div class="global-header-cnt">
    <div class="global-header-first">
      <img class="logo" :src="logoImg" alt="PC管理后台" />
      <h1 class="global-header-title">PC管理后台</h1>
    </div>

    <div class="global-header-second">
      <div class="global-header-user">
        欢迎您，
        <span>{{ user?.username }}</span>
      </div>

      <a-button @click="showDrawer">
        <template #icon>
          <SettingOutlined />
        </template>
        <span>设置</span>
      </a-button>

      <a-button @click="handleLogout">
        <template #icon>
          <LoginOutlined />
        </template>
        <span>退出登录</span>
      </a-button>
    </div>

    <a-drawer v-model:open="open" title="设置主题色" placement="right">
      <ul class="colors">
        <li
          v-for="item in colors"
          :key="item"
          :style="{ background: item }"
          class="colors-item"
          @click="setTheme(item)"
        >
        <CheckOutlined v-if="themeStore.theme.token.colorPrimary === item" class="colors-item__check" />
      </li>
      </ul>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useThemeStore } from '@/stores/theme'
import logoImg from '@/assets/img/logo.svg'
import type { CheckOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const user = userStore.user

const colors = ['#1890ff', '#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#2f54eb', '#722ed1']
const themeStore = useThemeStore()
const setTheme = (color: string) => {
  themeStore.setTheme(color)
  open.value = false
}

const open = ref<boolean>(false)
const showDrawer = () => {
  open.value = true
}

/**
 * 退出登录
 */
const handleLogout = () => {
  Modal.confirm({
    title: '提示',
    content: '您确定要退出登录吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      // 清除用户信息
      userStore.setUser()
      // 跳转到登录页面
      router.push({ name: 'login' })
    }
  })
}
</script>

<style scoped lang="less">
.global-header-cnt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .global-header-first {
    display: flex;
    flex: none;
    align-items: center;
    padding: 0 30px 0 16px;

    .logo {
      height: 40px;
      margin-right: 20px;
    }

    .global-header-title {
      height: 40px;
      margin: 0;
      font-weight: 400;
      line-height: 40px;
    }
  }

  .global-header-second {
    display: flex;
    flex: none;
    align-items: center;

    .global-header-user {
      margin-right: 20px;

      span {
        color: #000;
      }
    }

    .ant-btn {
      border: none;
    }
  }
}

.colors {
  display: flex;
}

.colors-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  cursor: pointer;
  border-radius: 2px;
}

.colors-item__check {
  color: var(--its-white);
}
</style>
