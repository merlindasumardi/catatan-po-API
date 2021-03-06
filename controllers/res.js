'use strict';

exports.ok = function (values, res) {
    var data = {
        'status': 200,
        'values': values
    };
    res.json(data);
    res.end();
};

exports.error = function (values, res) {
    var data = {
        'status': 500,
        'values': values
    };
    res.status(400).json(data);
    res.end();
};