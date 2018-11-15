var mockup = require('vue-cli-plugin-hello-world/util/mockup');

module.exports = function (req, res) {

    return mockup.ok(req, res, {
        adOwner: {
            username: '广告主',
            id: 123,
            auth: {},
            forceWiseAd: false,
            consultPhoneReport: true
        },
        visitor: {
            username: '访问者',
            roleId: 1,
            id: 123,
            auth: {
            }
        }
    });
};
