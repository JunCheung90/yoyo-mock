require! [async, './helpers', './random']
require! Faker: '../index'
require! config: './config'.yoyo-contact

# 为方便调用，声明为全局变量
g-user-amount = null
g-contacts-amount-config = null
g-contacts-repeat-rate-config = null
g-contacts-similar-rate-config = null 
g-user-pool = null

User =
	# TODO: 由于callback在最后，默认参数无效， 参考yoyo-sn模块sn.js的做法
	generate-fake-users: !(user-amount, contacts-amount-config, contacts-repeat-rate-config, contacts-similar-rate-config, callback) ->
		# 初始化全局参数
		g-user-amount := user-amount || config.user-amount
		g-contacts-amount-config := contacts-amount-config || config.contacts-amount
		g-contacts-repeat-rate-config := contacts-repeat-rate-config || config.contacts-repeat-rate
		g-contacts-similar-rate-config := contacts-similar-rate-config || config.contacts-similar-rate
		# 构建用户群
		user-pool-with-full-info = create-user-pool user-amount
		(user-pool) <-! clean-user-info user-pool-with-full-info
		g-user-pool := user-pool
		
		# 并行生成多个用户信息
		users = [];
		facts = [];	
		index-arr = [0 til g-user-amount]
		(err) <-! async.each index-arr, !(index, next) ->
			{user, fact} = create-user!
			users.push user
			facts.push fact	
			next!
		throw new Error err if err	
		callback users, facts	

create-user-pool = (user-amount) ->
	user-pool-with-full-info = []
	user-pool-amount = Math.floor (user-amount / config.user-amount-radio-to-user-pool-amount)
	for til user-pool-amount
		user-pool-with-full-info.push helpers.create-YoYo-user!
	user-pool-with-full-info

clean-user-info = !(user-pool-with-full-info, callback) ->
	(err, user-pool) <-! async.map user-pool-with-full-info, !(user-full-info, next) ->
		next null, clean-some-info user-full-info
	throw new Error err if err
	callback user-pool

clean-some-info = (user-full-info) ->
	tmp-info = user-full-info
	tmp-info.emails = if (Math.random! < config.contacts-has-emails) is true
		then user-full-info.emails 
		else null
	tmp-info.ims = if (Math.random! < config.contacts-has-ims) is true
		then user-full-info.ims 
		else null
	tmp-info.sns = if (Math.random! < config.contacts-has-sns) is true 
		then user-full-info.sns 
		else null
	tmp-info.addresses = if (Math.random! < config.contacts-has-addresses) is true
		then user-full-info.addresses 
		else null
	tmp-info

create-user = ->
	contacts-amount = random.nd_random_in_range g-contacts-amount-config
	helpers.shuffle	g-user-pool
	if g-user-pool.length < contacts-amount
		throw new Error "user pool is too small"
	seed-contacts = g-user-pool.slice 0, contacts-amount
	user = helpers.deep-clone g-user-pool[contacts-amount]
	fact = add-repeat-and-similar-user seed-contacts
	user.contacts = seed-contacts
	{user: user, fact: fact}

# 向原始联系人增加重复和相似联系人，返回真相表
add-repeat-and-similar-user = (seed-contacts, callback) ->
	contacts-filter-by-rule = filter-by-multiple-rule seed-contacts
	pre-contacts-amount = seed-contacts.length	
	fact = {}
	repeat-amount = add-user-by-random-rule seed-contacts, contacts-filter-by-rule, g-contacts-repeat-rate-config, 'repeat'
	similar-amount = add-user-by-random-rule seed-contacts, contacts-filter-by-rule, g-contacts-similar-rate-config, 'similar'
	
	# repeat-amount和similar-amount为多少次重复/相似，diff-amount为多少个没有与其他联系人有信息交叠的人
	diff-amount = pre-contacts-amount - repeat-amount - similar-amount
	{repeat-amount: repeat-amount, similar-amount: similar-amount, diff-amount: diff-amount}

filter-by-multiple-rule = (contacts) ->
	contacts-filter-by-rule = {}
	for type, rule-arr of config.rule
		# 对每一类规则（repeat, similar, diff）
		tmp-arr = []
		for i til rule-arr.length
			rule = rule-arr[i]
			(contacts-as-rule) <-! filter-by-rule rule, contacts
			tmp-arr.push contacts-as-rule
		contacts-filter-by-rule[type] = tmp-arr
	contacts-filter-by-rule	
	
filter-by-rule = !(rule, contacts, callback) ->
	# 对每条规则在contacts数组执行filter
	(contacts-as-rule) <-! async.filter contacts, !(contact, next) ->
		next <| is-match-rule contact, rule
	callback contacts-as-rule

is-match-rule = (contact, rule) ->
	i = 0
	for key, val of contact
		if (rule[i++] && (helpers.is-empty val))
			return false
	return true

add-user-by-random-rule = (seed-contacts, contacts-filter-by-rule, rate-config, rule-type) ->
	add-contact-amount = Math.floor (seed-contacts.length * random.nd_random_in_range rate-config)
	for i til add-contact-amount
		# TODO，平均随机一条规矩可以改为加权随机
		rules = config.rule[rule-type]
		max-loop = rules.length^2
		do
			r = random.number 0, rules.length
			rule = rules[r]
			seed-contacts-as-rule = contacts-filter-by-rule[rule-type][r]
			max-loop--
			if max-loop == 0	# 没有符合规则的联系人
				return 0
		while seed-contacts-as-rule.length == 0	
		seed-contact = random.array_element seed-contacts-as-rule
		candidate-contact = random.array_element g-user-pool
		seed-contacts.push (generate-contact-by-rule rule, seed-contact, candidate-contact)
	add-contact-amount
	
generate-contact-by-rule = (rule, seed-contact, candidate-contact) ->
	# console.log "rule: "+rule
	# console.log "seed-contact: \n"+JSON.stringify seed-contact
	# console.log "candidate-contact: \n"+JSON.stringify candidate-contact
	target-contact = helpers.deep-clone candidate-contact
	i = 0
	for key, value of target-contact
		target-contact[key] = if rule[i++] is 1
			then seed-contact[key] 
			else candidate-contact[key]
	# console.log "target-contact: \n"+JSON.stringify target-contact	
	target-contact				

module.exports <<< User