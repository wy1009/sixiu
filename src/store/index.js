import Vue from 'vue'
import Vuex from 'vuex'
import ds from '../assets/js/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userType: '',
    userToken: '',
  },
  mutations: {
    setUserType(state, userType) {
      state.userType = userType
    },
    setUserToken(state, userToken) {
      state.userToken = userToken
    }
  },
  actions: {
    login(context, params) {
      return ds.login(params).then(({ data }) => {
        if (data.success) {
          context.commit('setUserType', data.data.userAuth)
          context.commit('setUserToken', data.data.userToken)
        }
        return data
      })
    },
  }
})