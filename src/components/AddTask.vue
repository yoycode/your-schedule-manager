<template>
  <div class="row">
    <q-btn label="ADD TASK" @click="dialog = true" />
    <q-dialog v-model="dialog">
      <q-card style="width:420px">
        <q-card-section>
          <div class="text-h6">Daily Routine</div>
        </q-card-section>

        <q-form ref="add_task">
          <q-card-section class="q-pt-none">
            <q-input
              v-model="title"
              label="Todo"
              outlined
              dense
              label-color="deep-orange"
              class="q-mb-sm"
              color="deep-orange"
            >
              <template v-slot:append>
                <q-icon name="event" color="deep-orange" />
              </template>
            </q-input>
            <q-input
              v-model="desc"
              label="Description"
              type="textarea"
              outlined
              dense
              autogrow
              color="deep-orange"
            />
          </q-card-section>
          <q-card-section>
            <q-select
              v-model="week_type"
              :options="list_day"
              label="days"
              label-color="deep-orange"
              color="deep-orange"
              emit-value
              map-options
              outlined
              dense
              style="max-width:500px"
            />
            <q-checkbox
              v-for="{value, label} in week_cb"
              :key="value"
              v-model="week"
              :val="value"
              :label="label"
              keep-color
              size="xs"
              color="deep-orange"
            />
            <q-select
              outlined
              v-model="time"
              :options="list_time"
              label="Time"
              multiple
              dense
              color="deep-orange"
              label-color="deep-orange"
              class="q-mb-sm"
            />
            <div class="row" style="align-items:center">
              <q-badge
                v-for="item in time"
                :key="item"
                class="q-mr-sm q-mt-sm"
                color="deep-orange"
              >{{item}}</q-badge>
            </div>
          </q-card-section>
        </q-form>
        <q-card-actions align="right">
          <q-btn flat label="CLOSE" color="grey" v-close-popup />
          <q-btn flat label="SAVE" @click="saveTask()" color="deep-orange" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    let dialog = ref(false);
    let title = ref("");
    let desc = ref("");
    let week_type = ref(0);
    let week = ref([]);
    let time = ref([]);
    const list_day = [
      { label: "Customized", value: 0 },
      { label: "Everyday (Mon ~ Sun)", value: 1 },
      { label: "Weekday (Mom ~ Fri)", value: 2 },
      { label: "Weekend (Sat ~ Sun)", value: 3 }
    ];
    let list_time = ref([]);

    watch(
      () => store.state.TimeTable.option_time,
      function() {
        list_time.value = store.state.TimeTable.option_time;
      }
    );

    watch(week_type, (newVal, oldVal) => {
      let arr;
      switch (newVal) {
        case 0:
          arr = [];
          break;
        case 1:
          arr = [1, 2, 3, 4, 5, 6, 7];
          break;
        case 2:
          arr = [1, 2, 3, 4, 5];
          break;
        case 3:
          arr = [6, 7];
          break;
      }
      week.value = arr;
    });

    const saveTask = () => {
      let arr = store.getters["Task/GET_TASK_LIST"];
      let task = {
        title: title.value,
        desc: desc.value,
        week: week.value,
        time: time.value
      };
      arr.push(task);
      console.log(task);
      store.commit("Task/SET_TASK_LIST", arr);
      title.value = "";
      desc.value = "";
      week_type.value = 0;
      week.value = [];
      time.value = [];
      dialog.value = false;
    };
    return {
      dialog,
      title,
      desc,
      week_type,
      week,
      time,
      list_day,
      list_time,
      week_cb: [
        { value: 1, label: "Mon" },
        { value: 2, label: "Tue" },
        { value: 3, label: "Wed" },
        { value: 4, label: "Thu" },
        { value: 5, label: "Fri" },
        { value: 6, label: "Sat" },
        { value: 7, label: "Sun" }
      ],
      saveTask
    };
  }
};
</script>
<style>
</style>