<template>
  <article class="page-upload-avatar">
    <section class="section">
      <header class="section-header">更改头像</header>
      <form class="form" @submit="submit">
        <div class="form-item">
          <input type="file" name="file" @change="handleChange">
        </div>
        <div v-if="previewImgUrl" class="form-item img">
          <label>预览：</label>
          <img :src="previewImgUrl">
        </div>
        <div class="form-item">
          <button class="form-submit">上传头像</button>
        </div>
      </form>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server'
import { getObjectURL } from '../assets/js/util'

export default {
  data() {
    return {
      previewImgUrl: '',
    }
  },
  methods: {
    handleChange(e) {
      this.previewImgUrl = getObjectURL(e.target.files[0])
    },
    submit(e) {
      e.preventDefault()

      const form = e.currentTarget

      let formData = new FormData()

      formData.append('userToken', this.$store.state.userToken)
      formData.append('file', form.file.files[0])

      ds.submitAvatar(formData).then(() => {
        alert('上传头像成功！')
      })
    },
  },
}
</script>


<style lang="postcss" scoped>
@import '../assets/css/section.css';

.section {
  padding-bottom: 20px;

  & .form {
    margin: 20px 70px;
    margin-bottom: 0;

    & .btn {
      display: inline-block;
      width: 120px;
      line-height: 20px;
      border: 1px solid var(--red);
      text-align: center;
      border-radius: 10px;
      color: var(--red);
      margin-right: 30px;
    }

    & .img {
      width: 100%;

      & img {
        width: 100%;
        margin-top: 12px;
      }
    }
  }
}
</style>
