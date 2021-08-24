<template>
  <div class="row">
    <q-btn label="ADD" @click="alert = true" />
    <q-dialog v-model="alert">
      <q-card style="width:400px">
        <q-card-section>
          <div class="text-h6">Your Daily Routine</div>
        </q-card-section>

        <q-form ref="add_task">
          <q-card-section class="q-pt-none">
            <q-input
              v-model="title"
              label="Todo"
              outlined
              dense
              label-color="deep-orange"
              class="q-mb-sm"
              color="grey-3"
            >
              <template v-slot:append>
                <q-icon name="event" color="deep-orange" />
              </template>
            </q-input>

            <q-input
              v-model="desc"
              label="Description"
              type="textarea"
              outlined
              dense
              autogrow
              color="deep-orange"
            />
          </q-card-section>
          <q-card-section></q-card-section>
        </q-form>
        <q-card-actions align="right">
          <q-btn flat label="SAVE" @click="saveTask()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {}
};
</script>