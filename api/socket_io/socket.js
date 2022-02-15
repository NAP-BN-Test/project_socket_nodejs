var moment = require('moment');
const Sequelize = require('sequelize');

module.exports = {
    sockketIO: async (io) => {
        io.on("connection", async function (socket) {
            socket.on("notification-thaydoidiadiem", async function (data) {
                io.sockets.emit("notification-thaydoidiadiem", { dbname: data.dbnamenhaxe, donhang_thongbao: data.donhang_thongbao });
            });
            console.log('The user is connecting : ' + socket.id);
        })
    },
    socketEmit: async (io, dbname) => {
        io.sockets.emit("notification-zalo", { dbname: dbname });
    },
}