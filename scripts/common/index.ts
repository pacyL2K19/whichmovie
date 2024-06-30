import { SecretCommandLineOptions } from "../types";

export const setEnviromentsFromArgs = (argv: SecretCommandLineOptions) => {
  const { hfAPIKey, wcdUrl, wcdApiKey } = argv;

  // inject the required env variables for the client
  process.env.HUGGINGFACE_APIKEY = hfAPIKey;
  process.env.WCD_URL = wcdUrl;
  process.env.WCD_API_KEY = wcdApiKey;
};
