node=3
acct="0x79BaDc8368Ddd8558CD55AF5c628c480E1837Ea1"
port=30305
logFile=EthNode${node}.log
bootnode=`cat boot/boot.enode.uri`
networkid=112114111118
authRpcPort=8553

geth --datadir ./node${node} --bootnodes=$bootnode --networkid ${networkid} --port $port --mine --miner.threads=1 --miner.etherbase=$acct --unlock=$acct --syncmode snap --password boot/unlock.pwd > Logs/$logFile 2>&1 --authrpc.port $authRpcPort &
