 import express from 'express';

 import { getPosts, getPost, getPostsBySearch, createPost, commentPost, updatePost, deletePost, likePost, getPostsByCreator } from '../controllers/posts.js';
 import auth from '../middleware/auth.js';

 const router = express.Router();

 router.get('/creator', getPostsByCreator);
 router.get('/search', getPostsBySearch);
 router.get('/', getPosts);
 router.get('/:id', getPost);

 router.post("/", auth, createPost);
 router.patch("/:id", auth, updatePost);
 router.delete("/:id", auth, deletePost);
 router.patch("/:id/likepost", auth, likePost);
 router.post('/:id/commentPost', auth, commentPost);

 export default router;
