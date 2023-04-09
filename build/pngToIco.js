const fs = require('fs')
const pngToIco = require('png-to-ico')

pngToIco('app.png')
  .then((buf) => {
    fs.writeFileSync('icon.ico', buf)
  })
  .catch(console.error)
