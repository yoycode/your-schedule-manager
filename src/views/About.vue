<template>
  <div>
    <add-task class="layout"></add-task>
  </div>
</template>
<script>
import addTask from "@/components/AddTask.vue";
export default {
  components: {
    addTask
  }
};
</script>
<style scoped lang="scss">
@import "src/styles/quasar.scss";
.layout {
  margin: 10px;
  // scroll-snap-align: center;
  // display: inline-block;
  // width: 100%;
  // height: calc(100vh-25px);
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>
