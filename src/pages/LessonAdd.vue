<template>
  <article class="page-lesson-add">
    <section class="section">
      <header class="section-header">
        添加课程
      </header>
      <form class="lesson-add" @submit="submit">
        <div class="form-item course">
          <div class="input-wrap">
            <select name="courseId">
              <option v-for="item in courseList" :key="item.courseid" :value="item.courseid">{{ item.coursename }}</option>
            </select>
          </div>
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
            <input type="text" v-model="classKeyword" @focus="showResultList" @click="$event.stopPropagation()">
            <span class="search-res">{{ selectedClassList.join(',') }}</span>
          </div>
          <ul class="search-result-list" v-show="resultListShow">
            <li v-for="item in filteredClassList" :key="item.classid" @click="toggleSelectedClass($event, item.classid)">
              <span
                class="checkbox"
                :class="selectedClassList.indexOf(item.classid) !== -1 && 'checked'"
              ></span>
              {{ item.classid }}
            </li>
          </ul>
        </div>
        <button class="border-btn">保存课程</button>
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
      resultListShow: false,
    }
  },
  computed: {
    filteredClassList() {
      return this.classKeyword ?
        this.classList.filter(item => this.classKeyword && item.classid.indexOf(this.classKeyword) !== -1)
        : this.classList
    },
    filteredCourseList() {
      return this.courseList.filter(item => this.courseKeyword && item.coursename.indexOf(this.courseKeyword) !== -1) 
    },
  },
  mounted() {
    document.addEventListener('click', this.hideResultList)
    ds.searchCourseList().then(({ data }) => {
      if (data.success) {
        this.classList = data.data.classes
        this.courseList = data.data.courses
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideResultList)
  },
  methods: {
    toggleSelectedClass(e, id) {
      e.stopPropagation()
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
        courseId: form.courseId.value,
        classlist: this.selectedClassList.join(','),
        courseclassId: form.courseclassid.value,
        courseclassname: form.courseclassname.value,
      }).then(({ data }) => {
        if (data.success) {
          window.location.reload()
        } else {
          alert(data.errorMsg)
        }
      })
    },
    hideResultList() {
      this.resultListShow = false
    },
    showResultList(status) {
      this.resultListShow = true
    },
  },
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
      & select {
        width: 380px;
        height: 36px;
        font-size: 14px;
      }
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
      border: 1px solid #EDEDED;
      line-height: 24px;
      position: absolute;
      background: #fff;
      left: 0;
      top: 37;
      max-height: 120px;
      overflow: auto;
      padding: 0 10px;
      cursor: pointer;

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

  & .border-btn {
    position: absolute;
    top: 20px;
    right: 40px;
    background: transparent;
    cursor: pointer;
  }
}
</style>
