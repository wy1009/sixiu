<template>
  <article class="page-home">
    <section class="section ppt" v-for="section in homeList" :key="section.title">
      <header class="section-header">{{ section.title }}</header>
      <ul class="home-list" slot="display">
        <template v-if="section.list.length">
          <li v-for="item in section.list" :key="item.id">
            <a :href="item.downloadurl">{{ item.name }}</a>
            <a class="del-btn" v-if="$store.state.userInfo.usertype === 'teacher'" @click="del(item.id)">删除</a>
          </li>
        </template>
        <li v-else>暂无</li>
      </ul>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server'

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
  },
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/listInSection.css';
</style>
