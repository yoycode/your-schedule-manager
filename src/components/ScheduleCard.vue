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
  <q-card @click="alert = true" class="cursor-grab card__item">
    {{item.title}}
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</q-card-section>

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
    return {
      expanded: ref(false),
      val: ref(false),
      alert: ref(false)
    };
  }
};
</script>
<style>
.card__item {
  cursor: grab;
}
</style>