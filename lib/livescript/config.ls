module.exports <<< 
	mongo:
		host: \localhost
		port: 27017
		db: \yoyo-mock

	# --- Mock生成联系人配置 --- #
	yoyo-contact:
		user-amount-radio-to-user-pool-amount: 0.1 #平均的联系人总数与用户群的比值
		user-amount: 2
		contacts-amount:
			mean: 2
			std: 0		#标准差，值越小数据越集中
			min: 2	#正态随机出的最小值，应该不小于0
			max: 2	#正态随机出的最大值，不小于最小值

		contacts-repeat-rate:
			mean: 0.5 #重复率，应直接合并 	
			std: 0 	
			min: 0.0 	
			max: 0.0 	
		
		contacts-similar-repeat-rate:
			mean: 0.8 #疑似重复率，应推荐合并
			std: 0
			min: 0.0
			max: 0.0
		
		contacts-has-emails: 0.7 
		contacts-has-ims: 0.5 #有im的联系人占总体的比重
		contacts-has-sns: 0.3 #有im的联系人占总体的比重
		contacts-has-addresses: 0.2 #有im的联系人占总体的比重

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

	# --- Sn配置（以下社交圈指特定用户与其朋友组成的圈子，社交群指所有人） --- #
	yoyo-sn:
		user-amount-radio-to-user-pool-amount: 0.1 # 社交圈与社交群的比值
		user-amount: 10 # 社交群的用户总数应该远大于通信群的总数			