import BrowserWinHandler from './BrowserWinHandler'

const winHandler = new BrowserWinHandler({
  height: 885,
  minHeight: 885,
  maxHeight: 885,
  width: 1080,
  minWidth: 1080,
  transparent: true,
  frame: false
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

export default winHandler
