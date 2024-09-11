<!--
 * @file 带斑马纹表格
 * 
 * @date 2024/05/28
-->
<template>
  <div>
    <!-- 查询区域 -->
    <slot name="search"></slot>
    <!-- 操作按钮区域 -->
    <slot name="operator"></slot>
    <!-- table区域 -->
    <slot v-if="$slots.list" name="list"></slot>
    <a-table
      v-else
      class="ant-table-striped"
      size="middle"
      :row-class-name="rowClassName"
      :bordered="bordered"
      :row-key="rowKey"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      v-bind="$attrs"
    >
      <template #bodyCell="{ column, text, record }">
        <slot name="bodyCell" :column="column" :text="text" :record="record"></slot>
      </template>
    </a-table>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItsTable',
  props: {
    rowClassName: {
      type: Function,
      default: (record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)
    },
    rowKey: {
      type: [String, Number],
      default: (record: any) => record.id
    },
    bordered: {
      type: Boolean,
      default: true
    },
    register: {
      type: Function,
      required: true
    }
  },
  setup({ register }) {
    const { dataSource, pagination, loading, handleTableChange } = register()
    return {
      dataSource,
      pagination,
      loading,
      handleTableChange
    }
  }
})
</script>

<style scoped lang="less">
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

.ant-table-striped :deep(.ant-table-tbody) > tr.ant-table-row:hover > td {
  background: var(--its-hover-bg);
}

.ant-table-striped :deep(.ant-table-thead) > tr > th {
  background-color: rgba(24, 144, 255, 0.1);
}
</style>
