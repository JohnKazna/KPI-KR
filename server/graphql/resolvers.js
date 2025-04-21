import Post from '../models/post.model.js';

const resolvers = {
    Query: {
        posts: async () => await Post.find(),
        post: async (_, { id }) => await Post.findById(id),
    },
    Mutation: {
        createPost: async (_, { input }) => {
            const post = new Post(input);
            return await post.save();
        },
        updatePost: async (_, { id, input }) => {
            return await Post.findByIdAndUpdate(id, input, { new: true });
        },
        deletePost: async (_, { id }) => {
            return await Post.findByIdAndDelete(id);
        },
    },
};

export default resolvers;
