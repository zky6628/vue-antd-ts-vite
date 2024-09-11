<!--
 * @file 新增、编辑菜单
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
    :width="800"
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
      <a-form-item label="菜单类型" name="menuType">
        <a-radio-group v-model:value="formState.menuType" button-style="solid">
          <a-radio-button v-for="item in menuTypeList" :key="item.value" :value="item.value">
            {{ item.label }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="formState.menuType !== '1'" label="上级菜单" name="parentId">
        <a-tree-select
          v-model:value="formState.parentId"
          tree-data-simple-mode
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="treeData"
          placeholder="请选择上级菜单"
          :field-names="{
            label: 'name',
            value: 'id'
          }"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="菜单名称" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入菜单名称" show-count :maxlength="50" allow-clear />
      </a-form-item>
      <a-form-item label="访问路径" name="url">
        <a-input v-model:value="formState.url" placeholder="请输入访问路径" allow-clear />
      </a-form-item>
      <a-form-item label="前端组件" name="componentUrl">
        <a-input v-model:value="formState.componentUrl" placeholder="请输入前端组件" allow-clear />
      </a-form-item>
      <a-form-item name="componentName">
        <template #label>
          <span>
            组件名称
            <a-tooltip placement="top">
              <template #title>
                <span>
                  组件名称应和vue组件的name属性保持一致。组件名称不能重复，主要用于路由缓存功能。
                  如果组件名称和vue组件的name属性不一致，则会导致路由缓存失效。留空则会根据访问路径自动生成。
                </span>
              </template>
              <InfoCircleOutlined class="input-tip-icon" />
            </a-tooltip>
          </span>
        </template>
        <a-input v-model:value="formState.componentName" placeholder="请输入组件名称" allow-clear />
      </a-form-item>
      <a-form-item label="重定向地址" name="redirectUrl">
        <a-input v-model:value="formState.redirectUrl" placeholder="请输入重定向地址" allow-clear />
      </a-form-item>
      <a-form-item label="菜单图标" name="icon">
        <a-input-group compact>
          <a-input
            v-model:value="formState.icon"
            placeholder="请选择菜单图标"
            allow-clear
            style="width: calc(100% - 60px)"
          >
            <template v-if="formState.icon" #prefix>
              <component :is="formState.icon"></component>
            </template>
          </a-input>
          <a-tooltip title="选择菜单图标">
            <a-button style="width: 60px" @click="onSelectIconClick">
              <template #icon>
                <HolderOutlined />
              </template>
            </a-button>
          </a-tooltip>
        </a-input-group>
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input type="number" v-model:value="formState.sort" placeholder="请输入排序" allow-clear />
      </a-form-item>
      <a-form-item label="是否路由菜单" name="route">
        <a-switch v-model:checked="formState.route" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="是否启用" name="enable">
        <a-switch v-model:checked="formState.enable" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="是否缓存路由" name="keepAlive">
        <a-switch v-model:checked="formState.keepAlive" checked-children="是" un-checked-children="否" />
      </a-form-item>
      <a-form-item label="打开方式" name="openType">
        <a-radio-group v-model:value="formState.openType" button-style="solid">
          <a-radio-button value="1"> 内部 </a-radio-button>
          <a-radio-button value="2"> 外部 </a-radio-button>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <IconSelectModal ref="iconSelectModal" @change="onIconChange"></IconSelectModal>
  </a-modal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { fetchDictListByCode } from '@/services/dict'
import { fetchMenuList, fetchMenuAdd, fetchMenuUpdate } from '@/services/menu'
import IconSelectModal from './IconSelectModal.vue'
import type { IMenuRow, IFormState, TMenuType } from '@/services/menu/types/index.types'
import type { IEmits } from './types/menuModal.types'
import type { IDictRowRow } from '@/services/dict/types/dictRow.types'
import type { TreeSelectProps } from 'ant-design-vue'

const emit = defineEmits<IEmits>()

const labelCol = { span: 6 }
const wrapperCol = { span: 14 }
const openModal = ref(false)
const title = ref('新增菜单')
const loading = ref(false)
const formRef = ref()
const formKey = ref(0)
const formState: IFormState = reactive({})
const rules = {
  parentId: [{ required: true, message: '请选择上级菜单', trigger: ['blur', 'change'] }],
  name: [
    { required: true, message: '请输入菜单名称', trigger: ['blur', 'change'] },
    { max: 50, message: '最多50个字符', trigger: ['blur', 'change'] }
  ],
  url: [{ required: true, message: '请输入访问路径', trigger: ['blur', 'change'] }]
}

const menuTypeList = ref<IDictRowRow[]>([])
const getMenuTypeList = async () => {
  loading.value = true
  const res = await fetchDictListByCode({
    code: 'menu_type'
  })
  menuTypeList.value = res || []
  loading.value = false
}

const treeData = ref<TreeSelectProps['treeData']>([])
const loadMenuList = async (parentId?: string) => {
  const res = await fetchMenuList({ parentId })
  const { list } = res
  treeData.value = list
}

loadMenuList()

const init = async (record?: IMenuRow) => {
  formKey.value = Date.now()
  openModal.value = true
  await getMenuTypeList()
  const formData = formState as any
  if (!record) {
    title.value = '新增菜单'
    for (const key in formData) {
      formData[key] = undefined
    }
    formState.menuType = menuTypeList.value[0].value as TMenuType
    formState.route = true
    formState.enable = true
    formState.openType = '1'
  } else {
    title.value = '编辑菜单'
    const fields = [
      'id',
      'menuType',
      'parentId',
      'name',
      'url',
      'componentUrl',
      'componentName',
      'redirectUrl',
      'icon',
      'sort',
      'route',
      'enable',
      'keepAlive',
      'openType'
    ]
    fields.forEach((key) => {
      formData[key] = record[key as keyof typeof record]
    })
    console.log('->', formData)
  }
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true
      let res
      // 校验通过，请求后台接口
      if (formState.id) {
        console.log('--==>', JSON.stringify(formState))
        res = await fetchMenuUpdate(formState)
        message.success('编辑成功~')
      } else {
        res = await fetchMenuAdd(formState)
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

const iconSelectModal = ref()
const onSelectIconClick = () => {
  iconSelectModal.value.init()
}
const onIconChange = (value: string) => {
  formState.icon = value
}

defineExpose({
  init
})
</script>
<style lang="less" scoped>
.input-tip-icon {
  color: var(--its-color-warning);
}
</style>
