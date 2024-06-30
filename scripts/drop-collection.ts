import readline from "readline";
import { setEnviromentsFromArgs } from "./common";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { DEFAULT_SECRET_COMMAND_LINE_OPTIONS } from "./common/constants";
import { deleteCollection } from "@/api-service/collection";
import { EraseCommandLineOptions } from "./types";

const promptUser = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "Are you sure you want to delete the collection? (yes/no) ",
      (answer) => {
        rl.close();
        resolve(answer);
      }
    );
  });
};

const argv = yargs(hideBin(process.argv))
  .options({
    ...DEFAULT_SECRET_COMMAND_LINE_OPTIONS,
  })
  .parseSync() as EraseCommandLineOptions;

async function main() {
  const answer = (await promptUser()) as string;
  if (["yes", "y"].includes(answer.toLowerCase())) {
    const { hfAPIKey, wcdUrl, wcdApiKey, collectionName } = argv;
    setEnviromentsFromArgs({ hfAPIKey, wcdUrl, wcdApiKey });
    deleteCollection(collectionName)
      .then(() => console.log(`Deleted collection: ${collectionName}`))
      .catch((error) => console.error(error));
  } else {
    console.log("Aborting...");
  }
}

main().catch(console.error);
