<template>
  <home>
    <router-view></router-view>
  </home>
</template>

<script>
import home from '../Home.vue'

export default {
  components: {home},
  name: 'patchimport',
}
</script>