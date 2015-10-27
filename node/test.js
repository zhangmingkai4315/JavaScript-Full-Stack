var http = require('http');
var assert = require('assert');
var querystring = require('querystring');
var util = require('util');
var server=require('./server.js');

assert.deepEqual('[{"name":"jone","message":"hi"}]',server.getMessages());
assert.deepEqual('{"name":"Jake","message":"gogo"}',server.addMessage("name=Jake&message=gogo"));
assert.deepEqual('[{"name":"jone","message":"hi"},{"name":"Jake","message":"gogo"}]', server.getMessages("name=Jake&message=gogo"));
