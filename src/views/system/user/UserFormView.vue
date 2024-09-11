<!--
 * @file 注册、编辑用户
 * 
 * @date 2024/07/30
-->
<template>
  <div>
    <a-form
      :key="formKey"
      ref="formRef"
      autocomplete="off"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="账号" name="username">
        <a-input v-model:value="formState.username" placeholder="请输入账号（手机号）" show-count :maxlength="11" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input v-model:value="formState.password" placeholder="请输入密码" show-count :maxlength="20" />
      </a-form-item>
      <a-form-item label="确认密码" name="rePassword">
        <a-input v-model:value="formState.rePassword" placeholder="请再次输入密码" show-count :maxlength="20" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { IFormState } from './types/userFormView.types'

const labelCol = { span: 6 }
const wrapperCol = { span: 14 }
const loading = ref(false)
const formRef = ref()
const formKey = ref(0)
const formState: IFormState = reactive({})
const rules = {
  username: [{ required: true, message: '请输入账号', trigger: ['blur', 'change'] }],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    { max: 20, message: '最多20个字符', trigger: ['blur', 'change'] }
  ]
}
</script>

<style scoped lang="less"></style>
