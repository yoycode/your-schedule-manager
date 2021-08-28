export const TimeTable = {
  namespaced: true, // 이거 안쓰면 getters, mutations, actions 전역으로 들어감
  state: () => ({
    timeSet: {
      timeFrom: '',
      timeTo: '',
      slotCnt: 0,
    },
    time_list: []
  }),

  mutations: {
    SET_SCHEDULE(state, payload) {
      state.timeSet = payload;
    },
    SET_TIME_LIST(state, payload) {
      console.log("!@#!@#", payload);
      state.time_list = payload;
    }
  },
  getters: {
    GET_SCHEDULE(state) {
      return state.timeSet;
    },
    GET_TIME_LIST(state) {
      return state.time_list
    }
  },
  actions: {
    test() {
      console.log("actions!!")
    }
  }


};