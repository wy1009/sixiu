<template>
  <article class="page-upload-info">
    <section class="section">
      <header class="section-header">导入信息</header>
      <form class="form" @submit="submit">
        <div class="form-item">
          <input type="file" name="file">
        </div>
        <div class="form-item">
          <select name="type">
            <option v-for="item in typeList" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="form-item">
          <button class="form-submit">导入</button>
        </div>
      </form>
    </section>
  </article>
</template>

<script>
import ds from '../assets/js/server'

export default {
  data() {
    return {
      typeList: ['class', 'course', 'courseclass', 'courseclassrelation', 'grade', 'user'],
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()

      const form = e.currentTarget

      let formData = new FormData()

      formData.append('userToken', this.$store.state.userToken)
      formData.append('type', form.type.value)
      formData.append('file', form.file.files[0])
      formData.append('name', form.file.files[0].name)

      ds.submitFile('data', formData).then(({ data }) => {
        if (data.success) {
          alert('导入成功！')
        } else {
          alert(JSON.stringify(data))
        }
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
  }

  & dl {
    margin: 0 40px;

    & .dd {
      padding: 10px 30px;
      line-height: 24px;
    }
  }
}
</style>
