const dbConnect = require('../../../../../server/config/db');
const Post = require('../../../../../server/models/Post');


export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const posts = await Post.find({});
      res.status(200).json(posts);
      break;
    case 'POST':
      const newPost = await Post.create(req.body);
      res.status(201).json(newPost);
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
