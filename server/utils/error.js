module.exports = function Err(message, status = 500) {
    this.message = message;
    this.status = status;
}