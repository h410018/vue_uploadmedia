module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_uploadmedia/'
    : '/',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
}
