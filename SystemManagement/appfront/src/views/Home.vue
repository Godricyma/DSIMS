<template>
  <div class="home">
    <leftmenu class="left-menu"></leftmenu>
    <breadcrumb
    :user="username"></breadcrumb>
    <slot></slot>
  </div>
</template>

<script>
import leftmenu from '../components/LeftMenu.vue'
import breadcrumb from '../components/Breadcrumb.vue'

export default {
  name: 'home',
  components: {leftmenu, breadcrumb},
  computed: {
    username() {
      let _this = this
      return _this.$store.getters.username
    }
  }
}
</script>

<style>
.home {
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 55px 1fr;
}

.left-menu {
  grid-row: 1/3;
}

</style>

