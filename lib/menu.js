const { Menu } = require('electron')

const template = [{
  label: 'File',
  submenu: [
    {
      label: 'New',
      submenu: [
        {
          label: 'Blank Project',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.send('new-blank', true)
          }
        }, {
          label: 'Example Project',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.send('new-example', true)
          }
        }, {
          label: 'Upload Project',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.send('new-upload', true)
          }
        }
      ]
    },
    {
      type: 'separator'
    },
    {
      label: 'Back To Projects',
      click (item, focusedWindow) {
        if (focusedWindow) focusedWindow.webContents.send('back-projects', true)
      }
    }
  ]
}, {
  label: 'Edit',
  submenu: [
    {
      role: 'undo'
    },
    {
      role: 'redo'
    },
    {
      type: 'separator'
    },
    {
      role: 'cut'
    },
    {
      role: 'copy'
    },
    {
      role: 'paste'
    },
    {
      role: 'pasteandmatchstyle'
    },
    {
      role: 'delete'
    },
    {
      role: 'selectall'
    }
  ]
}, {
  label: 'View',
  submenu: [
    {
      label: 'Show Menu',
      click (item, focusedWindow) {
        if (focusedWindow) focusedWindow.webContents.send('toggle-menu', true)
      }
    },
    {
      label: 'Show Share',
      click (item, focusedWindow) {
        if (focusedWindow) focusedWindow.webContents.send('toggle-share', true)
      }
    },
    {
      label: 'Toggle Recent Changes',
      click (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.webContents.send('toggle-recent-changes', true)
        }
      }
    },
    {
      label: 'Toggle Chat',
      click (item, focusedWindow) {
        if (focusedWindow) focusedWindow.webContents.send('toggle-chat', true)
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click (item, focusedWindow) {
        if (focusedWindow) focusedWindow.reload()
      }
    },
    {
      label: 'Toggle Developer Tools',
      accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
      click (item, focusedWindow) {
        if (focusedWindow) focusedWindow.webContents.toggleDevTools()
      }
    },
    {
      type: 'separator'
    },
    {
      role: 'resetzoom'
    },
    {
      role: 'zoomin'
    },
    {
      role: 'zoomout'
    },
    {
      type: 'separator'
    },
    {
      role: 'togglefullscreen'
    }
  ]
}, {
  role: 'window',
  submenu: [
    {
      role: 'minimize'
    },
    {
      role: 'close'
    }
  ]
}]

if (process.platform === 'darwin') {
  const name = 'ShareLatex'
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  )
  // Window menu.
  template[4].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
}

module.exports = Menu.buildFromTemplate(template)
