import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";

import '../modal.css';

const NewTaskModal = ({ closeModal, addNewTask }) => {
    const authUser = useSelector(state => state.user.user);

    const [taskData, setTaskData] = useState({
        title: '',
        text: '',
        group: '',
        subject: authUser.subject
    });

    const handleNewTask = (e) => {
        e.preventDefault();

        axios.post('/api/tasks/new-task', { teacherId: authUser._id, taskData })
            .then(res => res.data)
            .then(newTask => {
                addNewTask(newTask);
                closeModal();
                toast.success(`Нове зфавдання для групи ${taskData.group} успішно опубліковано!`);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    return (
        <div className="modal-wrapper new-post-modal-wrapper">
            <div className="modal">
                <div className="modal-heading">
                    <h1>Нове завдання</h1>
                    <IoClose 
                        onClick={ () => closeModal() }
                        className="close-modal" />
                </div>

                <form 
                    onSubmit={(e) => handleNewTask(e)}
                    className="modal-form">
                    <div className="modal-form-field">
                        <label htmlFor="title">Назва</label>
                        <input 
                            onChange={(e) => {
                                setTaskData({ ...taskData, title: e.target.value });
                            }}
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Домашнє завдання №1"
                            required />
                    </div>

                    <div className="modal-form-field">
                        <label htmlFor="title">Опис</label>
                        <textarea
                            onChange={(e) => {
                                setTaskData({ ...taskData, text: e.target.value })
                            }}
                            placeholder="Детальний опис завдання..."
                            required />
                    </div>

                    <div className="modal-form-field">
                        <label htmlFor="title">Опублікувати для групи:</label>
                        <input 
                            onChange={(e) => {
                                setTaskData({ ...taskData, group: e.target.value });
                            }}
                            id="title"
                            name="title"
                            type="text"
                            placeholder="ІП-24"
                            required />
                    </div>

                    <button>
                        Опублікувати
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewTaskModal;
