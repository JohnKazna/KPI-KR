import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";
import Task from "../models/task.model.js";

export const createNewTask = async (req, res) => {
    try {
        const { teacherId, taskData } = req.body;
    
        const teacher = await Teacher.findOne({ _id: teacherId });

        const groupStudents = await Student.find({ group: taskData.group });
        if (groupStudents.length === 0) {
            return res.status(404).json({ error: `Couldn't find students from group ${taskData.group}` });
        }

        for (const student of groupStudents) {
            const task = await Task.create({ 
                teacher_id: teacherId, 
                student: student._id, 
                ...taskData,
            });
            student.tasks.push(task._id);
            await student.save();
        }

        teacher.tasks.push({ ...taskData });
        await teacher.save();

        res.status(201).json(teacher.tasks[teacher.tasks.length - 1]);

    } catch (error) {
        console.log('Error in createNewTask controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const updatedData = req.body;

        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);

    } catch (error) {
        console.log('Error in updateTask controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getStudentTasks = async (req, res) => {
    try {
        const { id: studentId } = req.params;

        const student = await Student.findOne({ _id: studentId }).populate('tasks');

        if (!student) {
            return res.status(404).json({ error: `Invalid user!` });
        }

        res.status(200).json(student.tasks);

    } catch (error) {
        console.log('Error in getStudentTasks controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getTeacherTasks = async (req, res) => {
    try {
        const { id: teacherId } = req.params;

        const tasks = await Task.find({
            teacher_id: teacherId,
            answer: { $nin: "" },
        }).populate('student');

        if (!tasks) {
            return res.status(404).json({ error: `Invalid teacher!` });
        }

        res.status(200).json(tasks);

    } catch (error) {
        console.log('Error in getTeacherTasks controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { teacher_id, title, group } = req.body;

        const tasksToDelete = await Task.find({ teacher_id, title });

        if (tasksToDelete.length === 0) {
            return res.status(404).json({ error: 'No tasks found with the specified teacher ID and title.' });
        }

        for (const task of tasksToDelete) {
            await Student.updateOne(
                { _id: task.student },
                { $pull: { tasks: task._id } }
            );

            await Task.deleteOne({ _id: task._id });
        }

        const teacher = await Teacher.findOne({ _id: teacher_id });
        teacher.tasks = teacher.tasks.filter(task => !(task.title === title && task.group === group));
        await teacher.save();

        res.status(200).json({ message: 'Task successfully deleted.' });

    } catch (error) {
        console.log('Error in deleteTask controller: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
