<template>
  <div class="test">
    <div class="breadcrumb">
      <router-link v-for="(item, index) in breadList"
      :key="item.meta.title" 
      :to="{path:item.path}">
        {{item.meta.title}}
        <span v-if="index < breadList.length-1"> > </span>
      </router-link>
    </div>
    <div class="user">
      <router-link to="#">消息</router-link>
      <router-link to="#">个人中心</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
    return {
      breadList: [] // 路由集合
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    isHome(route) {
      return route.name === "home";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      //如果不是首页 
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }
      this.breadList = matched;
    }
  },
  created() {
    this.getBreadcrumb();
  }
}
</script>

<style>
div {
  height: 55px;
  line-height: 55px;
}

a {
  text-decoration: none;
  color: rgb(40, 44, 52);
}

.breadcrumb {
  padding-left: 20px;
  float: left;
}

.user {
  float: right;
  padding-right: 20px;
}

.user a {
  margin-left: 20px;
}
</style>
