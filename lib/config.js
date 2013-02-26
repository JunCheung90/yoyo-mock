var ref$;
ref$ = module.exports;
ref$.mongo = {
  host: 'localhost',
  port: 27017,
  db: 'yoyo-mock'
};
ref$.yoyoContact = {
  userAmountRadioToUserPoolAmount: 0.1,
  userAmount: 2,
  contactsAmount: {
    mean: 2,
    std: 0,
    min: 2,
    max: 2
  },
  contactsRepeatRate: {
    mean: 0.5,
    std: 0,
    min: 0.0,
    max: 0.0
  },
  contactsSimilarRepeatRate: {
    mean: 0.8,
    std: 0,
    min: 0.0,
    max: 0.0
  },
  contactsHasEmails: 0.7,
  contactsHasIms: 0.5,
  contactsHasSns: 0.3,
  contactsHasAddresses: 0.2,
  rule: {
    repeat: [[0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 1, 0]],
    similar: [[1, 1, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], [1, 1, 0, 1, 0, 0]],
    diff: [[0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1]]
  }
};