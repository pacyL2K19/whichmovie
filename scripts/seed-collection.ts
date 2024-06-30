import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { DEFAULT_SECRET_COMMAND_LINE_OPTIONS } from "./common/constants";
import { seedCollection } from "@/api-service/collection";
import { dumbMovies } from "@/data/dumb";
import { SeedCollectionCommandOptions } from "./types";
import { setEnviromentsFromArgs } from "./common";

const argv = yargs(hideBin(process.argv))
  .options(DEFAULT_SECRET_COMMAND_LINE_OPTIONS)
  .parseSync() as SeedCollectionCommandOptions;

async function main() {
  const { hfAPIKey, wcdUrl, wcdApiKey, collectionName } = argv;
  // inject the required env variables for the client
  setEnviromentsFromArgs({ hfAPIKey, wcdUrl, wcdApiKey });
  seedCollection(collectionName, dumbMovies)
    .then(() => console.log(`Seeded collection: ${collectionName}`))
    .catch((error) => console.error(error));
}

main().catch(console.error);
