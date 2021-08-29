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

  }
}