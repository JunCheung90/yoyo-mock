# 修改Faker.js生成mock数据

################ 用法 ################
# 产生us1的测试数据

#1函数接口
var Mock = require('yoyo-mock');
Mock.User.generateFakeUsers(ua, contactsAmountConfig, contactsRepeatRateConfig, contactsSimilarRateConfig, callback);
其中contactsAmountConfig, contactsRepeatRateConfig, contactsSimilarRateConfig都是4元对象（{mean：0, std：0, min：0, max：0}）
具体代码见examples/node_generateSet.js

返回参数说明callback(users，fact)
	users为所有产生用户数据的数组
	fact为真相表[{repeat-amount: repeat-amount, similar-amount: similar-amount, diff-amount: diff-amount},...]
	repeat-amount和similar-amount为多少次重复/相似(一对联系人)，diff-amount为多少个没有与其他人有信息交叠的联系人，可能有负数

#2文件接口
直接运行根目录下的bat文件或运行examples/node_generateSet.js，YoYo Mock自动在根目录下生成us1.json——us1000.json，并打印出样例数据
相关参数的配置文件见lib/livescript/config.ls

#3修改历史
v1.0 第一次commit，完成单个用户之间的联系人重复
v2.0 完成多用户之间的联系人和单个用户的联系人之间都可能重复
