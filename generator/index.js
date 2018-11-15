const emptyFile = require('../util/emptyFile');

module.exports = (api, options) => {
  console.log(options);
  api.extendPackage({
    scripts: {
      'ria-create': 'vue-cli-service ria-create'
    },
    dependencies: {
        'veui': '^1.0.0-alpha.18',
        'veui-theme-one': '^1.0.0-alpha.18',
        've-ria': '^1.0.0-alpha.10',
        'moment': '^2.22.2',
        'axios': '^0.18.0',
        'svg-innerhtml': '^1.1.0'
    },
    devDependencies: {
        'babel-preset-veui': '^1.0.0-alpha.18',
        'babel-plugin-veui': '^1.0.0-alpha.18',
        'veui-loader': '^1.0.0-alpha.18',
        "multiparty": "^4.2.1",
        'body-parser': '^1.18.3',
    },
    vue: {
      transpileDependencies: [
        /\bnode_modules\/veui\b/,
        /\bvue-awesome\b/,
        /\bresize-detector\b/,
        /\bve-ria\b/
      ],
      devServer: {
        index: 'client.html'
      },
      pages: {
        client: {
          entry: 'src/client/main.js',
          template: 'entry/client.html'
        }
      },
      chainWebpack: config => {
        /*eslint-disable no-template-curly-in-string*/
        config.module
          .rule('veui')
          .test(/\.vue$/)
          .pre()
          .use('veui-loader')
          .loader('veui-loader')
          .tap(() => {
            return {
              modules: [
                {
                  package: 'veui-theme-one',
                  fileName: '${module}.less'
                },
                {
                  package: 'veui-theme-one',
                  fileName: '${module}.js',
                  transform: false
                }
              ]
            }
          })
        /*eslint-enable no-template-curly-in-string*/

        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => {
          config.module
            .rule('less')
            .oneOf(type)
            .use('less-loader')
            .tap(options => Object.assign({}, options, {javascriptEnabled: true}))
        })
      }
    },
    babel: {
      presets: [
        '@vue/app'
      ],
      plugins: [
        'veui',
        'lodash'
      ]
    }
  })

  api.render('./template')

  api.onCreateComplete(() => {
    emptyFile(api, [
      'src/App.vue',
      'src/main.js',
      'src/assets',
      'src/components',
      'src/views',
      'tests'
    ])
  })
};
