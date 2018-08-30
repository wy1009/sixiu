<template>
  <article class="page-roast">
    <section class="section">
      <header class="section-header">微吐槽</header>
      <ul class="roast-list">
        <li class="roast-item" v-for="item in roastList" :key="item.roastId">
          <div class="user">
            <div class="avatar"><img :src="item.userImageUrl" alt="用户头像"></div>
            <div class="name">{{ item.userName }}</div>
            <div class="anonymous" v-if="item.anonymous">匿名</div>
          </div>
          <div class="content">
            <p>{{ item.content }}</p>
            <img class="content-img" :src="item.contentImageUrl" alt="吐槽配图">
            <footer class="content-info clearfix">
              <div class="time">{{ item.time }}</div>
              <a class="del" v-if="item.isRoastOwner" @click="del(item.roastId)">删除</a>
              <div class="like">
                {{ item.followNum }}
                <a v-if="item.followStatus"><img src="../assets/images/like-active.png" alt="点击取消赞"></a>
                <a v-else><img src="../assets/images/like.png" alt="点击点赞"></a>
              </div>
            </footer>
          </div>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server'

export default {
  data() {
    return {
      roastList: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      ds.getNewsList('roast').then(({ data }) => {
        if (data.success) {
          this.roastList = data.data.roastList
        }
      })
    },
    del(id) {
      ds.delNews('roast', { id }).then(({ data }) => {
        if (data.success) {
          this.getList()
        }
      })
    },
  },
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/section.css';

.roast-list {
  padding: 20px 40px;

  & .roast-item {
    border-bottom: 1px solid #ededed;
    padding-top: 20px;
    padding-bottom: 10px;

    &:last-child {
      border-bottom: none;
    }

    & .user {
      float: left;

      & .avatar {
        width: 80px;
        height: 80px;
        overflow: hidden;

        & img {
          width: 100%;
          height: 100%;
        }
      }

      & .name {
        text-align: center;
        margin-top: 10px;
      }

      & .anonymous {
        width: 30px;
        line-height: 18px;
        text-align: center;
        border: 1px solid var(--red);
        color: var(--red);
        border-radius: 4px;
        margin: 4px auto;
      }
    }

    & .content {
      margin-left: 100px;

      & .content-img {
        display: block;
        max-width: 90%;
        margin-top: 10px;
      }

      & footer.content-info {
        color: #acacac;
        font-size: 12px;
        margin-top: 10px;

        & .time,
        & .del {
          float: left;
          margin-right: 20px;
        }

        & .like {
          float: right;

          & a {
            display: inline-block;
            width: 15px;
            height: 15px;
            vertical-align: bottom;
            margin-left: 6px;
          }

          & img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>

