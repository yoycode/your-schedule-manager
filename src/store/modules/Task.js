const axios = require('axios');

export const Task = {
  namespaced: true,
  state: () => ({
    taskList: [],
  }),
  mutations: {
    SET_TASK_LIST(state, payload) {
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
          const rs = await axios.post('/api/task/setTask', params);
          resolve(rs)
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
    },
    getTaskList({ commit, dispatch }, param) {
      return new Promise(async (resolve, reject) => {
        try {
          const rs = await axios.post('/api/task/getTaskList', param)
          commit('SET_TASK_LIST', rs.data.msg);
          resolve(rs);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
    }
  }
}