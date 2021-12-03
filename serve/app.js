const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use('/dataService', require('./riskControl/index'))
app.use('/dataService', require('./riskControl/risk'))


app.listen('3000', () => {
  console.log(3000);
})