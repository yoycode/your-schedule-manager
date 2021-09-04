<template>
  <layout />
</template>
<script>
import layout from "@/layouts/layout.vue";
export default {
  components: {
    layout
  }
};
</script>
<style lang="scss">
@import "src/styles/quasar.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: $color-primary-dark;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
