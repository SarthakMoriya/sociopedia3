import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    userId: { type: String, required: true, },
    firstname: { type: String, required: true, },
    lastName: { type: String, required: true },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const Posts = new mongoose.model('Posts', PostSchema)

export default Posts;