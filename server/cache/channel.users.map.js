const channels = new Map();

const setUsers = (key, list) => channels.set(key, list);

const getUsers = (key) => channels.get(key);

const isExist = (key) => channels.has(key);

module.exports = { setUsers, getUsers, isExist }