import axios from 'axios'

axios.defaults.baseURL = 'https://api.example.com/'

const ds = {
  getUserInfo() {
    return axios({
      method: 'get',
      url: 'app/mine',
    }).then(() => {

    })
  },
  login(params) {
    return axios({
      method: 'post',
      url: 'user/login',
      data: params,
    }).then(() => {

    })
  }
}

export default ds