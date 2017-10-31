'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export vertcore-lib', function() {
    var vertcore = require('../');
    should.exist(vertcore.lib);
    should.exist(vertcore.lib.Transaction);
    should.exist(vertcore.lib.Block);
  });
});
