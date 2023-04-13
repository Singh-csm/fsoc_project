import React from 'react';
import { Grid, CircularProgress, Paper, Typography } from "@material-ui/core";
import { useSelector } from 'react-redux';
import Post from './Post/Post.js';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return <Typography variant="h3" align='center'>  <Paper className={classes.paper}  elevation={17}> No Posts </Paper> </Typography>
   // console.log(posts)

  return (
   
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3} >
            {
              posts?.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}> 
                      <Post post={post} setCurrentId={setCurrentId} />
                  </Grid>
              ))
            }
      </Grid>
    )
    
  );
}

export default Posts;
