<template>
  <article class="page-home">
    <section class="section" :class="section.type && section.type.toLowerCase()" v-for="section in homeList" :key="section.title">
      <header class="section-header">{{ section.title }}</header>
      <ul class="home-list" slot="display">
        <template v-if="section.list.length">
          <li v-for="item in section.list" :key="item.id">
            <a @click="downloadFile(item.downloadurl, item.name)">{{ item.name }}</a>
            <a class="del-btn" v-if="['teacher', 'root'].indexOf($store.state.userInfo.usertype) !== -1" @click="del(item.id)">删除</a>
          </li>
        </template>
        <li v-else>暂无</li>
      </ul>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server'
import { download } from '../assets/js/util.js'

export default {
  props: ['id'],
  data() {
    return {
      homeList: [],
    }
  },
  mounted() {
    this.getHomeList()
  },
  methods: {
    getHomeList() {
      ds.getHomeList().then(({ data }) => {
        if (data.success) {
          this.homeList = data.data.homelist
        }
      })
    },
    del(id) {
      const res = confirm('确定删除吗？')
      if (res) {
        ds.delFile({ id: [id] }).then(({ data }) => {
          if (data.success) {
            this.getHomeList()
          }
        })
      }
    },
    downloadFile(url, name) {
      download(url, name)
    },
  },
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/listInSection.css';
</style>
