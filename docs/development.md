# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop vertcore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/vertcore-node.git
git clone git@github.com:<yourusername>/vertcore-lib.git
```

To develop vertcoin or to compile from source:

```bash
git clone git@github.com:<yourusername>/vertcoin.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See vertcoin documentation for building vertcoin on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd vertcore-lib
npm install
cd ../vertcore-node
npm install
```
**Note**: If you get a message about not being able to download vertcoin distribution, you'll need to compile vertcoind from source, and setup your configuration to use that version.


We now will setup symlinks in `vertcore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf vertcore-lib
ln -s ~/vertcore-lib
rm -rf bitcoind-rpc
ln -s ~/bitcoind-rpc
```

And if you're compiling or developing vertcoin:
```bash
cd ../bin
ln -sf ~/vertcoin/src/vertcoind
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd vertcore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/vertcoind.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/vertcoind.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch vertcore-node.json
touch package.json
```

Edit `vertcore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "vertcoind",
    "web",
    "insight-vtc-api",
    "insight-vtc-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "vertcoind": {
      "spawn": {
        "datadir": "/home/<youruser>/.vertcoin",
        "exec": "/home/<youruser>/vertcoin/src/vertcoind"
      }
    }
  }
}
```

**Note**: To install services [insight-vtc-api](https://github.com/vertcoin-project/insight-vtc-api) and [insight-vtc-ui](https://github.com/vertcoin-project/insight-vtc-ui) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/vertcore-lib
ln -s ~/vertcore-node
ln -s ~/insight-vtc-api
ln -s ~/insight-vtc-ui
```

Make sure that the `<datadir>/vertcoin.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=vertcoin
rpcpassword=local321
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../vertcore-node/bin/vertcore-node start
```