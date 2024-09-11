<!--
 * @file 角色管理
 * 
 * @date 2024/05/28
-->
<template>
  <a-card>
    <its-table :columns="columns" :register="registerTable">
      <!-- 查询区域 -->
      <template #search>
        <div class="page-search-wrapper">
          <a-form @keyup.enter="onSearch" autocomplete="off" layout="inline">
            <a-form-item label="角色名称" class="one-input">
              <a-input v-model:value="params.roleName" placeholder="请输入角色名称" allow-clear />
            </a-form-item>

            <a-form-item label="角色编码">
              <a-input v-model:value="params.code" placeholder="请输入角色编码" allow-clear />
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
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="link" @click="onEdit(record)">编辑</a-button>
          <ItsDel @confirm="onDelete(record)"></ItsDel>
        </template>
      </template>

      <RoleModal ref="roleModal" @success="() => onSearch()"></RoleModal>
    </its-table>
  </a-card>
</template>

<script lang="ts" setup>
import { fetchRoleList, fetchRoleDel } from '@/services/role'
import { ItsSearchBtns, ItsTable, useTable, ItsDel } from '@/components/itsTable'
import RoleModal from './modules/RoleModal.vue'
import { ref } from 'vue'
import type { IRoleRow } from '@/services/role/types/index.types'

const { params, onSearch, onResetSearch, onDelete, registerTable } = useTable({
  listApi: fetchRoleList,
  delApi: fetchRoleDel
})

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '角色编码',
    dataIndex: 'code'
  },
  {
    title: '描述',
    dataIndex: 'desc'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 140
  }
]

const roleModal = ref()

const onEdit = (record?: IRoleRow) => {
  roleModal.value.init(record)
}

onSearch()
</script>
