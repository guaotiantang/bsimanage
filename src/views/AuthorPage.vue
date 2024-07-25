<script setup>
  import {isLoginPage, loginForm, registerForm, login, register, msg} from '@/scripts/author.js'

</script>

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
            {{isLoginPage ? '申请注册账号需管理员同意后方可登入系统' : '返回登录页面' }}
          </p>
          <div class="primary-btn" @click="isLoginPage = !isLoginPage">
            {{ isLoginPage ? '申请注册' : '立即登录' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<style lang="scss">
@import '@/styles/author.scss';
</style>

