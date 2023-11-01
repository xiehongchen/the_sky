<template>
  <pre ref="preRef"></pre>
  <div>原始数据：</div>
  <pre ref="preRef1"></pre>
  <div>处理后的数据：</div>
  <pre ref="preRef2"></pre>
</template>

<script setup lang="ts">
interface TreeNode {
  id: string
  parent: string | null
  children: TreeNode[]
}
const preRef = ref<HTMLPreElement>()
const preRef1 = ref<HTMLPreElement>()
const preRef2 = ref<HTMLPreElement>()
onMounted(() => {
  if (preRef1.value) {
    preRef1.value.textContent = JSON.stringify(flatData, null, 2)
  }
  if (preRef2.value) {
    preRef2.value.textContent = JSON.stringify(tree, null, 2)
  }
})
function buildTree(data: TreeNode[]): TreeNode[] {
  const idToNode: Record<string, TreeNode> = {}

  data.forEach((item) => {
    idToNode[item.id] = {
      id: item.id,
      parent: item.parent,
      children: [],
    }
  })

  const rootNodes: TreeNode[] = []
  data.forEach((item) => {
    const node = idToNode[item.id]
    if (item.parent === null) {
      rootNodes.push(node)
    } else {
      const parentNode = idToNode[item.parent]
      if (parentNode) {
        parentNode.children.push(node)
      }
    }
  })

  return rootNodes
}

const flatData: TreeNode[] = [
  { id: 'A', parent: null, children: [] },
  { id: 'B', parent: 'A', children: [] },
  { id: 'C', parent: 'A', children: [] },
  { id: 'D', parent: 'B', children: [] },
  { id: 'E', parent: 'B', children: [] },
  { id: 'F', parent: 'C', children: [] },
  { id: 'G', parent: null, children: [] },
  { id: 'H', parent: 'G', children: [] },
]

const tree = buildTree(flatData)
console.log(tree)
</script>

<style lang="scss" scoped></style>
