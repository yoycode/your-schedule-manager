<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-deep-orange-5">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>Your Schedule Manager</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <!-- <router-link to="/about">About</router-link> -->
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>Inbox</q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>Star</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>Send</q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>Drafts</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <helloWorld class="snap" />
        <weekly-schedule class="snap" />
        <!-- <div class="main"> -->
        <!-- </div> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script>
import { onMounted, onActivated, ref } from "vue";
import { defineComponent } from "vue";
import helloWorld from "@/components/HelloWorld.vue";
import weeklySchedule from "@/components/weeklySchedule.vue";
export default {
  components: {
    helloWorld,
    weeklySchedule
  },
  setup() {
    return {
      drawer: ref(false),
      miniState: ref(true)
    };
  }
};
</script>


<style scoped lang="scss">
@import "src/styles/quasar.scss";
.snap {
  margin: 10px;
  // scroll-snap-align: center;
  // display: inline-block;
  // width: 100%;
  // height: calc(100vh-25px);
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
</style>
