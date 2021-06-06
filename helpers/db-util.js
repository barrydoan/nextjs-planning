import {MongoClient} from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect('mongodb+srv://nhat:nhat@cluster0.8h2u5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection(collection).insertOne({email: document});

}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}