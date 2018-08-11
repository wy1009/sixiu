import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.1.103:9000/App/'

let userToken = localStorage['sixiuUserToken']
let userAuth = localStorage['sixiuUserAuth']

const ds = {
  getUserInfo() {
    return axios({
      method: 'post',
      url: 'app/mine',
      data: {
        userToken,
      },
    })
  },
  login(params) {
    return axios({
      method: 'post',
      url: 'user/login',
      data: params,
    }).then(({ data }) => {
      if (data.success) {
        userToken = localStorage['sixiuUserToken'] = data.data.userToken
        userAuth = localStorage['sixiuUserAuth'] = data.data.userAuth
      }
    })
  },
  // 首页信息
  getHomeList() {
    return axios({
      method: 'post',
      url: 'app/home',
      data: {
        userToken,
      },
    })
  }
}

export default ds