import yargs from "yargs";
import { BaseCommandLineOptions } from "../types";

export const DEFAULT_SECRET_COMMAND_LINE_OPTIONS: {
  [key in keyof BaseCommandLineOptions]: yargs.Options;
} = {
  hfAPIKey: {
    type: "string",
    demandOption: true,
    description: "The OpenAI API key",
  },
  wcdUrl: {
    type: "string",
    demandOption: true,
    description: "The Weaviate Cloud URL",
  },
  wcdApiKey: {
    type: "string",
    demandOption: true,
    description: "The Weaviate Cloud API key",
  },
  collectionName: {
    type: "string",
    demandOption: true,
    description: "The name of the collection to delete",
    default: "Movie",
  },
};
