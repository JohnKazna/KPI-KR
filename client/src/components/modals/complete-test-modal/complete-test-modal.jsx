import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

import '../modal.css';

const CompleteTestModal = ({ closeModal, testToComplete, completeTest }) => {

    const [test, setTest] = useState(testToComplete);
    const [testCompleted, setTestCompleted] = useState(false);

    const handleCompleteTest = (e) => {
        e.preventDefault();

        if (test.questions.filter(q => q.user_answer_index === null).length > 0) {
            return toast.error('Надайте відповідь на кожне запитання!');
        }

        axios.patch(`/api/tests/update-test/${testToComplete._id}`, test)
            .then(res => res.data)
            .then(() => {
                setTestCompleted(true);
                completeTest(test);
                toast.success(`Тест завершено! Набрано ${calculatePoints()} з ${test.questions.length} балів`);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    const calculatePoints = () => {
        return test.questions.filter(q => q.user_answer_index === q.correct_answer_index).length;
    }

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        const updatedQuestions = test.questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                return { 
                    ...question, 
                    user_answer_index: answerIndex 
                };
            }
            return question;
        });
    
        setTest({ ...test, questions: updatedQuestions });
    }

    return (
        <div className="modal-wrapper new-post-modal-wrapper">
            <div className="modal">
                <div className="modal-heading">
                    <h1>{testToComplete.title}</h1>
                    <IoClose
                        onClick={() => closeModal()}
                        className="close-modal" />
                </div>

                <form
                    onSubmit={(e) => handleCompleteTest(e)}
                    className="modal-form">
                    <div className="modal-form-field quiz-questions-wrapper">
                        {
                            test.questions.map((q, index) => {
                                return (
                                    <div key={index} className="quiz-item-wrapper">
                                        <h1>{`Питання ${index + 1}`}</h1>
                                        <input
                                            value={q.question}
                                            id="title"
                                            name="title"
                                            type="text"
                                            readOnly
                                            required />

                                        <p>{`Варіанти відповідей`}</p>
                                        <div className="answers-container">
                                            {
                                                q.answers.map((answer, i) => {
                                                    return (
                                                        <div key={i} className="answer-wrapper">
                                                            <div
                                                                onClick={ () => handleAnswerSelect(index, i) }
                                                                className={`answer-bullet-point 
                                                                    ${q.user_answer_index === i ? "answer-bullet-point-active" : ""}
                                                                    ${testCompleted && q.correct_answer_index === i ? "answer-bullet-point-correct" : ""}`}></div>
                                                            <input
                                                                value={answer}
                                                                id="title"
                                                                name="title"
                                                                type="text"
                                                                readOnly
                                                                required />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        !testCompleted && 
                        <button>
                            Завершити тест
                        </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompleteTestModal;
