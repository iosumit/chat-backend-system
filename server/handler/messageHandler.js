const userSocketMap = require("../db/user.socket.instance");

const socketMessageSend = function (input) {
    console.log("Send", input);
};

const socketMessageDelete = function (input) {
    console.log("Delete", input);
};
const socketMessageUpdate = function (input) {
    console.log("Update", input);
};

module.exports = {
    socketMessageDelete, socketMessageSend, socketMessageUpdate
}