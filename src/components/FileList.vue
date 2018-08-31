<template>
  <toggle-section @toggle-status="toggleStatus($event)" :status="status" :disableEdit="disableEdit">
    <!-- 标题 -->
    <template slot="title">{{ title }}</template>
    <!-- 展示部分 -->
    <ul class="home-list" slot="display">
      <template v-if="list && list.length">
        <li v-for="item in list" :key="item.id">
          <a :href="item.downloadurl">{{ item.name }}</a>
          <a class="del-btn" v-if="!disableEdit" @click="del">删除</a>
        </li>
      </template>
      <li v-else>暂无</li>
    </ul>
    <!-- 上传部分 -->
    <form class="upload-file" slot="add" @submit="submit">
      <input type="file" name="file">
      <button class="form-submit">上传</button>
    </form>
  </toggle-section>
</template>

<script>
import ds from '../assets/js/server.js'
import ToggleSection from './ToggleSection.vue'

export default {
  props: ['list', 'status', 'type', 'title', 'disableEdit'],
  methods: {
    toggleStatus(status) {
      this.$emit('toggle-status', {
        type: this.type,
        status,
      })
    },
    submit(e) {
      e.preventDefault()

      const form = e.target

      let formData = new FormData()
      formData.append('userToken', this.$store.state.userToken)
      formData.append('courseId', this.$route.params.id)
      formData.append('file', form.file.files[0])
      formData.append('name', form.file.files[0].name)
      formData.append('type', this.type)

      ds.submitFile(this.$store.state.userInfo.usertype, formData).then(({ data }) => {
        if (data.success) {
          this.toggleStatus('display')
        }
      })
    }
  },
  components: {
    ToggleSection,
  }
}
</script>

<style lang="postcss" scoped>
@import '../assets/css/listInSection.css';

.upload-file {
  padding-top: 20px;

  & .form-submit {
    display: inline-block;
    width: 100px;
  }
}
</style>
