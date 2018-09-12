module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  copy: {
    patterns: [
      { from: 'src/components/wxParse/', to: 'dist/components/wxParse/' }, // 指定需要 copy 的目录
      { from: 'src/iconfont/', to: 'dist/iconfont/' }, // 指定需要 copy 的目录
      // { from: 'src/asset/', to: 'dist/asset/' }, // 指定需要 copy 的目录
    ],
    // options: {
    //   // ignore: ['*.js'] // 这里配置过滤暂时用不了
    // }
  },
  defineConstants: {
  },
  weapp: {
  },
  h5: {
    devServer: {
      proxy:{
        '/api': {
          target: 'https://www.heyuhsuo.xyz/heyushuo',
          secure: false
        }
      }
    }
  }
}
