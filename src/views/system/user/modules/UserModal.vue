<!--
 * @file 新增、编辑用户
 * 
 * @date 2024/07/30
-->
<template>
  <a-modal
    v-model:open="openModal"
    v-bind="$attrs"
    :title="title"
    :ok-button-props="{ loading: loading }"
    :mask-closable="false"
    @ok="onSubmit"
  >
    <UserForm ref="formRef" :key="formKey" :show-password="title === '新增用户'"></UserForm>
  </a-modal>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { message } from 'ant-design-vue'
import { fetchUserAdd, fetchUserUpdate } from '@/services/user'
import UserForm from '@/views/register/modules/UserForm.vue'
import type { IRoleRow } from '@/services/role/types/index.types'
import type { IFormState } from '@/views/register/modules/types/userForm.types'
import type { IEmits } from './types/userModal.types'

const emit = defineEmits<IEmits>()

const openModal = ref(false)
const title = ref('新增用户')
const loading = ref(false)
const formRef = ref()
const formKey = ref(0)

const init = (record?: IRoleRow) => {
  formKey.value = Date.now()
  openModal.value = true
  if (!record) {
    title.value = '新增用户'
  } else {
    title.value = '编辑用户'
    nextTick().then(() => {
      formRef.value.init(record)
    })
  }
}

const onSubmit = () => {
  formRef.value
    .onSubmit()
    .then(async (formState: IFormState) => {
      loading.value = true
      let res
      console.log(formState)
      // 校验通过，请求后台接口
      if (formState.id) {
        res = await fetchUserUpdate(formState)
        message.success('编辑成功~')
      } else {
        res = await fetchUserAdd(formState)
        message.success('新增成功~')
      }
      loading.value = false
      openModal.value = false
      emit('success', res)
    })
    .catch((error: any) => {
      loading.value = false
      console.error('error', error)
    })
}

defineExpose({
  init
})
</script>
