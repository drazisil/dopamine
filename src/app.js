import { Config } from './config/index.js'
import express from 'express'
import { routeHandler } from './middleware/routeHandler.js'
import { logger } from './middleware/logger.js'
const app = express()



app.use(logger)
app.use(routeHandler)

app.listen(Config.WebPort, () => {
  console.log(`Example app listening on port ${Config.WebPort}`)
})