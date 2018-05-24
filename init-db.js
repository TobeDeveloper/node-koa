const fs = require('fs')
const db = require('./db')

let files = fs.readdirSync(__dirname + '/models')
              .filter(f => f.endsWith('.js'))

module.exports = {}

for(let f of files) {
  console.log(`import model from file ${f}...`)
  let name = f.substring(0, f.length - 3)
  require(__dirname + '/models/' + f)
}

db.sync()
