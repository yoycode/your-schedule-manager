<template>
  <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <div class="row justify-center q-gutter-x-sm no-wrap home">
    <span v-show="false">{{ row }}</span>
    <div class="drop-zone" @dragenter.prevent @dragover.prevent>
      <div>월</div>
      <schedule-card
        v-for="item in getList(1)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @drop="onDrop($event, item)"
        @dragstart="startDrag($event, item)"
        :item="item"
      />
    </div>
    <div class="drop-zone" @dragenter.prevent @dragover.prevent>
      <div>화</div>
      <schedule-card
        v-for="item in getList(2)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @drop="onDrop($event, item)"
        @dragstart="startDrag($event, item)"
        :item="item"
      />
    </div>
    <div class="drop-zone" @dragenter.prevent @dragover.prevent>
      <div>수</div>
      <schedule-card
        v-for="item in getList(3)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @drop="onDrop($event, item)"
        @dragstart="startDrag($event, item)"
        :item="item"
      />
    </div>
    <div class="drop-zone" @dragenter.prevent @dragover.prevent>
      <div>목</div>
      <schedule-card
        v-for="item in getList(4)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @drop="onDrop($event, item)"
        @dragstart="startDrag($event, item)"
        :item="item"
      />
    </div>
    <div class="drop-zone" @dragenter.prevent @dragover.prevent>
      <div>금</div>
      <schedule-card
        v-for="item in getList(5)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @drop="onDrop($event, item)"
        @dragstart="startDrag($event, item)"
        :item="item"
      />
    </div>
    <div class="drop-zone" @dragenter.prevent @dragover.prevent>
      <div>토</div>
      <schedule-card
        v-for="item in getList(6)"
        :key="item.id"
        class="drag-el"
        draggable="true"
        @drop="onDrop($event, item)"
        @dragstart="startDrag($event, item)"
        :item="item"
      />
    </div>
    <div class="drop-zone" @dragenter.prevent @dragover.prevent>
      <div>일</div>
      <schedule-card
        v-for="item in getList(7)"
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
    // HelloWorld
  },
  setup() {
    let items = ref([
      // { id: 0, title: "Item A1234", list: 1, order: 1 },
      // { id: 1, title: "Item B2345", list: 1, order: 2 },
      // { id: 2, title: "Item C3456", list: 1, order: 3 },
      // { id: 3, title: "Item D4567", list: 1, order: 4 },
      // { id: 4, title: "Item E5678", list: 1, order: 5 },
      // { id: 5, title: "Item F679", list: 1, order: 6 },
      // { id: 6, title: "Item G7890", list: 1, order: 7 },
      // { id: 7, title: "Item A890-", list: 2, order: 1 },
      // { id: 8, title: "Item B2331", list: 2, order: 2 },
      // { id: 9, title: "Item C431", list: 2, order: 3 },
      // { id: 10, title: "Item D5423", list: 2, order: 4 },
      // { id: 11, title: "Item E634", list: 2, order: 5 },
      // { id: 12, title: "Item F764", list: 2, order: 6 },
      // { id: 13, title: "Item G8765", list: 2, order: 7 },
      // { id: 14, title: "Item A9867", list: 3, order: 1 },
      // { id: 15, title: "Item B0798", list: 3, order: 2 },
      // { id: 16, title: "Item C-890", list: 3, order: 3 },
      // { id: 17, title: "Item D2424", list: 3, order: 4 },
      // { id: 18, title: "Item E3535", list: 3, order: 5 },
      // { id: 19, title: "Item F4646", list: 3, order: 6 },
      // { id: 20, title: "Item G5757", list: 3, order: 7 },
      // { id: 21, title: "Item A6868", list: 4, order: 1 },
      // { id: 22, title: "Item B7979", list: 4, order: 2 },
      // { id: 23, title: "Item C8080", list: 4, order: 3 },
      // { id: 24, title: "Item D9-9-", list: 4, order: 4 },
      // { id: 25, title: "Item E1313", list: 4, order: 5 },
      // { id: 26, title: "Item F1515", list: 4, order: 6 },
      // { id: 27, title: "Item G2626", list: 4, order: 7 },
      // { id: 28, title: "Item A3737", list: 5, order: 1 },
      // { id: 29, title: "Item B8483", list: 5, order: 2 },
      // { id: 30, title: "Item C4488", list: 5, order: 3 },
      // { id: 31, title: "Item D5959", list: 5, order: 4 },
      // { id: 32, title: "Item E6060", list: 5, order: 5 },
      // { id: 33, title: "Item F2426", list: 5, order: 6 },
      // { id: 34, title: "Item G6262", list: 5, order: 7 },
      // { id: 35, title: "Item A7272", list: 6, order: 1 },
      // { id: 36, title: "Item B8383", list: 6, order: 2 },
      // { id: 37, title: "Item C9494", list: 6, order: 3 },
      // { id: 38, title: "Item D4253", list: 6, order: 4 },
      // { id: 39, title: "Item E6475", list: 6, order: 5 },
      // { id: 40, title: "Item F8697", list: 6, order: 6 },
      // { id: 41, title: "Item G08-9", list: 6, order: 7 },
      // { id: 42, title: "Item A2435", list: 7, order: 1 },
      // { id: 43, title: "Item B1111", list: 7, order: 2 },
      // { id: 44, title: "Item C2222", list: 7, order: 3 },
      // { id: 45, title: "Item D3333", list: 7, order: 4 },
      // { id: 46, title: "Item E4444", list: 7, order: 5 },
      // { id: 47, title: "Item F5555", list: 7, order: 6 },
      // { id: 48, title: "Item G6666", list: 7, order: 7 }
    ]);

    const store = useStore();

    let slotCnt;
    watch(
      () => store.state.TimeTable.timeSet.slotCnt,
      function() {
        slotCnt = store.state.TimeTable.timeSet.slotCnt;

        let arrContainer = [];
        let listNo = 1;
        let idNo = 1;

        for (let j = 0; j < 7; j++) {
          for (let i = 0; i < slotCnt; i++) {
            let obj = {
              id: idNo++,
              title: `${j + 1}줄 - ${i + 1} 칸`,
              list: listNo,
              order: i + 1
            };
            arrContainer.push(obj);
          }
          listNo++;
        }
        console.log(arrContainer, "1234");
        items = ref(arrContainer);
      }
    );

    const getList = list => {
      let aa = items.value.filter(item => item.list == list);
      aa.sort(function(a, b) {
        return a.order - b.order;
      });
      return aa;
    };

    const startDrag = (event, item) => {
      // event.dataTransfer.dropEffect = "move";
      // event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("itemD", item.id); // drag되는 아이템의 정보를 넣음
      event.dataTransfer.setData("itemC", item.list);
      event.dataTransfer.setData("itemO", item.order);
    };

    const onDrop = (event, init) => {
      const itemD = event.dataTransfer.getData("itemD"); // drag된 아이템의 id을 갖고 있음
      const item = items.value.find(item => item.id == itemD); // drag된 item의 ID랑 똑같은 item을 찾아서 -> 그냥 움직이는 item

      item.list = init.list; // drop된 list값을 해당 아이템의 list에 넣어줌
      item.order = init.order; // 원래 있던 order 자리 값을 넘어온 item에 넘겨줌

      const initI = items.value.find(item => item.id == init.id); // 원래자리에 있던 item
      const itemC = event.dataTransfer.getData("itemC");
      initI.list = itemC;

      const itemO = event.dataTransfer.getData("itemO");
      initI.order = itemO;
    };

    return {
      weekNm: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      getList,
      startDrag,
      onDrop,
      row: computed(() => store.state.TimeTable.timeSet.slotCnt)
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
