require! [async, './helpers', './random']
require! Faker: '../index'
require! config: './config'.yoyo-sn

Sn =
	initialize: !->
		self = this
		<-! self.generate-sn-users
		self.create-sn-update-regular!

	create-sn-users: !(callback) ->
		user-amount = config.user-amount
		users = []
		for til user-amount
			user = create-base-info!
			user.friends = add-friends!
			user.status	= add-status!
			users.push user
		set-into-db users
		callback！	

	create-sn-update-regular: !->	
		update-ids = get-random-update-user-ids
		(err) <-! async.each-limit ids config.batch-limit id, next
			
			next!
		throw new Error err if err 	


create-user-pool = (user-amount, callback) ->
	user-pool-with-full-info = []
	user-pool-amount = Math.floor (user-amount / config.user-amount-radio-to-user-pool-amount)
	for til user-pool-amount
		user-pool-with-full-info.push helpers.create-YoYo-user!
	callback user-pool-with-full-info
			

module.exports <<< Sn