var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var config = require('../settings').TOKEN

exports.generate = function(data) {
    return new Promise(function (resolve, reject) {
        let token;
       try {
           token = jwt.sign(data.toJSON(), config.KEY, {
               expiresIn: config.TIME,
               subject: data.subject
           })
        }catch(error) {
            console.log(error);
            return reject(error);
        }
        resolve(token);       
    });
}

exports.verifyToken = function(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, config.KEY, function(error, decoded) {
            if (error) {
                return reject(error)
            }
            return resolve(decoded)
        });
    });
}
