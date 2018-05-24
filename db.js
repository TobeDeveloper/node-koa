const Sequelize = require('sequelize')
const uuid = require('uuid')
const config = require('./config')

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 5,
    idle: 10000
  }
})

function generateId() {
  return uuid.v4()
}

const ID_TYPE = Sequelize.STRING(50)
function defineModel(name, attributes) {
  let attrs = {}
  for(let k in attributes) {
    let v = attributes[k]
    if(typeof v === 'object' && v['type']) {
      v.allowNull = v.allowNull || false
      attrs[k] = v
    }
    else {
      attrs[k] = {
        type: v,
        allowNull: false
      }
    }
  } 

  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  }
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  }
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function(obj) {
        let now = Date.now()
        if(obj.isNewRecord) {
          if(!obj.id) {
            obj.id = generateId()
          }
          obj.createdAt = now
          obj.updatedAt = now
          obj.version = 0
        } 
        else {
          obj.updatedAt = Date.now()
          obj.version++
        }
      }
    }
  })
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN']
var exp = {
  defineModel: defineModel,
  sync: () => {
    if(process.env.ENV_PROFILE !== 'pord') {
      sequelize.sync({ force: true })
    }
    else {
      throw new Error('Invalid operation when env profile is prod.')
    }
  } 
}

for(let type of TYPES) {
  exp[type] = Sequelize[type]
}
exp.ID = ID_TYPE
exp.generateId = generateId

module.exports = exp