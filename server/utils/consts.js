const STATUS = 'status';
const SUCCESS = 'Success';
const ERROR = 'Error';
const PRODUCTION = 'PRODUCTION';
const DEVELOP = 'DEVELOP';

const CHANNEL_TYPE = {
    single: "SINGLE",
    group: "GROUP"
}
const SCHEMA = {
    User: 'User',
    Channel: 'Channel',
    Message: 'Message',
}
const MessageType = {
    Text: 'Text',
    File: 'File',
    Both: 'Both',
}

module.exports = {
    SCHEMA,
    MessageType,
    STATUS, SUCCESS, ERROR, DEVELOP, PRODUCTION, CHANNEL_TYPE
};