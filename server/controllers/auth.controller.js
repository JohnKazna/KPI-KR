import bcrypt from 'bcryptjs';

import Teacher from '../models/teacher.model.js';
import Student from '../models/student.model.js';

export const teacherSignup = async (req, res) => {
    try {
        const teacherData = req.body;

        const teacher = await Teacher.findOne({ phone: teacherData.phone });
        if (teacher) {
            return res.status(409).json({ error: 'Teacher with such phone number already exists!' });
        }

        const identityNumber = await Teacher.findOne({ identity_number: teacherData.identity_number });
        if (identityNumber) {
            return res.status(409).json({ error: 'Teacher with such identity number already exists!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(teacherData.password, salt);

        const newTeacher = new Teacher({
            ...teacherData,
            password: hashedPassword,
        });

        await newTeacher.save();

        res.status(201).json(newTeacher);

    } catch (error) {
        console.log('Error in teacherSignup controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const teacherLogin = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const teacher = await Teacher.findOne({ phone });
        if (!teacher) {
            return res.status(404).json({ error: 'Invalid phone number!' });
        }

        const validPassword = bcrypt.compareSync(password, teacher.password);
        if (!validPassword) {
            return res.status(404).json({ error: 'Invalid password!' });
        }

        res.status(200).json(teacher);

    } catch (error) {
        console.log('Error in teacherLogin controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const studentSignup = async (req, res) => {
    try {
        const studentData = req.body;

        const student = await Student.findOne({ phone: studentData.phone });
        if (student) {
            return res.status(409).json({ error: 'Student with such phone number already exists!' });
        }

        const studentNumber = await Student.findOne({ student_number: studentData.student_number });
        if (studentNumber) {
            return res.status(409).json({ error: 'Student with such student number already exists!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(studentData.password, salt);

        const newStudent = new Student({
            ...studentData,
            password: hashedPassword,
        });

        await newStudent.save();

        res.status(201).json(newStudent);

    } catch (error) {
        console.log('Error in studentSignup controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const studentLogin = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const student = await Student.findOne({ phone });
        if (!student) {
            return res.status(404).json({ error: 'Invalid phone number!' });
        }

        const validPassword = bcrypt.compareSync(password, student.password);
        if (!validPassword) {
            return res.status(404).json({ error: 'Invalid password!' });
        }

        res.status(200).json(student);

    } catch (error) {
        console.log('Error in studentLogin controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const logout = async (req, res) => {

}
