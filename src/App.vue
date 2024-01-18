<template>
  <currentTime />
  <Table />
</template>

<script>
import Table from './components/Table.vue'
import currentTime from './components/currentTime.vue'

export default {
  name:'App',
  components:{Table,currentTime}
}
</script>

<style>

</style>