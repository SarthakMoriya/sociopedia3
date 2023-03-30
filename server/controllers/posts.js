import Users from '../Models/userModel.js';
import Posts from '../Models/postModel.js'

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;

        const user = await Users.findById(userId);
        const newPost = await Posts.create({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        //Get all Posts again
        const allPosts = await Posts.find();

        res.status(201).json(allPosts);

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
export const getFeedPosts = async (req, res) => {
    try {
        const allPosts = await Posts.find();
        res.status(201).json(allPosts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const userPosts = await Posts.find({ userId });
        res.status(201).json(userPosts);

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch Posts" })
    }
}


export const likePost = async (req, res) => {
    try {

        const { id } = req.params;
        const { userId } = req.body;
        const post = await Posts.findById(id);

        const isLiked = post.likes.get(userId);
        //likes is an map dataStructure { userid:true/false }

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Posts.findByIdAndUpdate(id,
            { likes: post.likes },
            { new: true }
        )

        res.status(200).json(updatedPost)

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch Posts" })
    }
}