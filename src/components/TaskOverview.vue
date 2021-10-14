<template>
  <!-- <div @click="dialog = true" class="row justify-start">
    <q-dialog v-model="dialog">
      <q-card>dd</q-card>
    </q-dialog>
  </div>-->
  <div class="row justify-start">
    <!-- {{listData}} -->
    <!-- <q-chip
      v-model:selected="desert.Icecream"
      color="primary"
      text-color="white"
      icon="cake"
    >Ice cream</q-chip>-->
    <q-chip
      v-for="(item) in listData"
      :key="item.title"
      draggable="true"
      @dragstart="startDrag($event, item)"
      removable
      @remove="deleteItem(item)"
      square
    >
      <q-checkbox
        size="xs"
        v-model="item.applied"
        :color="isApplied(item)"
        @click="applyTask(item)"
        :label="item.title"
      />
      <!-- <q-icon name="today" :color="isApplied(item)" style="font-size: 22px;" /> -->
      <!-- <q-avatar icon="event" color="deep-orange" text-color="white" @click="applyTask(item)" /> -->
      <!-- {{listData[index].title}} -->
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

    const isApplied = item => {
      if (item.applied) return "deep-orange";
      else return "black";
    };

    const applyTask = async item => {
      // if (item.applied) {
      await store
        .dispatch("Task/applyTask", item)
        .then(result => {
          // console.log("성공", result);
        })
        .catch(error => console.error("실패", error));
      // }
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
      applyTask,
      isApplied,
      startDrag,
      deleteItem,
      listData: computed(() => {
        return props.taskList;
      })
    };
  }
};
</script>