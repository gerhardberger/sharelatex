const { ipcRenderer } = require('electron')

ipcRenderer.on('back-projects', (event, arg) => {
  document.querySelector('a[href="/project"]').click()
})

ipcRenderer.on('toggle-menu', (event, arg) => {
  document.querySelector('a[tooltip="Menu"]').click()
})

ipcRenderer.on('toggle-share', (event, arg) => {
  document.querySelector('a[tooltip="Share"]').click()
})

ipcRenderer.on('toggle-recent-changes', (event, arg) => {
  document.querySelector('a[tooltip="Recent Changes"]').click()
})

ipcRenderer.on('toggle-chat', (event, arg) => {
  document.querySelector('a[tooltip="Chat"]').click()
})

document.addEventListener('DOMContentLoaded', () => {
  const s = document.querySelector('title').innerHTML

  document.querySelector('title').addEventListener('DOMSubtreeModified',
    event => {
      document.querySelector('title').innerHTML =
        s.replace('- ShareLaTeX, Online LaTeX Editor', '')
    })

  document.querySelector('title').innerHTML =
    s.replace('- ShareLaTeX, Online LaTeX Editor', '')
})
