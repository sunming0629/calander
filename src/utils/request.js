/*
 * Copyright(C) Beijing Oil Trading Interconnection Technology Co., Ltd. 
 * @Author: sunming
 * @Date: 2024-11-27 09:52:24
 * @LastEditors: sunming
 * @LastEditTime: 2024-11-27 13:58:46
 * @Description: 
 */
//创建axios实例
import axios from 'axios'
import { ElMessage } from 'element-plus';
//创建axios实例
const service = axios.create({
  //超时时间，这里是5秒
  timeout: 5000,
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  //配置请求头
  config.headers = {
    token: 'zBqRREaVRdrsdtGssAUPIiRMaVCXKhLQ1732677593',
    /*配置请求数据格式Content-Type*/
    //传json数据格式给后端，如果后端是这个接收格式，配置如下（可不写，因为axios默认将 JavaScript 对象序列化为 json格式）
    'Content-Type': 'application/json',
    /*
    //数据会以普通表单形式（键值对，但不支持文件）发送到后端,如果后端是这个接收格式，配置如下
    'Content-Type':'application/x-www-form-urlencoded'
    //一般上传文件用此类型，数据是表单上传文件，配置如下（ps一般这种数据类型将在具体的请求接口中配置，而不在此统一封装，后面将介绍）
    'Content-Type':'multipart/form-data'
    */
    //其他自定义的请求头也可写在这里，比如常见的请求头中携带tooken
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(response => {
  //只返回data中的信息
  const resp = response.data;
  //文件下载类型，直接返回所有的
  if (response.request.responseType == "blob") {
    return response;
  }
  return resp;
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log(error);
  if (error.status == 60002 || error.status == 60003 || error.status == 60004 || error.status == 50015 || error.status == 40004) {
    ElMessage.error(error.message)
    localStorage.removeItem('token')
    location.reload()
  } else {
    ElMessage.error(error.message || '系统错误，请稍后重试')
    return false
  }
  // return Promise.reject(error);
});
//导入文件
export default service

