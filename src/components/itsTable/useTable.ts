import { reactive, ref } from 'vue'
import type { IPgntn, ITableOptions } from './types/useTable.types'
import { message } from 'ant-design-vue'

export const useTable = (options: ITableOptions) => {
  const { defaultParams, listApi, delApi } = options

  /**
   * 分页
   */
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    showTotal: (total: number, range: number[]) => {
      return range[0] + '-' + range[1] + ' 共' + total + '条'
    },
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0
  })

  const params = reactive<any>({
    ...defaultParams
  })

  const loading = ref<boolean>(false)

  const dataSource = ref<Array<any>>([])

  /**
   * 加载列表数据
   */
  const loadList = async () => {
    const query = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...params
    }

    loading.value = true
    const res = await listApi(query)
    loading.value = false
    const { list, total } = res
    pagination.total = total || 0
    dataSource.value = list
  }

  /**
   * 分页、排序、筛选变化时触发
   * @param pgntn 分页配置
   */
  const handleTableChange = (pgntn: IPgntn) => {
    pagination.pageSize = pgntn.pageSize
    pagination.current = pgntn.current
    loadList()
  }

  /**
   * 检索
   */
  const onSearch = () => {
    pagination.current = 1
    loadList()
  }

  /**
   * 重置
   */
  const onResetSearch = () => {
    for (const i in params) {
      const key = i as keyof typeof params
      if (defaultParams && defaultParams[key] !== undefined) {
        params[key] = defaultParams[key]
      } else {
        params[key] = undefined
      }
    }
    onSearch()
  }

  /**
   * 删除
   * @param record 行数据
   * @returns
   */
  const onDelete = async (record: any) => {
    if (!delApi) {
      return message.error('请设置 delApi ~')
    }
    loading.value = true
    try {
      await delApi({
        id: record.id
      })
      message.success('删除成功~')
      onSearch()
    } finally {
      loading.value = false
    }
  }

  /**
   * 注册表格
   * @returns
   */
  const registerTable = () => {
    return {
      pagination,
      loading,
      dataSource,
      handleTableChange
    }
  }

  return {
    params,
    loading,
    loadList,
    onSearch,
    onResetSearch,
    onDelete,
    registerTable
  }
}
