import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
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
    questions: [
        {
            question: { type: String, required: true },
            answers: [ { type: String } ],
            correct_answer_index: { type: Number, required: true },
            user_answer_index: { type: Number, default: null },
        }
    ],
    group: {
        type: String,
        required: true,
    },
    mark: {
        type: Number,
    }

}, { timestamps: true });

const Test = mongoose.model("Test", testSchema);
export default Test;
