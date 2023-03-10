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

// 更新文章
export function articleUpdateFn(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data: data,
    notNeedQS: true,
  })
}

// 删除文章
export function articleDeleteFn(data) {
  return request({
    url: '/article/delete',
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

// 文章列表
export function articleListFn(data) {
  return request({
    url: '/article/list',
    method: 'get',
    params: data,
  })
}
