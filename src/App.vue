<template>
  <div id="main">
    <div class="main-nav">
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
            v-for="route in routesList"
            :key="route.name"
            :index="route.path">
          <el-icon><component :is="route.meta['icon']" /></el-icon>
          <template #title>{{ route.name }}</template>
        </el-menu-item>

      </el-menu>
    </div>
    <div class="main-views">
      <div class="main-views-head">
        {{ viewTitle.name }}
      </div>
      <el-main class="main-views-body">
        <router-view />
      </el-main>
    </div>
  </div>
</template>

<style scoped>
@import "styles/index.css";
</style>
<script setup>
import {reactive, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
  const route = useRoute();

  const viewTitle = reactive({
    name: "Home",
    path: "/"
  });
  const routesList = router.getRoutes().filter(route => {
    const {hidden} = route.meta;
    return !hidden;
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
</script>