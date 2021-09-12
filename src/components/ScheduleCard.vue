<template>
  <q-card @click="dialog = true" class="cursor-grab card__item">
    <!-- <q-checkbox v-model="is_done" keep-color size="xs" color="deep-orange" style="max-height:10px" /> -->
    <div class="row justify-between">
      <q-icon v-if="item.title" name="dehaze" style="font-size:20px" />
      <span class="q-mx-auto">{{item.title}}</span>
      {{item.list}} {{item.order}}
      <!-- {{typeof(item.list)}} {{ typeof(item.order)}} -->
      <!-- <q-icon v-if="item.title" name="feed" size="sm" /> -->
    </div>
    <q-dialog v-model="dialog">
      <q-card style="width:500px; max-width:60vw;">
        <q-card-section align="center">
          <div class="text-h6">{{item.title}}</div>
          <q-input
            v-if="!item.title"
            v-model="title"
            label="TASK"
            type="text"
            outlined
            dense
            autogrow
            color="deep-orange"
          ></q-input>
          {{ title }}
        </q-card-section>
        <q-separator inset />
        <q-card-section align="center">
          <div class="row justify-center">
            <q-chip>{{ listToDay }}</q-chip>
            <q-chip>{{ item.list }}</q-chip>
            <q-chip>{{ item.time }}</q-chip>
          </div>
          <div>{{item.desc}}</div>
          <q-input
            v-if="!item.desc"
            v-model="desc"
            label="Description"
            type="textarea"
            outlined
            dense
            autogrow
            color="deep-orange"
          >
            <!-- <template v-slot:after>
              <q-btn label="SAVE" color="deep-orange" @click="save($event)"></q-btn>
            </template>-->
          </q-input>
          {{ desc }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CLOSE" color="grey" v-close-popup />
          <q-btn
            v-if="item.title"
            @click="editItem(item.list, item.order)"
            flat
            label="EDIT"
            color="deep-orange"
          />
          <q-btn
            v-if="item.title"
            @click="deleteItem(item.list, item.order)"
            flat
            label="DELETE"
            color="deep-orange"
          />
          <q-btn
            v-if="!item.title"
            @click="save(item.list, item.order)"
            flat
            label="SAVE"
            color="deep-orange"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["item"],
  setup() {
    const store = useStore();
    let dialog = ref(false);
    let is_done = false;
    let title = ref("");
    let desc = ref("");
    const save = (list, order) => {
      let items = store.getters["TimeTable/GET_SLOT_LIST"];
      let item = items.find(item => item.list == list && item.order == order);
      item.title = title.value;
      item.desc = desc.value;
      dialog.value = false;
    };
    const deleteItem = (list, order) => {
      if (confirm(`Are you sure to delete ?`)) {
        let items = store.getters["TimeTable/GET_SLOT_LIST"];
        let item = items.find(item => item.list == list && item.order == order);
        item.title = "";
        item.desc = "";
        dialog.value = false;
      }
    };
    return {
      expanded: ref(false),
      val: ref(false),
      dialog,
      desc,
      title,
      is_done,
      save,
      deleteItem
    };
  },
  computed: {
    listToDay() {
      console.log(this.item.list, typeof this.item.list);
      switch (this.item.list) {
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
        case 7:
          return "Sunday";
      }
    }
  },
  watch: {
    title() {
      console.log(title.value);
    }
  }
};
</script>
<style>
.card__item {
  /* cursor: grab; */
}
</style>