<template>
  <div row justify-center>
    <loginForm style="width:700px;" />
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
