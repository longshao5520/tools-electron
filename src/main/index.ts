import { app, shell, BrowserWindow, ipcMain, nativeTheme, Menu, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/app-icon.png?asset'
import pngToIco from 'png-to-ico'
import fs from 'fs'

app.setName('tools-electron')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 499,
    resizable: false,
    titleBarStyle: 'hiddenInset',
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.tools.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  if (process.platform === 'darwin') {
    const menu = Menu.buildFromTemplate([
      {
        label: app.name,
        submenu: [
          { role: 'about' },
          // { type: 'separator' },
          // { role: 'services' },
          // { type: 'separator' },
          // { role: 'hide' },
          // { role: 'hideOthers' },
          // { role: 'unhide' },
          // { type: 'separator' },
          { role: 'quit' }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectAll' },
          { role: 'undo' },
          { role: 'redo' },
          { role: 'cut' }
        ]
      }
    ])
    Menu.setApplicationMenu(menu)
  }

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// 获取APP当前主题模式
ipcMain.handle('dark-mode', () => {
  return nativeTheme.themeSource
})
// 设置APP主题模式
ipcMain.handle('dark-mode:change', (_, type: 'system' | 'light' | 'dark') => {
  nativeTheme.themeSource = type
  return nativeTheme.themeSource
})

ipcMain.handle('png-to-ico', async () => {
  try {
    const pngPath = dialog.showOpenDialogSync({
      title: '选择需要转换的png图片',
      filters: [{ name: 'png', extensions: ['png'] }],
      properties: ['openFile'] // 选择文件
    }) as string[]
    const ico = await pngToIco(pngPath[0])
    const icoSavePath = dialog.showSaveDialogSync({
      title: '选择保存ico文件的路径',
      defaultPath: 'icon.ico',
      filters: [{ name: 'ico', extensions: ['ico'] }],
      properties: ['createDirectory'] // 选择文件
    }) as string
    fs.writeFileSync(icoSavePath, ico)
    return true
  } catch (e) {
    return e
  }
})
