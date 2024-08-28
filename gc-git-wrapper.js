// const logger = require('./logger');

const _pull = function (workingDirPath, retry = 0) {
    return new Promise((resolve, reject) => {
        let _git = require('simple-git')(workingDirPath);
        _git.pull((error, data) => {
            if (error) {
                console.log("Error in pull :: " + workingDirPath + " : " + error);
                if (retry <= 10) {
                    resolve(_pull(workingDirPath, ++retry));
                } else {
                    reject(error);
                }
            } else {
                console.log("Git pull status : " + JSON.stringify(data));
                resolve(true);
            }
        });
    })
}

const _push = function (workingDirPath, pushBranch = 'development') {
    return new Promise((resolve, reject) => {
        let _git = require('simple-git')(workingDirPath);
        _pull(workingDirPath).then((result) => {
            _git.add('./*', (error, data) => {
                if (error) {
                    console.log("Error in add : " + workingDirPath + " : " + error);
                } else {
                    console.log("Git add status : " + JSON.stringify(data));
                    _git.commit('Commited from code generator', '.', (error, data) => {
                        if (error) {
                            console.log("Error in commit : " + workingDirPath + " : " + error);
                        } else {
                            console.log("Git commit status : " + JSON.stringify(data));
                            _git.push('origin', pushBranch, (error, data) => {
                                if (error) {
                                    console.log("Error in push : " + workingDirPath + " : " + error);
                                } else {
                                    console.log("Git push status : " + JSON.stringify(data));
                                    resolve(true);
                                }
                            });
                        }
                    });
                }
            });
        }).catch((error) => {
            console.log("Error in pull : " + workingDirPath + " : " + error);
        });
    });
}
//heelll
const _status = function (workingDirPath) {
    return new Promise((resolve, reject) => {
        let _git = require('simple-git')(workingDirPath);
        _git.status((error, data) => {
            if (error) {
                console.log("Error in status : " + workingDirPath + " : " + error);
            } else {
                console.log("Git status status : " + JSON.stringify(data));
                resolve(data);
            }
        });
    });
}

const _log = function (workingDirPath, logPath) {
    return new Promise((resolve, reject) => {
        let _git = require('simple-git')(workingDirPath);
        _git.log(["-n1", logPath], (error, data) => {
            if (error) {
                console.log("Error in status : " + workingDirPath + " : " + error);
            } else {
                console.log("Git status status : " + JSON.stringify(data));
                resolve(data);
            }
        });
    })
}

const _getLastCommitedVersion = function (workingDirPath, logPath) {
    return new Promise((resolve, reject) => {
        let _git = require('simple-git')(workingDirPath);
        _git.log(["-n1", logPath], (error, data) => {
            if (error) {
                console.log("Error in status : " + workingDirPath + " : " + error);
            } else {
                if (data != undefined && data.latest != undefined) {
                    let hash = data.latest.hash;
                    let hashFirst7 = hash.length > 10 ? hash.substring(0, 7) : hash;
                    resolve(hashFirst7);
                } else {
                    resolve("0000000000");
                }
            }
        });
    })
}

const _getLastCommitedDate = function (workingDirPath, logPath) {
    return new Promise((resolve, reject) => {
        let _git = require('simple-git')(workingDirPath);
        _git.log(["-n1", logPath], (error, data) => {
            if (error) {
                console.log("Error in status : " + workingDirPath + " : " + error);
            } else {
                if (data != undefined && data.latest != undefined) {
                    let date = data.latest.date;
                    //20191226131106 0100
                    date = date.replace(/ /g, '').replace(/-/g, '').replace(/:/g, '').replace(/\+/g, '');
                    if (date.length > 14) {
                        resolve(date.substring(0, 14));
                    } else {
                        resolve(date);
                    }

                } else {
                    resolve("00000000000000");
                }
            }
        });
    })
}

const getDiff = function (workingDirPath, commit1, commit2) {
    return new Promise((resolve, reject) => {
        let _git = require('simple-git')(workingDirPath);
        _git.diffSummary([commit1, commit2], (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        })
    });
}

module.exports = {
    pull: _pull,
    push: _push,
    status: _status,
    log: _log,
    getLastCommitedVersion: _getLastCommitedVersion,
    getLastCommitedDate: _getLastCommitedDate,
    getDiff
}