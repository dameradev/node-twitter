const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts');

router.get('/home', postController.getPosts);

router.post('/create-post', postController.createPost);

router.post('/delete-post', postController.postDeletePost);


router.post('/like-post', postController.postAddLike);
router.post('/dislike-post', postController.postRemoveLike);

module.exports = router;