const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')
const path = require('path')
const fs = require('fs')

module.exports = defineConfig({
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    port: 8091,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'ant-prefix': 'av2',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    output: {
      library: `${name}`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks')
    // 导出微模块
    const modulePath = path.join(__dirname, './src/modules')
    const modules = fs.readdirSync(modulePath)
    modules.forEach((item) => {
      const name = item.match(/^(.*)\.ts$/)[1]
      // 忽略模块生命周期文件
      if (name !== 'moduleLifeCycle') {
        config.entry(name).add(path.join(modulePath, item))
      }
    })
  },
})
