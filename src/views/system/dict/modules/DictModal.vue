<!--
 * @file 新增、编辑字典
 * 
 * @date 2024/06/05
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
    <a-form
      :key="formKey"
      ref="formRef"
      autocomplete="off"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="字典名称" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入字典名称" show-count :maxlength="50" />
      </a-form-item>
      <a-form-item label="字典编码" name="code">
        <a-input
          v-model:value="formState.code"
          placeholder="请输入字典编码"
          show-count
          :maxlength="50"
          :disabled="!!formState.id"
        />
      </a-form-item>
      <a-form-item label="字典描述" name="desc">
        <a-textarea v-model:value="formState.desc" placeholder="请输入字典描述" show-count :maxlength="100" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import { message } from 'ant-design-vue'
import { fetchDictAdd, fetchDictUpdate } from '@/services/dict'
import type { IDictRow, IFormState } from '@/services/dict/types/index.types'
import type { IEmits } from './types/dictModal.types'

const emit = defineEmits<IEmits>()

const labelCol = { span: 6 }
const wrapperCol = { span: 14 }
const openModal = ref(false)
const title = ref('新增字典')
const loading = ref(false)
const formRef = ref()
const formKey = ref(0)
const formState: IFormState = reactive({})
const rules = {
  name: [
    { required: true, message: '请输入字典名称', trigger: ['blur', 'change'] },
    { max: 50, message: '最多50个字符', trigger: ['blur', 'change'] }
  ],
  code: [
    { required: true, message: '请输入字典编码', trigger: ['blur', 'change'] },
    { max: 50, message: '最多50个字符', trigger: ['blur', 'change'] }
  ],
  desc: [{ max: 100, message: '最多100个字符', trigger: ['blur', 'change'] }]
}

const init = (record?: IDictRow) => {
  formKey.value = Date.now()
  openModal.value = true
  if (!record) {
    title.value = '新增字典'
    for (const key in formState) {
      formState[key as keyof typeof formState] = undefined
    }
  } else {
    title.value = '编辑字典'
    const fields = ['id', 'name', 'code', 'desc']
    fields.forEach((key) => {
      formState[key as keyof typeof formState] = record[key as keyof typeof record]
    })
  }
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const params = {
        ...toRaw(formState)
      }
      loading.value = true
      let res
      // 校验通过，请求后台接口
      if (formState.id) {
        res = await fetchDictUpdate(params)
        message.success('编辑成功~')
      } else {
        res = await fetchDictAdd(params)
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
