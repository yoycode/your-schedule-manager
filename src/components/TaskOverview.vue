<template>
  <!-- <div @click="dialog = true" class="row justify-start">
    <q-dialog v-model="dialog">
      <q-card>dd</q-card>
    </q-dialog>
  </div>-->
  <div class="row justify-start">
    <!-- <q-chip
      v-model:selected="desert.Icecream"
      color="primary"
      text-color="white"
      icon="cake"
    >Ice cream</q-chip>-->
    <q-chip
      v-for="(item, index) in listData"
      :key="item.title"
      :label="listData[index].title"
      draggable="true"
      @dragstart="startDrag($event, item)"
      removable
      @remove="deleteItem(item)"
      outline
      square
    >
      <q-tooltip>
        {{item.title}}
        <br />
        {{item.desc}}
        <br />
        {{item.week}}
        <br />
        {{item.time}}
      </q-tooltip>
      <!-- {{ item}} -->
      <!-- 수정용 -->
      <!-- <schedule-card
        v-for="(item, index) in taskChipList"
        :key="index"
        :item="item"
        draggable="true"
        @dragstart="startDrag($event, item)"
        outline
        square
      />-->
    </q-chip>
  </div>
</template>
<script>
import { reactive, watch, computed, ref } from "vue";
import { useStore } from "vuex";
import scheduleCard from "@/components/ScheduleCard.vue"; // @ is an alias to /src

export default {
  props: ["taskList"],
  components: {
    scheduleCard
  },
  setup(props) {
    const store = useStore();

    const setInTimeTable = item => {
      alert(item);
    };

    const startDrag = (event, item) => {
      event.dataTransfer.setData("itemTitle", item.title);
      event.dataTransfer.setData("itemDesc", item.desc);
    };
    const deleteItem = async item => {
      if (confirm(`Do you really want to delete [${item.title}]?`)) {
        await store.dispatch("Task/deleteTask", { id: item._id });
        await store
          .dispatch("Task/getTaskList")
          .then(result => console.log("성공", result))
          .catch(error => console.error("실패", error));
      }
    };

    return {
      dialog: ref(false),
      filter: ref(""),
      setInTimeTable,
      startDrag,
      deleteItem,
      listData: computed(() => {
        return props.taskList;
      })
    };
  }
};
</script>