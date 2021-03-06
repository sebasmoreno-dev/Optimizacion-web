const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const shouldAnalyze = process.argv.includes('--analyze')

const plugins = []

if (shouldAnalyze) {
  const { BundleAnalyzerPlugin } = module.require('webpack-bundle-analyzer')
  plugins.push(new BundleAnalyzerPlugin())
}

const config = {
  mode: nodeEnv,
  entry: './frontend/index.js',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: '.',
    open: 'Google Chrome',
    host: '192.168.1.3',
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
}

module.exports = config
