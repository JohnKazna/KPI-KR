import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

import './evaluate-task-modal.css';
import '../modal.css';

const EvaluateTaskModal = ({ closeModal, taskToEvaluate, evaluateTask }) => {

    const [mark, setMark] = useState(null);

    const handleCompleteTask = (e) => {
        e.preventDefault();

        axios.patch(`/api/tasks/update-task/${taskToEvaluate._id}`, { mark })
            .then(res => res.data)
            .then(() => {
                evaluateTask(taskToEvaluate, mark);
                closeModal();
                toast.success(`Завдання перевірено!`);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    return (
        <div className="modal-wrapper evaluate-task-modal-wrapper">
            <div className="modal">
                <div className="modal-heading evaluate-task-heading">
                    <h1>{taskToEvaluate.title}</h1>
                    <IoClose 
                        onClick={ () => closeModal() }
                        className="close-modal" />
                </div>

                <p className="task-student-info">
                    {`${taskToEvaluate.student.surname} ${taskToEvaluate.student.name}, ${taskToEvaluate.student.group}`}
                </p>

                <p className="task-descr">
                    { taskToEvaluate.answer }
                </p>

                <form 
                    onSubmit={ (e) => handleCompleteTask(e) }
                    className="modal-form">
                    <div className="modal-form-field form-field-mark">
                        <label htmlFor="mark">Оцінка</label>
                        <input
                            onChange={(e) => {
                                setMark(e.target.value);
                            }}
                            type="number"
                            name="mark"
                            id="mark"
                            min={1}
                            max={40}
                            placeholder="10"
                            required />
                    </div>

                    <button>
                        Поставити оцінку
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EvaluateTaskModal;
