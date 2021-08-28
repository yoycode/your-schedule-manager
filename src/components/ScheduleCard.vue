<template>
  <q-card @click="alert = true" class="cursor-grab card__item">
    <!-- <q-checkbox v-model="is_done" keep-color size="xs" color="deep-orange" style="max-height:10px" /> -->
    {{item.title}}
    <q-dialog v-model="alert">
      <q-card style="width:500px; max-width:60vw;">
        <q-card-section>
          <div class="text-h6">{{item.title}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{item.desc}}
          <q-input
            v-if="!item.desc"
            v-model="desc"
            label="Description"
            type="textarea"
            outlined
            dense
            autogrow
            color="deep-orange"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script>
import { ref } from "vue";
export default {
  props: ["item"],
  setup() {
    let is_done = false;
    return {
      expanded: ref(false),
      val: ref(false),
      alert: ref(false),
      is_done
    };
  }
};
</script>
<style>
.card__item {
  cursor: grab;
}
</style>