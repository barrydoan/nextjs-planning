function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'POST') {
    console.log('req.body', req.body);
    const { email, name, text } = req.body;

    console.log(email, name, text);
    if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({message: 'Invalid input'});
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text
    }

    console.log(newComment);

    res.status(201).json({message: 'Added comment', comment: newComment});
  }

  if (req.method === 'GET ') {
    const dummyList = [
      {id: 'e1', name: 'Max', email: 'test@test', comment: 'Comment 1'},
      {id: 'e2', name: 'Ny', email: 'test@test', comment: 'Comment 2'},
      {id: 'e3', name: 'Kat', email: 'test@test', comment: 'Comment 3'},
    ];
    console.log('begin show response')
    res.status(200).json({comments: dummyList});
  }
}

export default handler;