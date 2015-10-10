'use strict';
var assert = require('assert');
var arkWatcher = require('./index.js');

var status = arkWatcher('status');

assert(status.serverRunning == "Yes", 'server is online and arkWatcher is routing correctly');
