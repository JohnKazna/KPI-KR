import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

import '../modal.css';

const CompleteTaskModal = ({ closeModal, taskData, completeTask }) => {

    const [answer, setAnswer] = useState('');

    const handleCompleteTask = (e) => {
        e.preventDefault();

        axios.patch(`/api/tasks/update-task/${taskData._id}`, { answer })
            .then(res => res.data)
            .then(() => {
                completeTask(taskData._id, answer);
                closeModal();
                toast.success(`Завдання надіслано на перевірку!`);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    return (
        <div className="modal-wrapper new-post-modal-wrapper">
            <div className="modal">
                <div className="modal-heading complete-task-heading">
                    <IoClose 
                        onClick={ () => closeModal() }
                        className="close-modal" />
                </div>

                <p className="task-descr">
                    { taskData.text }
                </p>

                <form 
                    onSubmit={(e) => handleCompleteTask(e)}
                    className="modal-form">
                    <div className="modal-form-field">
                        <label htmlFor="title">Рішення</label>
                        <textarea
                            onChange={(e) => {
                                setAnswer(e.target.value);
                            }}
                            placeholder="Напишіть відповідь на завдання..."
                            required />
                    </div>

                    <button>
                        Надіслати
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CompleteTaskModal;
