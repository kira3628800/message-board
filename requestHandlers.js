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
            '</head>'+
			'<style>'+
             ' body{'+
	          'background-image:url(https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/12108808_1018838994803353_2534533317720857000_n.jpg?oh=46b35caf18e5a545aadccb060e652f98&oe=58FC3D2C);'+
	          'background-repeat:no-repeat;'+
	          'background-attachment:fixed;'+
	          'background-position:center;'+
	          'background-size:cover;'+
			  'background-color:#000000;'+
			  
	          '}'+
	          'h1{'+
	          'position:absolute;'+
	          'bottom:10px;'+
	          'right:50px;'+
	          '}'+
			  'div{'+
			   'text-align:center;'+
			   
			   'font-size:25px;'+
			   'font-weight:bold;'+
			  '}'+
				
	         'p{'+
	          'text-align:center'+
	          '}'+
   
              '</style>'+
            '<body>'+
            //username.replace(/(?:\r\n|\r|\n)/g, '<br />')+
           
                '<form action="/upload" method="post">'+
                '<p><font size="7" color="blue">ID</font><input type="text" style="font-size:25px" name="username"></p>'+
                '<p><font size="7" color="blue">留言</font><br><textarea name="msg" rows=20 cols=80></textarea></p>'+
                '<p><input type="submit" value="留言"></p>'+ 
				'<h1>圖片版權由九藏喵窩所有</h1>'+
				'<div>'+msg.replace(/(?:\r\n|\r|\n)/g, '<hr />') +'</div>'+
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
