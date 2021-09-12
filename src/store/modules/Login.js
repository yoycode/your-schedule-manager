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
      return new Promise((resolve, reject) => {
        try {
          console.log(params);
        } catch{
          console.error(err);
        }
      })
    }

  }
}