var fs = require("fs");
var querystring = require("querystring");

var messageBoardFile = "messageBoard.txt";
var usernameBoardFile = "usernameBoard.txt";
function start(response, postData) {

  console.log("Request handler 'start' was called.");

/*
  exec("du -h /", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
*/

  var msg = fs.readFileSync(messageBoardFile, 'utf8');
  var username = fs.readFileSync(usernameBoardFile, 'utf8');
  /*var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    msg.replace(/(?:\r\n|\r|\n)/g, '<br />') +
    '<form action="/upload" method="post">'+
    '<textarea name="msg" rows="20" cols="60"></textarea>'+

    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
*/
    var body = '<!DOCTYPE html>'+
        '<html>'+
            '<head>'+
                '<meta charset="utf-8"/>  <!-- html encode type-->'+
                '<title>留言板</title>'+
                '<style type="text/css">'+
        '*{margin:0; padding:0;}'+
        'body,input{font-size:14px; line-height:24px; color:#333; font-family:Microsoft yahei, Song, Arial, Helvetica, Tahoma, Geneva;}'+
        'h1{margin-bottom:15px; height:100px; line-height:100px; text-align:center; font-size:24px; color:#fff; background:#0051a1;}'+
        '#content #post,#comment p{zoom:1;}'+
        '#content #post:after,#comment p:after{display:block; height:0; clear:both; visibility:hidden; overflow:hidden; content:".";}'+
        '.transition{-webkit-transition:all 0.5s linear; -moz-transition:all 0.5s linear; -o-transition:all 0.5s linear; -ms-transition:all 0.5s linear; transition:all 0.5s linear;}'+
        '#content{margin:0 auto; width:960px; overflow:hidden;}'+
            '#content #post{margin-bottom:15px; padding-bottom:15px; border-bottom:1px #d4d4d4 dashed;}'+
                '#content #post textarea{display:block; margin-bottom:10px; padding:5px; width:948px; height:390px; border:1px #d1d1d1 solid; border-radius:5px; resize:none; outline:none;}'+
                '#content #post textarea:hover{border:1px #9bdf70 solid; background:#f0fbeb;}'+
                '#content #post #postBt,#content #post #clearBt{margin-left:5px; padding:3px; float:right;}'+
        '#comment{overflow:hidden;}'+
            '#comment p{margin-bottom:10px; padding:10px; border-radius:5px;}'+
            '#comment p:nth-child(odd){border:1px solid #e3e197; background:#ffd;}'+
            '#comment p:nth-child(even){border:1px solid #adcd3c; background:#f2fddb;}'+
                '#comment p span{display:inline; float:left;}'+
                '#comment p .msg{width:738px;}'+
                '#comment p .datetime{width:200px; color:#999; text-align:right;}'+
        '</style>'+
            '</head>'+
            '<body>'+
            //username.replace(/(?:\r\n|\r|\n)/g, '<br />')+
            msg.replace(/(?:\r\n|\r|\n)/g, '<br />') +
                '<form action="/upload" method="post">'+
                '<p>ID<input type="text" name="username"></p>'+
                '<p>message<textarea name="msg"></textarea></p>'+
                '<p><input type="submit" value="留言"></p>'+
                '</form>'+
              '</body>'+
           '</html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
//  return "Hello Start";
}

function upload(response, postData) {

  var msg = querystring.parse(postData).msg;
  var username = querystring.parse(postData).username;
  var senttime = new Date();
  fs.appendFileSync(messageBoardFile,username+" sent: "+ msg +" "+ senttime + "\n", 'utf8');
  fs.appendFileSync(usernameBoardFile,username+"\n", 'utf8');
//, (err) => {
//    if (err) {
//      console.error('There was an error', err);
//      return;
//    }

//    console.log('The "data to append" was appended to file!');
//  });

  console.log("Request handler 'upload' was called.");
//  response.writeHead(200, {"Content-Type": "text/plain"});
//  response.write(username+" sent: " + msg);
//  response.write("You've sent: " + postData);
  response.writeHead(302, {"Location": "/"});
  response.end();
}

exports.start = start;
exports.upload = upload;
