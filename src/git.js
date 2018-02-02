const Git = require('nodegit');
const path = require('path');
let statusToText = (status) => {
    let words = [];
    if (status.isNew()) {
        words.push("NEW");
    }
    if (status.isModified()) {
        words.push("MODIFIED");
    }
    if (status.isTypechange()) {
        words.push("TYPECHANGE");
    }
    if (status.isRenamed()) {
        words.push("RENAMED");
    }
    if (status.isIgnored()) {
        words.push("IGNORED");
    }
    if (status.isDeleted()) {
        words.push("DELETED");
    }
    return words.join(" ");
}
let getCommitMsg = (gitRep) => {
    return new Promise((resolve, reject) => {
        let _gitRep = path.join(gitRep, './.git');
        Git.Repository.open(_gitRep).then((repo) => {
            repo.getStatus().then(statuses => {
                if (!statuses.length) {
                    resolve('');
                }
                let commitMsg = statuses.map(function (file) {
                    return file.path() + " " + statusToText(file);
                }).join('\n');
                commitMsg = 'feat: The following files have been modified \n\n' + commitMsg;
                resolve(commitMsg);
            });
        }).catch(err => {
            reject(err);
        });
    });
};
let gitCommit = (gitRep, msg) => {
    return new Promise((resolve, reject) => {
        let _gitRep = path.join(gitRep, './.git');
        Git.Repository.open(_gitRep).then((repo) => {
            let author = Git.Signature.default(repo);
            let committer = author;
            repo.createCommitOnHead([], author, committer, msg).then(oid => {
                resolve({
                    type: 'success',
                    oid
                });
            });
        }).catch(err => {
            reject(err);
        });
    });
}
module.exports = {
    getCommitMsg,
    gitCommit
};
