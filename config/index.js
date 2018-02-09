module.exports = {
    tasks: [{
        path: 'E:\\gvp-compare\\clay',
        time: '5 */2 * * 1-5'
    }],
    mailConf: {
        smtpConfig: {
            host: 'mail.*.com',
            port: 25,
            secure: false,
            auth: {
                user: '*@*.com',
                pass: '*******'
            }
        },
        mailOption: {
            from: '*@*.com',
            to: ['*@*.com']
        }
    }
};
