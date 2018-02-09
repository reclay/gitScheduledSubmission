const nodemailer = require('nodemailer');
const {handleErr} = require('../log/log');
const {mailConf} = require('../config/index');

let sendMail = (msg) => {
    let transporter = nodemailer.createTransport(mailConf.smtpConfig);
    let mailOption = mailConf.mailOption;
    mailOption.to.forEach(email => {
        let _msg = msg.msg;
        let _mailOption = {
            subject: 'gitScheduledSubmission',
            text: msg.type === 'error' ? `git 自动提交出错了\n${_msg}` : `git 自动提交成功\n${_msg}`,
            html: msg.type === 'error' ? `<p>git 自动提交出错了</p><p>${_msg}<p>` : `<p>git 自动提交成功</p><p>${_msg}<p>`
        }
        _mailOption.from = mailOption.from;
        _mailOption.to = email;
        transporter.sendMail(_mailOption, (err, info) => {
            if (err) {
                console.log(err);
                handleErr(JSON.stringify(err));
            }
        });
    })
};

module.exports = {
    sendMail
};
