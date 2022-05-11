import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/system/permission/',
    method: 'get'
  })
}

export function getAll_Task_list() {
  return request({
    url: '/task_system/task_list/',
    method: 'get'
  })
}

export function createTask_order(data) {
  return request({
    url: '/task_system/task_list/',
    method: 'post',
    data
  })
}

export function updateTask_order(id, data) {
  return request({
    url: `/task_system/task_list/${id}/`,
    method: 'put',
    data
  })
}

export function deleteTask_order(id) {
  return request({
    url: `/task_system/task_list/${id}/`,
    method: 'delete'
  })
}
