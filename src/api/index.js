/*
 * Copyright(C) Beijing Oil Trading Interconnection Technology Co., Ltd. 
 * @Author: sunming
 * @Date: 2024-11-27 10:12:11
 * @LastEditors: sunming
 * @LastEditTime: 2024-11-27 13:57:46
 * @Description: 
 */
import service from "../utils/request.js";


export function getScheduleList (data) {
  return service({
    //请求路径
    url: `/api/schedule/getScheduleList`,
    //请求方法
    methods: 'post',
    //数据（ps：此处使用了es6解构的语法，原写法为  params: params）				
    data
  })
}
export function addSchedule (data) {
  return service({
    url: `/api/schedule/addSchedule`,
    methods: 'post',
    data
  })
}

export function updateSchedule (data) {
  return service({
    url: `/api/schedule/updateSchedule`,
    methods: 'post',
    data
  })
}

export function deleteSchedule (data) {
  return service({
    url: `/api/schedule/deleteSchedule`,
    methods: 'post',
    data
  })
}
