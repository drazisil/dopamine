import express from 'express'
import { authRouter } from 'auth'
const app = express()
const port = 3000

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})