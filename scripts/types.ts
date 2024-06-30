export interface SeedCollectionCommandOptions extends BaseCommandLineOptions {}

export interface CreateCollectionCommandLineOptions
  extends SecretCommandLineOptions {
  collectionName: string;
  eraseIfExists: boolean;
}

export interface EraseCommandLineOptions extends BaseCommandLineOptions {
  // JIC we want to add more options in the future
}

export interface SecretCommandLineOptions {
  hfAPIKey: string;
  wcdUrl: string;
  wcdApiKey: string;
}

export interface BaseCommandLineOptions extends SecretCommandLineOptions {
  collectionName: string;
}
