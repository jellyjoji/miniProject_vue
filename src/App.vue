<template>
  <div class="container">
    <currentTime />
    <Table />
  </div>
</template>

<script>
import Table from './components/Table.vue'
import currentTime from './components/currentTime.vue'

export default {
  name:'App',
  components:{Table,currentTime}
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 2rem;
}
</style>