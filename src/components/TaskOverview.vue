<template>
  <div class="row justify-start">
    <q-chip
      v-for="(item, index) in taskChipList"
      :key="item.title"
      :label="taskChipList[index].title"
      outline
      square
    ></q-chip>
    <!-- <q-table
      grid
      :rows="taskChipList"
      :columns="headers"
      row-key="name"
      :filter="filter"
      rowsPerPage="20"
      hide-header
      dense
    >
    </q-table>-->
  </div>
</template>
<script>
import { ref, watch } from "vue";
// const headers = [{ name: "title", field: "desc" }];
export default {
  props: ["taskList"],
  setup(props) {
    let taskChipList = ref(props.taskList);
    return {
      filter: ref(""),
      headers,
      taskChipList,
      zero: ref(0)
    };
  }
};
</script>