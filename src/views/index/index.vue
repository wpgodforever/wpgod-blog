<template>
  <div>
    <headNav></headNav>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <transition>
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
  </div>
</template>
<script lang='ts' setup name="index">
import { ref, reactive } from 'vue'
import headNav from '@/components/headNav/headNav.vue';
</script>
<style scoped lang="less">

</style>
