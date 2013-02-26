var async, helpers, random, Faker, config, gUserAmount, gContactsAmountConfig, gContactsRepeatRateConfig, gContactsSimilarRateConfig, gUserPool, User, createUserPool, cleanUserInfo, cleanSomeInfo, createUser, addRepeatAndSimilarUser, filterByMultipleRule, filterByRule, isMatchRule, addUserByRandomRule, generateContactByRule;
async = require('async');
helpers = require('./helpers');
random = require('./random');
Faker = require('../index');
config = require('./config').yoyoContact;
gUserAmount = null;
gContactsAmountConfig = null;
gContactsRepeatRateConfig = null;
gContactsSimilarRateConfig = null;
gUserPool = null;
User = {
  generateFakeUsers: function(userAmount, contactsAmountConfig, contactsRepeatRateConfig, contactsSimilarRateConfig, callback){
    var userPoolWithFullInfo;
    gUserAmount = userAmount || config.userAmount;
    gContactsAmountConfig = contactsAmountConfig || config.contactsAmount;
    gContactsRepeatRateConfig = contactsRepeatRateConfig || config.contactsRepeatRate;
    gContactsSimilarRateConfig = contactsSimilarRateConfig || config.contactsSimilarRate;
    userPoolWithFullInfo = createUserPool(userAmount);
    cleanUserInfo(userPoolWithFullInfo, function(userPool){
      var users, facts, indexArr, res$, i$, to$, ridx$;
      gUserPool = userPool;
      users = [];
      facts = [];
      res$ = [];
      for (i$ = 0, to$ = gUserAmount; i$ < to$; ++i$) {
        ridx$ = i$;
        res$.push(ridx$);
      }
      indexArr = res$;
      async.each(indexArr, function(index, next){
        var ref$, user, fact;
        ref$ = createUser(), user = ref$.user, fact = ref$.fact;
        users.push(user);
        facts.push(fact);
        next();
      }, function(err){
        if (err) {
          throw new Error(err);
        }
        callback(users, facts);
      });
    });
  }
};
createUserPool = function(userAmount){
  var userPoolWithFullInfo, userPoolAmount, i$;
  userPoolWithFullInfo = [];
  userPoolAmount = Math.floor(userAmount / config.userAmountRadioToUserPoolAmount);
  for (i$ = 0; i$ < userPoolAmount; ++i$) {
    userPoolWithFullInfo.push(helpers.createYoYoUser());
  }
  return userPoolWithFullInfo;
};
cleanUserInfo = function(userPoolWithFullInfo, callback){
  async.map(userPoolWithFullInfo, function(userFullInfo, next){
    next(null, cleanSomeInfo(userFullInfo));
  }, function(err, userPool){
    if (err) {
      throw new Error(err);
    }
    callback(userPool);
  });
};
cleanSomeInfo = function(userFullInfo){
  var tmpInfo;
  tmpInfo = userFullInfo;
  tmpInfo.emails = Math.random() < config.contactsHasEmails === true ? userFullInfo.emails : null;
  tmpInfo.ims = Math.random() < config.contactsHasIms === true ? userFullInfo.ims : null;
  tmpInfo.sns = Math.random() < config.contactsHasSns === true ? userFullInfo.sns : null;
  tmpInfo.addresses = Math.random() < config.contactsHasAddresses === true ? userFullInfo.addresses : null;
  return tmpInfo;
};
createUser = function(){
  var contactsAmount, seedContacts, user, fact;
  contactsAmount = random.nd_random_in_range(gContactsAmountConfig);
  helpers.shuffle(gUserPool);
  if (gUserPool.length < contactsAmount) {
    throw new Error("user pool is too small");
  }
  seedContacts = gUserPool.slice(0, contactsAmount);
  user = helpers.deepClone(gUserPool[contactsAmount]);
  fact = addRepeatAndSimilarUser(seedContacts);
  user.contacts = seedContacts;
  return {
    user: user,
    fact: fact
  };
};
addRepeatAndSimilarUser = function(seedContacts, callback){
  var contactsFilterByRule, preContactsAmount, fact, repeatAmount, similarAmount, diffAmount;
  contactsFilterByRule = filterByMultipleRule(seedContacts);
  preContactsAmount = seedContacts.length;
  fact = {};
  repeatAmount = addUserByRandomRule(seedContacts, contactsFilterByRule, gContactsRepeatRateConfig, 'repeat');
  similarAmount = addUserByRandomRule(seedContacts, contactsFilterByRule, gContactsSimilarRateConfig, 'similar');
  diffAmount = preContactsAmount - repeatAmount - similarAmount;
  return {
    repeatAmount: repeatAmount,
    similarAmount: similarAmount,
    diffAmount: diffAmount
  };
};
filterByMultipleRule = function(contacts){
  var contactsFilterByRule, type, ref$, ruleArr, tmpArr, i$, to$, i, rule;
  contactsFilterByRule = {};
  for (type in ref$ = config.rule) {
    ruleArr = ref$[type];
    tmpArr = [];
    for (i$ = 0, to$ = ruleArr.length; i$ < to$; ++i$) {
      i = i$;
      rule = ruleArr[i];
      filterByRule(rule, contacts, fn$);
    }
    contactsFilterByRule[type] = tmpArr;
  }
  return contactsFilterByRule;
  function fn$(contactsAsRule){
    tmpArr.push(contactsAsRule);
  }
};
filterByRule = function(rule, contacts, callback){
  async.filter(contacts, function(contact, next){
    next(isMatchRule(contact, rule));
  }, function(contactsAsRule){
    callback(contactsAsRule);
  });
};
isMatchRule = function(contact, rule){
  var i, key, val;
  i = 0;
  for (key in contact) {
    val = contact[key];
    if (rule[i++] && helpers.isEmpty(val)) {
      return false;
    }
  }
  return true;
};
addUserByRandomRule = function(seedContacts, contactsFilterByRule, rateConfig, ruleType){
  var addContactAmount, i$, i, rules, maxLoop, r, rule, seedContactsAsRule, seedContact, candidateContact;
  addContactAmount = Math.floor(seedContacts.length * random.nd_random_in_range(rateConfig));
  for (i$ = 0; i$ < addContactAmount; ++i$) {
    i = i$;
    rules = config.rule[ruleType];
    maxLoop = Math.pow(rules.length, 2);
    do {
      r = random.number(0, rules.length);
      rule = rules[r];
      seedContactsAsRule = contactsFilterByRule[ruleType][r];
      maxLoop--;
      if (maxLoop === 0) {
        return 0;
      }
    } while (seedContactsAsRule.length === 0);
    seedContact = random.array_element(seedContactsAsRule);
    candidateContact = random.array_element(gUserPool);
    seedContacts.push(generateContactByRule(rule, seedContact, candidateContact));
  }
  return addContactAmount;
};
generateContactByRule = function(rule, seedContact, candidateContact){
  var targetContact, i, key, value;
  targetContact = helpers.deepClone(candidateContact);
  i = 0;
  for (key in targetContact) {
    value = targetContact[key];
    targetContact[key] = rule[i++] === 1
      ? seedContact[key]
      : candidateContact[key];
  }
  return targetContact;
};
import$(module.exports, User);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}