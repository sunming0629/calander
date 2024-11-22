/*
 * Copyright(C) Beijing Oil Trading Interconnection Technology Co., Ltd. 
 * @Author: sunming
 * @Date: 2024-11-22 17:52:37
 * @LastEditors: sunming
 * @LastEditTime: 2024-11-22 17:52:56
 * @Description: 
 */
/**
 * app 模块，它控制应用程序的事件生命周期。
 * BrowserWindow 模块，它创建和管理应用程序 窗口。
 */
const { app, BrowserWindow } = require('electron')

// 添加一个createWindow()方法来加载vue项目文件
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadURL('http://localhost:8080')
  //此处需要填写需要加载的项目文件，官网案例写的是win.loadFile('index.html')
}
/**
 * 在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口。 
 * 可以通过使用 app.whenReady() API来监听此事件。 
 * 在whenReady()成功后调用createWindow()函数来打开窗口。
 */
app.whenReady().then(() => {
  createWindow()
})