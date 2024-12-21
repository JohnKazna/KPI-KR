import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    mark: {
        type: Number,
        default: null,
    },
    answer: {
        type: String,
        default: "",
    },

}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
