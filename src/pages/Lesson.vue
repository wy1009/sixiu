<template>
  <article class="page-lesson">
    <section class="section ppt" v-for="section in homeList" :key="section.title">
      <header class="section-header">{{ section.title }}</header>
      <ul class="lesson-list">
        <template v-if="section.list.length">
          <li v-for="item in section.list" :key="item.id">{{ item.name }}</li>
        </template>
        <li v-else>暂无</li>
      </ul>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server'

export default {
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
  }
}
</script>


<style lang="postcss" scoped>
@import "../assets/css/section.css";

.section {
  &.ppt {
    & .section-header {
      background-image: url(../assets/images/icon-ppt.png);
    }
  }

  &.audio {
    & .section-header {
      background-image: url(../assets/images/icon-audio.png);
    }
  }

  &.video {
    & .section-header {
      background-image: url(../assets/images/icon-video.png);
    }
  }

  & .lesson-list {
    margin: 20px 70px;

    & li {
      margin-top: 18px;

      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>

