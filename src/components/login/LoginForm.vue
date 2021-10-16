<template>
  <q-card style="width:50%;">
    <q-form>
      <q-input v-model="id" label="id" standout="bg-deep-orange text-white" />
      {{ id }}
      <q-input v-model="email" label="email" standout="bg-deep-orange text-white" />
      {{email}}
      <q-input v-model="pw" label="pw" standout="bg-deep-orange text-white" />
      {{ pw}}
      <div>
        <q-btn label="SIGNUP" @click="test()" />
        <q-btn label="LOGIN" @click="login()" />
        <q-btn label="LOGOUT" @click="logout()" />
        <q-btn label="GETLIST" @click="getList()" />
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
    let email = ref("");
    let pw = ref("");
    const test = () => {
      const param = {
        name: id.value,
        email: email.value,
        password: pw.value
      };
      store.dispatch("Login/test", param);
    };

    const login = () => {
      const param = {
        name: id.value,
        email: email.value,
        password: pw.value
      };
      store.dispatch("Login/login", param);
    };

    const logout = () => {
      const param = {
        name: id.value,
        email: email.value
      };
      store.dispatch("Login/logout", param);
    };
    const getList = () => {
      store.dispatch("Login/getList");
    };

    return {
      id,
      pw,
      email,
      test,
      login,
      getList
    };
  }
};
</script>