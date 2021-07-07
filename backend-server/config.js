import Arweave from "arweave";
import cardanoCli from "cardanocli-js";
import { join } from "path";
import { JSONFileSync, LowSync } from "lowdb";

export const cli = new cardanoCli({
  network: "testnet-magic 1097911063",
  dir: "./testnet",
  shelleyGenesisPath: "./testnet-shelley-genesis.json",
  cliPath: "./cardano-cli",
  socketPath: "/ipc/node.socket",
});

// Since v1.5.1 you're now able to call the init function for the web version without options. The current path will be used by default, recommended.

export const myArweaveAddress = "teTpHHt9Isv-_JDTyvtBTpd39_pY9r0-FZtoexCDFSY";

export const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
});

export const wallet = cli.wallet("test");

// Use JSON file for storage
const file = join(".", "db.json");

export const db = new LowSync(new JSONFileSync(file));

db.data ||= { mintingRequests: [] };
