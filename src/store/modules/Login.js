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
          console.log(params);
          console.log(axios);
          const rs = axios.post('/api/user/register', params)
          console.log(rs);
          // await this.$axios.post
        } catch{
          console.error(err);
        }
      })
    }

  }
}