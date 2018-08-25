<template>
  <div class="grade-item-teacher">
    <dt>
      {{ grade.classid }}
      <a v-if="showDetail" @click="toggleDetail(false)">收起</a>
      <a v-else @click="toggleDetail(true)">展开</a>
    </dt>
    <dd v-show="showDetail">
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
        <span>32</span>
      </p>
      <p class="sum">
        <span>平均成绩</span>
        <span>80.12</span>
      </p>
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
  methods: {
    toggleDetail(showDetail) {
      this.showDetail = showDetail
    }
  }
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/section.css';

.grade-item-teacher {
  & dt {
    line-height: 30px;
    background: #dcdcdc;
    padding-left: 30px;
    margin-top: 8px;

    & a {
      color: var(--red);
      margin-left: 16px;
      font-size: 12px;
    }
  }

  & dd {
    background: #f0f0f0;
    padding-bottom: 2px;

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
  }
}
</style>

