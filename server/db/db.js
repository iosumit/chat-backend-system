const uuidv4 = require('uuid');
const shared = require('../utils/shared.module');

const users = [];
const chats = [];
const channels = [];

const dbInit = () => {

    const user = {
        _id: uuidv4.v4(),
        first_name: "Chat.io",
        last_name: "Best App",
        username: 'chat.io',
        pin: '1111',
        active: true,
        profile_image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        created_at: (new Date()).toISOString(),
        updated_at: (new Date()).toISOString(),
    };
    users.push(user);

    const images = [
        'https://images.unsplash.com/photo-1686053506794-35ec7a335d44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        'https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    ];
    for (const i of images) {
        const firstName = shared.makeUsername(5);
        const lastName = shared.makeUsername(5);
        const user = {
            _id: uuidv4.v4(),
            first_name: firstName,
            last_name: lastName,
            pin: '1111',
            username: firstName + lastName,
            active: true,
            profile_image_url: i,
            created_at: (new Date()).toISOString(),
            updated_at: (new Date()).toISOString(),
        }
        users.push(user);
    }
}

module.exports = { users, chats, channels, dbInit }