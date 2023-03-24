<template>
  <div class="container themeBg">
    <div class="formContainer">
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <div class="tags-box flex-align">
            <div
              class="tag-item hand"
              :class="[form.tags.includes(item) ? 'select' : '']"
              @click.prevent="tagClick(item)"
              v-for="(item, index) in tagList"
              :key="index"
              round
            >
              {{ item }}
            </div>
            <el-input
              style="width: 200px; margin-right: 20px"
              v-model="addTagVal"
              placeholder="请输入要新增的标签"
            />
            <el-button
              type="primary"
              @click="addTag"
              :disabled="addTagVal === ''"
              >新增标签</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch :active-value="1" :inactive-value="0" v-model="form.isTop" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-upload
            class="avatar-uploader"
            :action="`${baseUrl}article/uploadImg/cover`"
            :show-file-list="false"
            :headers="uploadHeaders"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="handleAvatarError"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item style="padding-left: 40px">
          <el-button type="primary" @click="onSubmit(ruleFormRef)">{{
            isUpdateMode ? '更新' : '发布'
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="editor-box">
      <MdEditor
        class="editor themeBg"
        v-model.trim="form.text"
        previewTheme="mk-cute" theme="dark"
        @on-upload-img="onUploadImg"
      />
      <!-- <MdEditor previewOnly /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, toRaw } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { UploadProps, FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { Plus } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { articlePostFn, articleDetailFn, articleUpdateFn, articleTagsFn } from '@/api/article/index';
import axios from 'axios';
import baseUrl from '@/assets/js/baseUrl';
import { id } from 'element-plus/es/locale';
const user = useUserStore();
const { userInfo } = storeToRefs(user);
const router = useRouter();
const route = useRoute();
// 是否是修改模式，不是就是发布文章模式-----------------------------------
const isUpdateMode = computed(() => {
  return route.name === 'articleUpdate';
});
if (isUpdateMode.value) {
  //查询出该篇文章
  articleDetailFn({ _id: route.params.id }).then((res) => {
    console.log(res);
    const formKey = Object.keys(form);
    formKey.forEach((v) => {
      form[v] = res.data[0][v];
    });
  });
}
// 上传文章封面-----------------------------------

const uploadHeaders = computed(() => {
  return { Authorization: 'Bearer ' + userInfo.value.token };
});
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  form.cover = response.url
};
const handleAvatarError = (err) => {
  const errStr = JSON.parse(err.message);
  ElMessage.error(errStr.msg);
  if (errStr.code === 401) {
    localStorage.removeItem('my_user');
    // 清除用户信息缓存，刷新当前页面
    router.push('/index');
  } else {
    form.cover = '';
  }
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('请上传png或者jpg格式的图片');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('上传的图片不要超过20MB!');
    return false;
  }
  return true;
};
// ---------------------------------------------
// 发布文章
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  title: '',
  tags: [],
  desc: '',
  cover: '',
  text: ``,
  isTop:0
});
const rules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 3, message: '最少3个字哦', trigger: 'blur' }
  ],
  tags: [
    {
      required: true,
      message: '请选择标签',
      trigger: 'blur'
    }
  ]
});
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (!form.text) {
        ElMessage.error('请输入文章内容');
      } else {
        let info = {
          ...toRaw(form),
          author: toRaw(userInfo.value._id),
          id: isUpdateMode.value? route.params.id  : ''
        };
        const method = isUpdateMode.value? articleUpdateFn:articlePostFn
        console.log(info);
        method(info).then((res) => {
          ElMessage.success(`${isUpdateMode.value?'更新成功':'发布成功'}`);
          setTimeout(() => {
            router.push('/index');
          }, 1000);
        });
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};
// 在文章中使用图片
// 无论是在文章中直接CV图片亦或者上传图片。都会触发这个方法
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append('file', file);
        axios
          .post(`${baseUrl}article/uploadImg/detail`, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + user.userInfo.token
            },
            withCredentials: false
          })
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(
    res.map((item) => {
      console.log(item);
      return item.data.url;
    })
  );
};
// ------------------------------
// 标签相关
const articleTagsList = () => {
  articleTagsFn().then(res => {
    tagList.push(...res.data)
  })
}
articleTagsList()
let tagList = reactive([]);
const addTagVal = ref('');
const tagClick = (item: String) => {
  if (!form.tags.includes(item)) {
    form.tags.push(item);
  } else {
    const index = form.tags.findIndex((tagItem) => item === tagItem);
    form.tags.splice(index, 1);
  }
};
const addTag = () => {
  tagList.push(addTagVal.value);
  addTagVal.value = '';
};
</script>
<style scoped lang="less">
.container {
  flex: 1;
  display: flex;
  height: 100%;
  .formContainer {
    width: 50vw;
    min-height: 100%;
    overflow: scroll;
  }
  .tags-box {
    flex-wrap: wrap;
    margin-right: 15px;
    margin-top: -10px;

    .tag-item {
      padding: 8px 15px;
      border-color: var(--el-button-border-color);
      border: var(--el-border);
      border-radius: 20px;
      line-height: 14px;
      margin: 10px 15px 10px 0;

      span {
        height: 14px;
      }
    }

    .select {
      background-color: #539b2e;
      color: #fff;
    }
  }

  .el-form {
    padding: 20px;
  }

  .editor-box {
    width: 50vw;
    .editor {
      height: calc(100vh - 59px) !important;
    }
  }
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed#fff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
:deep(.el-textarea){
  --el-input-bg-color: #232323!important;
  --el-input-text-color: #fff;
}

:deep(.el-input){
  --el-input-bg-color: #232323!important;
  --el-input-text-color: #fff;
}
:deep(.el-form-item__label){
  color: #fff;
}
.md-editor-dark {
  --md-bk-color: rgba(0, 0, 0,.1);
}
</style>
