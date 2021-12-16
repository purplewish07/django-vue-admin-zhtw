import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/system/permission/',
    method: 'get'
  })
}

export function getAll_Work_list() {
  return request({
    url: '/report_system/work_list/',
    method: 'get'
  })
}

export function createWork_order(data) {
  return request({
    url: '/report_system/work_list/',
    method: 'post',
    data
  })
}

export function updateWork_order(id, data) {
  return request({
    url: `/report_system/work_list/${id}/`,
    method: 'put',
    data
  })
}

export function deleteWork_order(id) {
  return request({
    url: `/report_system/work_list/${id}/`,
    method: 'delete'
  })
}
