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
      <router-link to="#">{{ username }}</router-link>
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
    }
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
  padding-right: 20px;
}

.my-user a {
  text-decoration: none;
  color: rgb(40, 44, 52);
  margin-left: 20px;
}
</style>
