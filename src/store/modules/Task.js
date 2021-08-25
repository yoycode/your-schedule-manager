export const Task = {
  namespaced: true,
  state: () => ({
    taskList: [],
  }),
  mutations: {
    SET_TASK_LIST(state, payload) {
      console.log('SET_TASK_LIST');
      state.taskList = payload;
    }
  },
  getters: {
    GET_TASK_LIST(state) {
      console.log('GET_TASK_LIST');
      return state.taskList;
    }
  },
  actions: {

  }
}