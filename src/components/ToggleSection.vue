<template>
  <section class="section">
    <header class="section-header">
      <slot name="title"></slot>
      <a class="border-btn" v-if="status === 'display'" @click="toggleStatus('add')">添加</a>
      <a class="border-btn" v-if="status === 'add'" @click="toggleStatus('display')">取消</a>
    </header>
    <!-- 展示 -->
    <article class="part-display" v-if="status === 'display'">
      <slot name="display"></slot>
    </article>
    <!-- 添加 -->
    <article class="part-add" v-if="status === 'add'">
      <slot name="add"></slot>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      status: 'display', // display - 展示；add - 添加
    }
  },
}
</script>

<style lang="postcss" scoped>
@import '../assets/css/section.css';
</style>


