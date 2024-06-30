import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import {
  createCollection,
  collectionExists,
  deleteCollection,
} from "@/api-service/collection";
import { DEFAULT_SECRET_COMMAND_LINE_OPTIONS } from "./common/constants";
import { CreateCollectionCommandLineOptions } from "./types";
import { setEnviromentsFromArgs } from "./common";

const argv = yargs(hideBin(process.argv))
  .options({
    eraseIfExists: {
      type: "boolean",
      default: false,
      description: "Erase the collection if it exists",
    },
    ...DEFAULT_SECRET_COMMAND_LINE_OPTIONS,
  })
  .parseSync() as CreateCollectionCommandLineOptions;

async function main() {
  const { collectionName, eraseIfExists, hfAPIKey, wcdUrl, wcdApiKey } = argv;

  // inject the required env variables for the client
  setEnviromentsFromArgs({ hfAPIKey, wcdUrl, wcdApiKey });

  if (eraseIfExists) {
    const exists = await collectionExists(collectionName);
    if (exists) {
      await deleteCollection(collectionName);
      console.log(`Deleted existing collection: ${collectionName}`);
    }
  }

  createCollection(collectionName)
    .then(() => console.log(`Created collection: ${collectionName}`))
    .catch(() => {
      console.error(`Failed to create collection: ${collectionName}`);
    });
}

main().catch(console.error);
