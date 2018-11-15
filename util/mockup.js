/**
 * @file mockup data
 * @author feibinyang(feibinyang@baidu.com)
 */
const multiparty = require('multiparty');
const fs = require('fs-extra');
const path = require('path');

let success = {
    code: 0,
    result: {}
};
let fail = {
    code: 1,
    message: '系统繁忙'
};

function end(res, data) {
    setTimeout(() => {
        res.end(JSON.stringify(Object.assign(success, data)));
    }, 800);
}

exports.list = function (req, res, obj) {
    const requestParams = Object.assign({}, req.query, req.body);
    const pageParams = {
        pageNo: requestParams.pageNo ? parseInt(requestParams.pageNo, 10) : 1,
        pageSize: requestParams.pageSize ? parseInt(requestParams.pageSize, 10) : 30,
        totalCount: (obj.result || obj.page || []).length ? 100 : 0,
        order: requestParams.order,
        orderBy: requestParams.orderBy
    };
    const result = Object.assign(pageParams, obj);
    end(res, {result});
};

exports.ok = function (req, res, obj = {}) {
    end(res, {result: obj});
};

exports.fail = function (req, res, message = fail.message) {
    end(res, {result: Object.assign(fail, {message})});
};

exports.upload = function (req, res, obj = {}) {
    const form = new multiparty.Form();
    return new Promise(resolve => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).end();
            }
            const fileInfo = files.filedata[0];
            const tmpDir = 'static/.tmp/';
            const absoluteTmpDir = path.resolve(__dirname, '..', tmpDir);
            ensureDirSync(tmpDir);
            const fsOutputPath = path.resolve(absoluteTmpDir, fileInfo.originalFilename);
            fs.writeFileSync(fsOutputPath, fs.readFileSync(fileInfo.path));
            fs.unlinkSync(fileInfo.path);
            let data = {
                url: 'http://' + req.headers.host + '/' + tmpDir + fileInfo.originalFilename,
                previewUrl: 'http://' + req.headers.host + '/' + tmpDir + fileInfo.originalFilename,
                fileName: fileInfo.originalFilename,
                type: fileInfo.originalFilename.split('.').pop()
            };
            resolve(Object.assign(data, obj));
        });
    }).then(result => {
        result = Object.assign(success, {result});
        const resultScript = `${req.query.callback}(${JSON.stringify(result)})`;
        res.end(exports.iframeCallback(resultScript));
    });
};

exports.iframeCallback = function (script) {
    return `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
        <script>
            ${script}
        </script>
    </body>
</html>`;
};
