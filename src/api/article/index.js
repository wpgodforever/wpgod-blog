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
