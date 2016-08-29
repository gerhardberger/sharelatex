const { app, BrowserWindow, Menu } = require('electron')
const fs = require('fs')
const path = require('path')

const config = require('./lib/config')
const appMenu = require('./lib/menu')

require('electron-debug')()

let mainWindow
let isQuitting = false

const isAlreadyRunning = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    }

    mainWindow.show()
  }
})

if (isAlreadyRunning) {
  app.quit()
}

app.on('ready', () => {
  Menu.setApplicationMenu(appMenu)
  const lastWindowState = config.get('lastWindowState')

  const win = new BrowserWindow({
    title: app.getName(),
    show: false,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    minWidth: 400,
    minHeight: 200,
    // titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'lib', 'browser.js'),
      nodeIntegration: false,
      plugins: true
    }
  })

  mainWindow = win

  if (process.platform === 'darwin') {
    win.setSheetOffset(40)
  }

  win.loadURL('https://www.sharelatex.com/project')

  win.on('close', e => {
    if (!isQuitting) {
      e.preventDefault()

      if (process.platform === 'darwin') {
        app.hide()
      } else {
        win.hide()
      }
    }
  })

  const page = win.webContents
  page.on('dom-ready', () => {
    page.insertCSS(
      fs.readFileSync(path.join(__dirname, 'css', 'browser.css'), 'utf8'))
    mainWindow.show()
  })
})

app.on('activate', () => {
  mainWindow.show()
})

app.on('before-quit', () => {
  isQuitting = true

  if (!mainWindow.isFullScreen()) {
    config.set('lastWindowState', mainWindow.getBounds())
  }
})
