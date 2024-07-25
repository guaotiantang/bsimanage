
<template>
  <el-main class="user_info_main">
    <el-icon size="64"><UserFilled /></el-icon>
    <div class="info_view">

      <el-form :inline="false" :model="userData">
        <el-form-item label="用户ID">
          <el-input v-model="userData.uid" disabled/>
        </el-form-item>

        <el-form-item label="用户权限">
          <el-input v-model="userData.power" disabled/>

        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="userData.name"/>
        </el-form-item>
        <el-form-item label="注册邮箱">
          <el-input v-model="userData.account"/>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="userData.new_password"/>
        </el-form-item>
      </el-form>
    </div>
    <el-button size="large" type="primary" @click="updateUserInfo">更新信息</el-button>
  </el-main>
</template>

<style scoped>
  .user_info_main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info_view {
    width: 30%;
    margin-top: 16px;

  }
</style>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import {fetchServerAPI, showMsg} from "@/scripts/lib.js";
import {UserFilled} from "@element-plus/icons-vue";

  const userData = ref({})
  async function getUserInfo() {
    let response = await fetchServerAPI('users', 'token_verify', 'GET')
    let power = response['Power']
    if (sessionStorage.getItem('token') !== '' && power > 0 && response["TokenInfo"]) {
      userData.value = {... response["TokenInfo"]}
      userData.value.new_password = ''
      if (power === 1) {
        userData.value.power = '用户'
      }else if (power === 2) {
        userData.value.power = '管理员'
      }else if (power === 3) {
        userData.value.power = '超级管理员'
      }else {
        window.location = '/'
      }
    }else {
      window.location = '/'
    }
  }
  onMounted(async () => {
    await getUserInfo()
  })

  async function updateUserInfo() {
    let response = await fetchServerAPI('users', 'update', 'POST', {... userData.value})
    if (response['code'] === 200) {
      await getUserInfo()
      await showMsg(response.msg, 'success')
    }else {
      await showMsg(response.msg, 'error')
    }
  }
</script>
