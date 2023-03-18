import request from '../http/$http'

  
// 发布评论
export function commentInput(data) {
  return request({
    url: '/comment/input',
    method: 'post',
    data: data,
    notNeedQS: true,
  })
}
// 回复评论
export function commentReply(data) {
  return request({
    url: '/comment/reply',
    method: 'post',
    data: data,
    notNeedQS: true,
  })
}

// 文章列表
export function articleListFn(data) {
  return request({
    url: '/article/list',
    method: 'get',
    params: data,
  })
}
