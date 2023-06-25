const messageController = require('../controller/message.controller');

const socketRoutes = (socket) => {
    socket.on("message:send", (payload) => messageController.newMessageviaSocket(payload, socket));
    socket.on("message:delete", messageController.deleteMessage);
    socket.on("message:update", messageController.deleteMessage);

    socket.on("channel:block", () => { });
    socket.on("channel:unblock", () => { });
    socket.on("channel:update", () => { });
    socket.on("channel:new", () => { });

    socket.on("user:update", () => { });
    socket.on("user:delete", () => { });
}

module.exports = socketRoutes;