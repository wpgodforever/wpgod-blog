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

// 文章详情
export function articleDetailFn(data) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: data,
  })
}

// 文章详情
export function articleListFn(data) {
  return request({
    url: '/article/list',
    method: 'get',
    params: data,
  })
}
