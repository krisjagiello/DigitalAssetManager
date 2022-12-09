node=2
acct="0x7418819E9c45d89A216AFBbe4a4E96E94652fD0e"
port=30304
logFile=EthNode${node}.log
bootnode=`cat boot/boot.enode.uri`
networkid=112114111118
authRpcPort=8552

geth --datadir ./node${node} --bootnodes=$bootnode --networkid ${networkid} --port $port --mine --miner.threads=1 --miner.etherbase=$acct --unlock=$acct --syncmode snap --password boot/unlock.pwd > Logs/$logFile 2>&1 --authrpc.port $authRpcPort &

