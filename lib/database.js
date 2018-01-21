var mysql = require('mysql');
const Promise = require('bluebird');
// const mysql = require('promise-mysql');
const settings = require('./settings');

const pool = mysql.createPool({
    host: settings.MYSQL.HOST,
    user: settings.MYSQL.USER,
    password: settings.MYSQL.PASSWORD,
    database: settings.MYSQL.DATABASE,
});

getConnection = function getConnection(callback) {
    pool.getConnection(function (error, connection) {
        if (error) throw error
        connection.release();
        callback(connection);
    });
};

getConnectionPromise = function getConnection() {
    return new Promise(function(resolve, reject) {
        pool.getConnection(function (error, connection) {
            if (error) return reject(error);

            connection.release();
            return resolve(connection);
        });
    })
};

query = function (arg) { // -> Query SQL
    return new Promise(function (resolve, reject) {
        getConnectionPromise()
            .then(function (connection) {
                connection.query(arg, function (err, results, fields) {
                    if (err) return reject(err);
                    return resolve(results);
                });
            })
    });
}

db = { getConnection: getConnection, getConnectionPromise: getConnectionPromise, query: query };
module.exports = db;
// module.exports = connection;