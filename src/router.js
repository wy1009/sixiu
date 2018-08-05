import Router from 'vue-router'
// 公用
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Password from './pages/Password.vue'
import Data from './pages/Data.vue'
// 学生
import HomeWork from './pages/Homework.vue'
// 教师
import News from './pages/News.vue'
import Test from './pages/Test.vue'
import Lesson from './pages/Lesson.vue'

// 路由
const routes = [{
  name: 'login',
  path: '/login',
  component: Login,
}, {
  name: 'home',
  path: '/',
  component: Home,
  children: [{
    name: 'opinion',
    path: 'news/opinion',
    component: News,
  }, {
    name: 'suggestion',
    path: 'news/suggestion',
    component: News,
  }, {
    name: 'homework',
    path: 'homework',
    component: HomeWork,
  }, {
    name: 'data',
    path: '',
    component: Data,
  }, {
    name: 'password',
    path: 'password',
    component: Password,
  }, {
    name: 'test',
    path: 'test',
    component: Test,
  }, {
    name: 'lesson',
    path: 'lesson',
    component: Lesson,
  }],
}]

const router = new Router({
  routes,
})

export default router