<template>
  <div id="nav">
    <NavBarComponent />
  </div>
  <router-view />
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";

export default {
  name: "app",
  components: {
    NavBarComponent,
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
