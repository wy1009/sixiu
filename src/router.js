import Router from 'vue-router'
import store from './store'
// 公用
import Login from './pages/Login.vue'
import Container from './pages/Container.vue'
import Password from './pages/Password.vue'
import Home from './pages/Home.vue'
import Lesson from './pages/Lesson.vue'
// 学生
import HomeWork from './pages/Homework.vue'
// 教师
import News from './pages/News.vue'
import Test from './pages/Test.vue'

// 路由
const routes = [{
  name: 'login',
  path: '/login',
  component: Login,
}, {
  path: '/',
  component: Container,
  children: [{
    // 重定向到课程资料 / 课程管理
    path: '',
    // redirect: { name: 'lesson' },/
  }, {
    // 微观点
    name: 'opinion',
    path: 'opinion',
    component: News,
  }, {
    // 微吐槽
    name: 'roast',
    path: 'roast',
    component: News,
  }, {
    // 作业上传
    name: 'homework',
    path: 'homework',
    component: HomeWork,
  }, {
    // 修改密码
    name: 'password',
    path: 'password',
    component: Password,
  }, {
    // 问卷小测
    name: 'test',
    path: 'test',
    component: Test,
  }, {
    // 课程资料 / 课程管理
    name: 'home',
    path: 'home',
    component: Home,
  }, {
    // 课程资料 / 课程管理
    name: 'lesson',
    path: 'lesson/:id',
    component: Lesson,
    props: true,
  }, {
    // 添加课程
    name: 'lessonAdd',
    path: 'lesson/add',
    // component: LessonAdd,
  }],
}]

const router = new Router({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  }

  if (!store.state.userInfo.username) {
    next({ name: 'login' })
  }
  next()
})

export default router