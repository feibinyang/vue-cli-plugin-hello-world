const bodyParser = require('body-parser');

function mockupRequest(api) {
  // http://icode.baidu.com/repos/baidu/brand-fe/ve-ria-tool/blob/master:src/Builder.ts#L294-316
  return function (req, res, next) {
    if (!req.headers.referer || !/[?&](?:ed|enable_debug)\b/i.test('' + req.headers.referer)) {
      next()
      return
    }
    try {
      const modulePath = api.resolve(req.path.replace(/^\/data/, 'mockup/')) + '.js'
      delete require.cache[modulePath]
      if (/upload$/.test(req.path)) {
        res.type('html')
      }
      else {
        res.type('json')
      }
      const module = require(modulePath)
      module(req, res, next)
    }
    catch (e) {
        res.status(500).send(JSON.stringify(e))
    }
  }
}

module.exports = (api, options) => {

  api.configureDevServer(app => {
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.get(/^\/data/, mockupRequest(api))
    app.post(/^\/data/, mockupRequest(api))
  });

  api.registerCommand('ria-create', {
    description: 'Run the ria-create to generate files',
    usage: 'vue-cli-service ria-create [options]',
    options: {}
  }, args => {});
};
