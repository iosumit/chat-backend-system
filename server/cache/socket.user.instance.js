const userSocketMap = new Map()

const getSocketInstance = (id) => userSocketMap.get(id);

const setSocketInstance = (id, socket) => userSocketMap.set(id, socket);

const removeSocketInstance = (id) => userSocketMap.delete(id);

module.exports = { getSocketInstance, setSocketInstance, removeSocketInstance };