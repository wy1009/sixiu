<template>
  <div class="page-container">
    <aside>
      <h1>
        <img src="../assets/images/logo.png" alt="北邮马院">
      </h1>
      <ul class="nav">
        <li class="nav-item" :class="$route.name === 'lesson' ? 'active' : ''">
          <router-link class="nav-link" :to="{ name: 'lesson' }">课程资料</router-link>
        </li>
        <li class="nav-item" :class="$route.name === 'homework' ? 'active' : ''">
          <router-link class="nav-link" :to="{ name: 'homework' }">作业上传</router-link>
        </li>
      </ul>
      <ul class="nav">
        <li class="nav-item" :class="$route.name === 'lesson' ? 'active' : ''">
          <router-link class="nav-link" :to="{ name: 'lesson' }">课程管理</router-link>
          <ul class="second-nav">
            <li class="second-nav-item"><a>思修一班</a></li>
            <li class="second-nav-item"><a>思修二班</a></li>
            <li class="second-nav-item"><a>添加课程</a></li>
          </ul>
        </li>
        <li class="nav-item" :class="$route.name === 'test' ? 'active' : ''">
          <router-link class="nav-link" :to="{ name: 'test' }">问卷小测</router-link>
        </li>
        <li class="nav-item" :class="$route.name === 'opinion' || $route.name === 'roast' ? 'active' : ''">
          <router-link class="nav-link" :to="{ name: 'opinion' }">课间消息</router-link>
          <ul class="second-nav">
            <li class="second-nav-item" :class="$route.name === 'opinion' ? 'active' : ''">
              <router-link :to="{ name: 'opinion' }">微观点</router-link>
            </li>
            <li class="second-nav-item" :class="$route.name === 'roast' ? 'active' : ''">
              <router-link :to="{ name: 'roast' }">微吐槽</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
    <div class="main">
      <header>
        欢迎登录 徐晨阳 注销
      </header>
      <router-view></router-view>
    </div>
    <footer>
      <p>版权所有 北京邮电大学马克思主义学院</p>
      <address>地址：北京市海淀区西土城路10号 邮编：100876</address>
    </footer>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('aaa')
  }
}
</script>


<style lang="postcss" scoped>
@import "../assets/css/section.css";

.page-container {
  display: flex;
  flex-flow: row wrap;
  & aside {
    flex-basis: 200px;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, .1);
    float: left;

    & h1 {
      width: 100px;
      margin: 20px auto;
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
          font-size: 14px;
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
