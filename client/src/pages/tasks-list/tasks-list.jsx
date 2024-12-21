import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import CompleteTaskModal from '../../components/modals/complete-task-modal/complete-task-modal';
import CompleteTestModal from '../../components/modals/complete-test-modal/complete-test-modal';
import EvaluateTaskModal from '../../components/modals/evaluate-task-modal/evaluate-task-modal';

import './tasks-list.css';

const TasksList = () => {
    const authUser = useSelector(state => state.user.user);

    const [tasks, setTasks] = useState([]);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [taskToComplete, setTaskToComplete] = useState(null);
    const [testToComplete, setTestToComplete] = useState(null);
    const [taskToEvaluate, setTaskToEvaluate] = useState(null);

    useEffect(() => {
        if (authUser.status === 'teacher') {
            axios.get(`/api/tasks/get-teacher-tasks/${authUser._id}`)
                .then(res => res.data)
                .then(tasks => {
                    setTasks(tasks);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });

            axios.get(`/api/tests/get-teacher-tests/${authUser._id}`)
                .then(res => res.data)
                .then(tests => {
                    setTests(tests);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });


        } else {
            axios.get(`/api/tasks/get-student-tasks/${authUser._id}`)
                .then(res => res.data)
                .then(tasks => {
                    setTasks(tasks);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });

            axios.get(`/api/tests/get-student-tests/${authUser._id}`)
                .then(res => res.data)
                .then(tests => {
                    setTests(tests);
                    setLoading(false);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });
        }
    }, []);

    const calcTestScore = (test) => {
        let score = 0;

        test.questions.forEach(q => {
            if (q.user_answer_index === q.correct_answer_index) {
                score++;
            }
        });

        return score;
    }

    const calcTotalScore = () => {
        let score = 0;

        tasks.forEach(task => {
            if (task.mark !== null) {
                score += task.mark;
            }
        });

        tests.forEach(test => {
            if (test.questions[0].user_answer_index !== null) {
                score += calcTestScore(test);
            }
        });

        return score;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="tasks-list-page page-wrapper">
            <Header />

            <div className="tasks-list-wrapper">
                <h1>Список завдань</h1>
                <div className="tasks-list-container">
                    <table className="tasks-list-table">
                        {
                            authUser.status === 'teacher' ? (
                                <>
                                    <thead className="table-heading">
                                        <tr>
                                            <th>Дисципліна</th>
                                            <th>Студент</th>
                                            <th>Група</th>
                                            <th>Завдання</th>
                                            <th>Статус</th>
                                            <th>Бал</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tasks.length !== 0 &&
                                            tasks.map((task, i) => {
                                                return (
                                                    <tr key={i} className="table-task">
                                                        <td className="subject">{task.subject}</td>
                                                        <td className="student-surname">{task.student.surname}</td>
                                                        <td className="group">{task.student.group}</td>
                                                        <td className="task-title">{task.title}</td>
                                                        {
                                                            task.mark ? (
                                                                <td className="status status-green">Перевірено</td>
                                                            ) : <td 
                                                                    onClick={ () => setTaskToEvaluate(task) }
                                                                    className="status status-red">
                                                                        Перевірити
                                                                </td>
                                                        }
                                                        <td className="score">{task.mark || '--'}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            tests.length !== 0 &&
                                            tests.map((test, i) => {
                                                console.log(test);
                                                return (
                                                    <tr key={i} className="table-task">
                                                        <td className="subject">{test.subject}</td>
                                                        <td className="student-surname">{test.student.surname}</td>
                                                        <td className="group">{test.student.group}</td>
                                                        <td className="task-title">{test.title}</td>
                                                        <td className="status status-green">Перевірено</td>
                                                        <td className="score">
                                                            { calcTestScore(test) }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </>
                            ) : (
                                <>
                                    <thead className="table-heading">
                                        <tr>
                                            <th>Дисципліна</th>
                                            <th>Завдання</th>
                                            <th>Статус</th>
                                            <th>Бал</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tasks.length !== 0 &&
                                            tasks.map((task, i) => {
                                                return (
                                                    <tr key={i} className="table-task">
                                                        <td className="subject">{task.subject}</td>
                                                        <td className="task-title">{task.title}</td>
                                                        {
                                                            task.answer ? (
                                                                <td className="status status-green">Виконано</td>
                                                            ) : <td 
                                                                    onClick={ () => setTaskToComplete(task) }
                                                                    className="status status-red">
                                                                        Виконати
                                                                </td>
                                                        }
                                                        <td className="score">{task.mark || '--'}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            tests.length !== 0 &&
                                            tests.map((test, i) => {
                                                return (
                                                    <tr key={i} className="table-task">
                                                        <td className="subject">{test.subject}</td>
                                                        <td className="task-title">{test.title}</td>
                                                        {
                                                            test.questions[0].user_answer_index !== null ? (
                                                                <td className="status status-green">Виконано</td>
                                                            ) : <td 
                                                                    onClick={ () => setTestToComplete(test) }
                                                                    className="status status-red">
                                                                        Виконати
                                                                </td>
                                                        }
                                                        <td className="score">
                                                            { test.questions[0].user_answer_index !== null ? calcTestScore(test) : '--' }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </>
                            )
                        }
                    </table>

                    {
                        authUser.status === 'student' &&
                        <div className="student-total-score">
                            <p>Загальний бал:</p>
                            <div className="total-score-value">
                                {calcTotalScore()}
                            </div>
                        </div>
                    }
                </div>
            </div>

            <Footer />
            
            {
                taskToComplete &&
                <CompleteTaskModal
                    closeModal={ () => setTaskToComplete(null) }
                    taskData={taskToComplete}
                    completeTask={ (completedTaskId, answer) => {
                        setTasks(tasks.map(task =>
                            task._id === completedTaskId ? { ...task, answer } : task
                        ));                      
                    } } />
            }
            {
                testToComplete &&
                <CompleteTestModal
                    closeModal={ () => setTestToComplete(null) }
                    testToComplete={testToComplete}
                    completeTest={ (updatedTest) => {
                        setTests(tests.map(t =>
                            t._id === updatedTest._id ? updatedTest : t
                        ));
                    } } />
            }
            {
                taskToEvaluate &&
                <EvaluateTaskModal closeModal={ () => setTaskToEvaluate(null) }
                    taskToEvaluate={taskToEvaluate}
                    evaluateTask={ (evaluatedTask, mark) => {
                        setTasks(tasks.map(task =>
                            task._id === evaluatedTask._id ? { ...task, mark } : task
                        ));
                    } }/>
            }
        </div>
    )
}

export default TasksList;
