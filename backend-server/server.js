import express from "express";
import { arweave, cli, myArweaveAddress, wallet } from "./config.js";
import {
  apiErrorHandler,
  mintRequestValidationSchema,
} from "./apiValidation.js";
import { service } from "./service.js";

const PORT = process.env.DOCKER_MODE === "dev" ? 8043 : 8042;

const app = express();
app.use(express.json());

app.get("/balance", async (req, res) => {
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
      numberOfUtxos: utxos.length,
      lovelaceAmount: lovelaceBalance,
      adaAmount: cli.toAda(lovelaceBalance),
    },
    arweave: {
      arweaveBalance: arweaveBalance,
      winstonBalanece: winstonBalance,
    },
  };

  res.send(totalBalance);
});

app.post(
  "/mint",
  mintRequestValidationSchema,
  apiErrorHandler,
  async (req, res) => {
    const mint = await service.createMint(req.body);
    return res.send(mint);
  }
);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    console.error(err);
    return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server  listening at http://localhost:${PORT}`);
});
