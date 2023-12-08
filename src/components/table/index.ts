export interface Column {
  label: string
  prop: string
  slot?: boolean
  width?: number
  fixed?: string
}
export interface propTableProps {
  loading: boolean
  tableData: any[]
  columns: Column[]
}
