<template>
  <div class="container">
    <router-link to="/">Home</router-link>
    <router-link to="/data">Data</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
