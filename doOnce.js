const tasks = require('./config/index').tasks;
const processGit = require('./src/processGit');
const moment = require('moment');

tasks.forEach(task => {
    let time = task.time;
    console.log('first start', moment().format('YYYY-MM-DD HH:mm:ss'));
    processGit(task.path);
});
