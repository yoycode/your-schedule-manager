<template>
  <div class="row justify-start">
    <q-chip
      v-for="(item, index) in taskChipList"
      :key="item.title"
      :label="taskChipList[index].title"
      draggable="true"
      @dragstart="startDrag($event, item)"
      outline
      square
    ></q-chip>
  </div>
</template>
<script>
import { ref } from "vue";
// const headers = [{ name: "title", field: "desc" }];
export default {
  props: ["taskList"],
  setup(props) {
    let taskChipList = ref(props.taskList);

    const startDrag = (event, item) => {
      event.dataTransfer.setData("itemTitle", item.title);
      event.dataTransfer.setData("itemDesc", item.desc);
    };

    return {
      filter: ref(""),
      // headers,
      taskChipList,
      startDrag
    };
  }
};
</script>