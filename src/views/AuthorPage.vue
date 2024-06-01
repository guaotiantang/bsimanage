<template>
  <div class="page-box">
    <div class="main-box">
      <div :class="['container', 'container-register', { 'is-txl': isLoginPage }]">
        <form>
          <h2 class="title">注册账号</h2>
          <input class="form__input"
                 v-model="registerForm.name"
                 type="text"
                 placeholder="用户名"
                 @click="msg.show=false"
                 @keyup.enter="register"
          />
          <input class="form__input"
                 v-model="registerForm.email"
                 type="text"
                 placeholder="邮箱"
                 @click="msg.show=false"
                 @keyup.enter="register"
          />
          <input class="form__input"
                 v-model="registerForm.password"
                 type="password"
                 placeholder="密码"
                 @click="msg.show=false"
                 @keyup.enter="register"
          />
          <input class="form__input"
                 v-model="registerForm.password_confirmation"
                 type="password"
                 placeholder="重复密码"
                 @click="msg.show=false"
                 @keyup.enter="register"
          />
          <span class="text" v-if="!msg.show"><br></span>
          <span class="text"
                v-if="msg.show"
                v-text="msg.value"
                :style="{color: msg.color}"
          />
          <div class="primary-btn" @click="register">申请注册</div>
        </form>
      </div>
      <div
          :class="['container', 'container-login', { 'is-txl is-z200': isLoginPage }]"
      >
        <form>
          <h2 class="title">用户登录</h2>
          <input class="form__input"
                 v-model="loginForm.email"
                 type="text" placeholder="邮箱"
                 @click="msg.show=false"
                 @keyup.enter="login"
          />
          <input class="form__input"
                 v-model="loginForm.password"
                 type="password"
                 placeholder="密码"
                 @click="msg.show=false"
                 @keyup.enter="login"
          />
          <span class="text" v-if="!msg.show"><br></span>
          <span class="text"
                v-if="msg.show"
                v-text="msg.value"
                :style="{color: msg.color}"
          />
          <div class="primary-btn" @click="login">立即登录</div>
        </form>
      </div>
      <div :class="['switch', { login: isLoginPage }]">
        <div class="switch__circle"></div>
        <div class="switch__circle switch__circle_top"></div>
        <div class="switch__container">
          <h2>{{ isLoginPage ? '注册账号' : '登录帐号' }}</h2>
          <p>
            {{
              isLoginPage
                  ? '申请注册账号需管理员同意后方可登入系统'
                  : '返回登录页面'
            }}
          </p>
          <div class="primary-btn" @click="isLoginPage = !isLoginPage">
            {{ isLoginPage ? '申请注册' : '立即登录' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginBox',
  data() {
    return {
      isLoginPage: true,
      msg: {
        color: 'red',
        value: '',
        show: false
      },
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  watch: {
    isLoginPage() {
      if (this.msg.show) {
        this.msg.show = false
      }
    }
  },
  methods: {
    login() {
      this.msg.color = 'red'
      this.msg.show = false
      if (this.loginForm.email === "") {
        this.msg.value = "请输入邮箱账号"
        this.msg.show = true
      }else if (this.loginForm.password === "") {
        this.msg.value = "请输入密码"
        this.msg.show = true
      }else
      {
        // 输出账号密码
        console.log(this.loginForm.email)
        console.log(this.loginForm.password)
        this.msg.show = false

      }
    },
    register() {
      this.msg.color = 'red'
      this.msg.show = false
      if (this.registerForm.name === "") {
        this.msg.value = "请输入用户名"
        this.msg.show = true
      }
      else if (this.registerForm.email === "") {
        this.msg.value = "请输入邮箱地址"
        this.msg.show = true
      }
      else if (this.registerForm.password === "") {
        this.msg.value = "请输入密码"
        this.msg.show = true
      }
      else if (this.registerForm.password !== this.registerForm.password_confirmation){
        this.msg.value = "两次输入的密码不一致"
        this.msg.show = true
      }
      else {
        this.msg.show = false
        // 输出注册信息
        console.log(this.registerForm.name)
        console.log(this.registerForm.email)
        console.log(this.registerForm.password)
        this.loginForm.email = this.registerForm.email
        this.loginForm.password = this.registerForm.password
        this.registerForm.password = ""
        this.isLoginPage = true
      }
    },
  },
}
</script>

<style lang="scss">
.page-box {
  height: 100%;
  width: 100%;
  background-color: #ecf0f3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-box {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: all 1.25s;
    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #a0a5a8;
      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      .text {
        margin-top: 30px;
        margin-bottom: 12px;
      }
      .form__input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        &::placeholder {
          color: #a0a5a8;
        }
      }
    }
  }
  .container-register {
    z-index: 100;
    left: calc(100% - 600px);
  }
  .container-login {
    left: calc(100% - 600px);
    z-index: 0;
  }
  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }
  .is-z200 {
    z-index: 200;
    transition: 1.25s;
  }
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;
    .switch__circle {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
      bottom: -60%;
      left: -60%;
      transition: 1.25s;
    }
    .switch__circle_top {
      top: -30%;
      left: 60%;
      width: 300px;
      height: 300px;
    }
    .switch__container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: 400px;
      padding: 50px 55px;
      transition: 1.25s;
      h2 {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
      }
    }
  }
  .login {
    left: calc(100% - 400px);
    .switch__circle {
      left: 0;
    }
  }
  .primary-btn {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    &:hover {
      box-shadow: 4px 4px 6px 0 rgb(255 255 255 / 50%),
      -4px -4px 6px 0 rgb(116 125 136 / 50%),
      inset -4px -4px 6px 0 rgb(255 255 255 / 20%),
      inset 4px 4px 6px 0 rgb(0 0 0 / 40%);
    }
  }
}
</style>

