import { MongoClient } from 'mongodb';
import {connectDatabase, insertDocument} from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: 'invalid email address'});
      return;
    }

    let client;

    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database fail' });
      return;
    }

    try {
      await insertDocument(client, 'email', userEmail);
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data fail' });
      return;
    }

    console.log(userEmail);
    res.status(201).json({message: 'Signed up!'});

  }
}

export default handler;