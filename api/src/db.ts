import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { links?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URI as string);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const linksCollection: mongoDB.Collection = db.collection(process.env.LINKS_COLLECTION_NAME as string);

    collections.links = linksCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${linksCollection.collectionName}`);
}