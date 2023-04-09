import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import useStyles from "./styles";
import moment from "moment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';  

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const userId = user?.result?.googleId || user?.result?._id;



    const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    //dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };


  return (
   
     <Card className={classes.card} rasied elevation={6}>
           <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
     <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />

        <div className={classes.overlay} >
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} >
            <Button style={{color:'white'}} size='small' onClick={() => setCurrentId(post._id)} >
              <MoreHorizIcon fontSize='medium' />
            </Button>
        </div>
        )}
        <div className={classes.details} >
        <Typography variant="body2" color='textSecondary'>{post.tags.map((tag)=> `#${tag} `)}</Typography>
        </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
        <CardContent>
            <Typography variant="body2" color='textSecondary' component="p" >{post.message}</Typography>
        </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>

          <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
              <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))} >
              <DeleteIcon fontSize="small" />
              Delete 
          </Button>

          )}
        </CardActions>
     </Card>
  
  )
}

export default Post;
