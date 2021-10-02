const axios = require('axios');

export const Task = {
  namespaced: true,
  state: () => ({
    taskList: [],
  }),
  mutations: {
    SET_TASK_LIST(state, payload) {
      console.log('task', payload, payload[0].time[0]);
      state.taskList = payload;
    }
  },
  getters: {
    GET_TASK_LIST(state) {
      return state.taskList;
    }
  },
  actions: {
    setTask({ commit, dispatch }, params) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("오긴 왔어?", params)
          const rs = axios.post('/api/task/setTask', params)
          console.log('setTask', rs);
        } catch (err) {
          console.error(err);
        }
      })
    }
  }
}