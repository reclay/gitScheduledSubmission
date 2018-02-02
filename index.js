const tasks = require('./config/index').tasks;
const processGit = require('./src/processGit');
const schedule = require('node-schedule');

tasks.forEach(task => {
    let time = task.time;
    setTimeout(() => processGit(task.path), 120 * 1000);
    schedule.scheduleJob(time, () => {
        processGit(task.path);
    });
});
