<template>
  <div class="page-password">
    <section class="section">
      <header class="section-header">修改密码</header>
      <form action="">
        <div class="form-item">
          <label>原始密码</label>
          <input class="form-input" type="password">
        </div>
        <div class="form-item">
          <label>新密码</label>
          <input class="form-input" type="password">
        </div>
        <div class="form-item">
          <label>再次输入新密码</label>
          <input class="form-input" type="password">
        </div>
        <button class="form-submit">保存修改</button>
      </form>
    </section>
  </div>
</template>

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
        text-align: right;
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
