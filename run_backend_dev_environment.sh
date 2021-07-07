#!/bin/bash

envs=$(./init.sh "$1")

envs=($envs)
working_dir=${envs[0]}
network=${envs[1]}

WORKING_DIR="${working_dir}" NETWORK="${network}" docker-compose up --detach --no-deps --build cardano-node
WORKING_DIR="${working_dir}" NETWORK="${network}" docker-compose run --rm --service-ports cardano_dev_environment
