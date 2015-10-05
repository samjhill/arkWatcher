'use strict';
var assert = require('assert');
var arkWatcher = require('./index.js');

var status = arkWatcher('status');
console.log(status);
