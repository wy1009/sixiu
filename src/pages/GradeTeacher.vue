<template>
  <article class="page-grade-teacher">
    <section class="section grade">
      <header class="section-header">成绩统计</header>
      <dl class="grade-list">
        <grade-item-teacher
          v-for="item in grade.list"
          :key="item.courseid"
          :grade="item"
        ></grade-item-teacher>
        <p v-if="grade.list && !grade.list.length">暂无班级</p>
      </dl>
    </section>
  </article>
</template>

<script>
import GradeItemTeacher from '../components/GradeItemTeacher.vue'
import ds from '../assets/js/server'

export default {
  data() {
    return {
      grade: {},
    }
  },
  mounted() {
    this.getGradeList()
  },
  watch: {
    '$route': function () {
      this.getGradeList()
    }
  },
  methods: {
    getGradeList() {
      ds.getGradeList().then(({ data }) => {
        if (data.success) {
          this.grade = data.data.list.find((item) => {
            return item.courseid === this.$route.params.id
          })
        }
      })
    },
  },
  components: {
    GradeItemTeacher,
  }
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/section.css';

.grade-list {
  padding: 20px 40px;
}
</style>
