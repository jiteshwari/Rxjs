"use strict";

// Helper Method

var ENDPOINT = 'users',
    ROOT = 'https://jsonplaceholder.typicode.com';

var makeRequest = function makeRequest(path, item) {
    return new Promise(function (resolve, reject) {
        // Assumes jQuery
        path ? path = '/' + path : path = '/';
        item ? item = '/' + item : item = '/';
        var url = ROOT + path + item;

        $.getJSON(url).done(function (data) {
            resolve(data);
        }).fail(function () {
            reject();
        });
    });
};

// BOILERPLATE
var PROMISE = makeRequest(ENDPOINT),
    source = Rx.Observable.fromPromise(PROMISE).flatMap(Rx.Observable.from);

source.map(function (user) {
    return user.website;
}).subscribe(function (value) {
    var row = document.createElement('tr');
    row.innerHTML = value;

    $('#email-table-body').append(row);
    console.log(value);
});