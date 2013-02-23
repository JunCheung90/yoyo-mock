var Faker = require('../index');
var Helpers = require('./helpers');
var Random = require('./random');
var Config = require('./config').yoyoContact;

var user = {
    owner: function (contactsAmountConfig, contactsRepeatRateConfig, contactsSimilarRateConfig) {
        var result = {};
        var ownerInfo = Helpers.createYoYoUser();
        var tmp = this.contacts(contactsAmountConfig, contactsRepeatRateConfig, contactsSimilarRateConfig);
        ownerInfo.contacts = tmp.contacts;

        result.owner = ownerInfo;
        result.fact = tmp.fact;
        return result;
    },
    contacts: function (contactsAmountConfig, contactsRepeatRateConfig, contactsSimilarRateConfig) {
        var sourceContacts = [];
        var targetContacts = [];
        var amountOfContact = Random.nd_random_in_range(contactsAmountConfig);
        amountOfContact = Math.floor(amountOfContact / 2) * 2;
        for (var i = 0; i < amountOfContact; i++) {
            sourceContacts.push(Helpers.createYoYoUser());
        }

        var repeatRate = Random.nd_random_in_range(contactsRepeatRateConfig);
        var similarRate = Random.nd_random_in_range(contactsSimilarRateConfig);
        var repeatAmount = 0;
        var similarAmount = 0;
        for (i = 0; i < amountOfContact; i += 2) {
            var r = Math.random();
            if (r <= repeatRate) {
                this.generateContactAsFlag(sourceContacts[i], sourceContacts[i + 1], targetContacts, 'repeat');
                repeatAmount += 2;
            }
            else if (r > repeatRate && r <= repeatRate + similarRate) {
                this.generateContactAsFlag(sourceContacts[i], sourceContacts[i + 1], targetContacts, 'similar');
                similarAmount += 2;
            }
            else {
                this.generateContactAsFlag(sourceContacts[i], sourceContacts[i + 1], targetContacts, 'diff');
            }
        }

        //TODO, 假设没有信息缺失，否则会造成无法保障联系人重复的有效性！
        // this.cleanSomeInfo(targetContacts);
        var result = {};
        result.contacts = targetContacts;
        result.fact = [repeatAmount, similarAmount, amountOfContact - repeatAmount - similarAmount];

        return result;
    },

    generateContactAsFlag: function (sourceContact1, sourceContact2, targetContacts, flag) {
        targetContacts.push(sourceContact1);
        var rule = Random.array_element(Config.rule[flag]);
        var infoTemp = this.repeatAsRule(sourceContact1, sourceContact2, rule);
        targetContacts.push(infoTemp);
    },

    cleanSomeInfo: function (contacts) {
        for (var i = 0; i < contacts.length; i++) {
            var infoTemp = contacts[i];
            infoTemp.ims = Math.random() < Config.contactsHasIms ? infoTemp.ims : null;
            infoTemp.sns = Math.random() < Config.contactsHasSns ? infoTemp.sns : null;
            infoTemp.addresses = Math.random() < Config.contactsHasAddresses ? infoTemp.addresses : null;
        }
    },

    //0不重复，1重复，依次为name,phone,email,im,sn,address
    repeatAsRule: function (repeatInfo, unRepeatInfo, rule) {
        // console.log("#####################\n");
        // console.log("rule: " + rule + "\n");
        // console.log("repeatInfo: " + repeatInfo + "\n");
        // console.log("unRepeatInfo: " + unRepeatInfo + "\n");
        var infoTemp = unRepeatInfo;
        var i = 0;
        for (var key in infoTemp) {
            infoTemp[key] = rule[i++] ? repeatInfo[key] : unRepeatInfo[key];
        }
        return infoTemp;
    }

};

module.exports = user;