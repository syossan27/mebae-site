var express = require('express')
var app = express()
var Curl = require('node-libcurl').Curl
var qs = require('querystring')
require('dotenv').load()

process.on('uncaughtException', function(err) {
  console.log(err)
})

app.use('/static', express.static('dist/static'))

app.set('views', __dirname + '/dist')
app.set('view engine', 'jade')

app.get('/', function(req, res){
  // get AccessToken
  var CLIENT_ID = process.env.CLIENT_ID
  var CLIENT_SECRET = process.env.CLIENT_SECRET
  var CODE = req.query.code
  var targetUrl = "https://github.com/login/oauth/access_token"

  var curl = new Curl()
  curl.setOpt('URL', targetUrl)
  curl.setOpt('POST', 1)
  curl.setOpt('POSTFIELDS', qs.stringify({
      code: CODE,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
  }))

  curl.on('end', function(statusCode, body, headers) {
    var parameters = body.split('&')
    var access_token = (parameters[0].split('='))[1]

    this.close()

    if (access_token === "bad_verification_code") {
      res.redirect('https://github.com/login/oauth/authorize?client_id=1c32c0ef97c2f71096fa')
    } else {
      res.render('index', { access_token: access_token })
    }
  })

  curl.on('error', curl.close.bind(curl))
  curl.perform()
})

app.set('port', (process.env.PORT || 5000))
var server = app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'))
})
