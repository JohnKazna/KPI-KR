import Teacher from '../models/teacher.model.js';
import Post from '../models/post.model.js';

export const createNewPost = async (req, res) => {
    try {
        const { teacherId, postData } = req.body;
        
        const teacher = await Teacher.findOne({ _id: teacherId });

        if (!teacher) {
            return res.status(404).json({ error: `Invalid teacher!` });
        }

        const post = await Post.create({ teacher_id: teacherId, title: teacher.subject, ...postData });

        teacher.posts.push(post._id);
        await teacher.save();

        res.status(201).json(post);

    } catch (error) {
        console.log('Error in createNewPost controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const updatedData = req.body;

        const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(updatedPost);
        
    } catch (error) {
        console.log('Error in updatePost controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getTeacherPosts = async (req, res) => {
    try {
        const { id: teacherId } = req.params;

        const teacher = await Teacher.findOne({ _id: teacherId }).populate('posts');

        if (!teacher) {
            return res.status(404).json({ error: `Invalid teacher!` });
        }

        res.status(200).json(teacher.posts);

    } catch (error) {
        console.log('Error in getTeacherPosts controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getGroupPosts = async (req, res) => {
    try {
        const { group } = req.params;

        const groupPosts = await Post.find({ group });

        if (!groupPosts || groupPosts.length === 0) {
            return res.status(404).json({ error: `No posts for such group: ${group}` });
        }

        res.status(200).json(groupPosts);

    } catch (error) {
        console.log('Error in getGroupPosts controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id: postId } = req.params;

        const postToDelete = await Post.deleteOne({ _id: postId });

        if (!postToDelete) {
            return res.status(404).json({ error: `Couldn't delete post!` });
        }

        res.status(200).json({ message: 'Post deleted successfully!' });

    } catch (error) {
        console.log('Error in getGroupPosts controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
