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

ipcRenderer.on('new-blank', (event, arg) => {
  document.querySelector('aside ul.dropdown-menu[role="menu"] li:nth-child(1) a')
    .click()
})

ipcRenderer.on('new-example', (event, arg) => {
  document.querySelector('aside ul.dropdown-menu[role="menu"] li:nth-child(2) a')
    .click()
})

ipcRenderer.on('new-upload', (event, arg) => {
  document.querySelector('aside ul.dropdown-menu[role="menu"] li:nth-child(3) a')
    .click()
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
