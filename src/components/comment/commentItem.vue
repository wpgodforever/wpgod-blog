<template>
  <div class="item-container">
    <el-avatar :size="50" :src="circleUrl" />
    <div class="right flex-col">
        <div class="right-name">{{ reply_user_id.username }}</div>
        <div class="right-content">{{ content }}</div>
        <div class="right-reply flex-align hand"><el-icon><ChatDotSquare /></el-icon>回复</div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive, toRefs } from 'vue'
const state = reactive({
    circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
})
const { circleUrl, } = toRefs(state)
const props = defineProps({
    info:{
        default: () => ({
            reply_user_id:{
                username:''
            },
            content:''
        })
    }
})

const { reply_user_id, content } = toRefs(props.info)
</script>
<style scoped lang='less'>
 .item-container{
     display: flex;
     margin-bottom: 30px;
     .right{
         flex: 1;
         margin-left: 20px;
         &-name{
            font-size: 15px;
            margin-bottom: 10px;
         }
         &-reply{
            font-size: 15px;
            margin-top: 10px;
            .el-icon{
                margin-right: 7px;
            }
         }
         &-reply:hover{
            color: #1171ee;
         }
     }
 }
</style>
