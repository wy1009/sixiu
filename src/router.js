import Router from 'vue-router'
// 公用
import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Password from './pages/Password.vue'
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
  name: 'home',
  path: '/',
  component: Home,
  children: [{
    // 重定向到课程资料 / 课程管理
    path: '',
    redirect: { name: 'lesson' },
  }, {
    // 重定向到微观点
    path: 'news',
    redirect: { name: 'opinion' },
  }, {
    // 微观点
    name: 'opinion',
    path: 'news/opinion',
    component: News,
  }, {
    // 微吐槽
    name: 'roast',
    path: 'news/roast',
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
    name: 'lesson',
    path: 'lesson',
    component: Lesson,
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

export default router