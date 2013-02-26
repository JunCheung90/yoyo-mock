var async, testUtil, log, testAsync, testSeries, testSeriesV2, wait;
async = require('async');
testUtil = require('../support/test-util');
log = testUtil.log;
testAsync = function(){
  var users, indexArr;
  users = [1, 2, 3];
  indexArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
  async.each(indexArr, function(item, callback){
    log('enter: ' + item + ' event');
    wait(100);
    users[0] = item;
    log('handle: ' + users[0] + ' event');
    callback();
  });
};
testSeries = function(){
  var i$, i;
  for (i$ = 0; i$ <= 100; ++i$) {
    i = i$;
    log('enter: ' + i + ' event');
    wait(100);
    log('handle: ' + i + ' event');
  }
};
testSeriesV2 = function(){
  var indexArr;
  indexArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
  async.eachSeries(indexArr, function(item, callback){
    log('enter: ' + item + ' event');
    setTimeout(function(){
      log('handle: ' + item + ' event');
      callback();
    }, 100);
  });
};
wait = function(ms){
  var pre, cur;
  pre = new Date();
  cur = null;
  do {
    cur = new Date();
  } while (cur - pre < ms);
};
testAsync();