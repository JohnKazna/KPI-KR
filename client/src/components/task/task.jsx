import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/features/user/userSlice';

import './task.css';
import '../post/post.css';

const Task = ({ taskData, setTaskToComplete, deleteTask }) => {
    const authUser = useSelector(state => state.user.user);

    const dispatch = useDispatch();

    const handleTaskDelete = () => {
        axios.post(`/api/tasks/delete-task`, { teacher_id: authUser._id, title: taskData.title, group: taskData.group })
            .then(res => res.data)
            .then(message => {
                deleteTask(taskData.title, taskData.group);
                dispatch(setUser({
                    ...authUser,
                    tasks: authUser.tasks.filter(task => !(task.title === taskData.title && task.group === taskData.group))
                }));
                toast.success(message.message);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    return (
        <div className="post-wrapper task-card">
            <div className="task-card-heading">
                <h1 className="task-card-title">
                    {taskData.subject}
                </h1>
                <p className="task-card-subtitle">
                    {taskData.title}
                </p>
            </div>

            <div className="task-card-info">
                <div className="task-descr">
                    <div className="task-card-decor"></div>
                    <textarea
                        readOnly
                        className="task-descr-text"
                        value={taskData.text} />
                </div>
                
                <div className="task-card-btns">
                    {
                        authUser.status === 'teacher' ? (
                            <button
                                onClick={ handleTaskDelete }>
                                    Видалити
                            </button>
                        ) : (
                            <button
                                onClick={ () => setTaskToComplete(taskData) }>
                                Виконати
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Task;
