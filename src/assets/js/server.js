import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.43.187:9000/App/'

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
  },
  getClassList() {
    return axios({
      method: 'post',
      url: 'app/class',
      data: {
        userToken,
      },
    })
  },
  submitHomework(params) {
    return axios({
      method: 'post',
      url: 'file/upload/student',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: params,
    })
  },
  getNewsList(type) {
    return axios({
      method: 'post',
      url: `app/${type}/all`,
      data: {
        userToken,
      },
    })
  },
  getOpinionDetail(params) {
    return axios({
      method: 'post',
      url: 'app/opinion/one',
      data: Object.assign({ userToken }, params),
    })
  }
}

export default ds