export const TimeTable = {
  namespaced: true, // 이거 안쓰면 getters, mutations, actions 전역으로 들어감
  state: () => ({
    timeSet: {
      timeFrom: '',
      timeTo: '',
      slotCnt: 0,
    },
    option_time: []
  }),

  mutations: {
    SET_SCHEDULE(state, payload) {
      state.timeSet = payload;
    },
    SET_TIME_OPTION(state, payload) {
      state.option_time = payload;
    }
  },
  getters: {
    GET_SCHEDULE(state) {
      return state.timeSet;
    },
    GET_TIME_OPTION(state) {
      return state.option_time
    }
  },
  actions: {
  }


};