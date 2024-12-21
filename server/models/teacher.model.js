import mongoose from 'mongoose';

const teacherSchema = mongoose.Schema({
    status: {
        type: String,
        default: "teacher"
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    second_name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    identity_number: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    tasks: [
        {
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
        }
    ],
    tests: [
        {
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
                }
            ],
            group: {
                type: String,
                required: true,
            },
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ]
}, { timestamps: true });

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
