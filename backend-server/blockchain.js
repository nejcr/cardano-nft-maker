import { arweave, arweaveKey, cli, wallet } from "./config.js";
import { readFileSync, unlinkSync, writeFileSync } from "fs";
import { UnixFS } from "ipfs-unixfs";
import dagPB from "ipld-dag-pb";

const { DAGNode } = dagPB;

const signTransaction = (wallet, tx, script) => {
  return cli.transactionSign({
    signingKeys: [wallet.payment.skey, wallet.payment.skey],
    scriptFile: script,
    txBody: tx,
  });
};

const createTransaction = (tx) => {
  let raw = cli.transactionBuildRaw(tx);
  let fee = cli.transactionCalculateMinFee({
    ...tx,
    txBody: raw,
  });
  tx.txOut[0].value.lovelace -= fee;
  return cli.transactionBuildRaw({ ...tx, fee });
};

export const blockchain = {
  store: async (id, file) => {
    const fileName = "cardano-nft-file_" + id;
    const contentType = file.split("data:")[1].split(";")[0];
    const fileExtension = file.split("data:image/")[1].split(";")[0];
    const fullFileName = fileName + "." + fileExtension;
    writeFileSync(fullFileName, file.split(";base64,").pop(), {
      encoding: "base64",
    });
    const buffer = readFileSync(fullFileName);

    const unixFSFile = new UnixFS({ data: buffer, type: "file" });

    const node = new DAGNode(unixFSFile.marshal());
    const cid = await dagPB.util.cid(dagPB.util.serialize(node));
    const ipfsCid = cid.toBaseEncodedString();

    const anchor = (await arweave.api.get("tx_anchor")).data;
    let transaction = await arweave.createTransaction(
      {
        last_tx: anchor,
        data: buffer,
      },
      arweaveKey
    );
    transaction.addTag("Content-Type", contentType);
    transaction.addTag("IPFS-Add", ipfsCid);

    await arweave.transactions.sign(transaction, arweaveKey);
    let uploader = await arweave.transactions.getUploader(transaction);

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }

    console.log(transaction);
    console.log(ipfsCid);
    console.log(`https://ipfs.io/ipfs/${ipfsCid}`);

    unlinkSync(fullFileName);
    return { transaction, ipfsCid };
  },
  mint: async (id, arweaveId) => {
    const mintScript = {
      keyHash: cli.addressKeyHash(wallet.name),
      type: "sig",
    };

    const policy = cli.transactionPolicyid(mintScript);
    const myNFT = `${policy}.${id}`;
    const tx = {
      txIn: wallet.balance().utxo,
      txOut: [
        {
          address: wallet.paymentAddr,
          value: { ...wallet.balance().value, [myNFT]: 1 },
        },
      ],
      mint: {
        action: [{ type: "mint", quantity: 1, asset: myNFT }],
        script: [mintScript],
      },
      witnessCount: 2,
    };

    const raw = createTransaction(tx);

    const signed = signTransaction(wallet, raw, mintScript);
    const txHash = cli.transactionSubmit(signed);
    return txHash;
  },
};
