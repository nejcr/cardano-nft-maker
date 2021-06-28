const cardanoCli = require("cardanocli-js");
const cli = new cardanoCli({
    network: "testnet-magic 1097911063",
    dir: "./testnet",
    shelleyGenesisPath: "./testnet-shelley-genesis.json",
    cliPath: "./cardano-cli",
    socketPath: "/ipc/node.socket",
});
const wallet = cli.wallet("test");
module.exports = {wallet, cli}
