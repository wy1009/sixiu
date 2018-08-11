<template>
  <article class="page-news">
    <section class="section">
      <header class="section-header">
        微{{ $route.name === 'opinion' ? '观点' : '吐槽' }}
        <a class="border-btn" v-if="status === 'list'" @click="toggleStatus('add')">添加</a>
        <a class="border-btn" v-if="status === 'add'" @click="toggleStatus('list')">取消</a>
        <a class="border-btn" v-if="status === 'detail'" @click="toggleStatus('list')">返回</a>
      </header>
      <!-- 展示消息部分 -->
      <article class="part-display" v-if="status === 'list'">
        <ul>
          <li class="news" v-for="item in list" :key="item[`${$route.name}Id`]">
            <a class="del" @click="del">-</a>
            <div class="time">
              <span class="month">{{ new Date(parseInt(item.uploadDate, 10)).getMonth() + 1 }}月</span>
              <span class="date">{{ new Date(parseInt(item.uploadDate, 10)).getDate() }}</span>
            </div>
            <a class="title" @click="showDetail(item.opinionId)">
              <div class="name">{{ item.title }}</div>
              <div class="publisher">发布者：{{ item.userName }}</div>
            </a>
          </li>
        </ul>
      </article>
      <!-- 展示详情部分 -->
      <article class="part-detail" v-if="status === 'detail'">
        <header>
          走进伟人马克思，奏响论文三部曲——马克思主义学院成功举办“青马油新”学术讲座
        </header>
        <div class="author">
          <div class="avator"></div>
          <div class="name">麻阳</div>
          <div class="time">发布时间 2018 年 06 月 07 日 12:00</div>
        </div>
        <p class="content">
          {{ detail.content }}
        </p>
      </article>
      <!-- 添加消息部分 -->
      <article class="part-add" v-if="status === 'add'">
        <form>
          <div class="form-item title">
            <label>添加标题</label>
            <input class="form-input" type="text">
          </div>
          <div class="form-item image">
            <label>
              添加图片
            </label>
            <a class="border-btn">选择</a>
            <ul class="img-list">
              <li>视察图片1.jpg<a class="del-btn">删除</a></li>
              <li>视察图片1.jpg<a class="del-btn">删除</a></li>
            </ul>
          </div>
          <div class="form-item content">
            <label>内容</label>
            <textarea></textarea>
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
      detail: '', // 目前需展示的detail的内容
    }
  },
  mounted() {
    ds.getNewsList(this.$route.name).then(({ data }) => {
      if (data.success) {
        this.list = data.data[`${this.$route.name}List`]
      }
    })
  },
  methods: {
    toggleStatus(status) {
      this.status = status
    },
    del() {
      const res = confirm('确定删除吗？')
      if (res) {
        // 删除微观点/微吐槽
      }
    },
    showDetail(opinionId) {
      ds.getOpinionDetail({ opinionId }).then(({ data }) => {
        if (data.success) {
          this.detail = data.data
          this.toggleStatus('detail')
        }
      })
    }
  }
}
</script>


<style lang="postcss" scoped>
@import "../assets/css/section.css";

.section-header {
  background-image: url(../assets/images/icon-news.png);

  & .border-btn {
    float: right;
  }
}

.border-btn {
  font-size: 12px;
  line-height: 18px;
  border: 1px solid var(--red);
  border-radius: 9px;
  padding: 0 4px;
  color: var(--red);
}

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
        font-size: 14px;
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

      & .publisher {
        font-size: 14px;
        color: #7a7a7a;
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
      font-size: 14px;

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
</style>

