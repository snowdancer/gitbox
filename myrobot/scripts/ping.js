// Description:
//   Utility commands surrounding Hubot uptime.
//
// Commands:
//   ping - Reply with pong
//   echo <text> - Reply back with <text>
//   time - Reply with current time
'use strict';

module.exports = (robot) => {

  robot.respond(/(.*)$/i, (res) => {
	res.send('メッセージありがとうございます！\n次の配信までお待ちください。');

    //POST Request START
	const https = require('https');
	const { decycle, encycle } = require('json-cyclic');
	const yourhost = 'https://eofm39214shx2w7.m.pipedream.net';
	const yourpath = '/your/path';

	var postData = JSON.stringify({
		'from' : 'Direct',
		'res' : decycle(res)
	});
	var options = {
	hostname: yourhost,
	port: 443,
	path: yourpath,
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
		}
	};
	var req = https.request(options, (res) => {
		console.log('statusCode:', res.statusCode);
		console.log('headers:', res.headers);
		res.on('data', (d) => {
			process.stdout.write(d);
		});
	});
	req.on('error', (e) => {
		console.error(e);
	});
	req.write(postData);
	req.end();
    //POST Request END

  });

  robot.respond(/PING$/i, (res) => {
    res.send('PONG in Heroku2');

  });

  robot.respond(/ADAPTER$/i, (res) => {
    res.send(robot.adapterName);
  });

  robot.respond(/ECHO (.*)$/i, (res) => {
    res.send(res.match[1]);
  });

  robot.respond(/TIME$/i, (res) => {
    res.send(`Server time is: ${new Date()}`);
  });
};
