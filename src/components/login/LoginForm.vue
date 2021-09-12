<template>
  <q-card style="width:50%;">
    <q-form>
      <q-input v-model="id" label="id" standout="bg-deep-orange text-white" />
      {{ id }}
      <q-input v-model="pw" label="pw" standout="bg-deep-orange text-white" />
      {{ pw}}
      <div>
        <q-btn label="LOGIN" @click="test()" />
      </div>
    </q-form>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    let id = ref("");
    let pw = ref("");
    const test = () => {
      const params = {
        id: id.value,
        pw: pw.value
      };
      store.dispatch("Login/test", params);
    };

    return {
      id,
      pw,
      test
    };
  }
};
</script>