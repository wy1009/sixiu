<template>
  <article class="page-grade-student">
    <section class="section">
      <header class="section-header">我的成绩</header>
      <ul class="grade-list">
        <li v-for="item in gradeList" :key="item.courseid">
          <span class="name">{{ item.coursename }}</span>
          <span>{{ item.list[0].grades[0].grade }}</span>
        </li>
        <li v-if="!gradeList.length">暂时还没有成绩哦～</li>
      </ul>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server.js'

export default {
  data() {
    return {
      gradeList: [],
    }
  },
  mounted() {
    ds.getGradeList().then(({ data }) => {
      if (data.success) {
        this.gradeList = data.data.list
      }
    })
  },
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/section.css';

.page-grade-student {
  font-size: 14px;

  & ul.grade-list {
    padding: 0 20px 20px;

    & li {
      margin-top: 14px;
      line-height: 26px;
      border-bottom: 1px solid #f0f0f0;
      padding: 0 50px;

      & .name {
        display: inline-block;
        width: 400px;
      }
    }
  }
}
</style>
