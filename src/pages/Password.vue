<template>
  <div class="page-password">
    <section class="section">
      <header class="section-header">修改密码</header>
      <form @submit="submit">
        <div class="form-item">
          <label>原始密码</label>
          <input class="form-input" type="text" name="oldPwd">
        </div>
        <div class="form-item">
          <label>新密码</label>
          <input class="form-input" type="password" name="userPwd">
        </div>
        <div class="form-item">
          <label>再次输入新密码</label>
          <input class="form-input" type="password" name="repeatPwd">
        </div>
        <button class="form-submit">保存修改</button>
      </form>
    </section>
  </div>
</template>

<script>
import ds from '../assets/js/server'
import { encodePassword } from '../assets/js/util'

export default {
  methods: {
    submit(e) {
      e.preventDefault()
      const form = e.target

      const userPwd = encodePassword(form.userPwd.value)
      const oldPwd = encodePassword(form.oldPwd.value)
      const repeatPwd = encodePassword(form.repeatPwd.value)

      if (repeatPwd !== userPwd) {
        alert('新旧密码不一致')
        return
      }

      ds.changePassword({ oldPwd, userPwd }).then(({ data }) => {
        if (data.success) {
          ds.logout().then(() => {
            window.location.reload()  
          })
        } else {
          alert(data.errorMsg)
        }
      })
    },
  }
}
</script>


<style lang="postcss" scoped>
@import "../assets/css/section.css";

section.section {
  padding-bottom: 100px;

  & form {
    margin: 0 50px;

    & .form-item {

      & label {
        display: inline-block;
        color: var(--red);
        line-height: 24px;
        width: 130px;
        padding-right: 20px;
      }

      & input.form-input {
        width: 400px;
      }
    }

    & .form-submit {
      margin-top: 95px;
    }
  }
}
</style>
