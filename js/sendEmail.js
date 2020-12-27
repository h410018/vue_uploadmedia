var nodemailer = require("nodemailer");
var fs = require("fs");
var logging = require("./loggingFunc");
var util = require("util");

module.exports = {
    sendEmail: function (fields, folderPath) {
        //添加檔案至附件陣列等待信件發送
        // let attachments = [];
        // for (let index = 0; index < fs.readdirSync(folderPath).length; index++) {
        //     attachments.push({
        //         filename: fs.readdirSync(folderPath)[index],
        //         path: folderPath + "/" + fs.readdirSync(folderPath)[index],
        //         cid: index + "h410018@gmail.com"
        //     });
        // }
        // console.log(attachments);
        var path = folderPath
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'h410018@gmail.com',
                pass: ''
            }
        });
        // 設置郵件內容
        var message = {
            from: "h410018@gmail.com",
            to: fields.recipient,
            subject: ' 這是來自 ' + fields.driver_name + ' 先生/女士的現場事故照片',
            text: "Plaintext version of the message",
            html: '<html><body>' +
                '<h1>這是來自 ' + fields.driver_name + ' 先生/女士的現場事故照片</h1>' +
                '<h3>事故地址 : ' + fields.accident_address + '</h3>' +
                '<h3>事故時間 : ' + fields.happened_date + '</h3>' +
                '<h3>通知人姓名 : ' + fields.informer_name + '</h3>' +
                '<h3>通知人電話 : ' + fields.informer_phonenumber + '</h3>' +
                '<h3>駕駛人姓名 : ' + fields.driver_name + '</h3>' +
                '<h3>駕駛人電話 : ' + fields.driver_phonenumber + '</h3>' +
                '<h3>車牌號碼 : ' + fields.license_plate_number + '</h3>' +
                '<h3>備註 :' + fields.note + '</h3>' +
                '<h3>上傳者 remote ip : ' + fields.sender_ip + "</h3>"
                // + 
                // '<img style="width:250px;" src="cid:unique@cid">' +
                // '<script src="" async defer></script>' +
                // '</body></html>'
                ,
            attachments: {
                filename: folderPath + ".zip",
                path: "./zipfolder/" + folderPath + ".zip",
                cid: "h410018@gmail.com"
            }
        };
        // 信件發送
        transporter.sendMail(message, function (err, info) {
            console.log("sending email ...")
            console.log(info)
            if (err) {
                console.log(err);
                fs.appendFile("logfolder/" + path + "/" + "error_log.txt", "\n" + err.stack, function (err) {
                    if (err) throw err;
                });
            } else {
                // console.log('Email sent: ' + info.response);
                logging.writeProcessLog(path, util.inspect(info));
                console.log("process done");
            }
        });
    }
}