<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于八位数" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="outline" html-type="submit" style="width: 120px"
          >登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<!--form是表单要接受的一个属性 一个对象-->
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
//表单信息
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
// 提交表单实现登录
const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form); //拿到后端响应
  //登陆成功跳转到主页 todo
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser"); //await 等获取到用户信息再跳转页面 要触发的action名称
    router.push({
      path: "/",
      replace: true, //不会占用浏览器历史记录的堆栈 会直接替换掉当前登录页 再点回退也不会回退到登录页
    });
  } else {
    message.error("登陆失败," + res.message);
  }
};
</script>
