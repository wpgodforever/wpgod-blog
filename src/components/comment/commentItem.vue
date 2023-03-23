<template>
  <div class="item-container">
    <el-avatar :size="50" :src="circleUrl" />
    <div class="right flex-col">
      <div class="right-name">{{ reply_user_id.username }}</div>
      <div class="right-content">{{ content }}</div>
      <div class="right-reply flex-align">
        <span class="reply-span hand" @mousedown.capture.prevent.stop="switchReply"><el-icon>
            <ChatDotSquare />
          </el-icon>回复</span>
        <span class="time">{{ timeTransform(createdAt) }}</span>
      </div>
      <div class="reply-box">
        <div class="reply-box-input flex-col" v-show="showReply">
          <el-input
            ref="replyRef"
            @blur="replyBlur"
            style="white-space: pre-line"
            v-model="replyContent"
            :autosize="{ minRows: 4 }"
            type="textarea"
            :placeholder="'回复' + reply_user_id.username + ':'"
          />
          <el-button @mousedown.capture.prevent.stop="send" type="primary"
            >发表评论</el-button
          >
        </div>
        <div class="reply-box-item" v-if="info.replys.length > 0">
            <replyItem :replyInfo="item" v-for="(item,index) in info.replys" :key="item._id" :commonId="info.id" v-bind="$attrs"></replyItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { commentReply } from '@/api/comment/index';
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { timeTransform } from '@/lib/utils.js'
import replyItem from '@/components/comment/replyItem.vue'
// 获取pinia用户数据
const user = useUserStore()
// 获取是否登录
const { userId } = storeToRefs(user)
const emit = defineEmits(['replySuccess']);
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
});
const { circleUrl } = toRefs(state);
const props = defineProps({
  info: {
    default: () => ({
      reply_user_id: {
        username: '',
        _id: ''
      },
      content: '',
      id: '',
      article_id: '',
      replys:[],
      createdAt:''
    })
  },
});

const { reply_user_id, content, createdAt } = toRefs(props.info);
const replyRef = ref();
const replyContent = ref('');
const showReply = ref(false);
const send = () => {
  if (!replyContent.value.trim()) {
    ElMessage({
      message: '不可输入纯空格',
      center: true,
      type: 'error'
    });
    return;
  }
  
    commentReply({
      replyContent:replyContent.value,
      reply_common_id: props.info.id,
      reply_user_id: userId.value,
      get_reply_user_id: reply_user_id.value._id,
      article_id: props.info.article_id || null
    }).then((res) => {
      console.log(res)
      ElMessage({
        message: '回复成功',
        center: true,
        type: 'success'
      });
      replyContent.value = '';
      showReply.value = false
      emit('replySuccess');
    });
};
const switchReply = () => {
  showReply.value = !showReply.value;
  if (showReply.value) {
    //如果是显示输入框，则自动获取焦点
    replyRef.value.focus();
  }
};

const replyBlur = () => {
  showReply.value = false;
};
</script>
<style scoped lang="less">
.item-container {
  display: flex;
  margin-bottom: 30px;
  .right {
    flex: 1;
    margin-left: 20px;
    &-name {
      font-size: 15px;
      margin-bottom: 10px;
    }
    &-reply {
      font-size: 15px;
      margin-top: 10px;
      .el-icon {
        margin-right: 7px;
      }
      .time{
          margin-left: 20px;
      }
      .reply-span:hover {
        color: #1171ee;
      }
    }
    .reply-box {
      align-items: end;
      &-input {
        min-height: 80px;
        border-radius: 10px;
        margin-top: 10px;
        .el-button {
          margin-top: 10px;
          margin-left: auto;
        }
      }
      &-item{
        padding: 20px 20px 1px 20px;
        margin-top: 15px;
      }
    }
  }
}
</style>
