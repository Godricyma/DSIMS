<template>
  <div>
    <div class="my-breadcrumb">
      <router-link to="/home">首页</router-link>
      <router-link v-for="(item) in breadList"
      :key="item.meta.title"
      :to="{path:item.path}">
        <span v-if="item.meta.title"> > </span>
        {{item.meta.title}}
      </router-link>
    </div>
    <div class="my-user">
      <router-link to="#">消息</router-link>
      <el-dropdown trigger="click" placement="bottom-start">
        <span>
          {{ username }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-on:click="logout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    user: {
      type: String,
      default: '用户'
    },
  },
  data() {
    return {
      breadList: [], // 路由集合
      username: '',
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    isHome(route) {
      return route.name === "home";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      if (this.isHome(matched[0])) {
        matched = []
      }
      this.breadList = matched;
    },
    getUsername() {
      this.username = this.$store.state.username
    },
    logout() {
      this.$store.commit("delToken")
      this.$router.push("/login")
    },
  },
  created() {
    this.getBreadcrumb();
    this.username = this.user
  }
}
</script>

<style>
div {
  height: 55px;
  line-height: 55px;
}

.my-breadcrumb a {
  text-decoration: none;
  color: rgb(40, 44, 52);
}

.my-breadcrumb {
  padding-left: 20px;
  float: left;
}

.my-user {
  float: right;
  padding-right: 40px;
}

.my-user a {
  text-decoration: none;
  color: rgb(40, 44, 52);
  margin-left: 20px;
  margin-right: 20px;
}

.el-dropdown {
  height: 18px;
  width: 80px;
  text-align: center;
}

.el-dropdown-menu {
  padding: 0px;
  width: 80px;
}

.el-dropdown-menu__item {
  padding: 0px;
  text-align: center;
}

.el-scrollbar__wrap {
  overflow-x: hidden !important; /*关键代码*/
}

.el-popper__arrow {
  visibility: hidden;
}
</style>
