user = # yoyo-mock用户数据
  #----------- profile ----------#
  name: '张三'
  phones:
    * phone-number: '3456789'
      is-active: true
  emails:
    'zhangsan@fake.com'
    ...      
  ims: # 多个IM
    * type: 'QQ'
      account: '111111'
      is-active: true
  sns:
    * type: 'douban'
      account-name: '张三豆'
      account-id: '1213213' # acount-name和account-id两者必须有一个
      api-key: 'xxxx' # 社交平台端授权后得到的key，用以从SN获取信息，由手机客户端上传
    ...
  addresses:
    '广州 大学城 中山大学 至善园 307'
    ...
  #----------- relations ----------#
  contacts: # 当前用户的联系人
    * name: '李小四'
      phones: 
        * phone-number: '1234567'
          is-active: true
      emails: ['lisi@fake.com']
      ims: 
        * type: 'QQ'
          account: 'lisi111'
          is-active: true
      sns: [] # 社交网络的列表
      addresses: []

require! fs

# 下面部分用来生成json数据
(err) <-! fs.writeFile 'zhangsan.json', JSON.stringify(user, null, '\t')
throw new Error err if err
console.log "user data have been exported to zhangsan.json"