const { resolve } = require('path')

module.exports ={
  publicPath: './',
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve(__dirname, 'src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve(__dirname, 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}