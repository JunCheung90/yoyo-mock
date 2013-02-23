# 修改Faker.js生成mock数据

################ 用法 ################
# 产生us1的测试数据

#1函数接口
var Mock = require('node-mock');
Mock.Helpers.generateFakeUsers(ua, contactsAmountConfig, contactsRepeatRateConfig, contactsSimilarRateConfig, callback);
其中contactsAmountConfig, contactsRepeatRateConfig, contactsSimilarRateConfig都是4元数组（[mean, std, min, max]）
如，generateFakeUsers(10, [5, 1.0, 0, 10], [0.2, 1.0, 0.0, 0.5], [0.3, 1.0, 0.0, 0.5], function (users, fact) {});
具体代码见examples/node_generateSet.js

#2文件接口
直接运行根目录下的bat文件，YoYo Mock自动在根目录下生成us1.json——us1000.json，并打印出样例数据
相关参数的配置文件见lib/livescript/config.ls