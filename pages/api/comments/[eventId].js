import { MongoClient } from 'mongodb';
import {connectDatabase, getAllDocuments, insertDocument} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'connecting to the database fail' });
    return;
  }



  if (req.method === 'POST') {
    console.log('req.body', req.body);
    const { email, name, text } = req.body;

    console.log(email, name, text);
    if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({message: 'Invalid input'});
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    }

    console.log(newComment);

    let result;

    try {
      result = await insertDocument(client, 'commnets', newComment);
      newComment._id = result.insertedId;
    } catch (error) {
      res.status(500).json({message: 'Inserting comment fail'});
      return;
    }


    res.status(201).json({message: 'Added comment', comment: newComment});
  }

  if (req.method === 'GET') {
    let documents;
    try {
      documents = await getAllDocuments(client, 'comments', {_id: -1});
    } catch (error) {
      res.status(500).json({message: 'Getting data fail'});
      return;
    }
    res.status(200).json({comments: documents});
  }
  client.close();

}

export default handler;