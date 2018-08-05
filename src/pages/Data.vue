<template>
  <article class="page-data">
    <section class="section ppt">
      <header class="section-header">课程PPT</header>
      <ul class="data-list">
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
      </ul>
    </section>
    <section class="section audio">
      <header class="section-header">课程音频</header>
      <ul class="data-list">
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
      </ul>
    </section>
    <section class="section video">
      <header class="section-header">课程视频</header>
      <ul class="data-list">
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
        <li>第一章 追求伟大理想 坚定崇高信念</li>
      </ul>
    </section>
  </article>
</template>

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

  & .data-list {
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

