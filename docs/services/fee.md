# Fee Service

The fee service is a requirement of the insight-vtc-api service (not a vertcore-node built-in service). Its primary purpose is to query a vertcoin full node for the most up-to-date miner fees for transactions. A vertcoin full node such as [vertcoind](https://github.com/vertcoin-project/vertcoin-core) or [vcoin](https://github.com/vertcoin-project/vcoin) with an available RPC interface is required.

## Service Configuration

```json
"fee": {
  "rpc": {
    "user": "user",
      "pass": "pass",
      "host": "localhost",
      "protocol": "http",
      "port": 8332
  }
}
```
## Usage Example

```bash
curl http://localhost:3001/insight-vtc-api/estimateFee
```
