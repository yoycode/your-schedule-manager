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
      draggable="true"
      @dragstart="startDrag($event, item)"
      removable
      @remove="deleteItem(item)"
      square
      class="pl-0"
    >
      <q-icon name="today" color="grey" style="font-size: 22px;" @click="setInTimeTable(item)" />
      <!-- <q-avatar icon="event" color="deep-orange" text-color="white" @click="setInTimeTable(item)" /> -->
      {{listData[index].title}}
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
      console.log(item);
      console.log(item.week);
      console.log(item.time);
      store
        .dispatch("Task/applyTask", item)
        .then(result => console.log("성공", result))
        .catch(error => console.log("실패", error));
      // add task하면 store에 list를 저장하고
      // schedule엔 뿌려주지말기
      // 그리고 여기 메소드 탈때만 store에 다른 appliedList 만들어서
      // 거기에 들어간것만 schedule에 뿌려주기
      // 그리고 아이콘 바꿔주기
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