const path = require('path')
const {
  APP_MONITOR_DOMAIN
} = require('./env.config.js') 
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  chainWebpack (config) {
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env'] = Object.assign(definitions[0]['process.env'], {
        APP_MONITOR_DOMAIN: JSON.stringify(APP_MONITOR_DOMAIN),
      })
      return definitions
    })
    config.resolve.alias
      .set('@api', resolve('src/api'))
  },
  transpileDependencies: ['uview-ui']
  // transpileDependencies: ['@dcloudio/uni-ui', 'luch-request']    
}

