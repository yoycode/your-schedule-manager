<template>
  <div>
    <setting-time class="layout" />
    <task-overview class="layout" :taskList="taskList" />
    <time-table class="layout" :testList="taskList" />
  </div>
</template>


<script>
import { computed, ref } from "vue";
// import { defineComponent } from "vue";
import { useStore } from "vuex";
import settingTime from "@/components/SettingTime.vue";
import taskOverview from "@/components/TaskOverview.vue";
import timeTable from "@/components/TimeTable.vue";
export default {
  components: {
    settingTime,
    taskOverview,
    timeTable
  },
  setup() {
    const store = useStore();
    store
      .dispatch("Task/getTaskList", "hi")
      .then(result => console.log("성공", result))
      .catch(error => console.error("실패", error));

    return {
      taskList: computed(() => store.state.Task.taskList)
    };
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
