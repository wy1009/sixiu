<template>
  <article class="page-roast">
    <toggle-section @toggle-status="toggleStatus($event)" :status="status">
      <!-- title -->
      <template slot="title">微吐槽</template>
      <!-- display -->
      <ul class="roast-list" slot="display">
        <li class="roast-item" v-for="(item, index) in roastList" :key="item.roastId">
          <div class="user">
            <template v-if="item.anonymous">
              <div class="avatar"><img src="../assets/images/unknown.png" alt="你们都不知道我在致敬MysticMessenger哼哼"></div>
              <div class="name">Unknown</div>
              <div class="anonymous">匿名</div>
            </template>
            <template v-else>
              <div class="avatar"><img :src="item.userImageUrl" alt="用户头像"></div>
              <div class="name">{{ item.userName }}</div>
            </template>
          </div>
          <div class="content">
            <p>{{ item.content }}</p>
            <img v-if="item.contentImageUrl" class="content-img" :src="item.contentImageUrl" alt="吐槽配图">
            <footer class="content-info clearfix">
              <div class="time">{{ item.time }}</div>
              <a class="del" v-if="item.isRoastOwner" @click="del(item.roastId)">删除</a>
              <div class="like">
                {{ item.followNum }}
                <a @click="toggleLike('delete', index)" v-if="item.followStatus"><img src="../assets/images/like-active.png" alt="点击取消赞"></a>
                <a @click="toggleLike('add', index)" v-else><img src="../assets/images/like.png" alt="点击点赞"></a>
              </div>
            </footer>
          </div>
        </li>
      </ul>
      <!-- add -->
      <form @submit="submit($event)" slot="add">
        <div class="form-item">
          <label>内容</label>
          <textarea name="content"></textarea>
        </div>
        <div class="form-item">
          <label>配图</label>
          <input type="file" name="image">
        </div>
        <div class="form-item">
          <a class="anonymous"
            v-if="formData.anonymous"
            @click="formData.anonymous = 0"
          >点击解除匿名</a>
          <a class="anonymous"
            v-else
            @click="formData.anonymous = 1"
          >点击匿名</a>
        </div>
        <div class="form-item">
          <button class="form-submit">发表</button>
        </div>
      </form>
    </toggle-section>
  </article>
</template>

<script>
import ds from '../assets/js/server'
import ToggleSection from '../components/ToggleSection.vue'

export default {
  data() {
    return {
      status: 'display',
      roastList: [],
      formData: {
        anonymous: 0,
      },
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
      const res = confirm('确定删除吗？')
      if (res) {
        ds.delNews('roast', { roastId: id }).then(({ data }) => {
          if (data.success) {
            this.getList()
          }
        })
      }
    },
    submit(e) {
      e.preventDefault()

      const form = e.target

      let formData = new FormData()
      formData.append('userToken', this.$store.state.userToken)
      formData.append('content', form.content.value)
      formData.append('file', form.image.files[0])
      formData.append('anonymous', this.formData.anonymous)

      ds.addNews('roast', formData).then(({ data }) => {
        if (data.success) {
          this.getList()
          this.toggleStatus('display')
        }
      })
    },
    toggleStatus(status) {
      this.status = status
    },
    toggleLike(type, index) {
      ds.toggleLike(type, {
        roastId: this.roastList[index].roastId,
      }).then(() => {
        this.getList()
      })
    },
  },
  components: {
    ToggleSection,
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

form {
  & label {
    display: block;
  }

  & textarea {
    margin-top: 10px;
    width: 100%;
    height: 240px;
    background: #f0f0f0;
    padding: 6px;
    box-sizing: border-box;
  }

  & input {
    margin-top: 10px;
  }

  & .anonymous {
    // padding-left: 10px;
  }
}
</style>
