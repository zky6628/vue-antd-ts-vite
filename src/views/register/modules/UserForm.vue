<!--
 * @file 注册、编辑用户
 * 
 * @date 2024/07/30
-->
<template>
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
    <template v-if="props.showPassword">
      <a-form-item label="密码" name="password">
        <a-input
          v-model:value="formState.password"
          placeholder="请输入密码"
          type="password"
          show-count
          :maxlength="20"
        />
      </a-form-item>
      <a-form-item label="确认密码" name="rePassword">
        <a-input
          v-model:value="formState.rePassword"
          placeholder="请再次输入密码"
          type="password"
          show-count
          :maxlength="20"
        />
      </a-form-item>
    </template>
    <a-form-item label="姓名" name="name">
      <a-input v-model:value.trim="formState.name" placeholder="请输入姓名" />
    </a-form-item>
    <a-form-item label="邮箱" name="email">
      <a-input v-model:value.trim="formState.email" placeholder="请输入邮箱" />
    </a-form-item>
    <a-form-item label="地址" name="address">
      <a-input v-model:value.trim="formState.address" placeholder="请输入地址" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { updatePartial } from '@/utils'
import type { IFormState, IProps } from './types/userForm.types'
import type { Rule } from 'ant-design-vue/es/form'

const props = withDefaults(defineProps<IProps>(), {
  showPassword: false
})

const labelCol = { span: 6 }
const wrapperCol = { span: 14 }
const formRef = ref()
const formKey = ref(0)
const formState: IFormState = reactive({
  username: ''
})

const validatePwd = async (_rule: Rule, value: string) => {
  if (value !== formState.password) {
    return Promise.reject('两次输入的密码不一致')
  } else {
    return Promise.resolve()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入账号', trigger: ['blur', 'change'] },
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    { min: 6, max: 20, message: '密码为6~20个字符', trigger: ['blur', 'change'] }
  ],
  rePassword: [
    { required: true, message: '请输再次入密码', trigger: ['blur', 'change'] },
    { validator: validatePwd, trigger: ['blur', 'change'] }
  ],
  name: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
  email: [{ type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }]
}

const init = (record: IFormState) => {
  const fields = ['id', 'username', 'name', 'avatar', 'email', 'address', 'roles', 'status']
  updatePartial(formState, record, fields as Array<keyof IFormState>)
}

const onSubmit = () => {
  return formRef.value.validate().then(() => formState)
}

defineExpose({
  onSubmit,
  init
})
</script>

<style scoped lang="less"></style>
