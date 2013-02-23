var ref$;
ref$ = module.exports;
ref$.mongo = {
  host: 'localhost',
  port: 27017,
  db: 'yoyo-mock'
};
ref$.yoyoContact = {
  userAmount: 10,
  contactsAmountMean: 5,
  contactsAmountStd: 1.0,
  contactsAmountMin: 1,
  contactsAmountMax: 1000,
  contactsRepeatRateMean: 0.1,
  contactsRepeatRateStd: 1.0,
  contactsRepeatRateMin: 0.0,
  contactsRepeatRateMax: 0.5,
  contactsSimilarRepeatRateMean: 0.2,
  contactsSimilarRepeatRateStd: 1.0,
  contactsSimilarRepeatRateMin: 0.0,
  contactsSimilarRepeatRateMax: 0.5,
  contactsHasIms: 0.05,
  contactsHasSns: 0.03,
  contactsHasAddresses: 0.02,
  rule: {
    repeat: [[0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 1, 0]],
    similar: [[1, 1, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], [1, 1, 0, 1, 0, 0]],
    diff: [[0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1]]
  }
};