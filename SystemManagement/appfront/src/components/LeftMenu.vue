<template>
  <div class="left-menu">
    <div class="logol">
      <router-link to="/home">DSIMS</router-link>
    </div>
    <div class="sub-menu">
      <router-link to="/home">首页</router-link>
      <router-link to="/patchimport">Patch升级</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftmenu'
}
</script>

<style>
.left-menu {
  background-color: rgb(40, 44, 52);
  width: 250px;
  height: 100%;
}

.left-menu a {
  display: block;
  text-decoration: none;
  height: 55px;
  line-height: 55px;
  color: rgb(255, 255, 255);
  padding-left: 30px;
}

.logol {
  /* background-color: rgb(40, 44, 52); */
  width: 250px;
  height: 55px;
}

.sub-menu a:hover {
  background-color: rgb(24, 144, 255);
  color: rgb(255, 255, 255);
}
</style>