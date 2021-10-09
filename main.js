const { app, BrowserWindow, Menu } = require('electron')




const isMac = process.platform === 'darwin'

const template = [
  // { role: 'fileMenu' }
  {
    role: 'fileMenu',
    label: '文件(F)',
    submenu: [
      {
        role: 'quit',
        label: '退出',
      }
    ]
  },
  // { role: 'editMenu' }
  {
    label: '编辑',
    label: '编辑(E)',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'windowMenu' }
  {
    label: '格式',
    label: '格式(O)',

    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: '查看',
    label: '查看(V)',

    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'helpMenu' }
  {
    role: 'help',
    label: '帮助(H)',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]



function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // win.loadFile('index.html')
  win.loadURL('http://localhost:3000/')
  win.webContents.openDevTools()
  win.setOverlayIcon('./notepad.png', 'Description for overlay')

}
app.whenReady().then(() => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  createWindow()

})