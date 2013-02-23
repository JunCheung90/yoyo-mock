var ref$;
ref$ = module.exports;
ref$.mongo = {
  host: 'localhost',
  port: 27017,
  db: 'yoyo-mock'
};
ref$.yoyoContact = {
  userAmount: 10,
  contactsAmount: {
    mean: 3,
    std: 0,
    min: 5,
    max: 3
  },
  contactsRepeatRate: {
    mean: 0.1,
    std: 0,
    min: 0.0,
    max: 0.0
  },
  contactsSimilarRepeatRate: {
    mean: 0.2,
    std: 0,
    min: 0.0,
    max: 0.0
  },
  contactsHasIms: 0.05,
  contactsHasSns: 0.03,
  contactsHasAddresses: 0.02,
  rule: {
    repeat: [[0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 1, 0]],
    similar: [[1, 1, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0], [1, 1, 0, 1, 0, 0]],
    diff: [[0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1]]
  }
};