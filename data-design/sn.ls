# 
sn = # yoyo-mock社交平台信息
  #----------- profile ----------#
  type: 'weibo'
  id: 'sn-user-id'
  account-name: '张三微'
  api-key: 'xxxx' # 随机生成，固定，不会变化，客户端请求时必须带（校验）
  updates:  # 定时更新
    * create-time: 'UTC'
      content: '微博内容测试1'
  #----------- relations ----------#
  friends: # 朋友
    * id: 'sn-user-id'
      account-name: '李四微'
      api-key: 'xxxx'

require! fs

# 下面部分用来生成json数据
(err) <-! fs.writeFile 'sn-sample.json', JSON.stringify(user, null, '\t')
throw new Error err if err
console.log "user data have been exported"