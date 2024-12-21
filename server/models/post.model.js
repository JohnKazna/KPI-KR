import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
