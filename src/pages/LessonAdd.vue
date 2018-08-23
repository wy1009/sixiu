<template>
  <article class="page-lesson-add">
    <section class="section">
      <header class="section-header">
        添加课程
      </header>
      <form class="lesson-add">
        <div class="form-item lesson">
          <input type="text" placeholder="编辑课程名称">
        </div>
        <div class="form-item class">
          <label>选择班级</label>
          <input type="text" v-model="keyword">
          <ul class="class-list">
            <li v-for="item in filteredClassList" :key="item.courseclassid">
              <span
                class="checkbox"
                :class="selectedClassList.indexOf(item.courseclassid) !== -1 && 'checked'"
                @click="toggleSelectedClass(item.courseclassid)"
              ></span>
              {{ item.courseclassname }}
            </li>
          </ul>
        </div>
        <div class="form-item">
          <button class="form-submit">保存课程</button>
        </div>
      </form>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server.js'

export default {
  data() {
    return {
      keyword: '',
      classList: [],
      selectedClassList: [],
    }
  },
  computed: {
    filteredClassList() {
      return this.classList.filter(item => this.keyword && item.courseclassname.indexOf(this.keyword) !== -1)
    }
  },
  mounted() {
    ds.getCourseList().then(({ data }) => {
      if (data.success) {
        this.classList = data.data.courseClasses
      }
    })
  },
  methods: {
    toggleSelectedClass(id) {
      const index = this.selectedClassList.indexOf(id)
      if (index !== -1) {
        this.selectedClassList.splice(index, 1)
      } else {
        this.selectedClassList.push(id)
      }
    }
  }
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/section.css';

form.lesson-add {
  padding: 20px 70px;
  padding-top: 0;
  color: #282828;

  & .form-item {
    width: 380px;

    & input {
      width: 100%;
      height: 36px;
      font-size: 14px;
      border-bottom: 1px solid #acacac;
    }

    &.class {
      position: relative;

      & label {
        font-size: 16px;
      }

      & input {
        background-image: url(../assets/images/icon-search.png);
        background-repeat: no-repeat;
        background-position: 4px center;
        padding-left: 22px;
      }

      & .class-list {
        font-size: 14px;
        line-height: 24px;
        position: absolute;
        background: #fff;
        left: 0;
        top: 37;

        & .checkbox {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-image: url(../assets/images/box-check.png);
          background-size: 100%;

          &.checked {
            background-image: url(../assets/images/box-checked.png);
          }
        }
      }
    }
  }
}
</style>
