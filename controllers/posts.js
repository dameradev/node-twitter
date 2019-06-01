const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  const posts = await Post.find({});
  res.render('posts/post-list', {
    pageTitle: "Home",
    path: '/home',
    posts,
    isLoggedIn: req.session.isLoggedIn
  })
}

exports.createPost = async (req, res, next) => {
  const content = req.body.content;
  const userId = req.user;

  if(!userId) {
    res.redirect('/login');
  }

  const post = new Post({
    content,
    userId
  })
  await post.save();
  res.redirect('/home');
}