const axios = require('axios');

export const Login = {
  namespaced: true,
  state: () => ({
    name: '',
  }),
  mutations: {
    SET_NAME(state, payload) {
      state.name = payload
    }
  },
  getters: {
    GET_NAME(state) {
      return state.name;
    }
  },
  actions: {
    test({ commit, dispatch }, param) {
      return new Promise(async (resolve, reject) => {
        try {
          const rs = await axios.post('/api/user/register', param)
        } catch (err) {
          console.error(err);
        }
      })
    },
    getList({ commit, dispatch }) {
      return new Promise(async (resolve, reject) => {
        try {
          const rs = await axios.post('/api/user/getList');
        } catch (err) {
          console.error(err)
        }
      })
    },
    login({ commit, dispatch }, param) {
      return new Promise(async (resolve, reject) => {
        try {
          const rs = await axios.post('/api/user/login', param)
          commit('SET_NAME', param.name)
        } catch (err) {
          console.error(err);
        }
      })
    },
    logout({ commit, dispatch }, param) {
      return new Promise(async (resolve, reject) => {
        try {
          const rs = await axios.post('/api/user/logout', param)
        } catch (err) {
          console.error(err);
        }
      })
    }

  }
}