<template>
  <Filter />
  <Table />
</template>

<script>
import Table from './components/Table.vue'
import Filter from './components/Filter.vue'

export default {
  name:'App',
  components:{Table,Filter}
}
</script>

<style>

</style>