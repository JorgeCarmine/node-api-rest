var Promise = require('bluebird');
var auth = require('../lib/auth/index');
var User = require('../dbmodels/user');

exports.login = function (req, res, next) {
    let username = req.body.user;
    let password = req.body.password;
    let user = null;
    User.findOneAndUpdate({ $or: [{ email: user }, { nick: username } ], password: password }, { $inc: { login: 1 } })
        .select('name lastName email nick')
        .then(function(data) {
            console.log(typeof(data))
            if (!data) {
                return Promise.reject({ code: 'USER_NOT_EXIST', message: 'Usuario y/o contraseña incorrectos' });
            }
            user = data;
            data.subject = data._id.toString();
            return auth.generate(data);
        })
        .then(function(token) {
            return res.status(200).json({ code: 'SUCCESS', message: 'Éxito', result: { user: user, token: token }  });
        })
        .catch(function(error) {
            console.log(error);
            if (error.code == 'USER_NOT_EXIST') {
                return res.status(404).send({ code: error.code, message: error.message });
            }
            return res.status(500).send({ code: 'DATABASE_ERROR', message: error.message });
        });

}