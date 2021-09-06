<template>
  <q-card style="width:50%;">
    <q-form>
      <q-input v-model="id" label="id" standout="bg-deep-orange text-white" />
      {{ id }}
      <q-input v-model="pw" label="pw" standout="bg-deep-orange text-white" />
      {{ pw}}
      <div>
        <q-btn label="LOGIN" />
      </div>
    </q-form>
  </q-card>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    let id = ref("");
    let pw = ref("");
    return {
      id,
      pw
    };
  }
};
</script>