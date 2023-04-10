<template>
  <div class="main-container flex-col">
    <headNav></headNav>
    
    <div class="main-content">
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
  </div>
</template>
<script lang='ts' setup name="index">
import { ref, reactive } from 'vue'
import headNav from '@/components/headNav/headNav.vue';

</script>
<style scoped lang="less">
.main-container {
  display: flex;
  max-height: 100vh;
  height: 100vh;
  z-index: 2;
  .main-content{
    flex: 1;
    margin-top: 59px;
    max-height: calc(100vh - 59px);
    z-index: 2;
  }
}
</style>
