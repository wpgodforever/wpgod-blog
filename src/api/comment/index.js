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

// 留言板列表
export function boardList(data) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: data,
  })
}
// 留言板评论列表
export function boardReply(data) {
  return request({
    url: '/comment/board',
    method: 'post',
    data: data,
    notNeedQS: true,
  })
}
