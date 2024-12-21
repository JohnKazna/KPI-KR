import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Task from '../../components/task/task';
import NewTaskModal from '../../components/modals/new-task-modal/new-task-modal';
import CompleteTaskModal from '../../components/modals/complete-task-modal/complete-task-modal';

import './tasks.css';

const Tasks = () => {
    const authUser = useSelector(state => state.user.user);

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [taskToComplete, setTaskToComplete] = useState();

    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        if (authUser.status === 'teacher') {
            setTasks(authUser.tasks);
            setLoading(false);
        } else {
            axios.get(`/api/tasks/get-student-tasks/${authUser._id}`)
                .then(res => res.data)
                .then(tasks => {
                    setTasks(tasks);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });
        }
    }, []);

    return (
        <div className="page-wrapper tasks-page">
            <Header
                currPage={'tasks'} />
            
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="tasks-wrapper task-cards-wrapper">
                        {
                            tasks.map(task => 
                                authUser.status === 'student' ? (
                                    task.answer === '' &&
                                        <Task 
                                            key={task._id}
                                            taskData={task}
                                            setTaskToComplete={ (task) => setTaskToComplete(task) }
                                            deleteTask={ (title, group) => setTasks(tasks.filter(task => !(task.title === title && task.group === group))) } />
                                ) : (
                                    <Task 
                                        key={task._id}
                                        taskData={task}
                                        setTaskToComplete={ (task) => setTaskToComplete(task) }
                                        deleteTask={ (title, group) => setTasks(tasks.filter(task => !(task.title === title && task.group === group))) } />
                                )
                            )
                        }
                    </div>
                )
            }

            <Footer />

            {
                authUser.status === 'teacher' ? (
                    <button 
                        onClick={ () => setModalVisibility(true) }
                        className="new-post-btn new-task-btn">
                            <FaPen className="new-post-pen" /> Створити завдання
                    </button>
                ) : null
            }

            {
                authUser.status === 'teacher' ? (
                    modalVisibility &&
                        <NewTaskModal
                            closeModal={ () => setModalVisibility(false) }
                            addNewTask={ newTask => setTasks([ ...tasks, newTask ]) } />
                ) : (
                    taskToComplete &&
                        <CompleteTaskModal
                            closeModal={ () => setTaskToComplete(null) }
                            taskData={taskToComplete}
                            completeTask={ (completedTaskId) => setTasks(tasks.filter(task => task._id !== completedTaskId)) } />
                )
            }
        </div>
    )
}

export default Tasks;
