<!--
 * @file 字典管理
 * 
 * @date 2024/06/05
-->
<template>
  <a-card>
    <its-table :columns="columns" :register="registerTable">
      <!-- 查询区域 -->
      <template #search>
        <div class="page-search-wrapper">
          <a-form @keyup.enter="onSearch" autocomplete="off" layout="inline">
            <a-form-item label="字典名称">
              <a-input v-model:value="params.name" placeholder="请输入字典名称" allow-clear />
            </a-form-item>

            <a-form-item label="字典编码">
              <a-input v-model:value="params.code" placeholder="请输入字典编码" allow-clear />
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
          <a-button type="link" @click="onSet(record)">配置</a-button>
          <ItsDel @confirm="onDelete(record)"></ItsDel>
        </template>
      </template>
    </its-table>
    <DictModal ref="dictModal" @success="() => onSearch()"></DictModal>
    <DictDrawer ref="dictDrawer"></DictDrawer>
  </a-card>
</template>

<script lang="ts" setup>
import { fetchDictList, fetchDictDel } from '@/services/dict'
import { ItsSearchBtns, ItsTable, useTable, ItsDel } from '@/components/itsTable'
import DictModal from './modules/DictModal.vue'
import DictDrawer from './modules/DictDrawer.vue'
import { ref } from 'vue'
import type { IDictRow } from '@/services/dict/types/index.types'

const { params, onSearch, onResetSearch, onDelete, registerTable } = useTable({
  listApi: fetchDictList,
  delApi: fetchDictDel
})

const columns = [
  {
    title: '字典名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '字典编码',
    dataIndex: 'code',
    align: 'center'
  },
  {
    title: '描述',
    dataIndex: 'desc',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 200
  }
]

const dictModal = ref()

const onEdit = (record?: IDictRow) => {
  dictModal.value.init(record)
}

const dictDrawer = ref()

const onSet = (record?: IDictRow) => {
  dictDrawer.value.init(record)
}

onSearch()
</script>
