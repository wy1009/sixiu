<template>
  <article class=".page-homework">
    <section class="section">
      <header class="section-header">作业上传</header>
      <article class="section-content">
        <section class="uploaded">
          <header>已上传</header>
          <ul>
            <li>
              <span>1. 20171223徐晨阳第一次作业.doc</span>
              <a class="del-btn" @click="delHomework">删除</a>
            </li>
            <li>
              <span>1. 20171223徐晨阳社会调研报告.doc</span>
              <a class="del-btn">删除</a>
            </li>
          </ul>
        </section>
        <section class="upload">
          <form @submit="submit($event)">
            <div class="form-item">
              <input type="file">
            </div>
            
            <div class="form-item">
              <label>选择课程</label>
              <br>
              <input type="radio" name="type">思修
              <br>
              <input type="radio" name="type">马原
            </div>

            <button class="form-submit">上传文件</button>
          </form>
        </section>
      </article>
    </section>
  </article>
</template>

<script>
export default {
  methods: {
    submit(e) {
      e.preventDefault()
    },
    delHomework() {
      const res = confirm('确定删除作业吗？')

      if (res) {
        console.log('确定删除')
      } else {
        console.log('取消')
      }
    }
  }
}
</script>


<style lang="postcss" scoped>
@import "../assets/css/section.css";

.section-header {
  background-image: url(../assets/images/icon-homework.png);
}

.uploaded {
  & header {
    margin-top: 20px;
    margin-left: 70px;
  }

  & ul {
    margin-left: 70px;
    & li {
      margin-top: 16px;
      font-size: 14px;

      & .del-btn {
        font-size: 14px;
        color: var(--red);
        margin-left: 20px;
      }
    }
  }
}

.upload {
  margin: 45px 40px 100px;
  background: #f0f0f0;
  padding: 30px;
  font-size: 14px;

  & .form-item {
    margin-bottom: 30px;

    & label {
      color: var(--red);
      font-size: 16px;
    }

    & input[type=radio] {
      margin-top: 20px;
      margin-right: 10px;
    }
  }
}
</style>

