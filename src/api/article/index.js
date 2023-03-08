import request from '../http/$http'

  
// 发布文章
export function articlePostFn(data) {
  return request({
    url: '/article/post',
    method: 'post',
    data: data,
    notNeedQS: true,
  })
}

// 上传图片
export function uploadImgFn(data) {
    return request({
      url: '/article/uploadImg',
      method: 'post',
      data: data,
      notNeedQS: true,
    })
  }
