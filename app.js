import config from 'config'
import express from 'express'
import { routeHandler } from './src/middleware/routeHandler.js'
import { logger } from './src/middleware/logger.js'
import { oauthMiddleware } from './src/middleware/oauth.js'
const app = express()

app.use(logger)
app.use(async (req, res, next) => {
    try {
	oauthMiddleware (req, res, next)
    next()
} catch (error) {
	next(error)
}
})
app.use(routeHandler)

if (!config.has('server.port')) {
  log.error('server.port is not set')
  process.exitCode = -1
} else 
app.listen(config.get('server.port'), () => {
  console.log(`${config.get('app.name')} listening on port ${config.get('server.port')}`)
})

