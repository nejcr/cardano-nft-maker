import lodash from "lodash";
import { v4 as uuidv4 } from "uuid";
import { db } from "./config.js";

export const statuses = {
  MINT_CREATED: "mint_created",
  MINT_SUCCESS: "mint_success",
  MINT_ERROR: "mint_error",
};

export const service = {
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
};
