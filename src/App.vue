<template>
  <div class="container">
    <div class="tap">
      <router-link to="/">Home</router-link>
      <router-link to="/data">Data</router-link>
    </div>
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
  gap: 1rem;
}
.tap {
  padding: 1rem 0;
}
a {
  text-decoration: none;
  background-color: var(--color-gray);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-right: 1rem;
  transition: 0.3s;
  color: inherit;
}
a:hover {
  background-color: var(--color-black);
  color: var(--color-white);
}
</style>
