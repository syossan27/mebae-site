var express = require('express');
var curl = require('node-curl');
var qs = require('querystring');
var app = express();

process.on('uncaughtException', function(err) {
  console.log(err);
});

app.get('/', function(req, res){
  // get AccessToken
  var CLIENT_ID = ""
  var CLIENT_SECRET = ""
  var CODE = req.params.code
  var targetUrl = "https://github.com/login/oauth/access_token"

  var opts = {
    POST: 1,
    POSTFIELDS: qs.stringify({
      code: CODE,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  };

  curl(targetUrl, opts, function(err) {
    // access_token=0123456789abcdef0123456789abcdef01234567&token_type=bearer
    // が返ってくるはず
    console.log(this.body);
    var access_token = 
    // ↑を画面に表示し、設定ファイルに書き込むようメッセージを表示する。
  });
});

app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
