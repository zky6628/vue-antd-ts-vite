<!--
 * @file 注册
 * 
 * @date 2024/07/30
-->
<template>
  <div class="register">
    <h1 class="register-title">注册</h1>
    <div class="register-main">
      <UserForm ref="userForm"></UserForm>
      <div class="register-main__footer">
        <a-button class="register-main__footer-btn" type="primary" @click="onSubmit" :loading="loading">注册</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserForm from './modules/UserForm.vue'
import { register } from '@/services/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import type { IFormState } from './modules/types/userForm.types'

const router = useRouter()
const loading = ref(false)
const userForm = ref()
const onSubmit = () => {
  userForm.value
    .onSubmit()
    .then(async (formState: IFormState) => {
      loading.value = true
      await register(formState)
      message.success('注册成功，等待管理员审核~')
      loading.value = false
      router.push({
        name: 'login'
      })
    })
    .catch((error: any) => {
      loading.value = false
      console.error('error', error)
    })
}
</script>

<style scoped lang="less">
.register {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/login/bg.svg) no-repeat;
  background-size: 100% 100%;

  :deep(.ant-form-item-label) > label {
    color: var(--color-text);
  }
}

.register-title {
  padding-top: 30px;
  text-align: center;
  font-size: 33px;
  color: var(--color-text);
}

.register-main {
  width: 50%;
  min-width: 800px;
  padding: 72px 0 24px;
  margin: 0 auto;
}

.register-main__footer {
  text-align: center
}

.register-main__footer-btn {
  width: 100px;
}
</style>
