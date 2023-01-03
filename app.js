import config from 'config'
import express from 'express'
import bunyan from 'bunyan'
import { TaskList } from './src/TaskList.js'
const app = express()
const port = config.get('web.port')
const appName = config.get('app.name')
const log = bunyan.createLogger({
    name: appName,
    serializers: bunyan.stdSerializers
})

app.taskList = new TaskList()

app.set('view engine', 'pug')

app.get('/', (req, res) => {

    res.render('index', { title: appName, message: 'Welcome!', countDone: res.app.taskList.countOfDone() })
  })
const server = app.listen(port, () => {
  log.info(`${appName} listening on port ${port}`)
})

process.on('SIGTERM', () => {
    log.debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
      log.debug('HTTP server closed')
    })
  })