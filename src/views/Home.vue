<template>
  <div>
    <setting-time class="layout" />
    <task-overview class="layout" :taskList="taskList" />
    <time-table class="layout" />
  </div>
</template>


<script>
import { onMounted, onActivated, ref } from "vue";
import { defineComponent } from "vue";
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
    let taskList = store.getters["Task/GET_TASK_LIST"];
    return {
      drawer: ref(false),
      miniState: ref(true),
      taskList
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
