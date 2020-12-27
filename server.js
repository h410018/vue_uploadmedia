var express = require('express')
var app = express()
var os = require('os')
var fs = require('fs')
var express = require('express')
var formidable = require('formidable')
var nodemailer = require('nodemailer')
var util = require('util')
var multiparty = require('multiparty')
var JSZip = require('jszip')
var jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path')
var sha256 = require('js-sha256')
var logging = require('./js/loggingFunc')
var {
  sendEmail
} = require('./js/sendEmail')
var {
  jwtVaildate
} = require('./js/vaildate')
var ep = require('./js/secretkey')
var app = express()
var PORT = process.env.PORT || 5000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded
app.use(cors()) // for cross origin resource sharing

app.use(express.static(__dirname + '/dist/'))

app.get('/api/setheader', (req, res) => {
  const secretKey = sha256(ep.secret)
  // 開始設置 token
  const token = jwt.sign({
    token_issued_timestamp: Date.now()
  }, secretKey, {
    expiresIn: 3600 // A numeric value is interpreted as a seconds count
  })
  var verify = jwt.verify(token, secretKey)
  if (verify != null) {
    console.log('current token is vaild : ')
    console.log(verify)
  }
  res.json({
    token: token
  })
})

app.post('/api/upload', function (req, res, next) { // 驗證 request
  jwtVaildate(req, res, next, req.headers)
})
app.post('/api/upload', (req, res, next) => { // 傳送資料操作
  function addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

  var date = new Date(Date.now())
  var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
  var folderPath = '_' + dateStr

  fs.mkdirSync('imagefolder/' + folderPath, {
    recursive: true
  })
  fs.mkdir('logfolder/' + folderPath, {
    recursive: true
  }, function (err) { // 在 logfolder 裡建立資料夾
    if (err) throw err
    fs.writeFileSync('logfolder/' + folderPath + '/process_log.txt', '')
    fs.writeFileSync('logfolder/' + folderPath + '/error_log.txt', '')
  })
  fs.mkdir('zipfolder/', {
    recursive: true
  }, function (err) {
    if (err) throw err
  })

  const form = new formidable.IncomingForm({
    uploadDir: 'imagefolder/' + folderPath, // 檔案要上傳的目標資料夾
    keepExtensions: true,
    multiples: true,
    maxFileSize: 40 * 1024 * 1024
  })

  form.parse(req, function (err, fields, files) {
    if (err) {
      logging.writeErrorLog(folderPath, err.stack)
      res.send("<script>alert('Somethong wrong with upload file (form.parse)')</script>")
    } else {
      console.log('!!!!!File is uploaded!!!!')

      var i = 0
      Object.keys(files).forEach(element => {
        i++
        var ext = files[element].path.slice(files[element].path.lastIndexOf('.')) // 取得副檔名
        fs.renameSync(files[element].path, 'imagefolder/' + folderPath + '/' + fields.license_plate_number + '_(' + i + ')' + ext)
        files[element].path = 'imagefolder/' + folderPath + '/' + fields.license_plate_number + '_(' + i + ')' + ext
      })

      console.log(util.inspect({
        fields: fields,
        files: files
      }))

      logging.writeProcessLog(folderPath, '!!!!!File is uploaded!!!!\n' + util.inspect({
        fields: fields,
        files: files
      }))

      try {
        // 輸出 zip 檔
        if (Object.keys(files).length >= 1) {
          var zip = new JSZip()
          // 取得每一個 file 的 path 並加入 zip 中
          Object.keys(files).forEach(element => {
            if (files[element].size == 0 || files[element].name == '') {
              console.log('This file will not be compressed to a ZIP file :' + files[element].path)
            } else {
              var imageAsBase64 = fs.readFileSync(files[element].path, 'base64') // 將圖片讀取成 base64 編碼型式的 url
              var pic_name = files[element].path.slice(files[element].path.lastIndexOf('/') + 1)
              zip.file(pic_name, imageAsBase64, { // 新增檔案到 zip 裡
                base64: true
              })
            }
          })
          zip.generateAsync({
            type: 'nodebuffer',
            compression: 'DEFLATE'
          }).then(function (content) {
            fs.writeFile('./zipfolder/' + folderPath + '.zip', content, function (err) {
              if (err) throw err
              console.log('export zip done !')
              res.end(
                '<script>setTimeout(function(){ alert("已成功送出您的檔案 !!"); window.location.replace( window.location.origin + "/uploadpage"); }, 3000); </script>'
              )
              sendEmail(fields, folderPath)
            })
          }).catch(function (err) {
            logging.writeErrorLog(folderPath, '\n' + err.stack)
          })
        } else {
          console.log('There are no files in request body.')
        }
      } catch (e) {
        logging.writeErrorLog(folderPath, e.message)
        res.end("<script> alert('Something wrong !!!'); window.location.reload()</script>")
      }
    }
  })
})

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.listen(PORT, function () {
  var host = this.address().address
  var port = this.address().port

  console.log('App listening at http://%s:%s', host, port)
})
