import config from 'config'
import express from 'express'
const app = express()
const port = config.get('web.port')
const appName = config.get('app.name')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`)
})