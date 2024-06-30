"use server";

import { vectorizer } from "weaviate-client";
import { getClient } from ".";
import { DEFAULT_COLLECTION_NAME, DEFAULT_MODEL, DEFAULT_RETURN_LIMIT, DEFAULT_SOURCE_PROPERTIES, VECTORIZER_NAME } from "@/constants";

export const createCollection = async (collectionName: string) => {
  try {
    const client = await getClient();
    const movies = await client.collections.create({
      name: collectionName,
      vectorizers: [
        vectorizer.text2VecHuggingFace({
          name: VECTORIZER_NAME,
          sourceProperties: DEFAULT_SOURCE_PROPERTIES as any,
          model: DEFAULT_MODEL,
          waitForModel: true,
          useCache: true,
        }),
      ],
      // generative: generative.openAI(),
      properties: [
        {
          name: "title",
          dataType: "text",
        },
        {
          name: "year",
          dataType: "number",
        },
        {
          name: "genre",
          dataType: "text",
        },
        {
          name: "description",
          dataType: "text",
        },
        {
          name: "url",
          dataType: "text",
        },
        {
          name: "rating",
          dataType: "number",
        },
      ],
    });

    console.log(`Collection created: ${movies.name}`);
  } catch (error) {
    console.error(error);
  }
};

export const collectionExists = async (
  collectionName: string
): Promise<boolean> => {
  const client = await getClient();
  return await client.collections.exists(collectionName);
};

export const deleteCollection = async (
  collectionName: string
): Promise<void> => {
  const client = await getClient();
  return await client.collections.delete(collectionName);
};

export const seedCollection = async (
  collectionName: string,
  data: any[] = []
) => {
  const client = await getClient();
  const collection = client.collections.get(collectionName);

  const res = await collection.data.insertMany(data);
};

export const searchByQuery = async (
  query: string,
  collectionName = DEFAULT_COLLECTION_NAME
) => {
  try {
    const client = await getClient();
    const collection = client.collections.get(collectionName);
    const response = await collection.query.hybrid(query, {
      limit: DEFAULT_RETURN_LIMIT,
    });

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
