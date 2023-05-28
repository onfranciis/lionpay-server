import { MongoClient } from "mongodb";

let client: MongoClient;

export const StartDBConnection = async () => {
  const MongoDbUrl = process.env.DB_URL;
  client = await MongoClient.connect(MongoDbUrl ?? "");
};

export const getDB = (collection?: string) => {
  return client.db("lionpay").collection(collection ?? "users");
};
