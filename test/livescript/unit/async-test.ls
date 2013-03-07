# async库的学习和测试 见https://github.com/alsotang/async_demo
require! [async, '../support/test-util']

# 重定义console.log, 同时输出秒数，便于调试
log = test-util.log;
	
# 并行处理，牺牲cpu换取效率，100并发情况下从3%飙升到60+%，1000并发达到100%
test-async = !->
	users = [1, 2, 3]
	index-arr = [1 to 100]	
	async.each index-arr, !(item, callback) ->
		log 'enter: ' + item + ' event'
		# setTimeout  !->
		wait 100
		users[0] = item
		log 'handle: ' + users[0] + ' event'
		callback!	
		# , 100

# 串行处理，cpu没有大的变化, 从3%到峰值10+%
test-series = !->
	for i to 100
		log 'enter: ' + i + ' event'
		wait 100
		log 'handle: ' + i + ' event'

test-series-v2 = !->
	index-arr = [1 to 100]	
	async.eachSeries index-arr, !(item, callback) ->
		log 'enter: ' + item + ' event'
		setTimeout  !->
			log 'handle: ' + item + ' event'
			callback!	
		, 100		

wait = !(ms) ->
	pre = new Date!
	cur = null
	do 
		cur := new Date!
	while cur - pre < ms	

test-async!

# test-series!				

# test-series-v2!

# async.each 当（item，callback）里面有回调函数时候（有阻塞）才会体现并行执行的优势