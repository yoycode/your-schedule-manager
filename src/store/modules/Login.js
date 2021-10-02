const axios = require('axios');

export const Login = {
  namespaced: true,
  state: () => ({

  }),
  mutations: {

  },
  getters: {

  },
  actions: {
    test({ commit, dispatch }, params) {
      return new Promise(async (resolve, reject) => {
        try {
          const rs = axios.post('/api/user/register', params)
          console.log(rs);
          // await this.$axios.post
        } catch (err) {
          console.error(err);
        }
      })
    },
    getList({ commit, dispatch }) {
      return new Promise(async (resolve, reject) => {
        try {
          const rs = axios.post('/api/user/getList');
        } catch (err) {
          console.error(err)
        }
      })
    }

  }
}