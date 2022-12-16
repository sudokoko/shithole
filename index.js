const express = require('express')
const directory = require('serve-index');
const app = express()
const port = 80 // http

app.use('/', directory(__dirname + '/content'));

app.listen(port, () => {
    if(port === 80)
    {
        console.warn(`If you plan on using this legitimately, please change the port variable to 443 :)`)
    }
  console.log(`App listening on port ${port}`)
})