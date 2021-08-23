<template>
  <!-- <div class="q-pa-md row"> -->
  <!-- <q-toggle v-model="expanded" label="Expanded" class="q-mb-md" /> -->

  <!-- <q-checkbox v-model="val" size="xs" color="deep-orange" /> -->
  <!-- <q-expansion-item v-model="expanded" :label="item.title">
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>-->
  <q-card class="cursor-grab card__item">{{item.title}}</q-card>
</template>
<script>
import { ref } from "vue";
export default {
  props: ["item"],
  setup() {
    return {
      expanded: ref(false),
      val: ref(false)
    };
  }
};
</script>
<style>
.card__item {
  cursor: grab;
}
</style>