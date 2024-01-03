const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  chainWebpack (config) {
    config.resolve.alias
      .set('@api', resolve('src/api'))
  },
  transpileDependencies: ['uview-ui']
  // transpileDependencies: ['@dcloudio/uni-ui', 'luch-request']    
}

