<template>
<!--  WEB客户端框架总成-->
  <div id="main">
    <!-- 侧边栏-->
    <div class="main-nav" v-if="showNav.value">
      <div class="title">
        <h1>
          BSIManage
        </h1>
      </div>
      <el-menu
        class="main-nav-menu"
      :router="true"
      :default-active="viewTitle.path"
      @select="handleNavClick">
        <el-menu-item
            v-if="showNav.value"
            v-for="route in routesList"
            :key="route.name"
            :index="route.path">
          <el-icon><component :is="route.meta['icon']" /></el-icon>
          <template #title>{{ route.name }}</template>
        </el-menu-item>

      </el-menu>
    </div>
    <div class="main-views">
      <!-- 顶栏-->
      <div class="main-views-head">
        <div class="main-views-title">
          {{ viewTitle.name }}
        </div>
        <!-- 用户界面-->
        <div class="main-views-user" v-if="power > 0">
          <el-popover placement="bottom-end" trigger="hover" @show="isLogin">
            <p style="text-align: center; color: #a0a5a8">UID: {{ userInfo.uid }}</p>
            <p style="text-align: center">用户名: {{ userInfo.name }}</p>
            <div style="text-align: center; margin: 0">
              <el-button size="small" type="primary" @click="gotoUserInfo">修改</el-button>
              <el-button size="small" type="warning" @click="logout">注销</el-button>
            </div>
            <template #reference>
              <el-avatar :size="32" icon="UserFilled" />
            </template>
          </el-popover>
        </div>
      </div>
      <!-- 主界面 -->
      <el-watermark class="main-views-body" :content="[userInfo.name, userInfo.uid]" :gap="[230,230]">
        <router-view />
      </el-watermark>

    </div>
  </div>
</template>

<style scoped>
@import "styles/index.css";
</style>
<script setup>
  import {onMounted, reactive, watch} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import {fetchServerAPI} from "@/scripts/lib.js";
  let power = 0
  let userInfo = reactive({
    account: '',
    ip: '',
    name: '',
    power: 0,
    uid: -1
  })
  let checking = false
  async function isLogin(){
    if (checking) {return}
    checking = true
    let response = await fetchServerAPI('users', 'token_verify', 'GET')
    power = response['Power']
    if (sessionStorage.getItem('token') !== '' && power > 0 && response["TokenInfo"]) {
      userInfo = {... response["TokenInfo"]}
      checking = false
      return power
    }else {
      checking = false
      return 0
    }
  }

  async function logout(){
    await fetchServerAPI('users', 'logout', 'GET')
    sessionStorage.removeItem('token')
    power = 0
    userInfo = {
      account: '',
      ip: '',
      name: '',
      power: 0,
      uid: -1
    }
    window.location.reload()
  }

  const router = useRouter();
  const route = useRoute();
  const showNav = reactive({
    value: false
  });

  let routesList = router.getRoutes().filter(route => {
    const {hidden} = route.meta;
    return !hidden;

  });

  onMounted(async () => {
    showNav.value = await isLogin() > 0;
    if (!showNav.value) {
      // 跳转到登录页面

      router.push('/author').then();
    }else{
      // 跳转到首页
      // router.push('/home').then();
      routesList = router.getRoutes().filter(route => {
        const {hidden} = route.meta;
        return !hidden && route.meta["permission"] <= power;
      });
    }
  });


  const viewTitle = reactive({
    name: "Home",
    path: "/"
  });

  watch(route, (newRoute) => {
    viewTitle.name = newRoute.name;
    viewTitle.path = newRoute.path;
  }, { immediate: true });

  const handleNavClick = (key) => {
    const selectedRoute = routesList.find(route => route.path === key);
    if (selectedRoute) {
      viewTitle.name = selectedRoute.name;
      viewTitle.path = key;
      router.push(key).then(); // Ensure navigation to the selected route
    }
  };

  function gotoUserInfo(){
    router.push('/user').then();
  }
</script>