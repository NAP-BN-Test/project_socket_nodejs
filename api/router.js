module.exports = function (app) {
    // var checkToken = require('./constants/token');
    var youtube = require('./controllers/youtube');
    var pushNotification = require('./controllers/push.notification');

    app.route('/youtube').post(youtube.youtubev4);
    app.route('/data_scraping').post(youtube.dataScraping);

    app.route('/push_notification').post(pushNotification.pushNotification);

}