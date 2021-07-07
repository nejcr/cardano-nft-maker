import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import { arweave, cli, db, myArweaveAddress, wallet } from "./config.js";

export const statuses = {
  MINT_CREATED: "mint_created",
  MINT_SUCCESS: "mint_success",
  MINT_ERROR: "mint_error",
};

export const service = {
  getMint: async (id) => {
    return 42;
  },
  createMint: async (request) => {
    const { assetName, metadata } = request;
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
    db.data.mintingRequests.push(mintingRequest);
    db.write();
    db.read();
    db.chain = lodash.chain(db.data);
    return db.chain.get("mintingRequests").find({ id: id }).value();
  },
  getStatus: async (request) => {
    let lovelaceBalance = 0;

    const utxos = wallet.balance().utxo;
    for (let utxo of utxos) {
      const lovelaceAmount = utxo?.value?.lovelace ?? 0;
      lovelaceBalance += lovelaceAmount;
    }
    const winstonBalance = await arweave.wallets.getBalance(myArweaveAddress);

    let arweaveBalance = arweave.ar.winstonToAr(winstonBalance);
    const totalBalance = {
      cardano: {
        address: wallet.paymentAddr,
        numberOfUtxos: utxos.length,
        lovelaceAmount: lovelaceBalance,
        adaAmount: cli.toAda(lovelaceBalance),
      },
      arweave: {
        address: myArweaveAddress,
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
