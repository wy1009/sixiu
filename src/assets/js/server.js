import axios from 'axios'
import store from '../../store'

axios.defaults.baseURL = 'https://10.3.240.18:9000/App/'

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
  getCourseList() {
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
  delNews(type, params) {
    return axios({
      method: 'post',
      url: `/app/${type}/delete`,
      data: Object.assign({
        userToken: store.state.userToken,
      }, params),
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
  addOpinion(params) {
    return axios({
      method: 'post',
      url: 'app/opinion/upload',
      data: params,
    })
  }
}

export default ds