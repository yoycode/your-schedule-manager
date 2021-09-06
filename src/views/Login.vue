<template>
  <div class="row justify-center items-center" style="height: calc(100vh - 50px)">
    <loginForm />
  </div>
</template>
<script>
import addTask from "@/components/AddTask.vue";
import loginForm from "@/components/login/LoginForm.vue";
export default {
  components: {
    addTask,
    loginForm
  }
};
</script>
<style scoped lang="scss">
@import "src/styles/quasar.scss";
.layout {
  margin: 10px;
}
</style>
