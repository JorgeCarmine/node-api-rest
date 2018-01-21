// var getConnection = require('../lib/database');
var db = require('../lib/database')


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

    let users;

    // Con promesas
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
