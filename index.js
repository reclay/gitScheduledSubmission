const tasks = require('./config/index').tasks;
const processGit = require('./src/processGit');
const schedule = require('node-schedule');
const moment = require('moment');

tasks.forEach(task => {
    let time = task.time;
    setTimeout(() => {
        console.log('first start', moment().format('YYYY-MM-DD HH:mm:ss'));
        processGit(task.path);
    }, 120 * 1000);
    schedule.scheduleJob(time, () => {
        console.log('task start', moment().format('YYYY-MM-DD HH:mm:ss'));
        processGit(task.path);
    });
});
