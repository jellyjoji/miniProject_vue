<template>
  <div class="container">
    <Table />
  </div>
</template>

<script>
import Table from "./components/Table.vue";

export default {
  name: "App",
  components: { Table },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 2rem;
}
</style>
