<template>
  <article class="page-news">
    <section class="section news">
      <header class="section-header">
        微观点
        <a class="border-btn" v-if="status === 'list' && ['teacher', 'root'].indexOf($store.state.userInfo.usertype) !== -1" @click="toggleStatus('add')">添加</a>
        <a class="border-btn" v-if="status === 'add'" @click="toggleStatus('list')">取消</a>
        <a class="border-btn" v-if="status === 'detail'" @click="toggleStatus('list')">返回</a>
      </header>
      <!-- 展示消息部分 -->
      <article class="part-display" v-if="status === 'list'">
        <ul>
          <li class="news" v-for="item in list" :key="item[`${$route.name}Id`]">
            <a class="del" v-if="['teacher', 'root'].indexOf($store.state.userInfo.usertype) !== -1" @click="del(item.opinionId || item.roastId)">-</a>
            <div class="time">
              <span class="month">{{ new Date(parseInt(item.uploadDate, 10)).getMonth() + 1 }}月</span>
              <span class="date">{{ new Date(parseInt(item.uploadDate, 10)).getDate() }}</span>
            </div>
            <a class="title" @click="$route.name === 'opinion' && showDetail(item.opinionId)">
              <div class="name">{{ item.title }}</div>
              <div class="publisher">发布者：{{ item.userName }}</div>
            </a>
          </li>
        </ul>
      </article>
      <!-- 展示详情部分 -->
      <article class="part-detail" v-if="status === 'detail'">
        <header class="detail-title">
          {{ detail.title }}
        </header>
        <div class="author clearfix">
          <div class="avator"><img :src="detail.photoUrl" alt="作者头像"></div>
          <div class="name">{{ userName }}</div>
          <div class="time">发布时间 {{ new Date(parseInt(detail.uploadDate, 10)).getFullYear() }} 年 {{ new Date(parseInt(detail.uploadDate, 10)).getMonth() + 1 }} 月 {{ new Date(parseInt(detail.uploadDate, 10)).getDate() }} 日</div>
        </div>
        <p class="content">
          {{ detail.content }}

          <img v-if="detail.imageUrl" :src="detail.imageUrl" alt="观点配图">
        </p>
      </article>
      <!-- 添加消息部分 -->
      <article class="part-add" v-if="status === 'add'">
        <form @submit="submit($event)">
          <div class="form-item title">
            <label>添加标题</label>
            <input class="form-input" type="text" name="title">
          </div>
          <div class="form-item image">
            <label>
              添加图片
            </label>
            <ul class="img-list">
              <input type="file" name="image">
            </ul>
          </div>
          <div class="form-item content">
            <label>内容</label>
            <textarea name="content"></textarea>
          </div>
          <div class="form-item">
            <button class="form-submit">发布</button>
          </div>
        </form>
      </article>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server'

export default {
  data() {
    return {
      status: 'list', // list - 列表，detail - 详情，add - 添加
      list: [],
      detail: {}, // 目前需展示的detail的内容
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      ds.getNewsList(this.$route.name).then(({ data }) => {
        if (data.success) {
          this.list = data.data[`${this.$route.name}List`]
        }
      })
    },
    toggleStatus(status) {
      this.status = status
    },
    del(id) {
      const res = confirm('确定删除吗？')
      if (res) {
        // 删除微观点
        ds.delNews(this.$route.name, { opinionId: id }).then(({ data }) => {
          if (data.success) {
            this.getList()
          } else {
            alert(data.errorMsg)
          }
        })
      }
    },
    showDetail(opinionId) {
      ds.getOpinionDetail({ opinionId }).then(({ data }) => {
        if (data.success) {
          this.detail = data.data
          this.toggleStatus('detail')
        }
      })
    },
    submit(e) {
      e.preventDefault()
      const form = e.target
      let formData = new FormData()
      formData.append('title', form.title.value)
      formData.append('file', form.image.files[0])
      formData.append('content', form.content.value)
      formData.append('userToken', this.$store.state.userToken)

      ds.addNews('opinion', formData).then(({ data }) => {
        if (data.success) {
          this.getList()
          this.toggleStatus('list')
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "../assets/css/section.css";

.part-display {
   margin: 0 40px;
  & li.news {
    & .del {
      float: left;
      width: 14px;
      height: 14px;
      border: 1px solid var(--red);
      border-radius: 50%;
      line-height: 12px;
      text-align: center;
      color: var(--red);
      margin-top: 26px;
      margin-right: 26px;
    }

    & .time {
      float: left;
      width: 50px;
      height: 40px;
      border: 2px solid var(--red);
      border-radius: 4px;
      position: relative;
      margin-top: 15px;
      margin-right: 10px;
      color: var(--red);

      & .month {
        position: absolute;
        left: 2px;
        top: 0;
      }

      & .date {
        position: absolute;
        right: 2px;
        bottom: 0;
        font-size: 18px;
      }
    }

    & .title {
      display: block;
      padding: 15px 0;
      border-bottom: 1px solid #ededed;
      min-height: 50px;

      & .name {
        margin-left: 106px;
        font-size: 16px;
      }

      & .publisher {
        color: #7a7a7a;
        margin-left: 106px;
        margin-top: 6px;
      }
    }

    &:nth-child(odd) {
      & .time {
        background-color: var(--red);
        color: #fff;
      }
    }
  }
}

.part-add {
  padding: 0 80px 40px;

  & .form-item.title {
    display: flex;

    & label {
      flex-basis: 90px;
      float: left;
    }

    & .form-input {
      flex: auto;
    }
  }

  & .form-item.image {
    & label {
      display: inline-block;
      width: 90px;
    }

    & .img-list {
      margin-top: 20px;
      padding: 16px 10px;
      background: #f0f0f0;

      & .del-btn {
        margin-left: 20px;
        color: var(--red);
      }
    }
  }

  & .form-item.content {
    & textarea {
      margin-top: 20px;
      width: 100%;
      height: 240px;
      background: #f0f0f0;
      padding: 6px;
      box-sizing: border-box;
    }
  }
}

.part-detail {
  padding: 20px 40px;
  & .detail-title {
    font-size: 20px;
    font-weight: bold;
  }

  & .author {
    margin-top: 20px;
    & .avator {
      width: 30px;
      height: 30px;
      float: left;
      & img {
        width: 100%;
        height: 100%;
      }
    }

    & .name,
    & .time {
      float: left;
      color: #888888;
      line-height: 30px;
      margin-left: 10px;
    }
  }

  & .content {
    margin-top: 20px;
    line-height: 30px;
    white-space: pre-wrap;

    & img {
      display: block;
      margin-top: 20px;
      max-width: 25%;
    }
  }
}
</style>
