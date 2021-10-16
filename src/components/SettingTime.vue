<template>
  <div class="setting row justify-between">
    <div class="row">
      <q-input v-model="name" label="name" standout="bg-deep-orange text-white" />
      <q-input v-model="pw" label="pw" standout="bg-deep-orange text-white" />
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
  </div>
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

    let name = ref("");
    let pw = ref("");

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
      // store.commit("TimeTable/SET_SCHEDULE", param);
      const userInfo = {
        name: name.value,
        password: pw.value
      };
      store.dispatch("Login/login", userInfo).catch(err => {
        console.error(err);
      });

      const param = {
        timeFrom: timeFrom.value,
        timeTo: timeTo.value,
        slotCnt: slotCnt
      };
      store.dispatch("TimeTable/setTime", param);
      store.dispatch("Task/getTaskList", { name: name.value });
    };

    return {
      // time,
      name,
      pw,

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
