node=1
acct="0x061292F3d3EDB6252007E7A78f7d11CB80f40D97"
port=30303
logFile=EthNode${node}.log
bootnode=`cat boot/boot.enode.uri`
networkid=112114111118

geth --datadir ./node${node} --bootnodes=$bootnode --networkid ${networkid} --port $port --mine --miner.threads=1 --miner.etherbase=$acct --unlock=$acct --syncmode snap --password boot/unlock.pwd > Logs/$logFile 2>&1 &
