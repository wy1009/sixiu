<template>
  <article class="page-lesson">
    <section class="section ppt">
      <header class="section-header">PPT列表</header>
      <ul class="home-list">
        <template v-if="lessonDetail.ppturllist && lessonDetail.ppturllist.length">
          <li v-for="item in lessonDetail.ppturllist" :key="item.id">
            <a :href="item.downloadurl">{{ item.name }}</a>
            <a class="del-btn" v-if="$store.state.userInfo.usertype === 'teacher'" @click="del">删除</a>
          </li>
        </template>
        <li v-else>暂无</li>
      </ul>
    </section>
    <section class="section ppt">
      <header class="section-header">上传列表</header>
      <ul class="home-list">
        <template v-if="lessonDetail.uploadlist && lessonDetail.uploadlist.length">
          <li v-for="item in lessonDetail.uploadlist" :key="item.id">
            <a :href="item.downloadurl">{{ item.name }}</a>
            <a class="del-btn" v-if="$store.state.userInfo.usertype === 'teacher'" @click="del">删除</a>
          </li>
        </template>
        <li v-else>暂无</li>
      </ul>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server.js'

export default {
  props: ['id'],
  data() {
    return {
      lessonDetail: [],
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
          this.lessonDetail = data.data.classdetail.find((lesson) => {
            return lesson.courseid === this.id
          })
        }
      })
    },
  },
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/listInSection.css';
</style>
