const app = require('./app') // Express application
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})