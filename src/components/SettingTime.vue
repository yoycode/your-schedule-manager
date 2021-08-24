<template>
  <!-- <q-page> -->
  <!-- <img alt="Quasar logo" src="../assets/logo.svg" style="width: 200px; height: 200px" /> -->
  <div class="setting row justify-between">
    <div>
      <q-btn icon="access_time" color="deep-orange" outline align="around" class="q-mr-sm">
        Start {{ timeFrom }}
        <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
          <q-time v-model="proxyTimeFrom" format24h :minute-options="minuteOptionsTime1">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-btn>
      <!-- <span>~</span> -->
      <q-btn icon="access_time" color="deep-orange" outline class="q-mr-sm">
        End {{ timeTo }}
        <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
          <q-time v-model="proxyTimeTo" format24h :minute-options="minuteOptionsTime1">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-btn>
      <q-btn label="SET" color="deep-orange" class="glossy" @click="setSlot"></q-btn>
    </div>
    <div>
      <add-task />
    </div>
    <!-- <q-input
      v-model="timeFrom"
      label-slot
      dense
      outlined
      style="max-width:130px; min-width:130px; margin-right:15px;"
    >
      <template v-slot:label>
        <span class="q-px-sm bg-deep-orange text-white text-italic rounded-borders">Start</span>
      </template>
      <template v-slot:append offset-y>
        <q-icon name="access_time" class="cursor-pointer icon_time">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="time" format24h :minute-options="minuteOptionsTime1">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>-->
  </div>

  <!-- </q-page> -->
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

import addTask from "@/components/AddTask.vue";

export default {
  // name: "HelloWorld",
  components: {
    addTask
  },
  setup() {
    const store = useStore();
    // let time = ref("00:00");

    let timeFrom = ref("18:00");
    let timeTo = ref("24:00");
    let proxyTimeFrom = ref("00:00");
    let proxyTimeTo = ref("00:00");

    const minuteOptionsTime1 = [0, 30];

    const save = () => {
      timeFrom.value = proxyTimeFrom.value; // ref 사용하면 .value 써줘야함
      timeTo.value = proxyTimeTo.value;
    };
    const updateProxy = () => {
      proxyTimeFrom.value = timeFrom.value;
      proxyTimeTo.value = timeTo.value;
    };

    let setSlot = () => {
      let hourGap = timeTo.value.substr(0, 2) - timeFrom.value.substr(0, 2);
      let minGap = timeTo.value.substr(3, 4) - timeFrom.value.substr(3, 4);
      let slotCnt = hourGap * 2;

      if (hourGap < 0) {
      }

      if (minGap == 30) {
        slotCnt += 1;
      } else if (minGap == -30) {
        slotCnt -= 1;
      } else if (minGap == 0) {
      } else {
        alert("times are wrong");
      }
      const params = {
        timeFrom: timeFrom.value,
        timeTo: timeTo.value,
        slotCnt: slotCnt
      };
      store.commit("TimeTable/SET_SCHEDULE", params);
      console.log(store.state.TimeTable.timeSet.slotCnt, "2234");
    };

    return {
      // time,
      proxyTimeFrom,
      proxyTimeTo,
      timeFrom,
      timeTo,

      minuteOptionsTime1,
      save,
      updateProxy,
      setSlot
    };
  }
};
</script>


<style scoped lang="scss">
@import "src/styles/quasar.scss";
.setting {
  background-color: $grey-12;
  margin: 20px 15px;
  padding: 15px;
}
.icon_time:hover {
  color: $deep-orange;
}
</style>
