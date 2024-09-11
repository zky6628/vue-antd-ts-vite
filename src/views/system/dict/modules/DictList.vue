<!--
 * @file 字典项列表
 * 
 * @date 2024/06/05
-->
<template>
  <its-table :columns="columns" :register="registerTable">
    <!-- 查询区域 -->
    <template #search>
      <div class="page-search-wrapper">
        <a-form @keyup.enter="onSearch" autocomplete="off" layout="inline">
          <a-form-item label="名称">
            <a-input v-model:value="params.label" placeholder="请输入名称" allow-clear />
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
      <template v-if="column.dataIndex === 'color'">
        <a-tag v-if="record.color" :color="record.color" style="margin: 0">{{ record.color }}</a-tag>
        <span v-else>-</span>
      </template>
      <template v-if="column.dataIndex === 'operation'">
        <a-button type="link" @click="onEdit(record)">编辑</a-button>
        <ItsDel @confirm="onDelete(record)"></ItsDel>
      </template>
    </template>

    <DictRowModal ref="dictRowModal" :dict-id="props.dictId" @success="() => onSearch()"></DictRowModal>
  </its-table>
</template>

<script lang="ts" setup>
import { fetchDictRowList, fetchDictRowDel, fetchDictListByCode } from '@/services/dict'
import { ItsSearchBtns, ItsTable, useTable, ItsDel } from '@/components/itsTable'
import DictRowModal from './DictRowModal.vue'
import { ref } from 'vue'
import type { IDictRowRow } from '@/services/dict/types/dictRow.types'
import type { IProps } from './types/dictList.types'

const props = defineProps<IProps>()

const { params, onSearch, onResetSearch, onDelete, registerTable } = useTable({
  defaultParams: {
    dictId: props.dictId
  },
  listApi: fetchDictRowList,
  delApi: fetchDictRowDel
})

const columns = [
  {
    title: '名称',
    dataIndex: 'label',
    align: 'center'
  },
  {
    title: '数据值',
    dataIndex: 'value',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 80
  },
  {
    title: '颜色',
    dataIndex: 'color',
    align: 'center',
    width: 80
  },
  {
    title: '排序',
    dataIndex: 'sort',
    align: 'center',
    width: 60
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 140
  }
]

const dictRowModal = ref()

const statusList = ref<IDictRowRow[]>([])
const getStatusList = async () => {
  const res = await fetchDictListByCode({
    code: 'status'
  })
  statusList.value = res || []
}

const onEdit = (record?: IDictRowRow) => {
  dictRowModal.value.init(record)
}

getStatusList()
onSearch()
</script>
