import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect('mongodb+srv://nhat:nhat@cluster0.8h2u5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
  const db = client.db();



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

    const result = await db.collection('comments').insertOne(newComment);
    newComment.id = result.insertedId;

    res.status(201).json({message: 'Added comment', comment: newComment});
  }

  if (req.method === 'GET') {
    const documents = await db.collection('comments').find().sort({_id: -1}).toArray();
    res.status(200).json({comments: documents});
  }
  client.close();

}

export default handler;