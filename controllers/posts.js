const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {

  const posts = await Post.find({}).populate('userId');
  const users = await User.find({});
  const loggedInUser =  req.user._id;

  res.render('posts/post-list', {
    pageTitle: "Home",
    path: '/home',
    isLoggedIn: req.session.isLoggedIn,
    posts,
    users,
    loggedInUser
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

exports.postDeletePost = async (req, res, next) => {
  const postId  = req.body.postId;
  console.log(postId)
  await Post.findByIdAndDelete(postId);
  res.redirect('/home');
}