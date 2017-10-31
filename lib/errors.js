'use strict';

var createError = require('errno').create;

var VertcoreNodeError = createError('VertcoreNodeError');

var RPCError = createError('RPCError', VertcoreNodeError);

module.exports = {
  Error: VertcoreNodeError,
  RPCError: RPCError
};
