export const TimeTable = {
  namespaced: true, // 이거 안쓰면 getters, mutations, actions 전역으로 들어감
  state: () => ({
    timeSet: {
      timeFrom: '',
      timeTo: '',
      slotCnt: 0,
    },
  }),

  mutations: {
    SET_SCHEDULE(state, payload) {
      state.timeSet = payload;
    }
  },
  getters: {
    GET_SCHEDULE(state) {
      return state.timeSet;
    }
  },
  actions: {
    test() {
      console.log("actions!!")
    }
  }


};