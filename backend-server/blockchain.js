import { arweave, arweaveKey, cli, walletName } from './config.js';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { UnixFS } from 'ipfs-unixfs';
import dagPB from 'ipld-dag-pb';

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
        const fileName = 'cardano-nft-file_' + id;
        const contentType = file.split('data:')[1].split(';')[0];
        const fileExtension = file.split('data:image/')[1].split(';')[0];
        const fullFileName = fileName + '.' + fileExtension;
        writeFileSync(fullFileName, file.split(';base64,').pop(), {
            encoding: 'base64',
        });
        const buffer = readFileSync(fullFileName);

        const unixFSFile = new UnixFS({ data: buffer, type: 'file' });

        const node = new DAGNode(unixFSFile.marshal());
        const cid = await dagPB.util.cid(dagPB.util.serialize(node));
        const ipfsCid = cid.toBaseEncodedString();

        const anchor = (await arweave.api.get('tx_anchor')).data;
        let transaction = await arweave.createTransaction(
            {
                last_tx: anchor,
                data: buffer,
            },
            arweaveKey
        );
        transaction.addTag('Content-Type', contentType);
        transaction.addTag('IPFS-Add', ipfsCid);

        await arweave.transactions.sign(transaction, arweaveKey);
        let uploader = await arweave.transactions.getUploader(transaction);

        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }

        unlinkSync(fullFileName);
        return { arweaveTransactionId: transaction.id, ipfsCid };
    },
    mint: async ({ assetName, ipfsCid, arweaveId, providedMetadata }) => {
        await new Promise((r) => setTimeout(r, 200));
        console.log(`Started minting ${assetName} with ipfs:${ipfsCid} and arweawe:${arweaveId}`);

        const arweaveData = arweaveId ? { arweaveId: arweaveId } : {};
        const metadata = providedMetadata && Object.keys(providedMetadata).length > 0 ? { metadata: providedMetadata } : {};

        const { slot: currentSlot } = cli.queryTip();
        const wallet = cli.wallet(walletName);

        const mintScript = {
            type: 'all',
            scripts: [
                { slot: currentSlot + 10000, type: 'before' },
                {
                    keyHash: cli.addressKeyHash(wallet.name),
                    type: 'sig',
                },
            ],
        };

        const policy = cli.transactionPolicyid(mintScript);
        const createdNFT = `${policy}.${assetName}`;

        const tx = {
            invalidAfter: currentSlot + 10000,
            txIn: wallet.balance().utxo,
            txOut: [
                {
                    address: wallet.paymentAddr,
                    value: { ...wallet.balance().value, [createdNFT]: 1 },
                },
            ],
            mint: {
                action: [{ type: 'mint', quantity: 1, asset: createdNFT }],
                script: [mintScript],
            },
            metadata: {
                721: {
                    [policy]: {
                        [assetName]: {
                            name: assetName,
                            image: ipfsCid,
                            ...metadata,
                            ...arweaveData,
                        },
                    },
                },
            },
            witnessCount: 2,
        };

        const raw = createTransaction(tx);
        const signed = signTransaction(wallet, raw, mintScript);

        return cli.transactionSubmit(signed);
    },
};
