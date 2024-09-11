<!--
 * @file 用户管理
 * 
 * @date 2024/07/30
-->
<template>
  <a-card>
    <its-table :columns="columns" :register="registerTable">
      <!-- 查询区域 -->
      <template #search>
        <div class="page-search-wrapper">
          <a-form @keyup.enter="onSearch" autocomplete="off" layout="inline">
            <a-form-item label="账号" class="one-input">
              <a-input v-model:value="params.username" placeholder="请输入账号" allow-clear />
            </a-form-item>

            <a-form-item label="姓名">
              <a-input v-model:value="params.name" placeholder="请输入姓名" allow-clear />
            </a-form-item>

            <a-form-item label="状态">
              <a-select
                v-model:value="params.status"
                placeholder="请选择状态"
                allow-clear
                :options="statusList"
              ></a-select>
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
        <template v-if="column.dataIndex === 'status'">
          <template v-for="item in statusList" :key="item.value">
            <a-tag v-if="record.status === item.value" :color="item.color" style="margin: 0">{{ item.label }}</a-tag>
          </template>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="link" @click="onEdit(record)">编辑</a-button>
          <ItsDel @confirm="onDelete(record)"></ItsDel>
        </template>
      </template>

      <UserModal ref="roleModal" @success="() => onSearch()"></UserModal>
    </its-table>
  </a-card>
</template>

<script lang="ts" setup>
import { fetchUserList, fetchUserDel } from '@/services/user'
import { fetchDictListByCode } from '@/services/dict'
import { ItsSearchBtns, ItsTable, useTable, ItsDel } from '@/components/itsTable'
import UserModal from './modules/UserModal.vue'
import { ref } from 'vue'
import type { IDictRowRow } from '@/services/dict/types/dictRow.types'
import type { IUser } from '@/services/user/types/index.types'

const { params, onSearch, onResetSearch, onDelete, registerTable } = useTable({
  listApi: fetchUserList,
  delApi: fetchUserDel
})

const columns = [
  {
    title: '账号',
    dataIndex: 'username'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 140
  }
]

const roleModal = ref()

const statusList = ref<IDictRowRow[]>([])
const getStatusList = async () => {
  const res = await fetchDictListByCode({
    code: 'user_status'
  })
  statusList.value = res || []
}

getStatusList()

const onEdit = (record?: IUser) => {
  roleModal.value.init(record)
}

onSearch()
</script>
