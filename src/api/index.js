/**
 * Created by jerry on 2017/6/9.
 */
import axios from 'axios'
let data = JSON.parse(window.sessionStorage.getItem('access-user'));
var Authorization
if (data != null) {
    Authorization = data.authorization ? data.authorization : ''
} else {
    Authorization = ''
}
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = Authorization;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

//添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//   console.dir(config);
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.response.status == 401){
        sessionStorage.clear()
       location.replace(`/login`)
    }
    // Do something with response error
    return Promise.reject(error);
});

//通用方法
export const POST = (url, params) => {
    return axios.post(`${'/api'}${url}`, params).then((res) => res)
}

export const GET = (url, params) => {
    return axios.get(`${'/api'}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PUT = (url, params) => {
    return axios.put(`${'/api'}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
    return axios.delete(`${'/api'}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PATCH = (url, params) => {
    return axios.patch(`${'/api'}${url}`, params).then(res => res.data)
}
