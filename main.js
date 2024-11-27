/*
 * Copyright(C) Beijing Oil Trading Interconnection Technology Co., Ltd. 
 * @Author: sunming
 * @Date: 2024-11-22 17:52:37
 * @LastEditors: sunming
 * @LastEditTime: 2024-11-27 14:04:22
 * @Description: 
 */
/**
 * app 模块，它控制应用程序的事件生命周期。
 * BrowserWindow 模块，它创建和管理应用程序 窗口。
 */
const { app, BrowserWindow } = require('electron')
const {
  globalShortcut
} = require('electron');


// 添加一个createWindow()方法来加载vue项目文件
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    type: 'desktop', // 设置窗口类型为 desktop
    frame: false, // 去除窗口边框
    alwaysOnTop: false, // 确保窗口不置顶
    transparent: true, // 设置窗口透明
    webPreferences: {
      // type:'desktop',
      // nodeIntegration: true,
      // contextIsolation: false
    }
  })
  win.loadURL('http://localhost:8080')
  // 将窗口移动到屏幕的某个位置，这里假设是屏幕的右下角
  const screen = require('electron').screen;
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  win.setPosition(width / 2 - win.getBounds().width / 2, height - win.getBounds().height);
  globalShortcut.register('CommandOrControl+Shift+i', function () {
    win.webContents.openDevTools();
  });
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