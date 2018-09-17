<template>
  <article class=".page-homework">
    <section class="section">
      <header class="section-header">作业上传</header>
      <article class="section-content">
        <section class="uploaded">
          <header>已上传</header>
          <ul>
            <li v-for="(item, index) in homeworkList" :key="item.id">
              <a @click="downloadFile(item.downloadurl, item.name)"><span>{{ index + 1 }}. {{ item.name }}</span></a>
              <a class="del-btn" @click="delHomework(item.id)">删除</a>
            </li>
          </ul>
        </section>
        <section class="upload">
          <form @submit="submit($event)">
            <div class="form-item">
              <input type="file" name="file">
            </div>

            <div class="form-item">
              <label>选择课程</label>
              <ul>
                <li v-for="item in classList" :key="item.courseid">
                  <input type="radio" name="courseId" :value="item.courseid">{{ item.courseclassname }}
                </li>
              </ul>
            </div>

            <button class="form-submit">上传文件</button>
          </form>
        </section>
      </article>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server'
import { download } from '../assets/js/util.js'

export default {
  data() {
    return {
      homeworkList: [],
      classList: [],
    }
  },
  mounted() {
    this.getCourseList()
  },
  methods: {
    getCourseList() {
      ds.getCourseList().then(({ data }) => {
        if (data.success) {
          let homeworkList = []
          data.data.classdetail.forEach((course) => {
            homeworkList = homeworkList.concat(course.uploadlist)
          })
          this.homeworkList = homeworkList
          this.classList = data.data.courseClasses
        }
      })
    },
    submit(e) {
      e.preventDefault()

      const form = e.currentTarget

      let formData = new FormData()

      formData.append('userToken', this.$store.state.userToken)
      formData.append('courseId', form.courseId.value)
      formData.append('file', form.file.files[0])
      formData.append('name', form.file.files[0].name)

      ds.submitFile('student', formData).then(({ data }) => {
        if (data.success) {
          this.getCourseList()
          alert('上传成功！')
        } else {
          alert(data.errorMsg)
        }
      })
    },
    delHomework(id) {
      const res = confirm('确定删除作业吗？')

      if (res) {
        ds.delFile({ id: [id] }).then(() => {
          this.getCourseList()
        })
      }
    },
    downloadFile(url, name) {
      download(url, name)
    },
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

      & .del-btn {
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

