<!--
 * @file 登录页面
 * 
 * @date 2024/05/13
-->
<template>
  <div class="login">
    <main class="login-main">
      <div class="login-header">
        <a href="/" class="login-header-main">
          <img src="/favicon.ico" class="login-header__logo" />
          <span class="login-header__title">PC管理后台</span>
        </a>
      </div>
      <div class="login-desc">欢迎使用本系统~</div>
      <a-form :model="formState" autocomplete="off" @finish="onFinish" class="login-form">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入账号' }]">
          <a-input v-model:value="formState.username" placeholder="账号" size="large">
            <template #prefix>
              <user-outlined style="color: var(--its-black-3)" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="formState.password" placeholder="密码" size="large">
            <template #prefix>
              <lock-outlined style="color: var(--its-black-3)" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ span: 12 }">
          <a-checkbox v-model:checked="formState.remember" class="login-remember" size="large">记住密码</a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button block type="primary" html-type="submit" size="large" :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
      <p class="login-footer">Copyright © 2024 its-wild</p>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { login } from '@/services/user'
import { local } from '@/plugins/storage'
import { REMEMBER_PSW, PSW } from '@/assets/ts/constant'
import type { FormState } from './types/loginView.types'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type { ILoginParams } from '@/services/user/types/index.types'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true
})

const init = () => {
  const remember = local.get(REMEMBER_PSW, true) as boolean
  const user = local.get(PSW, null, true) as ILoginParams
  formState.remember = remember
  if (remember && user) {
    const { username, password } = user
    formState.username = username
    formState.password = password
  }
}

const onFinish = async (values: FormState) => {
  const { username, password, remember } = values
  loading.value = true
  try {
    const payload = {
      username,
      password
    }
    const res = await login(payload)
    userStore.setUser(res)
    local.set(REMEMBER_PSW, remember)
    if (remember) {
      local.set(PSW, payload, null, true)
    } else {
      local.remove(PSW)
    }

    const { rdurl } = route.query
    // 如果地址上有重定向地址则跳转去重定向的地址
    if (rdurl && typeof rdurl === 'string') {
      const url = decodeURIComponent(rdurl)
      // 如果从定向的是登录页面，那就跳转首页
      if (url.startsWith('/login')) {
        router.replace({ name: 'home' })
        return
      }
      window.location.replace(url)
    } else {
      router.replace({ name: 'home' })
    }
  } catch (error) {
    console.error(error)
  }
  loading.value = false
}

init()
</script>

<style scoped lang="less">
.login {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login/bg.svg) no-repeat;
  background-size: 100% 100%;
}

.login-main {
  padding: 72px 0 24px;
}

.login-header {
  height: 44px;
  line-height: 44px;
  text-align: center;
}

.login-header-main {
  display: inline-flex;
  align-items: center;
}

.login-header__logo {
  height: 44px;
}

.login-header__title {
  font-size: 33px;
  color: var(--color-text);
  margin-left: 10px;
}

.login-desc {
  color: var(--color-text-2);
  text-align: center;
  margin: 12px 0 40px;
}

.login-form {
  width: 368px;
  min-width: 260px;
  margin: 0 auto;
}

.login-remember {
  color: var(--color-text);
}

.login-footer {
  color: var(--color-text-2);
  text-align: center;
}
</style>
