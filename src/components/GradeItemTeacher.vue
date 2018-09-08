<template>
  <div class="grade-item-teacher">
    <dt class="dt">
      {{ grade.classid }}
      <a v-if="showDetail" @click="toggleDetail(false)">收起</a>
      <a v-else @click="toggleDetail(true)">展开</a>
    </dt>
    <dd class="dd" v-show="showDetail">
      <template v-if="grade.grades && grade.grades.length">
        <table class="grade-table">
          <thead>
            <tr>
              <th>学院</th>
              <th>班级</th>
              <th>学号</th>
              <th>姓名</th>
              <th>成绩</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="item in grade.grades" :key="item.userid">
                <td>北邮马院</td>
                <td>{{ grade.classid }}</td>
                <td>{{ item.userid }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.grade }}</td>
              </tr>
          </tbody>
        </table>
        <p class="sum">
          <span>总人数</span>
          <span>{{ grade.grades.length }}</span>
        </p>
        <p class="sum">
          <span>平均成绩</span>
          <span>{{ averageGrade }}</span>
        </p>
      </template>
      <p v-else class="info">暂无学生成绩</p>
    </dd>
  </div>
</template>

<script>
export default {
  props: ['grade'],
  data() {
    return {
      showDetail: false, // 展开 - true，收起 - false
    }
  },
  computed: {
    averageGrade() {
      const grades = this.grade.grades
      return (grades.reduce((accumulator, cur) => accumulator + cur.grade, 0) / grades.length).toFixed(2)
    },
  },
  methods: {
    toggleDetail(showDetail) {
      this.showDetail = showDetail
    },
  },
}
</script>

<style lang="postcss" scoped>
@import '../assets/css/section.css';

.dd {
  & table {
    width: 100%;
    table-layout: fixed;
    text-align: center;
    line-height: 26px;
    margin-bottom: 2px;

    & thead,
    & tbody {
      border-bottom: 1px solid #ccc;
    }
  }

  & .sum {
    margin: 0 30px;
    line-height: 26px;

    & span {
      display: inline-block;
      width: 110px;
    }
  }

  & .info {
    padding: 6px 30px;
  }
}
</style>

