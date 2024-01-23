<template>
  <div class="wrap">
    <div class="wrapLeft">
      <div class="warningText">
        <h1>Oops...</h1>
        <p>This Page doesn't exist or was removed!</p>
      </div>
      <router-link to="/">
        <button class="homeBtn">
          <img src="@/../public/images/icon.svg" alt="back" />Back to home
        </button>
      </router-link>
    </div>
    <div class="wrapRight">
      <img src="@/../public/images/ilustration.png" alt="404 error" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.warningText {
  margin-bottom: 1rem;
  line-height: 3rem;
}
.homeBtn {
  padding: 1rem 2rem;
  background-color: var(--color-black);
  border: none;
  border-radius: 5px;
  color: var(--color-white);
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.homeBtn:hover {
  background-color: black;
  gap: 1rem;
}
</style>
