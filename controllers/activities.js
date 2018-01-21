var Activity = require('../_models/activity');

exports.getActivity = function(req, res, next) {
    var activity = new Activity('LoL', 'Jugar League of Legends');
    res.json([activity]);
}
