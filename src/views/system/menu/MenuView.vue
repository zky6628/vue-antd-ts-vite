<!--
 * @file 菜单管理
 * 
 * @date 2024/05/27
-->
<template>
  <a-card>
    <its-table :columns="columns" :register="registerTable">
      <!-- 查询区域 -->
      <template #search>
        <div class="page-search-wrapper">
          <a-form @keyup.enter="onSearch" autocomplete="off" layout="inline">
            <a-form-item label="菜单名称">
              <a-input v-model:value="params.roleName" placeholder="请输入菜单名称" allow-clear />
            </a-form-item>

            <ItsSearchBtns @search="onSearch" @reset-search="onResetSearch"></ItsSearchBtns>
          </a-form>
        </div>
      </template>

      <!-- 操作按钮区域 -->
      <template #operator>
        <div class="page-operator">
          <a-button type="primary" @click="() => onEdit()">
            <template #icon>
              <plus-outlined></plus-outlined>
            </template>
            新增
          </a-button>
        </div>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'menuType'">
          <span>{{ getMenu(record) }}</span>
        </template>
        <template v-if="column.dataIndex === 'icon'">
          <span class="icon-ctn">
            <component v-if="record.icon" :is="record.icon"></component>
          </span>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="link" @click="onEdit(record)">编辑</a-button>
          <ItsDel @confirm="onDelete(record)"></ItsDel>
        </template>
      </template>

      <MenuModal ref="roleModal" @success="() => onSearch()"></MenuModal>
    </its-table>
  </a-card>
</template>

<script lang="ts" setup>
import { fetchMenuList, fetchMenuDel } from '@/services/menu'
import { ItsSearchBtns, ItsTable, useTable, ItsDel } from '@/components/itsTable'
import MenuModal from './modules/MenuModal.vue'
import { ref } from 'vue'
import type { IMenuRow } from '@/services/menu/types/index.types'
import type { IDictRowRow } from '@/services/dict/types/dictRow.types'
import { fetchDictListByCode } from '@/services/dict'

const { params, onSearch, onResetSearch, onDelete, registerTable } = useTable({
  listApi: fetchMenuList,
  delApi: fetchMenuDel
})

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'name'
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType'
  },
  {
    title: '菜单图标',
    dataIndex: 'icon',
    align: 'center'
  },
  {
    title: '前端组件',
    dataIndex: 'componentUrl'
  },
  {
    title: '访问路径',
    dataIndex: 'url'
  },
  {
    title: '排序',
    dataIndex: 'sort'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 140
  }
]

const menuTypeList = ref<IDictRowRow[]>([])
const getMenuTypeList = async () => {
  const res = await fetchDictListByCode({
    code: 'menu_type'
  })
  menuTypeList.value = res || []
}

const getMenu = (record: IMenuRow) => {
  return menuTypeList.value.find(x => x.value === record.menuType)?.label
}

const roleModal = ref()

const onEdit = (record?: IMenuRow) => {
  roleModal.value.init(record)
}

getMenuTypeList()
onSearch()
</script>
<style lang="less" scoped>
.icon-ctn {
  font-size: 20px;
}
</style>
