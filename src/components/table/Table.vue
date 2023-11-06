<template>
  <div class="table-box">
    <el-table
      class="table"
      v-loading="loading"
      :data="tableData"
      :stripe="stripe"
      :border="border"
      @selection-change="handleSelectionChange"
      @filter-change="filterChange"
      @sort-change="sortChange"
    >
      <el-table-column v-if="selection" type="selection" width="55" />
      <el-table-column
        v-for="item in tableColumnList"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :column-key="item.filterKey"
        :filters="item.filters"
      >
        <template v-if="item.slot" v-slot="scope">
          <slot :name="item.prop" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
/**
 * label：列名
 * prop： 列字段名
 * slot：是否开启插槽
 * width：列宽度
 * fixed：是否固定
 * sortable：排序
 * filterKey：筛选字段名
 * filters：筛选类型
 */
interface Column {
  label: string
  prop: string
  slot?: boolean
  width?: number
  fixed?: string
  sortable?: boolean | string
  filterKey?: string
  filters?: filterType[]
}
interface filterType {
  text: string
  value: string
}
/**
 * loading：加载
 * tableData：数据
 * columns：列
 * stripe：斑马纹
 * border：边框
 * selection：多选
 */
interface propTableProps {
  loading: boolean
  tableData: any[]
  columns: Column[]
  stripe?: boolean
  border?: boolean
  selection?: boolean
}
const props = withDefaults(defineProps<propTableProps>(), {
  loading: false,
  tableData: () => [],
  columns: () => [],
})
const emit = defineEmits([
  'handleSelectionChange',
  'filterChange',
  'sortChange',
])
const tableColumnList = reactive<Column[]>(props.columns)

const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val
  emit('handleSelectionChange', multipleSelection.value)
}
const filterChange = (filters: any[]) => {
  emit('filterChange', filters)
}
const sortChange = (obj: any) => {
  emit('sortChange', obj)
}
</script>

<style lang="scss" scoped>
.table-box {
  height: 500px;
  padding: 20px;
  .table {
    height: 100%;
  }
}
</style>
