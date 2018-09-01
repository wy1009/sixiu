import axios from 'axios'
import store from '../../store'

axios.defaults.baseURL = 'https://szk.bupt.edu.cn/App/'
// axios.defaults.baseURL = 'https://10.3.240.18:9000/App/'

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
  logout() {
    return axios({
      method: 'post',
      url: 'user/logout',
      data: {
        userToken: store.state.userToken,
      },
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
  getCourseList() {
    return axios({
      method: 'post',
      url: 'app/class',
      data: {
        userToken: store.state.userToken,
      },
    })
  },
  searchCourseList() {
    return axios({
      method: 'post',
      url: 'app/courseclass/addreq',
      data: {
        userToken: store.state.userToken,
      },
    })
  },
  submitCourseClass(params) {
    return axios({
      method: 'post',
      url: '/app/courseclass/add',
      data: Object.assign({ userToken: store.state.userToken }, params),
    })
  },
  submitFile(type, params) {
    return axios({
      method: 'post',
      url: `file/upload/${type}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: params,
    })
  },
  delFile(params) {
    return axios({
      method: 'post',
      url: 'file/delete',
      data: Object.assign({ userToken: store.state.userToken }, params),
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
  addNews(type, params) {
    return axios({
      method: 'post',
      url: `app/${type}/upload`,
      data: params,
    })
  },
  delNews(type, params) {
    return axios({
      method: 'post',
      url: `/app/${type}/delete`,
      data: Object.assign({ userToken: store.state.userToken }, params),
    })
  },
  getOpinionDetail(params) {
    return axios({
      method: 'post',
      url: 'app/opinion/one',
      data: Object.assign({ userToken: store.state.userToken }, params),
    })
  },
  getGradeList() {
    return axios({
      method: 'post',
      url: '/app/mine/grade',
      data: {
        userToken: store.state.userToken
      },
    })
  },
  changePassword(params) {
    return axios({
      method: 'post',
      url: 'app/mine/passwordchange',
      data: Object.assign({ userToken: store.state.userToken }, params),
    })
  },
}

export default ds
