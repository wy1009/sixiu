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
      }
      await context.dispatch('getUserInfo', {
        userToken: data.data.userToken
      })
      return data
    },
    getUserInfo(context, params) {
      return ds.getUserInfo(params).then(({ data }) => {
        if (data.success) {
          context.commit('setUserInfo', data.data)
        }
      })
    }
  }
})
