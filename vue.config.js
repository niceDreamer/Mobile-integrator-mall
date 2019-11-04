module.exports = {
  runtimeCompiler: true,
  publicPath: '/', // 设置打包文件相对路径
  devServer: {
    // open: process.platform === 'darwin',
    // host: '192.168.0.103',
    port: 8071,
    open: true,
    proxy: {
      '/zlbgroup-front': {
        target: 'http://m.zcjbpay.com/', // 对应自己的接口
        // target: 'http://192.168.137.1:8080/', // 对应自己的接口
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
}
