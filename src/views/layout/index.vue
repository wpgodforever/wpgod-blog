<template>
  <div>
    <headNav></headNav>
    <router-view v-slot="{ Component }">
      <!-- //动画效果 -->
      <transition>
        <!-- //需要缓存 -->
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path" />
        </keep-alive>
      </transition>
      <!-- //不需要缓存 -->
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.path" />
    </router-view>
  </div>
</template>
<script lang='ts' setup name="index">
import { ref, reactive } from 'vue'
import headNav from '@/components/headNav/headNav.vue';
</script>
<style scoped lang="less"></style>
