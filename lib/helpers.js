var Faker = require('../index');

// backword-compatibility
exports.randomNumber = function (range) {
    return Faker.random.number(range);
};

// backword-compatibility
exports.randomize = function (array) {
    return Faker.random.array_element(array);
};

// parses string for a symbol and replace it with a random number from 1-10
exports.replaceSymbolWithNumber = function (string, symbol) {
    // default symbol is '#'
    if (symbol === undefined) {
        symbol = '#';
    }

    var str = '';
    for (var i = 0; i < string.length; i++) {
        if (string[i] == symbol) {
            str += Math.floor(Math.random() * 10);
        } else {
            str += string[i];
        }
    }
    return str;
};

// takes an array and returns it randomized
exports.shuffle = function (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i, 10), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

exports.createCard = function () {
    return {
        "name": Faker.Name.findName(),
        "username": Faker.Internet.userName(),
        "email": Faker.Internet.email(),
        "address": {
            "streetA": Faker.Address.streetName(),
            "streetB": Faker.Address.streetAddress(),
            "streetC": Faker.Address.streetAddress(true),
            "streetD": Faker.Address.secondaryAddress(),
            "city": Faker.Address.city(),
            "ukCounty": Faker.Address.ukCounty(),
            "ukCountry": Faker.Address.ukCountry(),
            "zipcode": Faker.Address.zipCode()
        },
        "phone": Faker.PhoneNumber.phoneNumber(),
        "website": Faker.Internet.domainName(),
        "company": {
            "name": Faker.Company.companyName(),
            "catchPhrase": Faker.Company.catchPhrase(),
            "bs": Faker.Company.bs()
        },
        "posts": [
            {
                "words": Faker.Lorem.words(),
                "sentence": Faker.Lorem.sentence(),
                "sentences": Faker.Lorem.sentences(),
                "paragraph": Faker.Lorem.paragraph()
            },
            {
                "words": Faker.Lorem.words(),
                "sentence": Faker.Lorem.sentence(),
                "sentences": Faker.Lorem.sentences(),
                "paragraph": Faker.Lorem.paragraph()
            },
            {
                "words": Faker.Lorem.words(),
                "sentence": Faker.Lorem.sentence(),
                "sentences": Faker.Lorem.sentences(),
                "paragraph": Faker.Lorem.paragraph()
            }
        ]
    };
};

exports.createYoYoUser = function () {
    return {
        "name": Faker.Name.findNameCn(),
        "phones": [{
            //MOBILE_PHONE
            "phoneNumber": Faker.PhoneNumber.phoneNumber(),
            "isActive": true
        }],
        "emails": [
            Faker.Internet.email()
        ],
        "ims": [{
            "type": "QQ",
            "account": Faker.Internet.qq(),
            "isActive": true
        }],
        "sns": [{
            "type": Faker.Internet.snType(),
            "accountName": Faker.Internet.userName(),
            "accountId": Faker.Internet.qq(),
            "appKey": null
        }],
        "addresses": [
            Faker.Address.streetAddress(true)
        ]
    };
};

function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

exports.deepClone = clone;

exports.isEmpty = function (val) {
    return (val === null || val === []);
};