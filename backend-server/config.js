import Arweave from "arweave";
import cardanoCli from "cardanocli-js";
import { join } from "path";
import { JSONFileSync, LowSync } from "lowdb";
import fs from "fs";

const arweaveKeyInFile = fs.readFileSync("./arweave-key.json", "utf8");
export const arweaveKey = JSON.parse(arweaveKeyInFile);
const dir = process.env.NETWORK === "mainnet" ? "./mainnet" : "./testnet";
const network =
  process.env.NETWORK === "mainnet" ? "mainnet" : "testnet-magic 1097911063";

const shelleyGenesisPath =
  process.env.NETWORK === "mainnet"
    ? "./mainnet-shelley-genesis.json"
    : "./testnet-shelley-genesis.json";

const walletName = process.env.NETWORK === "mainnet" ? "main" : "test";

const dbName =
  process.env.NETWORK === "mainnet" ? "main-db.json" : "test-db.json";

export const cli = new cardanoCli({
  network: network,
  dir: dir,
  shelleyGenesisPath: shelleyGenesisPath,
  cliPath: "./cardano-cli",
  socketPath: "/ipc/node.socket",
});

export const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
});

export const arweaveAddress = await arweave.wallets.jwkToAddress(arweaveKey);

export const wallet = cli.wallet(walletName);

// Use JSON file for storage
const file = join(".", dbName);

export const db = new LowSync(new JSONFileSync(file));

db.data ||= { mintingRequests: [] };
