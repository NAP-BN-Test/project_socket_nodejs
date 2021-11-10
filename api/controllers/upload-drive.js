const fs = require('fs')
const readLine = require('readline')
const { google } = require('googleapis')
const path = require('path')


// client id of the project

var CLIENT_ID = "672453115409-8lj6c9hvaaf3qbfce8mjpnss22vgeeq4.apps.googleusercontent.com";
const CLINET_SECRET = "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"; // replace with your client secret

// redirect_uri of the project
// khi cho phép hết sẽ chuyển về trang này
// var REDIRECT_URI = "http://localhost:5500/upload.html";
var REDIRECT_URI = "https://developers.google.com/oauthplayground";

// scope of the project

var SCOPE = "https://www.googleapis.com/auth/drive";

const REFRESH_TOKEN = "1//045CwxbVJ0k1OCgYIARAAGAQSNwF-L9Irdrhod_eVGmbknShj5IEPnx3pu42aay85zplDbKLgAMMSU8gufzJsp1FCbLBkFHXIrW8"
// the url to which the user is redirected to

var url = "";


// this is event click listener for the button


const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLINET_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

// const filePath = 'D:/images_services/ageless_sendmail/testuploadfile.jpg'

async function uploadFile(filePath) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'test.jpg',
                mimeType: 'image/jpg'
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

// Xóa file upload
// '1GENCXI-_1ne5t3ym2Bb5gN2QK7JgximT'
async function deleteFile(idFile) {
    try {
        const response = await drive.files.delete({
            fileId: idFile
        })
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error);
    }
}
// Tạo ra link tải và link xem
// const fileId = '16s8kQD0YE5GVpm7cpmmhYe7HqjS9sRDG'
async function generatePublicUrl(fileId) {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        })
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}
// 
async function createFolder(nameFolder) {
    var fileMetadata = {
        'name': nameFolder,
        'mimeType': 'application/vnd.google-apps.folder'
    };
    drive.files.create({
        resource: fileMetadata,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            console.log('Folder Id: ', file.data.id);
        }
    });
}
// var folderId = '1ujGCxy6vTptr4xGfddGmgflAFHTYfPRb';
async function createFileInFolder(folderId) {
    var fileMetadata = {
        'name': 'photo.jpg',
        parents: [folderId]
    };
    var media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(filePath)
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            console.log('File Id: ', file.data);
        }
    });
}
module.exports = {
    uploadFile,
    deleteFile,
    generatePublicUrl,
    createFolder,
    createFileInFolder,
}