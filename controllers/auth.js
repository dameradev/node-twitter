const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Sign up',
    path: '/signup',
    isLoggedIn: req.session.isLoggedIn
  })
}
exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({email});

  if (user) {
    return res.redirect('/signup');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user = new User({
    email,
    password: hashedPassword
  })
  await user.save();
  res.redirect('/login');
}

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isLoggedIn: req.session.isLoggedIn
  })
}

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({email});

  if(!user) {
    res.redirect('/login');
  }

  const doMatch = await bcrypt.compare(password, user.password);

  if (doMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.redirect('/');
  } else {
    res.redirect('/login')
  }
}

exports.postLogout = async (req, res, next) => {
  await req.session.destroy();
  res.redirect('/login');
}

exports.getUserProfile = async (req, res, next) => {
  const user = req.user;
  let isFollowing = true;

  const followers = user.getFollowers();
  const following = user.getFollowing();

  if(!user) {
    res.redirect('/login');
  }
  res.render('auth/profile', {
    pageTitle: `${user.email} profile`,
    path: '/profile',
    isLoggedIn: req.session.isLoggedIn,
    user,
    isFollowing,
    followers,
    following
  })
}

exports.getProfile = async (req, res, next) => {
  const currentUser = req.user;
  if (!currentUser) {
    res.redirect('/login');
  }
  let isFollowing = false;
  const userId = req.params.userId;
  const user = await User.findById(userId);
  
  const followers = user.getFollowers();
  const following = user.getFollowing();

  if (currentUser.isFollowing(userId)) {
    isFollowing = true
  }
  

  res.render('auth/profile', {
    pageTitle: `${user.email} profile`,
    path: '/profile',
    isLoggedIn: req.session.isLoggedIn,
    user,
    isFollowing,
    followers,
    following
  })
}

exports.postFollow = async (req, res, next) => {
  const currentUser = req.user;
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if(!currentUser) {
    res.redirect('/login');
  }
  await currentUser.follow(userId);
  await user.addFollower(currentUser._id);

  res.redirect(`/profile/${userId}`)
}

exports.postUnfollow = async (req, res, next) => {
  const currentUser = req.user;
  const userId = req.params.userId;
  const user =  await User.findById(userId);

  if(!currentUser) {
    res.redirect('/login');
  }
  await currentUser.unfollow(userId);
  await user.removeFollower(currentUser._id);
  
  res.redirect(`/profile/${userId}`)
}

