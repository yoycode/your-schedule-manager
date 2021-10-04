<template>
  <!-- <div @click="dialog = true" class="row justify-start">
    <q-dialog v-model="dialog">
      <q-card>dd</q-card>
    </q-dialog>
  </div>-->
  <div class="row justify-start">
    <q-chip
      v-for="(item, index) in listData"
      :key="item.title"
      :label="listData[index].title"
      draggable="true"
      @dragstart="startDrag($event, item)"
      outline
      square
    >
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
import { watch, computed, ref } from "vue";
import { useStore } from "vuex";
import scheduleCard from "@/components/ScheduleCard.vue"; // @ is an alias to /src

export default {
  props: ["taskList"],
  components: {
    scheduleCard
  },
  setup(props) {
    console.log("props", props.taskList);
    const startDrag = (event, item) => {
      event.dataTransfer.setData("itemTitle", item.title);
      event.dataTransfer.setData("itemDesc", item.desc);
    };

    return {
      dialog: ref(false),
      filter: ref(""),
      startDrag,
      listData: computed(() => {
        return props.taskList;
      })
    };
  }
};
</script>