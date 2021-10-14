const axios = require('axios');

export const Task = {
  namespaced: true,
  state: () => ({
    taskList: [],
    appliedTask: [],
  }),
  mutations: {
    SET_TASK_LIST(state, payload) {
      state.taskList = payload;
    },
    SET_APPLIED_TASK(state, payload) {
      state.appliedTask = payload;
    }
  },
  getters: {
    GET_TASK_LIST(state) {
      return state.taskList;
    },
    GET_APPLIED_TASK(state) {
      return state.appliedTask;
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
    applyTask({ commit, dispatch }, param) {
      return new Promise(async (resolve, reject) => {
        try {
          // console.log("apply task param", param);
          const rs = await axios.post('/api/task/applyTask', param);
          // console.log(rs);
          if (param.applied) {
            commit('SET_APPLIED_TASK', param)
          }
          resolve(rs);
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
    },
    deleteTask({ commit, dispatch }, param) {
      return new Promise(async (resolve, reject) => {
        try {
          const rs = await axios.post('/api/task/deleteTask', param);
          resolve(rs);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      })
    }
  }
}