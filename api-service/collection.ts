"use server";

import { vectorizer } from "weaviate-client";
import { getClient } from ".";
import { randomUUID } from "crypto";

export const createCollection = async (collectionName: string) => {
  try {
    const client = await getClient();
    const movies = await client.collections.create({
      name: collectionName,
      vectorizers: [
        vectorizer.text2VecHuggingFace({
          name: "hf_vectorizer",
          sourceProperties: ["description", "title", "genre"],
          model: "sentence-transformers/all-MiniLM-L6-v2",
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

  const dataObjects = data.map((movie) => ({
    properties: movie,
    id: randomUUID(),
  }));

  const response = await collection.data.insertMany(data);

  console.log("Sample movie inserted: ", response);
  // for (const movie of data) {
  //   await collection.data.insert({
  //     properties: movie,
  //     vector: "text2vec-openai",
  //   });
  // }
};
