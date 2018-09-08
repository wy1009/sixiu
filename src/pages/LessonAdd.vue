<template>
  <article class="page-lesson-add">
    <section class="section">
      <header class="section-header">
        添加课程
      </header>
      <form class="lesson-add" @submit="submit">
        <div class="form-item course">
          <div class="input-wrap">
            <input type="text" placeholder="输入关键字搜索课程" v-model="courseKeyword">
          </div>
          <ul class="search-result-list">
            <li v-for="item in filteredCourseList" :key="item.courseid">
              <span
                class="checkbox"
                :class="selectedCourse === item.courseid && 'checked'"
                @click="selectedCourse = item.courseid"
              ></span>
              {{ item.coursename }}
            </li>
          </ul>
        </div>
        <div class="form-item">
          <input type="text" placeholder="编辑课程班级id" name="courseclassid">
        </div>
        <div class="form-item">
          <input type="text" placeholder="编辑课程班级名称" name="courseclassname">
        </div>
        <div class="form-item class">
          <label>选择班级</label>
          <div class="input-wrap">
            <input type="text" v-model="classKeyword">
            <span class="search-res">{{ selectedClassList.join(',') }}</span>
          </div>
          <ul class="search-result-list">
            <li v-for="item in filteredClassList" :key="item.classid">
              <span
                class="checkbox"
                :class="selectedClassList.indexOf(item.classid) !== -1 && 'checked'"
                @click="toggleSelectedClass(item.classid)"
              ></span>
              {{ item.classid }}
            </li>
          </ul>
        </div>
        <button class="submit-btn">保存课程</button>
      </form>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server.js'

export default {
  data() {
    return {
      classKeyword: '',
      // 班级列表
      classList: [],
      // 已选择的班级列表
      selectedClassList: [],
      courseKeyword: '',
      // 课程列表
      courseList: [],
      // 已选择的关联课程
      selectedCourse: '',
      courseClassName: '', // 课程班级名称
      courseClassId: '', // 自定义的课程班级id
    }
  },
  computed: {
    filteredClassList() {
      return this.classList.filter(item => this.classKeyword && item.classid.indexOf(this.classKeyword) !== -1)
    },
    filteredCourseList() {
      return this.courseList.filter(item => this.courseKeyword && item.coursename.indexOf(this.courseKeyword) !== -1)
    },
  },
  mounted() {
    ds.searchCourseList().then(({ data }) => {
      if (data.success) {
        this.classList = data.data.classes
        this.courseList = data.data.courses
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
    },
    submit(e) {
      e.preventDefault()

      const form = e.target

      ds.submitCourseClass({
        courseId: this.selectedCourse,
        classlist: this.selectedClassList.join(','),
        courseclassId: form.courseclassid.value,
        courseclassname: form.courseclassname.value,
      }).then(({ data }) => {
        if (data.success) {
          window.location.reload()
        } else {
          alert(JSON.stringify(data))
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
@import '../assets/css/section.css';

section.section {
  position: relative;
  height: 450px;
}

form.lesson-add {
  padding: 20px 70px;
  padding-top: 0;
  color: #282828;

  & .form-item {

    & input {
      width: 380px;
      height: 36px;
      border-bottom: 1px solid #acacac;
      font-size: 14px;
      padding-left: 6px;
      box-sizing: border-box;
    }

    &.course {
      position: relative;
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
        width: 180px;
      }
    }

    & .search-res {
      margin-left: 10px;
      font-size: 12px;
      color: #acacac;
    }

    & .search-result-list {
      line-height: 24px;
      position: absolute;
      background: #fff;
      left: 0;
      top: 37;
      max-height: 240px;
      overflow: auto;
      padding: 0 10px;

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

  & .submit-btn {
    position: absolute;
    color: #fff;
    background: var(--red);
    border-radius: 4px;
    padding: 2px 6px;
    cursor: pointer;
    top: 20px;
    right: 40px;
  }
}
</style>
