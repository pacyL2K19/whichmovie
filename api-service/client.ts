"use server";

import weaviate, { WeaviateClient } from "weaviate-client";

export const getClient = async (): Promise<WeaviateClient> => {
  return await weaviate.connectToWeaviateCloud(process.env.WCD_URL!!, {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY!!),
    headers: {
      "X-Huggingface-Api-Key": process.env.HUGGINGFACE_APIKEY!!,
    },
  });
};
