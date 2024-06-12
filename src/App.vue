<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view></router-view>
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";

import { onMounted } from "vue";
import { useRoute } from "vue-router";
//appvue全局页面根页面

//当前页面路由
const route = useRoute();
//TODO 全局初始化函数 有全局单次调用的代码，都可以写进这里
const doInit = () => {
  console.log("welcome to my project!");
};
//在前端根页面初始化的时候去调用init函数
onMounted(() => {
  doInit();
});
</script>
