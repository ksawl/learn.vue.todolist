<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    NavBar: () => import("@/components/NavBar"),
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
