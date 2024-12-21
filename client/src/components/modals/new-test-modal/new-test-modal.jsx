import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";

import './new-test-modal.css';
import '../modal.css';

const NewTestModal = ({ closeModal, addNewTest }) => {
    const authUser = useSelector(state => state.user.user);

    const [testData, setTestData] = useState({
        title: '',
        questions: [
            {
                question: '',
                answers: ['', ''],
                correct_answer_index: null,
            },
        ],
        group: '',
    });

    const handleNewTest = (e) => {
        e.preventDefault();

        if (testData.questions.filter(q => q.correct_answer_index === null).length > 0) {
            return toast.error('Оберіть правильний варіант відповіді для кожного питання');
        }

        axios.post('/api/tests/new-test', { teacherId: authUser._id, testData })
            .then(res => res.data)
            .then(newTest => {
                addNewTest(newTest);
                closeModal();
                toast.success(`Новий тест для групи ${testData.group} успішно опубліковано!`);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    const handleNewQuestion = () => {
        setTestData({ ...testData, questions: [...testData.questions, {
            question: '',
            answers: ['', ''],
            correct_answer_index: null,
        }]});
    }

    const handleNewAnswer = (questionIndex) => {
        const updatedQuestions = testData.questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                return { 
                    ...question, 
                    answers: [...question.answers, ''] 
                };
            }
            return question;
        });
    
        setTestData({ ...testData, questions: updatedQuestions });
    }

    const handleCorrectAnswer = (questionIndex, answerIndex) => {
        const updatedQuestions = testData.questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                return { 
                    ...question, 
                    correct_answer_index: answerIndex 
                };
            }
            return question;
        });
    
        setTestData({ ...testData, questions: updatedQuestions });
    }    

    return (
        <div className="modal-wrapper new-test-modal-wrapper">
            <div className="modal">
                <div className="modal-heading">
                    <h1>Новий тест</h1>
                    <IoClose 
                        onClick={ () => closeModal() }
                        className="close-modal" />
                </div>

                <form 
                    onSubmit={(e) => handleNewTest(e)}
                    className="modal-form">
                    <div className="modal-form-field">
                        <label htmlFor="title">Назва</label>
                        <input 
                            onChange={(e) => {
                                setTestData({ ...testData, title: e.target.value });
                            }}
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Контрольне тестування з теми..."
                            required />
                    </div>

                    <div className="modal-form-field quiz-questions-wrapper">
                        {
                            testData.questions.map((q, index) => {
                                return (
                                    <div key={index} className="quiz-item-wrapper">
                                        <h1>{`Питання ${ index + 1 }`}</h1>
                                        <input 
                                            onChange={(e) => {
                                                const updatedQuestions = testData.questions.map((question, i) => 
                                                    i === index ? { ...question, question: e.target.value } : question
                                                );
                                                setTestData({ ...testData, questions: updatedQuestions });
                                            }}
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Напишіть питання"
                                            required />
                                        
                                        <p>{ `Варіанти відповідей (позначте правильний)` }</p>
                                        <div className="answers-container">
                                            {
                                                q.answers.map((answer, i) => {
                                                    return (
                                                        <div key={i} className="answer-wrapper">
                                                            <div 
                                                                onClick={ () => handleCorrectAnswer(index, i) }
                                                                className={`answer-bullet-point ${q.correct_answer_index === i ? "answer-bullet-point-active" : ""}`}></div>
                                                            <input 
                                                                onChange={(e) => {
                                                                    const updatedAnswers = q.answers.map((ans, ansIndex) =>
                                                                        ansIndex === i ? e.target.value : ans
                                                                    );
                                                                    const updatedQuestions = testData.questions.map((question, qIndex) =>
                                                                        qIndex === index ? { ...question, answers: updatedAnswers } : question
                                                                    );
                                                                    setTestData({ ...testData, questions: updatedQuestions });                                                
                                                                }}
                                                                id="title"
                                                                name="title"
                                                                type="text"
                                                                placeholder="Варіант відповіді"
                                                                required />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <p 
                                            onClick={ () => handleNewAnswer(index) }
                                            className="new-answer-btn">
                                                Додати варіант відповіді
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <p 
                        onClick={ handleNewQuestion }
                        className="new-question-btn">
                            Додати запитання
                    </p>

                    <div className="modal-form-field">
                        <label htmlFor="title">Опублікувати для групи:</label>
                        <input 
                            onChange={(e) => {
                                setTestData({ ...testData, group: e.target.value });
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

export default NewTestModal;
