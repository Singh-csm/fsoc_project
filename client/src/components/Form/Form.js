import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import useStyles from "./styles";
import { createPost, updatePost } from '../../actions/posts';
import ChipInput from 'material-ui-chip-input';


const Form = ({ currentId, setCurrentId}) => {
  
  const [postData, setPostData] = useState({ title: "", message: "", tags: [], selectedFile: ""});
  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("profile"));

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: "", message: "", tags: [], selectedFile: ""});
    }
    useEffect(() => {
      if (!post?.title) clear();
        if(post) setPostData(post);
    },[post])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId === 0){
          dispatch(createPost({ ...postData, name: user?.result?.name}, history));
          clear();
        }else{
          dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
          clear();
        }
    }

    if(!user?.result?.name){
      return (  
        <Paper className={classes.paper}>
          <Typography variant="h6" align='center'>
           <Paper  elevation={17}>So many books, so little time. </Paper>
           {<hr></hr>}
            You need to be logged in to create a memory!
          </Typography>
        </Paper>
      )
    }

    const handleAddChip = (tag) => {
      setPostData({ ...postData, tags: [...postData.tags, tag] });
    };
  
    const handleDeleteChip = (chipToDelete) => {
      setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
    };
  


  return (
    
      <Paper className={classes.paper}>
      <form autoComplete="off" noValidate  className={`${classes.root} ${classes.form}`}  onSubmit={handleSubmit}>
          <Typography variant='h6'>{ currentId ? "Editing" : "Creating"} a Memory</Typography>
          <TextField name='title' variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title: e.target.value})}></TextField>
          <TextField name='message' variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message: e.target.value})}></TextField>
          <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
          <div className={classes.fileInput}><FileBase type="file"  multiple={false} onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})} />  </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size='large' type="submit" fullWidth>Submit</Button>
          <Button  variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
         
      </form>

      </Paper>
   
  );
};

export default Form;
