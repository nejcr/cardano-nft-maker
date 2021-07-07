#!/bin/bash

network="testnet"
working_dir="$HOME/cardano-nft-maker-testnet"
if [[ $1 == 'mainnet' ]]; then
  network="mainnet"
  working_dir="$HOME/cardano-nft-maker-mainnet"
  cp keys/main.payment.* ./backend-server/mainnet/priv/wallet/main

else
  cp keys/test.payment.* ./backend-server/testnet/priv/wallet/test
fi

cp keys/arweave-key* ./backend-server

echo "${working_dir} ${network}"
