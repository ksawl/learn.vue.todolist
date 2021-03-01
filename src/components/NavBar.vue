<template>
  <nav class="blue darken-4">
    <div class="nav-wrapper container">
      <router-link to="/" class="brand-logo">Todo-List</router-link>
      <ul class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Create</a>
        </router-link>
        <router-link tag="li" to="/list" active-class="active">
          <a href="#">List</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped lang="scss"></style>
