<!--
 * @file 新增、编辑字典项
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
      <a-form-item label="名称" name="label">
        <a-input v-model:value="formState.label" placeholder="请输入名称" show-count :maxlength="50" />
      </a-form-item>
      <a-form-item label="数据值" name="value">
        <a-input v-model:value="formState.value" placeholder="请输入数据值" show-count :maxlength="50" />
      </a-form-item>
      <a-form-item label="颜色" name="color">
        <a-input-group compact class="input-group">
          <a-input
            v-model:value="formState.color"
            placeholder="请输入颜色，例：#ff00ff"
            class="input-group__input"
            @change="onColorChange"
          ></a-input>
          <a-button class="input-group__btn">
            <input type="color" v-model="selectColor" class="input-group__clr" @change="onSelectColorChange" />
          </a-button>
        </a-input-group>
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input type="number" v-model:value="formState.sort" placeholder="请输入排序" />
      </a-form-item>
      <a-form-item label="描述" name="desc">
        <a-textarea v-model:value="formState.desc" placeholder="请输入描述" show-count :maxlength="100" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-radio-group v-model:value="formState.status" button-style="solid">
          <a-radio-button v-for="item in statusList" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { reactive, ref, toRaw } from 'vue'
import { message } from 'ant-design-vue'
import { fetchDictRowAdd, fetchDictRowUpdate, fetchDictListByCode } from '@/services/dict'
import type { IDictRowRow, IFormState, TStatus } from '@/services/dict/types/dictRow.types'
import type { IEmits } from './types/dictRowModal.types'
import type { IProps } from './types/dictList.types'

const props = defineProps<IProps>()

const emit = defineEmits<IEmits>()

const labelCol = { span: 6 }
const wrapperCol = { span: 14 }
const openModal = ref(false)
const title = ref('新增字典项')
const loading = ref(false)
const formRef = ref()
const formKey = ref(0)
const formState: IFormState = reactive({})
const rules = {
  label: [
    { required: true, message: '请输入名称', trigger: ['blur', 'change'] },
    { max: 50, message: '最多50个字符', trigger: ['blur', 'change'] }
  ],
  value: [
    { required: true, message: '请输入数据值', trigger: ['blur', 'change'] },
    { max: 50, message: '最多50个字符', trigger: ['blur', 'change'] }
  ],
  desc: [{ max: 100, message: '最多100个字符', trigger: ['blur', 'change'] }]
}

const statusList = ref<IDictRowRow[]>([])
const getStatusList = async () => {
  loading.value = true
  const res = await fetchDictListByCode({
    code: 'status'
  })
  statusList.value = res || []
  loading.value = false
}

const selectColor = ref('#000000')
const onSelectColorChange = () => {
  formState.color = selectColor.value
}

const onColorChange = () => {
  if (formState.color?.trim()) {
    selectColor.value = formState.color
  }
}

const init = async (record?: IDictRowRow) => {
  formKey.value = Date.now()
  openModal.value = true
  await getStatusList()
  if (!record) {
    title.value = '新增字典项'
    for (const key in formState) {
      const form = formState as any
      form[key] = undefined
    }
    formState.status = statusList.value[0].value as TStatus
  } else {
    title.value = '编辑字典项'
    const fields: Array<keyof typeof formState & keyof typeof record> = [
      'id',
      'label',
      'value',
      'color',
      'desc',
      'sort',
      'status'
    ]
    fields.forEach((key) => {
      const form = formState as any
      form[key] = record[key]
    })
    if (formState.color) {
      selectColor.value = formState.color
    }
  }
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const params = {
        dictId: props.dictId,
        ...toRaw(formState)
      }
      loading.value = true
      let res
      // 校验通过，请求后台接口
      if (formState.id) {
        res = await fetchDictRowUpdate(params)
        message.success('编辑成功~')
      } else {
        res = await fetchDictRowAdd(params)
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
<style lang="less" scoped>
.input-group {
  display: flex;
}

.input-group__input {
  flex: auto;
}

.input-group__btn {
  flex: none;
  padding: 0;
}

.input-group__clr {
  width: 60px;
  height: 100%;
  border: none;
  cursor: pointer;
}
</style>
