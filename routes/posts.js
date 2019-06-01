const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts');

router.get('/home', postController.getPosts);
router.post('/create-post', postController.createPost);


module.exports = router;