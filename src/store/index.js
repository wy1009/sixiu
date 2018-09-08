import Vue from 'vue'
import Vuex from 'vuex'
import ds from '../assets/js/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    userToken: '',
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setUserToken(state, userToken) {
      state.userToken = userToken
    }
  },
  actions: {
    async login(context, params) {
      const { data } = await ds.login(params)
      if (data.success) {
        context.commit('setUserToken', data.data.userToken)
        window.localStorage.sixiuUserToken = data.data.userToken
      }
      await context.dispatch('getUserInfo')
      return data
    },
    getUserInfo(context) {
      return ds.getUserInfo().then(({ data }) => {
        if (data.success) {
          context.commit('setUserInfo', data.data)
        }
      })
    },
    setUserToken(context, userToken) {
      context.commit('setUserToken', userToken)
    },
  }
})
