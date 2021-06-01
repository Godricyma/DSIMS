<template>
  <leftmenu></leftmenu>
  <breadcrumb></breadcrumb>
</template>

<script>
import leftmenu from './LeftMenu.vue'
import breadcrumb from './Breadcrumb.vue'
export default {
  name: 'nav',
  components: {leftmenu, breadcrumb}
}
</script>