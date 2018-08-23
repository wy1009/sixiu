<template>
  <article class="page-lesson">
    <toggle-section>
      <!-- 标题 -->
      <template slot="title">课程PPT</template>
      <!-- 展示部分 -->
      <ul class="home-list" slot="display">
        <template v-if="lessonDetail.ppturllist && lessonDetail.ppturllist.length">
          <li v-for="item in lessonDetail.ppturllist" :key="item.id">
            <a :href="item.downloadurl">{{ item.name }}</a>
            <a class="del-btn" v-if="$store.state.userInfo.usertype === 'teacher'" @click="del">删除</a>
          </li>
        </template>
        <li v-else>暂无</li>
      </ul>
      <!-- 上传部分 -->
      <upload-file slot="add"></upload-file>
    </toggle-section>
    <section class="section ppt">
      <header class="section-header">
        已上传作业
      </header>
      <ul class="home-list">
        <template v-if="lessonDetail.uploadlist && lessonDetail.uploadlist.length">
          <li v-for="item in lessonDetail.uploadlist" :key="item.id">
            <a :href="item.downloadurl">{{ item.name }}</a>
          </li>
        </template>
        <li v-else>暂无</li>
      </ul>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server.js'
import ToggleSection from '../components/ToggleSection.vue'
import UploadFile from '../components/UploadFile.vue'

export default {
  props: ['id'],
  data() {
    return {
      lessonDetail: [],
      status: 'display', // 添加 - add，展示 - display
    }
  },
  watch: {
    '$route': function () {
      this.getLessonDetail()
    }
  },
  mounted() {
    this.getLessonDetail()
  },
  methods: {
    getLessonDetail() {
      ds.getCourseList().then(({ data }) => {
        if (data.success) {
          if (this.$store.state.userInfo.usertype === 'teacher') {
            this.lessonDetail = data.data.classdetail.find((lesson) => {
              return lesson.courseclassid === this.id
            })
          } else {
            this.lessonDetail = data.data.classdetail.find((lesson) => {
              return lesson.courseid === this.id
            })
          }
        }
      })
    },
    toggleStatus(status) {
      this.status = status
    },
    del() {

    }
  },
  components: {
    UploadFile,
    ToggleSection,
  }
}
</script>

<style lang="postcss" scoped>
@import '../assets/css/listInSection.css';
</style>
