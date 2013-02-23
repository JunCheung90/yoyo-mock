var Faker, should, async, dataNum, mean, stdDev, precision, arr, can, generateNormalDistributionArray, calMean, calStdDev;
Faker = require('../../index');
should = require('should');
async = require('async');
dataNum = 1000;
mean = 0.0;
stdDev = 1.0;
precision = 0.2;
arr = [];
can = it;
describe('测试正态分布', function(){
  before(function(){
    generateNormalDistributionArray();
  });
  can('平均值大约为' + mean + '\n', function(){
    var calMeanValue;
    calMeanValue = calMean();
    calMeanValue.should.be.within(mean - precision, mean + precision);
    console.log("计算的平均值为{" + calMeanValue + "}");
  });
  can('标准差大约为' + stdDev + '\n', function(){
    var calStdDevValue;
    calStdDevValue = calStdDev();
    calStdDevValue.should.be.within(stdDev - precision, stdDev + precision);
    console.log("计算的标准差为{" + calStdDevValue + "}");
  });
  can('落在[u+-sigma]区间的概率约为0.68，落在[u+-2*sigma]区间的概率约为0.95\n', function(){
    var calMeanValue, calStdDevValue, count1, count2, i$, to$, i, ref$, prob1, prob2;
    calMeanValue = calMean();
    calStdDevValue = calStdDev();
    count1 = 0;
    count2 = 0;
    for (i$ = 0, to$ = dataNum; i$ < to$; ++i$) {
      i = i$;
      if (calMeanValue - calStdDevValue < (ref$ = arr[i]) && ref$ < calMeanValue + calStdDevValue) {
        count1++;
      }
      if (calMeanValue - 2 * calStdDevValue < (ref$ = arr[i]) && ref$ < calMeanValue + 2 * calStdDevValue) {
        count2++;
      }
    }
    prob1 = count1 / dataNum;
    prob2 = count2 / dataNum;
    prob1.should.be.within(0.68 - precision, 0.68 + precision);
    prob2.should.be.within(0.95 - precision, 0.95 + precision);
    console.log("计算的[u+-sigma]区间的概率为{" + prob1 + "}，[u+-2*sigma]区间的概率为{" + prob2 + "}");
  });
});
generateNormalDistributionArray = function(){
  var i$, to$, i;
  for (i$ = 0, to$ = dataNum; i$ < to$; ++i$) {
    i = i$;
    arr = arr.concat(Faker.random.normal_distribution(mean, stdDev));
  }
};
calMean = function(){
  var sum, i$, to$, i;
  sum = 0;
  for (i$ = 0, to$ = dataNum; i$ < to$; ++i$) {
    i = i$;
    sum += arr[i];
  }
  return sum / dataNum;
};
calStdDev = function(){
  var calMeanValue, powerSum, i$, to$, i;
  calMeanValue = calMean();
  powerSum = 0;
  for (i$ = 0, to$ = dataNum; i$ < to$; ++i$) {
    i = i$;
    powerSum += Math.pow(arr[i] - calMeanValue, 2);
  }
  return Math.sqrt(powerSum / dataNum);
};