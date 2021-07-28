import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { arweave, arweaveAddress, cli, db, wallet } from './config.js';
import { blockchain } from './blockchain.js';

export const statuses = {
    MINT_CREATED: 'mint_created',
    MINT_SUCCESS: 'mint_success',
    MINT_ERROR: 'mint_error',
};

export const service = {
    getMint: async (id) => {
        db.read();
        db.chain = lodash.chain(db.data);
        return db.chain.get('mintingRequests').find({ id: id }).value();
    },

    getMints: async () => {
        db.read();
        return db.data.mintingRequests;
    },
    createMint: async (request) => {
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
        db.chain = lodash.chain(db.data);
        const exists = db.chain.get('mintingRequests').find({ assetName: assetName }).value();
        console.log(exists);
        if (exists) {
            return { status: 400, message: 'NFT with that name already exists', code: 'already_exist' };
        }
        db.data ||= { mintingRequests: [] };

        db.data.mintingRequests.push(mintingRequest);
        db.write();
        db.read();
        db.chain = lodash.chain(db.data);
        blockchain.store(id, file).then(({ arweaveTransactionId, ipfsCid }) => {
            const ipfsLink = `https://ipfs.io/ipfs/${ipfsCid}`;
            const arweaveLink = `https://arweave.net/${arweaveTransactionId}`;
            db.chain
                .get('mintingRequests')
                .find({ id: id })
                .assign({
                    assetName: assetName,
                    arweaveId: arweaveTransactionId,
                    arweaveLink: arweaveLink,
                    ipfsHash: ipfsCid,
                    cardanoTransaction: 'not_ready',
                    ipfsLink: ipfsLink,
                })
                .value();
            db.write();
            blockchain
                .mint({
                    assetName: assetName,
                    ipfsCid,
                    arweaveId: arweaveTransactionId,
                    providedMetadata: metadata,
                })
                .then((txHash) => {
                    console.log('succesfully minted nft,tx: ', txHash);
                });
        });

        const data = db.chain.get('mintingRequests').find({ id: id }).value();
        return { status: 200, data: data };
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
                network: 'mainnet',
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
