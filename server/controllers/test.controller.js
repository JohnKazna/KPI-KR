import Test from '../models/test.model.js';
import Teacher from '../models/teacher.model.js';
import Student from '../models/student.model.js';

export const createNewTest = async (req, res) => {
    try {
        const { teacherId, testData } = req.body;
    
        const teacher = await Teacher.findOne({ _id: teacherId });

        const groupStudents = await Student.find({ group: testData.group });
        if (groupStudents.length === 0) {
            return res.status(404).json({ error: `Couldn't find students from group ${testData.group}` });
        }

        for (const student of groupStudents) {
            const test = await Test.create({ 
                teacher_id: teacherId, 
                student: student._id, 
                subject: teacher.subject,
                ...testData,
            });
            student.tests.push(test._id);
            await student.save();
        }

        teacher.tests.push({ ...testData, subject: teacher.subject });
        await teacher.save();

        res.status(201).json(teacher.tests[teacher.tests.length - 1]);

    } catch (error) {
        console.log('Error in createNewTest controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateTest = async (req, res) => {
    try {
        const { id: testId } = req.params;
        const updatedData = req.body;

        const updatedTest = await Test.findByIdAndUpdate(testId, updatedData, { new: true });

        if (!updatedTest) {
            return res.status(404).json({ error: 'Test not found' });
        }

        res.status(200).json(updatedTest);

    } catch (error) {
        console.log('Error in updateTest controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getStudentTests = async (req, res) => {
    try {
        const { id: studentId } = req.params;

        const student = await Student.findOne({ _id: studentId }).populate('tests');

        if (!student) {
            return res.status(404).json({ error: `Invalid user!` });
        }

        res.status(200).json(student.tests);

    } catch (error) {
        console.log('Error in getStudentTests controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getTeacherTests = async (req, res) => {
    try {
        const { id: teacherId } = req.params;

        const tests = await Test.find({
            teacher_id: teacherId,
            questions: { 
                $elemMatch: { user_answer_index: { $ne: null } } 
            }
        }).populate('student');

        if (!tests) {
            return res.status(404).json({ error: `Invalid teacher!` });
        }

        res.status(200).json(tests);

    } catch (error) {
        console.log('Error in getTeacherTests controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteTest = async (req, res) => {
    try {
        const { teacher_id, title, group } = req.body;

        const testsToDelete = await Test.find({ teacher_id, title });

        if (testsToDelete.length === 0) {
            return res.status(404).json({ error: 'No tests found with the specified teacher ID and title.' });
        }

        for (const test of testsToDelete) {
            await Student.updateOne(
                { _id: test.student },
                { $pull: { tests: test._id } }
            );

            await Test.deleteOne({ _id: test._id });
        }

        const teacher = await Teacher.findOne({ _id: teacher_id });
        teacher.tests = teacher.tests.filter(test => !(test.title === title && test.group === group));
        await teacher.save();

        res.status(200).json({ message: 'Test successfully deleted.' });

    } catch (error) {
        console.log('Error in deleteTest controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
