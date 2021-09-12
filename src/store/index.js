import { createStore } from 'vuex'
import { TimeTable } from '@/store/modules/TimeTable'
import { Task } from '@/store/modules/Task'
import { Login } from '@/store/modules/Login'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    TimeTable,
    Task,
    Login,
  }
})
