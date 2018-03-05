'use strict';

var index = require('../../');
var log = index.log;
var vcoin = require('vcoin');

var Vcoin = function(options) {
  this._config = this._getConfig(options);
};

Vcoin.prototype.start = function(callback) {
  var self = this;
  self._vcoin = vcoin.fullnode(self._config);

  log.info('Starting Vcoin full node...');

  self._vcoin.open().then(function() {
    self._vcoin.connect().then(function() {
      log.info('Waiting for Vcoin to sync');
      self._vcoin.startSync();
      
      if (!self._vcoin.chain.synced) {
        // wait for vcoin to sync before allowing p2p service to try to connect
        self._vcoin.chain.once('full', callback);
      } else {
        // this will instruct the p2p service to start trying to connect to vcoin right away
        callback();
      }
    });
  });
};

Vcoin.prototype.stop = function(callback) {
  var self = this;
  self._vcoin.stopSync();
  self._vcoin.disconnect().then(function() {
    return self._vcoin.close();
  }).then(callback);
};

// --- privates

Vcoin.prototype._getConfig = function(options) {
  var config = {
    db: 'leveldb',
    checkpoints: true,
    network: options.network || 'main',
    listen: true,
    logConsole: true,
    logLevel: 'info',
    port: options.port,
    persistent: true,
    workers: true
  };
  if (options.prefix) {
    config.prefix = options.prefix;
  }
  return config;
};

module.exports = Vcoin;
