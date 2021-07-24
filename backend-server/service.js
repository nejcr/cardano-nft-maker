import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import { arweave, arweaveAddress, cli, db, wallet } from "./config.js";
import { blockchain } from "./blockchain.js";

export const statuses = {
  MINT_CREATED: "mint_created",
  MINT_SUCCESS: "mint_success",
  MINT_ERROR: "mint_error",
};

export const service = {
  getMint: async (id) => {
    db.read();
    db.chain = lodash.chain(db.data);
    return db.chain.get("mintingRequests").find({ id: id }).value();
  },

  getMints: async () => {
    db.read();
    return db.data.mintingRequests;
  },
  createMint: async (request) => {
    console.log(request);
    const { assetName, metadata, file } = request;
    const id = uuidv4().toString();
    const mintingData = {
      id: id,
      status: statuses.MINT_CREATED,
      time: Date.now().toString(),
    };
    const mintingRequest = {
      assetName,
      metadata,
      ...mintingData,
    };
    db.read();
    db.data ||= { mintingRequests: [] };

    db.data.mintingRequests.push(mintingRequest);
    db.write();
    db.read();
    db.chain = lodash.chain(db.data);
    // blockchain.store(id, file).then(({transaction,ipfsCid}) => {
    //
    //   blockchain.mint(id, arweaveId);
    // });
    db.chain
      .get("mintingRequests")
      .find({ id: id })
      .assign({
        arweaveId: "dummy",
        arweaveLink:
          "https://img.cinemablend.com/filter:scale/quill/2/5/7/3/b/2/2573b2c3b5ebe45b398fcb9c10538e6c10a5c60b.jpg?mw=600",
        ipfsHash: "dummy",
        cardanoTransaction:
          "https://cardanoscan.io/transaction/b98e7bc2f18d0e0a4c7c8f356af60e48eb507d942dd18d1cb339927a513eae3b",
        ipfsLink:
          "https://img.cinemablend.com/filter:scale/quill/2/5/7/3/b/2/2573b2c3b5ebe45b398fcb9c10538e6c10a5c60b.jpg?mw=600",
      })
      .value();
    db.write();
    await blockchain.mint("cund", "cund");

    return db.chain.get("mintingRequests").find({ id: id }).value();
  },
  getStatus: async (request) => {
    let lovelaceBalance = 0;

    const utxos = wallet.balance().utxo;
    for (let utxo of utxos) {
      const lovelaceAmount = utxo?.value?.lovelace ?? 0;
      lovelaceBalance += lovelaceAmount;
    }
    const winstonBalance = await arweave.wallets.getBalance(arweaveAddress);

    let arweaveBalance = arweave.ar.winstonToAr(winstonBalance);
    const totalBalance = {
      cardano: {
        network: process.env.network,
        address: wallet.paymentAddr,
        numberOfUtxos: utxos.length,
        lovelaceAmount: lovelaceBalance,
        adaAmount: cli.toAda(lovelaceBalance),
      },
      arweave: {
        network: "mainnet",
        address: arweaveAddress,
        arweaveBalance: arweaveBalance,
        winstonBalanece: winstonBalance,
      },
      status: {
        cardanoStatus: cli.queryTip(),
        arweaveStatus: await arweave.network.getInfo(),
      },
    };

    return totalBalance;
  },
};
