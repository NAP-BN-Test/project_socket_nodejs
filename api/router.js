module.exports = function (app) {
    // var checkToken = require('./constants/token');
    var youtube = require('./controllers/youtube');

    app.route('/youtube').post(youtube.youtubev4);

}