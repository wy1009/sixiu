import axios from 'axios'
import store from '../../store'

axios.defaults.baseURL = 'http://localhost:8080/App/'

const ds = {
  getUserInfo() {
    return axios({
      method: 'post',
      url: 'app/mine',
      data: {
        userToken: store.state.userToken,
      },
    })
  },
  login(params) {
    return axios({
      method: 'post',
      url: 'user/login',
      data: params,
    })
  },
  // 首页信息
  getHomeList() {
    return axios({
      method: 'post',
      url: 'app/home',
      data: {
        userToken: store.state.userToken,
      },
    })
  },
  getClassList() {
    return axios({
      method: 'post',
      url: 'app/class',
      data: {
        userToken: store.state.userToken,
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
        userToken: store.state.userToken,
      },
    })
  },
  getOpinionDetail(params) {
    return axios({
      method: 'post',
      url: 'app/opinion/one',
      data: Object.assign({ userToken: store.state.userToken }, params),
    })
  }
}

export default ds