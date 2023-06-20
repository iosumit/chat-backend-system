const socketInstances = require("../db/user.socket.instance");
const { makeUsername } = require("../utils/shared.module");

const socketMessageSend = function (input) {
    console.log("Send", input);
    socketInstances.getSocketInstance('648840483dbccd58435d899d').emit("648840483dbccd58435d899d", makeUsername(5))
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