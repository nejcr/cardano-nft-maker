#!/bin/bash

envs=$(./init.sh)

envs=($envs)
working_dir=${envs[0]}
network=${envs[1]}

WORKING_DIR="${working_dir}" NETWORK="${network}" docker-compose up --no-deps --build cardano-node backend-server cardano_frontend_app
