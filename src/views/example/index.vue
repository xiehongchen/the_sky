<template>
  <div></div>
</template>
<script setup>
class query {
  constructor(data) {
    this.data = data
    this.filters = []
    this.sorters = []
    this.groupers = []
  }
  filter(predicate) {
    this.filters.push(predicate)
    return this
  }
  sort(compareFn) {
    this.sorters.push(compareFn)
    return this
  }
  groupBy(key) {
    this.groupers.push(key)
    return this
  }
  execute() {
    let result = [...this.data]
    if (this.filters.length > 0) {
      result = result.filter((item) =>
        this.filters.every((predicate) => predicate(item)),
      )
    }
    if (this.sorters.length > 0) {
      result.sort((a, b) =>
        this.sorters.reduce((prev, sorter) => prev || sorter(a, b), 0),
      )
    }
    if (this.groupers.length > 0) {
      const groups = []
      result.forEach((item) => {
        const key = this.groupers.map((key) => item[key]).join('-')
        console.log('key', key)
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(item)
      })
      console.log('groups', groups)
      result = Object.keys(groups).map((key) => ({
        [this.groupers.join('-')]: key,
        item: groups[key],
      }))
    }
    return result
  }
}
const data = [
  { name: 'apple', category: 'fruit', price: 10 },
  { name: 'banana', category: 'fruit', price: 5 },
  { name: 'carrot', category: 'vegetable', price: 3 },
  { name: 'orange', category: 'fruit', price: 8 },
]
const result = new query(data)
  .filter((item) => item.category === 'fruit' && item.price > 5)
  .sort((a, b) => b.price - a.price)
  .groupBy('category')
  .execute()
console.log(result)
</script>
<style lang="scss" scoped></style>
