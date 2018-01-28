// var getConnection = require('../lib/database');
var db = require('../lib/database')
var User = require('../dbmodels/user');

const Promise = require('bluebird');

exports.getUsers = function (req, res, next) {
    // Con Callback
    /*getConnection(function (connection) {
        connection.query('SELECT * FROM seg_accesos', function (error, results, fields) {
            if (error) throw error;

            access = results;
            res.render('users', { users: users, access: access });
        });
    });*/


    // Con promesas
    let users;
    db.query('SELECT * FROM seg_usuarios')
        .then(function(results) {
            users = results;
            return db.query('SELECT * FROM seg_accesos')
        })
        .then(function(result) {
            users[0].accesos = result;
            console.log(users[0]);
            
            res.render('users', { users: users });
        })
        .catch(function(error) {
            console.log(error);
        });

    /*
    db.getConnectionPromise()
        .then(function (connection) {
            connection.query('SELECT * FROM seg_usuarios', function (error, results, fields) {
                if (error) throw error;

                users = results;
                connection.query('SELECT * FROM seg_accesos', function (error, results, fields) {
                    if (error) throw error;

                    access = results;
                    res.render('users', { users: users, access: access });
                });
                //res.render('users', { users: users });
            });
        })
        .catch(function (err) {
            console.log(err);
        });
    */
}


exports.create = function (req, res, next) {
    let user =  new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        nick: req.body.nick,
        login: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    User.findOne({ $or: [{ email: req.body.email }, { nick: req.body.nick } ] } )
        .then(function(doc) {
            if (doc) {
                if (doc.email === req.body.email) {
                    return Promise.reject({ code: 'USER_EXIST', message: 'Ya existe un usuario con ese correo' })
                } else if (doc.nick === req.body.nick) {
                    return Promise.reject({ code: 'USER_EXIST', message: 'Ya existe un usuario con ese nickname' })
                }    
            }            
            return user.save()
        }) 
        .then(function(err, doc){
            return res.status(201).json({ code: 'CREATED', message: 'Usuario creado' });
        })
        .catch(function(err) {
            return res.status(500).send({ code: 'DATABASE_ERROR', message: err });
        });
}

exports.getUsers = function(req, res, next) {
    User.find()
        .select('name lastName email nick')
        .then(function(data) {
            if (!data) {
                return Promise.reject( { code: 'DATABASE_ERROR', message: 'Error de base de datos' } );
            }
            return res.status(200).json({ users: data });
        })
        .catch(function(err) {
            return res.status(500).json({ code: 'DATABASE_ERROR', message: err })
        })
}

exports.getUser = function (req, res, next) {
    let param = req.params.param;
    
    // User.findOne({ $or: [{ _id: param }, { nick: param }] })

    User.findOne( { nick: param } )
        .then(function(user) {
            if(!user) {
                return Promise.reject({ code: 'USER_NOT_EXIST', message: 'El usuario no ha sido encontrado'  });
            }
            return res.status(200).json({ user: user})
        })
        .catch(function(error) {
            return res.status(400).json(error)
        });
    }

exports.updateUser = function(req, res, next){
    let param = req.params.param
    User.findOneAndUpdate({ nick: param }, { $set: {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        nick: req.body.nick,
    } }, { upsert: false, multi: false } )
        .select('name lastName email nick')
        .then(function (user) {
            if (!user) {
                return Promise.reject({ code: 'USER_NOT_EXIST', message: 'El usuario no ha sido encontrado' });
            }
            return res.status(200).json({ user: user })
        })
        .catch(function (error) {
            return res.status(400).json(error)
        });
}

exports.deleteUser = function(req, res, next) {
    let param = req.params.param;

    User.findOneAndRemove({ nick: param })
        .then(function(data) {
            if (!data) {
                return Promise.reject({ code: 'USER_NOT_EXIST', message: 'El usuario no ha sido encontrado' });
            }
            return res.status(200).json({ code: 'SUCCESS', user: data })
        })
        .catch(function(error) {
            console.log(error);
            if (error.code === 'USER_NOT_EXIST') {
                return res.status(404).send(err);
            }
            return res.stauts(500).send({ error })
        })
}

