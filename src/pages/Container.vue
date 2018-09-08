<template>
  <div class="page-container">
    <div class="wrapper">
      <aside>
        <h1>
          <img src="../assets/images/logo.png" alt="北邮马院">
        </h1>
        <!-- 学生 -->
        <ul class="nav" v-if="$store.state.userInfo.usertype === 'student'">
          <li class="nav-item" :class="['home', 'lesson'].indexOf($route.name) !== -1 && 'active'">
            <router-link class="nav-link" :to="{ name: 'home' }">课程资料</router-link>
            <ul class="second-nav">
              <li class="second-nav-item"
                v-for="item in courseList"
                :class="$route.params.id === item.id && 'active'"
                :key="item.id"
              >
                <router-link :to="{ name: 'lesson', params: { id: item.id } }">{{ item.name }}</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" :class="$route.name === 'homework' && 'active'">
            <router-link class="nav-link" :to="{ name: 'homework' }">作业上传</router-link>
          </li>
          <li class="nav-item" :class="['opinion', 'roast'].indexOf($route.name) !== -1 && 'active'">
            <router-link class="nav-link" :to="{ name: 'opinion' }">课间消息</router-link>
            <ul class="second-nav">
              <li class="second-nav-item" :class="$route.name === 'opinion' && 'active'">
                <router-link :to="{ name: 'opinion' }">微观点</router-link>
              </li>
              <li class="second-nav-item" :class="$route.name === 'roast' && 'active'">
                <router-link :to="{ name: 'roast' }">微吐槽</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" :class="$route.name === 'myGrade' && 'active'">
            <router-link class="nav-link" :to="{ name: 'myGrade' }">我的成绩</router-link>
          </li>
        </ul>
        <!-- 老师 -->
        <ul class="nav" v-if="$store.state.userInfo.usertype === 'teacher'">
          <li class="nav-item" :class="['home', 'lesson', 'lessonAdd'].indexOf($route.name) !== -1 && 'active'">
            <router-link class="nav-link" :to="{ name: 'home' }">课程管理</router-link>
            <ul class="second-nav">
              <li class="second-nav-item"
                v-for="item in courseList"
                :key="item.id"
                :class="$route.params.id === item.id && 'active'"
              >
                <router-link :to="{ name: 'lesson', params: { id: item.id } }">{{ item.name }}</router-link>
              </li>
              <li class="second-nav-item"
                :class="$route.name === 'lessonAdd' && 'active'"
              >
                <router-link :to="{ name: 'lessonAdd' }">添加课程</router-link>
              </li>
            </ul>
          </li>
          <!-- 该版本暂时不做
          <li class="nav-item" :class="$route.name === 'test' && 'active'">
            <router-link class="nav-link" :to="{ name: 'test' }">问卷小测</router-link>
          </li>
          -->
          <li class="nav-item" :class="$route.name === 'grade' && 'active'" v-if="gradeCourseList[0]">
            <router-link class="nav-link" :to="{ name: 'grade', params: { id: gradeCourseList[0].courseid } }">成绩统计</router-link>
            <ul class="second-nav">
              <li class="second-nav-item"
                v-for="item in gradeCourseList"
                :key="item.courseid"
                :class="$route.params.id === item.courseid && 'active'"
              >
                <router-link :to="{ name: 'grade', params: { id: item.courseid } }">{{ item.coursename }}</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" :class="['opinion', 'roast'].indexOf($route.name) !== -1 && 'active'">
            <router-link class="nav-link" :to="{ name: 'opinion' }">课间消息</router-link>
            <ul class="second-nav">
              <li class="second-nav-item" :class="$route.name === 'opinion' && 'active'">
                <router-link :to="{ name: 'opinion' }">微观点</router-link>
              </li>
              <li class="second-nav-item" :class="$route.name === 'roast' && 'active'">
                <router-link :to="{ name: 'roast' }">微吐槽</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" :class="$route.name === 'uploadInfo' && 'active'">
            <router-link class="nav-link" :to="{ name: 'uploadInfo' }">信息导入</router-link>
          </li>
        </ul>
      </aside>
      <article class="main">
        <header>
          欢迎登录 {{ $store.state.userInfo.username }}
          <router-link :to="{ name: 'uploadAvatar' }">更改头像</router-link>
          <router-link :to="{ name: 'password' }">修改密码</router-link>
          <a @click="logout">注销</a>
        </header>
        <router-view></router-view>
      </article>
    </div>
    
    <footer>
      <p>版权所有 北京邮电大学马克思主义学院</p>
      <address>地址：北京市海淀区西土城路10号 邮编：100876</address>
    </footer>
  </div>
</template>

<script>
import ds from '../assets/js/server'

export default {
  data() {
    return {
      courseList: [],
      gradeCourseList: [],
    }
  },
  mounted() {
    this.getCourseList()
    this.getGradeList()
  },
  methods: {
    getCourseList() {
      ds.getCourseList().then(({ data }) => {
        if (data.success) {
          this.courseList = data.data.classdetail
        }
      })
    },
    getGradeList() {
      // 单纯为了取到课程列表，且不敢复用courseList，因为教师端存在我没搞懂的courseclassid和courseid的区别。
      // 别吐槽我，吐槽后端。
      ds.getGradeList().then(({ data }) => {
        if (data.success) {
          this.gradeCourseList = data.data.list
        }
      })
    },
    logout() {
      ds.logout().then(() => {
        window.location.reload()
      })
    },
  }
}
</script>

<style lang="postcss" scoped>
@import "../assets/css/section.css";

.page-container {
  & .wrapper {
    display: flex;
    flex-flow: row nowrap;
    & aside {
      flex: 0 0 200px;
      box-shadow: 4px 0px 4px rgba(0, 0, 0, .1);

      & h1 {
        width: 100px;
        margin: 40px auto 20px;
      }

      & ul.nav {
        width: 130px;
        line-height: 30px;
        margin: 26px auto 0;

        & li.nav-item {
          & a.nav-link {
            display: block;
            border-radius: 15px;
            border: 1px solid var(--red);
            margin-bottom: 10px;
            text-align: center;
            color: var(--red);
          }

          &.active {
            & a.nav-link {
              background: var(--red);
              color: #fff;
            }

            & ul.second-nav {
              display: block;
            }
          }

          & ul.second-nav {
            display: none;
            text-align: center;
            line-height: 1;
            & li.second-nav-item {
              margin-bottom: 10px;

              &.active {
                color: var(--red);
              }
            }
          }
        }
      }
    }

    & .main {
      min-height: 600px;
      flex: auto;
      background-image: url(../assets/images/bg-container.png);
      background-repeat: no-repeat;
      background-size: 100%;
      padding-bottom: 30px;

      & header {
        background: rgba(255, 255, 255, .5);
        padding: 15px 30px;
        text-align: right;
        color: var(--red);
        margin-bottom: 70px;

        & a {
          margin-left: 10px;
        }
      }
    }
  }

  & footer {
    flex-basis: 100%;
    background: #d2d2d2;
    padding: 10px 0;
    & p,
    & address {
      text-align: center;
    }
  }
}
</style>
