<template>
    <!-- 写一个vue3的拖拽案例 -->
    <div class="drag-container">
      <div
      >
        {{ 'shallowrefValue' + shallowrefValue.age }}
      </div>
      <div
      >
        {{ 'shallowReactiveValue' + shallowReactiveValue.obj.a }}
      </div>
      <button @click="shallowrefValueClick">shallowrefValue点击</button>
      <button @click="shallowReactiveValueClick"> shallowReactiveValue点击</button>

    </div>
  </template>
  
  <script lang="ts" name="" setup>
  import { shallowReactive, shallowRef } from "vue";
    const shallowrefValue = shallowRef({
      name: "shallowRef",
      age: 18,
    });
    const shallowReactiveValue = shallowReactive({
        name: "shallowReactive",
        age: 18,
        obj:{
            a:1
        }
    });
    const shallowrefValueClick = () => {
        //这种方式无法触发视图更新
        // shallowrefValue.value.age = 19;
        // setTimeout(() => {
        //     console.log(shallowrefValue.value.age);
        // }, 1000);
        shallowrefValue.value = {
            name: "shallowRefClick",
            age: 20,
        }
    };
    const shallowReactiveValueClick = () => {
        shallowReactiveValue.name = "shallowReactiveClick";
        shallowReactiveValue.obj.a = 20;
    };
  
  </script>
  
  <style scoped lang="less">

  </style>