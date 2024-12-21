import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    status: {
        type: String,
        default: "student"
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
    student_number: {
        type: Number,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        }
    ],
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
        }
    ],
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;
