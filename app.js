import config from 'config'
import express from 'express'
import bunyan from 'bunyan'
import { TaskList } from './src/TaskList.js'
import { Task } from './src/Task.js'
const app = express()
const port = config.get('web.port')
const appName = config.get('app.name')
const log = bunyan.createLogger({
    name: appName,
    serializers: bunyan.stdSerializers
})

app.taskList = new TaskList()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug')

app.get('/next', (req, res) => {
    try {
        const nextTask = req.app.taskList.getNextTask()
        res.json({ pageTitle: 'Task', message: 'Here you go!', task: nextTask, countDone: res.app.taskList.countOfDone() })        
    } catch (error) {
        if (error instanceof RangeError) {
            res.json({error: 'No tasks!', countDone: res.app.taskList.countOfDone() })                    
        }
    }
})

app.post('/add', (req, res) => {
    /** @type {{title: string, body: string}} */
    const newTaskJson = req.body
    log.info(newTaskJson)

    const newTask = new Task((newTaskJson))

    try {
        req.app.taskList.addTask(newTask)
        res.json({status: 'success', countDone: res.app.taskList.countOfDone()})        
    } catch (error) {
        log.error(error)
        res.json({status: 'error', reason: String(error), countDone: res.app.taskList.countOfDone()})
    }


})

app.get('/', (req, res) => {

    res.json({countDone: res.app.taskList.countOfDone() })
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