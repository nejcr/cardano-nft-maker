#!/bin/bash
network="testnet"

if [[ $1 -eq 'mainnet' ]]; then
  network="mainnet"
fi

NETWORK=${network} docker-compose up --detach --no-deps --build cardano-node
docker-compose run --rm --service-ports cardano_dev_environment
