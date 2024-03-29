var sys = require('sys');
var fs = require('fs');
var util = require('util');
var Faker = require('../index');
var async = require('async');

var Config = Faker.config.yoyoContact;
var ca = Config.contactsAmount;
var cr = Config.contactsRepeatRate;
var cs = Config.contactsSimilarRepeatRate;
var ua = Config.userAmount;

// https://github.com/geraldasd/yoyo/issues/1
Faker.User.generateFakeUsers(ua, ca, cr, cs, function (users, fact) {
	for (var i = 1; i <= users.length; i++) {
		fs.writeFile('./us' + i + '.json',  JSON.stringify(users[i]), function (err, data) {
			if (err) {
				console.log(err);
			}
		});
	}

	fs.writeFile('./fact.json',  JSON.stringify(fact), function (err, data) {
		if (err) {
			console.log(err);
		}
	});

	// 控制台输出第一个用户的数据样式
	// var userInfo = users[0];
	// userInfo.contacts = userInfo.contacts.slice(0, 2);
	util.puts(JSON.stringify(users, null, '\t'));
	util.puts(JSON.stringify(fact, null, '\t'));
});


// 防止进程自动退出
require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
}).question('Press enter to exit...\n', function () {
	process.exit();
});