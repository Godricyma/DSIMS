import { createStore } from 'vuex'
import storage from './storage'


export default createStore({
  state() {
    return {
        token: '',
        username: '',
    }
  },
  getters: {
    token: state => state.token,
    username: state => state.username
  },
  mutations: {
    saveToken(state, info) {
        state.token = info.token
        state.username = info.username
        storage.set("token", info);
    },
    delToken(state) {
        state.token = ''
        state.username = ''
    }
  }
})

