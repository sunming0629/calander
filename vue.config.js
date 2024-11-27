/*
 * Copyright(C) Beijing Oil Trading Interconnection Technology Co., Ltd. 
 * @Author: sunming
 * @Date: 2024-11-27 09:58:38
 * @LastEditors: sunming
 * @LastEditTime: 2024-11-27 14:06:40
 * @Description: 
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig(
  {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://dev.eeeyou.cn:8014',//后端接口地址
          changeOrigin: true,  //是否允许跨域
          secure: true,
          pathRewrite: {
            '^/api': '/api' //注册全局路径
          }
        },
      }
    }
  }
)

