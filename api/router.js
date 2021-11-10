module.exports = function (app) {
    // var checkToken = require('./constants/token');
    var youtube = require('./controllers/youtube');
    var pushNotification = require('./controllers/push.notification');
    const uploadFileDrive = require('./controllers/upload-drive')
    app.route('/youtube').post(youtube.youtubev4);
    app.route('/data_scraping').post(youtube.dataScraping);

    app.route('/push_notification').post(pushNotification.pushNotification);
    app.route('/upload_file').post(uploadFileDrive.uploadFile);
    app.route('/delete_file').post(uploadFileDrive.deleteFile);
    app.route('/create_folder').post(uploadFileDrive.createFolder);
    app.route('/create_file_in_folder').post(uploadFileDrive.createFileInFolder);
}