<template>
  <div class="table-box">
    <el-table class="table" v-loading="loading" :data="tableData" stripe>
      <el-table-column
        v-for="item in tableColumnList"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
      >
        <template v-if="item.slot" v-slot="scope">
          <slot :name="item.prop" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
interface Column {
  label: string
  prop: string
  slot?: boolean
  width?: number
}
interface propTableProps {
  loading: boolean
  tableData: any[]
  columns: Column[]
}
const props = withDefaults(defineProps<propTableProps>(), {
  loading: false,
  tableData: () => [],
  columns: () => [],
})
const tableColumnList = reactive<Column[]>(props.columns)
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
