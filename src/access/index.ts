import ACCESS_ENUM from "@/access/accessEnum";
import router from "@/router";
import store from "@/store";
import checkAccess from "@/access/checkAccess";
//直接从文件中引入

//const router = useRouter(); 不用这个了
//const store = useStore();这个也不用了 不从import { useStore } from "vuex";引入 store\index.ts

///router\index.ts中export了router 不从import { useRouter } from "vue-router";里面导了
router.beforeEach(async (to, from, next) => {
  console.log("登陆用户信息", store.state.user.loginUser);

  const loginUser = store.state.user.loginUser;
  //登陆过一定会有userrole  可以把userrole看作是否首次登录的标志
  //如果之前没登陆过，则自动登录
  if (!loginUser || !loginUser.userRole) {
    //加await 是为了等用户登录成功后 在执行后续代码，这样刚登陆后也可以执行后续权限校验
    await store.dispatch("user/getLoginUser");
  }
  //拿到登录用户后还要拿到当前需要的权限 才能进行校验 从要去到的页面to中拿到meta
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //有的页面本来就不需要登陆 反着写 必须登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole) {
      //loginUser.userRole始终不为空
      //如果没登陆 跳转到登陆页面 还要加重定向 让用户登陆后强制跳转到原来登陆位置
      next(`/user/login?redirect=${to.fullPath}`);
      //next("/user/login?redirect=${to.fullPath}");
      return;
    }
    //管理员权限页面 要登陆以后再判断是不是管理员
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  //不用登陆
  next();
});
