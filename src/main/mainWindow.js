import path from 'path'
import BrowserWinHandler from './BrowserWinHandler'
const isDev = process.env.NODE_ENV === 'development'

const INDEX_PATH = path.join(__dirname, '..', 'renderer', 'index.html')
const DEV_SERVER_URL = process.env.DEV_SERVER_URL // eslint-disable-line prefer-destructuring

const winHandler = new BrowserWinHandler({
  height: 885,
  minHeight: 885,
  maxHeight: 885,
  width: 1080,
  minWidth: 1080,
  transparent: true,
  frame: false
})

winHandler.onCreated(browserWindow => {
  if (isDev) {
    browserWindow.loadURL(DEV_SERVER_URL)
  } else {
    browserWindow.loadFile(INDEX_PATH)
    browserWindow.removeMenu()
  }
})

export default winHandler
