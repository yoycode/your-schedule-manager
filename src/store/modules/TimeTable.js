export const TimeTable = {
  namespaced: true, // 이거 안쓰면 getters, mutations, actions 전역으로 들어감
  state: () => ({
    timeSet: {
      timeFrom: '',
      timeTo: '',
      slotCnt: 0,
    },
    option_time: [],
    slotList: [],
  }),

  mutations: {
    SET_SCHEDULE(state, payload) {
      console.log('schedule', payload);
      state.timeSet = payload;
    },
    SET_TIME_OPTION(state, payload) {
      console.log('time', payload)
      state.option_time = payload;
    },
    SET_SLOT_LIST(state, payload) {
      console.log('slot', payload);
      state.slotList = payload;
    }
  },
  getters: {
    GET_SCHEDULE(state) {
      return state.timeSet;
    },
    GET_TIME_OPTION(state) {
      return state.option_time
    },
    GET_SLOT_LIST(state) {
      return state.slotList
    }
  },
  actions: {
    setSchedule() {

    }
  }


};