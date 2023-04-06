<template>
  <div class="demo-container">
    <div class="left">
      <el-menu :default-active="route.path" router :default-openeds="openeds" active-text-color="#409eff" text-color="#fff" background-color="rgba(0, 0, 0, 0)">
        <el-sub-menu :index="demoItem.index" v-for="(demoItem, demoIndex) in demoConfig">
          <template #title>
            <span>{{ demoItem.title }}</span>
          </template>
          <el-menu-item :index="childrenItem.path" v-for="(childrenItem, childrenIndex) in demoItem.children">
            {{ childrenItem.name }}
          </el-menu-item>
        </el-sub-menu>
        

      </el-menu>
    </div>
    <div class="right">
      <RouterView></RouterView>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { useRoute} from 'vue-router'
import { ref, reactive, shallowRef } from 'vue'
import demoConfig from './demoConfig.js'
const route = useRoute()
const openeds =ref(['1'])
interface childrenItem {
    name:string,
    path:string,
    index: string
}

</script>
<style scoped lang='less'>
.demo-container {
  display: flex;
  max-height: calc(100vh - 59px);

  .left {
    min-width: 15%;
    max-height: calc(100vh - 59px);
    flex-shrink: 0;
    overflow: scroll;
    border-right: 1px solid #fff;

    .el-menu {
      height: 100%;
    }
  }

  .right {
    box-sizing: border-box;
    padding-bottom: 20px;
    flex: 1;
    max-height: calc(100vh - 59px);
    overflow: auto;
  }
}
.el-menu{
  border: 0;
}
</style>
