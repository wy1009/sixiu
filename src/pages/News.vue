<template>
  <article class="page-news">
    <section class="section">
      <header class="section-header">
        微观点
        <a class="border-btn" v-if="status === 'display'" @click="toggleStatus('add')">添加</a>
        <a class="border-btn" v-else @click="toggleStatus('display')">取消</a>
      </header>
      <!-- 展示消息部分 -->
      <div class="part-display" v-if="status === 'display'">
        <ul>
          <li class="news">
            <a class="del">-</a>
            <div class="time">
              <span class="month">6月</span>
              <span class="date">24</span>
            </div>
            <div class="title">
              <div class="name">中国共产党北京邮电大学马克思主义学院党员大会顺利召开</div>
              <div class="publisher">发布者：徐晨阳</div>
            </div>
          </li>
          <li class="news">
            <a class="del">-</a>
            <div class="time">
              <span class="month">6月</span>
              <span class="date">24</span>
            </div>
            <div class="title">
              <div class="name">中国共产党北京邮电大学马克思主义学院党员大会顺利召开</div>
              <div class="publisher">发布者：徐晨阳</div>
            </div>
          </li>
          <li class="news">
            <a class="del">-</a>
            <div class="time">
              <span class="month">6月</span>
              <span class="date">24</span>
            </div>
            <div class="title">
              <div class="name">中国共产党北京邮电大学马克思主义学院党员大会顺利召开</div>
              <div class="publisher">发布者：徐晨阳</div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 添加消息部分 -->
      <div class="part-add" v-if="status === 'add'">
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
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      status: 'display',
    }
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    toggleStatus(status) {
      this.status = status
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

