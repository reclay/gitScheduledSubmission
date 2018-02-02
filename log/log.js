const log = require('./log.json');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
let getTime = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
};
let writeLog = (msg) => {
    let _msg = {};
    if (msg.lastCommit) {
        _msg.lastCommit = {};
        _msg.lastCommit.msg = msg.lastCommit.msg;
        _msg.lastCommit.time = getTime();
    }
    if (msg.lastErr) {
        _msg.lastErr = {};
        _msg.lastErr.msg = msg.lastErr.msg;
        _msg.lastErr.time = getTime();
    }
    _msg.lastCheck = {};
    _msg.lastCheck.time = getTime();
    _msg = Object.assign({}, log, _msg);
    let logPath = path.join(__dirname, './log.json');
    fs.writeFileSync(logPath, JSON.stringify(_msg));
};

module.exports = {
    writeLog
};
