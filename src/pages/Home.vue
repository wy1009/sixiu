<template>
  <article class="page-home">
    <toggle-section v-for="section in homeList" :key="section.title">
      <!-- 标题 -->
      <template slot="title">{{ section.title }}</template>
      <!-- 展示 -->
      <ul class="home-list" slot="display">
        <template v-if="section.list.length">
          <li v-for="item in section.list" :key="item.id">
            <a :href="item.downloadurl">{{ item.name }}</a>
            <a class="del-btn" v-if="$store.state.userInfo.usertype === 'teacher'" @click="del">删除</a>
          </li>
        </template>
        <li v-else>暂无</li>
      </ul>
      <!-- 添加 -->
      <upload-file slot="add"></upload-file>
    </toggle-section>
  </article>
</template>

<script>
import ds from '../assets/js/server'
import ToggleSection from '../components/ToggleSection.vue'
import UploadFile from '../components/UploadFile.vue'

export default {
  props: ['id'],
  data() {
    return {
      homeList: [],
    }
  },
  mounted() {
    ds.getHomeList().then(({ data }) => {
      if (data.success) {
        this.homeList = data.data.homelist
      }
    })
  },
  methods: {
    del() {
      const res = confirm('确定删除吗？')
      if (res) {
        // 删除项目
      }
    },
  },
  components: {
    ToggleSection,
    UploadFile,
  }
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/listInSection.css';
</style>
