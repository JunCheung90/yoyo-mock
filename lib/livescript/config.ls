module.exports <<< 
	mongo:
		host: \localhost
		port: 27017
		db: \yoyo-mock

	# --- Mock生成联系人配置 --- #
	yoyo-contact:
		user-amount: 10
		contacts-amount:
			mean: 3
			std: 0	#标准差，值越小数据越集中
			min: 5	#正态随机出的最小值
			max: 3	#正态随机出的最小值

		contacts-repeat-rate:
			mean: 0.1 #重复率，应直接合并 	
			std: 0 	
			min: 0.0 	
			max: 0.0 	
		
		contacts-similar-repeat-rate:
			mean: 0.2 #疑似重复率，应推荐合并
			std: 0
			min: 0.0
			max: 0.0
		
		contacts-has-ims: 0.05 #有im的联系人占总体的比重
		contacts-has-sns: 0.03 #有im的联系人占总体的比重
		contacts-has-addresses: 0.02 #有im的联系人占总体的比重

		rule: #0不重复，1重复，依次为name,phone,email,im,sn,address
			repeat:
				[0, 0, 1, 0, 0, 0]
				[0, 0, 0, 0, 1, 0]
				[0, 0, 1, 0, 1, 0]
			similar:
				[1, 1, 0, 0, 0, 0]
				[1, 0, 0, 1, 0, 0]
				[1, 1, 0, 1, 0, 0]
			diff:
				[0, 0, 0, 0, 0, 0]
				[1, 0, 0, 0, 0, 0]
				[1, 0, 0, 0, 0, 1]