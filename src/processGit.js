const {writeLog, handleErr} = require('../log/log');
const {getCommitMsg, gitCommit} = require('./git');
const {sendMail} = require('./mail');
const path = require('path');
const shell = require('shelljs');

let processGit = (gitRep) => {
    console.log('get msg...');
    getCommitMsg(gitRep).then((msg) => {
        let _gitRep = path.normalize(gitRep);
        shell.cd(_gitRep);
        let commond = 'git pull';
        console.log(commond);
        if (!msg) {
            shell.exec(commond);
            writeLog({});
            return;
        }
        shell.exec(commond, (code, stdout, stderr) => {
            if (code) return handleErr(stderr);
            commond = 'git add .';
            console.log(commond);
            shell.exec(commond, (code, stdout, stderr) => {
                if (code) return handleErr(stderr);
                console.log('git commit');
                gitCommit(_gitRep, msg).then(oid => {
                    commond = 'git push';
                    console.log(commond);
                    shell.exec(commond, (code, stdout, stderr) => {
                        if (code) return handleErr(stderr);
                        writeLog({lastCommit: {
                            oid,
                            msg
                        }});
                        sendMail({
                            msg: msg,
                            type: 'success'
                        })
                        console.log('success');
                    });
                });
            });
        });
    }).catch(handleErr);
};

module.exports = processGit;
