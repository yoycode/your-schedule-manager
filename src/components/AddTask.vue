<template>
  <div class="row">
    <q-btn label="ADD" @click="alert = true" />
    <q-dialog v-model="alert">
      <q-card style="width:450px">
        <q-card-section>
          <div class="text-h6">Your Daily Routine</div>
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
            <!-- <q-checkbox color="deep-orange" label="make it default" /> -->
            <!-- {{ week_type }} -->
            <q-select
              v-model="week_type"
              :options="list_day"
              label="days"
              emit-value
              map-options
              outlined
              dense
              style="width:50%"
            />
            <div class="q-mb-sm">
              <!-- {{ week }} -->
              <q-checkbox
                v-for="{value, label} in week_cb"
                :key="value"
                v-model="week"
                :val="value"
                :label="label"
                keep-color
                size="xs"
                color="deep-orange"
                style="max-height:10px"
              />
            </div>
            <q-select
              outlined
              v-model="time_type"
              :options="list_time"
              dense
              class="q-mb-sm"
              style="width:50%;"
            />
            <q-input v-model="time" outlined dense color="deep-orange" />
          </q-card-section>
        </q-form>
        <q-card-actions align="right">
          <q-btn flat label="SAVE" @click="saveTask()" color="primary" v-close-popup />
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

    let title = ref("");
    let desc = ref("");
    const list_day = [
      { label: "Customized", value: 0 },
      { label: "Everyday (Mon ~ Sun)", value: 1 },
      { label: "Weekday (Mom ~ Fri)", value: 2 },
      { label: "Weekend (Sat ~ Sun)", value: 3 }
    ];
    let week_type, week, time_type, time;
    week_type = ref(0);
    week = ref([]);
    // console.log("??", store.getters["TimeTable/GET_TIME_LIST"]);
    let list_time;

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
        desc: desc.value
      };
      arr.push(task);
      store.commit("Task/SET_TASK_LIST", arr);
    };
    return {
      alert: ref(false),
      title,
      desc,
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
      week_type,
      week,
      time_type,
      time,
      saveTask
    };
  }
};
</script>