<template>
  <article class="page-lesson">
    <file-list
      :list="lessonDetail.ppturllist"
      type="courseware"
      title="课程PPT"
      :status="status.courseware"
      @toggle-status="toggleStatus($event)"
      :disableEdit="disableEdit"
      @refresh-list="getLessonDetail"
    ></file-list>
    <file-list
      :list="lessonDetail.songList"
      type="song"
      title="歌曲精选"
      :status="status.song"
      @toggle-status="toggleStatus($event)"
      :disableEdit="disableEdit"
      @refresh-list="getLessonDetail"
    ></file-list>
    <file-list
      :list="lessonDetail.videoList"
      type="video"
      title="精选视频"
      :status="status.video"
      @toggle-status="toggleStatus($event)"
      :disableEdit="disableEdit"
      @refresh-list="getLessonDetail"
    ></file-list>
    <file-list
      :list="lessonDetail.practiceList"
      type="practice"
      title="实践教学"
      :status="status.practice"
      @toggle-status="toggleStatus($event)"
      :disableEdit="disableEdit"
      @refresh-list="getLessonDetail"
    ></file-list>
    <file-list
      :list="lessonDetail.homeworkExampleList"
      type="homework_example"
      title="优秀作业"
      :status="status.homework_example"
      @toggle-status="toggleStatus($event)"
      :disableEdit="disableEdit"
      @refresh-list="getLessonDetail"
    ></file-list>
    <section class="section homework">
      <header class="section-header">
        已上传作业
      </header>
      <ul class="home-list">
        <template v-if="lessonDetail.uploadlist && lessonDetail.uploadlist.length">
          <li v-for="item in lessonDetail.uploadlist" :key="item.id">
            <a @click="downloadFile(item.downloadurl, item.name)">{{ item.name }}</a>
          </li>
        </template>
        <li v-else>暂无</li>
      </ul>
    </section>
    <section>
      <div class="form-submit" @click="del">删除课程班级</div>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server.js'
import ToggleSection from '../components/ToggleSection.vue'
import FileList from '../components/FileList.vue'
import { download } from '../assets/js/util.js'

export default {
  props: ['id'],
  data() {
    return {
      lessonDetail: [],
      status: {
        courseware: 'display',
        audio: 'display',
        video: 'display',
        song: 'display',
        practice: 'display',
        homework_example: 'display',
      },
      disableEdit: ['teacher', 'root'].indexOf(this.$store.state.userInfo.usertype) === -1,
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
            return lesson.id === this.id
          })
        }
      })
    },
    toggleStatus(option) {
      this.status[option.type] = option.status
    },
    downloadFile(url, name) {
      download(url, name)
    },
    del() {
      const res = confirm('确定要删除该课程班级吗？')

      if (res) {
        ds.delCourseClass({
          courseclassId: this.id,
        }).then(() => {
          window.location.href = window.location.origin
        })
      }
    },
  },
  components: {
    ToggleSection,
    FileList,
  }
}
</script>

<style lang="postcss" scoped>
@import '../assets/css/listInSection.css';
</style>
