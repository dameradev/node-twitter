const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {

  const posts = await Post.find({});
  const users = await User.find({});
  res.render('posts/post-list', {
    pageTitle: "Home",
    path: '/home',
    isLoggedIn: req.session.isLoggedIn,
    posts,
    users
  });
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