// eslint-disable-next-line import/no-commonjs
const path = require('path');

const config = {
  projectName: 'coolBrain',
  date: '2020-3-17',
  designWidth: 375,
  deviceRatio: {
    '375': 1 / 2,
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: 'babel-runtime'
      }]
    ]
  },
  alias: {
    '@/utils': path.resolve(__dirname, '../src/utils'),
    '@/components': path.resolve(__dirname, '../src/components'),
    '@/servers': path.resolve(__dirname, '../src/servers'),
    '@/assets': path.resolve(__dirname, '../src/assets'),
    '@/constants': path.resolve(__dirname, '../src/constants'),
    '@/store': path.resolve(__dirname, '../src/store'),
  },
  defineConstants: {},
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 102400 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  copy: {
    patterns: [
      { from: 'src/assets/', to: 'dist/assets/', ignore: '*.js' }, // 指定需要 copy 的目录
      { from: 'src/assets/badges1.png', to: 'dist/assets/badge1.png' }, // 指定需要 copy 的文件
      { from: 'src/assets/badges2.png', to: 'dist/assets/badge2.png' }, // 指定需要 copy 的文件
      { from: 'src/assets/badges3.png', to: 'dist/assets/badge3.png' }, // 指定需要 copy 的文件
      { from: 'src/assets/badges4.png', to: 'dist/assets/badge4.png' }, // 指定需要 copy 的文件
      { from: 'src/assets/badges5.png', to: 'dist/assets/badge5.png' }, // 指定需要 copy 的文件
      { from: 'src/assets/badges6.png', to: 'dist/assets/badge6.png' }, // 指定需要 copy 的文件
      { from: 'src/assets/badges7.png', to: 'dist/assets/badge7.png' }, // 指定需要 copy 的文件
      { from: 'src/assets/badges8.png', to: 'dist/assets/badge8.png' }, // 指定需要 copy 的文件
    ]
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
