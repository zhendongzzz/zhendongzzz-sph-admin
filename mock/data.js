const data = require('./data.json')

module.exports = [
  {
    url: '/home/data',
    type: 'get',
    response: (config) => {
      return {
        code: 20000,
        data
      }
    }
  }
]
