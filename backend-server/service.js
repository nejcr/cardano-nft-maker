import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { arweave, arweaveAddress, cli, db, explorerLink, wallet } from './config.js';
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
        db.chain = lodash.chain(db.data);
        db.data ||= { mintingRequests: [] };
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
        const formattedMetadata = {};

        metadata?.forEach((entry) => {
            const key = entry?.key;
            const value = entry.value;
            formattedMetadata[key] = value;
        });

        const mintingRequest = {
            assetName,
            metadata: formattedMetadata,
            ...mintingData,
        };
        db.read();
        db.chain = lodash.chain(db.data);
        const exists = db.chain.get('mintingRequests').find({ assetName: assetName }).value();

        if (exists) {
            return { status: 400, message: 'NFT with that name already exists', code: 'already_exist' };
        }
        db.data ||= { mintingRequests: [] };

        db.data.mintingRequests.push(mintingRequest);
        db.write();
        db.read();
        db.chain = lodash.chain(db.data);

        if (file.hasOwnProperty('ipfsHash')) {
            const ipfsLink = `https://ipfs.io/ipfs/${file.ipfsHash}`;
            db.chain
                .get('mintingRequests')
                .find({ id: id })
                .assign({
                    ipfsHash: file.ipfsHash,
                    cardanoTransaction: 'not_ready',
                    cardanoTransactionLink: 'not_ready',
                    ipfsLink: ipfsLink,
                })
                .value();
            db.write();

            const data = db.chain.get('mintingRequests').find({ id: id }).value();
            console.log('started executing minting');
            blockchain
                .mint({
                    assetName: assetName,
                    ipfsCid: file.ipfsHash,
                    providedMetadata: formattedMetadata,
                })
                .then((txHash) => {
                    db.chain
                        .get('mintingRequests')
                        .find({ id: id })
                        .assign({
                            cardanoTransaction: txHash,
                            status: statuses.MINT_SUCCESS,
                            cardanoTransactionLink: explorerLink + txHash,
                        })
                        .value();
                    db.write();
                })
                .catch((err) => {
                    console.log('minting failed because local not is not yet synced with the latest transaction');
                    db.chain
                        .get('mintingRequests')
                        .find({ id: id })
                        .assign({
                            status: statuses.MINT_ERROR,
                        })
                        .value();
                    db.write();
                });
            console.log('ended executing minting');
            return { status: 200, data: data };
        } else {
            blockchain.store(id, file).then(({ arweaveTransactionId, ipfsCid }) => {
                const ipfsLink = `https://ipfs.io/ipfs/${ipfsCid}`;
                const arweaveLink = `https://arweave.net/${arweaveTransactionId}`;
                db.chain
                    .get('mintingRequests')
                    .find({ id: id })
                    .assign({
                        arweaveId: arweaveTransactionId,
                        arweaveLink: arweaveLink,
                        ipfsHash: ipfsCid,
                        ipfsLink: ipfsLink,
                    })
                    .value();
                db.write();
                blockchain
                    .mint({
                        assetName: assetName,
                        ipfsCid,
                        arweaveId: arweaveTransactionId,
                        providedMetadata: formattedMetadata,
                    })
                    .then((txHash) => {
                        console.log('succesfully minted nft,tx: ', txHash);
                        db.chain
                            .get('mintingRequests')
                            .find({ id: id })
                            .assign({
                                cardanoTransaction: txHash,
                                status: statuses.MINT_SUCCESS,
                                cardanoTransactionLink: explorerLink + txHash,
                            })
                            .value();
                        db.write();
                    })
                    .catch((err) => {
                        console.log('minting failed because local not is not yet synced with the latest transaction');
                        db.chain
                            .get('mintingRequests')
                            .find({ id: id })
                            .assign({
                                status: statuses.MINT_ERROR,
                            })
                            .value();
                        db.write();
                    });
            });
        }

        const data = db.chain.get('mintingRequests').find({ id: id }).value();
        return { status: 200, data: data };
    },
    getStatus: async (request) => {
        let lovelaceBalance = 0;

        const winstonBalance = await arweave.wallets.getBalance(arweaveAddress);

        let arweaveBalance = arweave.ar.winstonToAr(winstonBalance);
        const totalBalance = {
            cardano: {
                network: process.env.network,
                address: wallet.paymentAddr,
                lovelaceAmount: wallet.balance().value.lovelace,
                adaAmount: cli.toAda(wallet.balance().value.lovelace),
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
