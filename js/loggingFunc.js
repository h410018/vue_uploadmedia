var fs = require('fs');

module.exports = {
    writeProcessLog: function (folderPath, data) {
        fs.appendFileSync("logfolder/" + folderPath + "/" + "process_log.txt", data, function (err) {
            if (err) throw err;
            console.log("appendFile : " + "logfolder/" + folderPath + "/" + "process_log.txt successfully.");
        });
    },
    writeErrorLog: function (folderPath, data) {
        fs.appendFileSync("logfolder/" + folderPath + "/" + "error_log.txt", data, function (err) {
            if (err) throw err;
        });
    }
}