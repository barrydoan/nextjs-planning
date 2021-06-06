import { MongoClient } from 'mongodb';


async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({message: 'invalid email address'});
      return;
    }

    const client = await MongoClient.connect('mongodb+srv://nhat:nhat@cluster0.8h2u5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const db = client.db();
    await db.collection('email').insertOne({email: userEmail});
    client.close();

    console.log(userEmail);
    res.status(201).json({message: 'Signed up!'});

  }
}

export default handler;