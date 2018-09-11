<template>
  <div class="page-login">
    <article class="login-container">
      <a class="close"></a>
      <section class="logo"><img src="../assets/images/logo.png" alt="北邮马院"></section>
      <form @submit="submit($event)">
        <div class="form-item">
          <label>
            <img src="../assets/images/icon-username.png" alt="账号">
          </label>
          <input type="text" v-model="userId">
        </div>
        <div class="form-item">
          <label><img src="../assets/images/icon-password.png" alt="密码"></label>
          <input type="password" v-model="userPwd">
        </div>
        <button class="submit" type="submit">登 录</button>
        <a href="#" class="forget-password">忘记密码？</a>
      </form>
    </article>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { encodePassword } from '../assets/js/util'

export default {
  data() {
    return {
      userId: '',
      userPwd: '',
    }
  },
  methods: {
    ...mapActions(['login']),
    submit(e) {
      e.preventDefault()
      this.login({
        userId: this.userId,
        userPwd: encodePassword(this.userPwd),
      }).then((res) => {
        if (res.success && res.data.userToken) {
          this.$router.replace({ name: 'home' })
        } else {
          alert(res.errorMsg)
        }
      })
    }
  }
}
</script>


<style lang="postcss" scoped>
@import "../assets/css/section.css";

.page-login {
  background-image: url(../assets/images/bg-login.png);
  background-size: 100%;
  background-repeat: no-repeat;
  height: 100%;
  position: relative;
  min-width: 1366px;

  & .login-container {
    width: 700px;
    height: 550px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, .6);
    border-radius: 8px;

    & .logo {
      width: 120px;
      margin: 50px auto 0;

      & img {
        width: 100%;
      }
    }

    & form {
      width: 350px;
      margin: 50px auto 0;

      & .form-item {
        height: 55px;
        background: #fff;
        border-radius: 8px;
        margin-bottom: 25px;
        display: flex;
        align-items: center;

        & label {
          flex-basis: 50px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          & img {
            display: block;
            height: 21px;
          }
        }

        & input {
          display: block;
          flex: auto;
          height: 32px;
          border-left: 2px solid #ccc;
          padding-left: 6px;
          font-size: inherit;
        }
      }

      & .submit {
        font-size: 16px;
        background-color: var(--red);
        color: #fff;
        text-align: center;
        line-height: 45px;
        width: 100%;
        border: none;
        border-radius: 4px;
      }

      & .forget-password {
        color: #3a3a3a;
        float: right;
        margin-top: 25px;
      }
    }
  }
}
</style>
