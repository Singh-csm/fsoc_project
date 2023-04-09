 import express from 'express';

 import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
 import auth from '../middleware/auth.js';

 const router = express.Router();

 router.get('/', getPosts);
 router.post("/", auth, createPost);
 router.patch("/:id", auth, updatePost);
 router.delete("/:id",  deletePost);
 router.patch("/:id/likepost", likePost);

 export default router;
