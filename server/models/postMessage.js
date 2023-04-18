import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: {
        public_Id: String,
        url: String,
    },
    likes: {
        type: [String],
        default: []
    },
    comments: { 
        type: [String], 
        default: [] 
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;