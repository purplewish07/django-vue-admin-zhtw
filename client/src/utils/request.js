import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if(res.code>=200 && res.code<400){
      return res
    }
    if (res.code === 401) {
      if(res.msg.indexOf('No active account')!=-1){
        Message({
          message: '用戶名或密碼錯誤',
          type: 'error',
          duration: 3 * 1000
        })
      }else{
        MessageBox.confirm('認證失敗,請重新登陸.', '確認退出', {
          confirmButtonText: '重新登陸',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      
    } else if (res.code >= 400) {
      Message({
        message: res.msg || '請求出錯',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(new Error(res.msg || '請求出錯'))
    }
  },
  error => {
    // console.log(error,response) // for debug
    Message({
      message: "服務器錯誤",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
