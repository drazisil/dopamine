import bunyan from 'bunyan'
import config from 'config'
import express from 'express'
import { randomUUID} from "node:crypto"
import { routeHandler } from './src/middleware/routeHandler.js'
import { oauthMiddleware } from './src/middleware/oauth.js'
const app = express()

const log = bunyan.createLogger({
  name: config.get("app.name"),
  serializers: bunyan.stdSerializers,
});

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export function logMiddlewere(req, res, next) {
  req.log = log.child({ req_id: randomUUID() }, true);
  req.log.info({ req });
  res.on("finish", () => req.log.info({ res }));
  next();
}

app.use(logMiddlewere);


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
  log.info(`${config.get('app.name')} listening on port ${config.get('server.port')}`)
})

