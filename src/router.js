import Router from 'vue-router'
import store from './store'
// 公用
import Login from './pages/Login.vue'
import Container from './pages/Container.vue'
import Password from './pages/Password.vue'
import Home from './pages/Home.vue'
import Lesson from './pages/Lesson.vue'
import Opinion from './pages/Opinion.vue'
import Roast from './pages/Roast.vue'
// 学生
import HomeWork from './pages/Homework.vue'
import GradeStudent from './pages/GradeStudent.vue'
// 教师
import Test from './pages/Test.vue'
import LessonAdd from './pages/LessonAdd.vue'
import UploadInfo from './pages/UploadInfo.vue'
import GradeTeacher from './pages/GradeTeacher.vue'

// 路由
const routes = [{
  name: 'login',
  path: '/login',
  component: Login,
}, {
  path: '/',
  component: Container,
  children: [{
    // 首页
    name: 'home',
    path: '',
    component: Home,
  }, {
    // 微观点
    name: 'opinion',
    path: 'opinion',
    component: Opinion,
  }, {
    // 微吐槽
    name: 'roast',
    path: 'roast',
    component: Roast,
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
    path: 'lesson/:id',
    component: Lesson,
    props: true,
  }, {
    // 添加课程
    name: 'lessonAdd',
    path: 'lesson/add',
    component: LessonAdd,
  }, {
    // 教师查看成绩
    name: 'grade',
    path: 'grade/:id',
    component: GradeTeacher,
  }, {
    // 我的成绩
    name: 'myGrade',
    path: 'grade/mine',
    component: GradeStudent,
  }, {
    // 信息导入
    name: 'uploadInfo',
    path: 'upload',
    component: UploadInfo,
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
    const sixiuUserToken = window.localStorage.sixiuUserToken
    if (sixiuUserToken) {
      store.dispatch('setUserToken', sixiuUserToken)
      store.dispatch('getUserInfo').then(() => {
        if (!store.state.userInfo.username) {
          next({ name: 'login' })
        } else {
          next()
        }
      })
    }
  }
})

export default router