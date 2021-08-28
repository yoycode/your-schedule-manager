<template>
  <div class="row justify-center q-gutter-x-sm no-wrap home">
    <span v-show="false">{{ row }}</span>
    <div style="min-width:70px; height:100%; padding-top:10px;">
      <div>-</div>
      <q-card
        v-for="time in timeList()"
        :key="time"
        flat
        style=" margin-bottom: 10px; min-height: 30px; padding-top:5px; padding-bottom:5px; min-width:90px;transform:translateX(-12px);"
      >{{time}}</q-card>
    </div>

    <div
      class="drop-zone"
      @dragenter.prevent
      @dragover.prevent
      v-for="{idx,nm} in weekNm"
      :key="idx"
    >
      <div>{{ nm }}</div>
      <schedule-card
        v-for="item in getList(idx)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @drop="onDrop($event, item)"
        @dragstart="startDrag($event, item)"
        :item="item"
      />
    </div>
  </div>
</template>
<script>
import { computed, watch, ref } from "vue";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import scheduleCard from "@/components/ScheduleCard.vue"; // @ is an alias to /src

export default defineComponent({
  components: {
    scheduleCard
  },
  setup() {
    let items = ref([
      // { id: 0, title: "Item A1234", list: 1, order: 1 },
    ]);
    let time;

    const store = useStore();

    let timeFrom, timeTo, slotCnt;
    watch(
      // time SET버튼 눌러서 slotCnt에 값이 들어오면 items에 값 넣어서 뿌려주기
      () => store.state.TimeTable.timeSet.slotCnt,
      function() {
        slotCnt = store.state.TimeTable.timeSet.slotCnt;

        timeFrom = store.state.TimeTable.timeSet.timeFrom;
        timeTo = store.state.TimeTable.timeSet.timeTo;

        time = [];
        let tmp1 = timeFrom;
        let tmp2;
        for (let i = 0; i < slotCnt; i++) {
          let min = parseInt(tmp1.substr(3, 2));
          if (min == 30) {
            tmp2 = `${parseInt(tmp1.substr(0, 2)) + 1}:00`;
          } else {
            tmp2 = `${tmp1.replace("00", "30")}`;
          }
          tmp1 = `${tmp1}~${tmp2}`;
          time.push(tmp1);
          tmp1 = tmp2;
        }
        let params = {
          time_list: time
        };
        store.commit("TimeTable/SET_TIME_LIST", params);

        let arrContainer = [];
        let listNo = 1;
        let idNo = 1;
        for (let j = 0; j < 7; j++) {
          for (let i = 0; i < slotCnt; i++) {
            let obj = {
              id: idNo++,
              // title: `${j + 1}줄 - ${i + 1} 칸`,
              title: "",
              list: listNo,
              order: i + 1
            };
            arrContainer.push(obj);
          }
          listNo++;
        }
        items = ref(arrContainer);
      }
    );
    const timeList = () => {
      return time;
    };

    const getList = day => {
      let list = items.value.filter(item => item.list == day);
      list.sort(function(a, b) {
        return a.order - b.order;
      });
      return list;
    };

    const startDrag = (event, item) => {
      // event.dataTransfer.dropEffect = "move";
      // event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemDragged", item.id); // drag되는 아이템의 정보를 넣음
      event.dataTransfer.setData("itemColumn", item.list);
      event.dataTransfer.setData("itemRow", item.order);
    };

    const onDrop = (event, init) => {
      const itemDragged = event.dataTransfer.getData("itemDragged"); // drag된 아이템의 id을 갖고 있음

      // switch
      if (itemDragged) {
        // 움직이는 item 변경
        const item = items.value.find(item => item.id == itemDragged); // drag된 item의 ID랑 똑같은 item을 찾아서 -> 그냥 움직이는 item
        item.list = init.list; // drop된 list값을 해당 아이템의 list에 넣어줌
        item.order = init.order; // 원래 있던 order 자리 값을 넘어온 item에 넘겨줌

        // 원래 있던 item 변경
        const itemColumn = event.dataTransfer.getData("itemColumn");
        const itemRow = event.dataTransfer.getData("itemRow");
        init.list = itemColumn;
        init.order = itemRow;
      } else {
        // insert
        const itemTitle = event.dataTransfer.getData("itemTitle");
        const itemDesc = event.dataTransfer.getData("itemDesc");

        init.title = itemTitle;
        init.desc = itemDesc;
      }
    };

    return {
      weekNm: [
        { idx: 1, nm: "Mon" },
        { idx: 2, nm: "Tue" },
        { idx: 3, nm: "Wed" },
        { idx: 4, nm: "Thu" },
        { idx: 5, nm: "Fri" },
        { idx: 6, nm: "Sat" },
        { idx: 7, nm: "Sun" }
      ],
      getList,
      timeList,
      startDrag,
      onDrop,
      row: computed(() => store.state.TimeTable.timeSet.slotCnt),
      time
    };
  }
});
</script>
<style scoped lang="scss">
@import "src/styles/quasar.scss";
.home {
  width: 100%;
}
.drop-zone:nth-child(2) {
  margin-left: 0;
}
.drop-zone:nth-child(8) {
  margin-left: 4;
}
.drop-zone {
  width: 100%;
  background-color: #ecf0f1;
  padding: 10px;
  // min-height: 10px;
  height: 100%;
}

.drag-el {
  background-color: $grey-4;
  // color: white;
  padding: 5px;
  margin-bottom: 10px;
  min-height: 30px;
}

.drop-zone:nth-last-of-type(1) {
  margin-right: 4px;
}
</style>
