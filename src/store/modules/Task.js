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

  }
}