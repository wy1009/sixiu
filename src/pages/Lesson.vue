<template>
  <article class="page-lesson">
    <section class="section ppt" v-for="section in lessonList" :key="section.title">
      <header class="section-header">{{ section.title }}</header>
      <ul class="lesson-list">
        <template v-if="section.list.length">
          <li v-for="item in section.list" :key="item.id">
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
import ds from '../assets/js/server'

export default {
  props: ['id'],
  data() {
    return {
      lessonList: [],
    }
  },
  mounted() {
    this.getLessonList()
  },
  watch: {
    '$route' (to, from) {
      this.getLessonList()
    }
  },
  methods: {
    del() {
      const res = confirm('确定删除吗？')
      if (res) {
        // 删除项目
      }
    },
    getLessonList() {
      console.log(this.id)
      if (this.id) {
        ds.getCourseList().then(({ data }) => {
          this.lessonList = data.data.classdetail.find((lesson) => {
            return lesson.courseid === this.id
          })
          debugger
          console.log(this)
          console.log(this.lessonList)
        })
      } else {
        ds.getHomeList().then(({ data }) => {
          if (data.success) {
            this.lessonList = data.data.homelist
          }
        })
      }
    }
  },
}
</script>


<style lang="postcss" scoped>
@import "../assets/css/section.css";

.section {
  &.ppt {
    & .section-header {
      background-image: url(../assets/images/icon-ppt.png);
    }
  }

  &.audio {
    & .section-header {
      background-image: url(../assets/images/icon-audio.png);
    }
  }

  &.video {
    & .section-header {
      background-image: url(../assets/images/icon-video.png);
    }
  }

  & .lesson-list {
    margin: 20px 70px;

    & li {
      margin-top: 18px;

      &:first-child {
        margin-top: 0;
      }

      & .del-btn {
        font-size: 14px;
        color: var(--red);
        margin-left: 20px;
      }
    }
  }
}
</style>
