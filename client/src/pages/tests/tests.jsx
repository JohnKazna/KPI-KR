import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Test from '../../components/test/test';
import NewTestModal from '../../components/modals/new-test-modal/new-test-modal';
import CompleteTestModal from '../../components/modals/complete-test-modal/complete-test-modal';

import './tests.css';

const Tests = () => {
    const authUser = useSelector(state => state.user.user);

    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [testToCompleteId, setTestToCompleteId] = useState();
    const [testToComplete, setTestToComplete] = useState();

    const [modalVisibility, setModalVisibility] = useState(false);

    useEffect(() => {
        if (authUser.status === 'teacher') {
            setTests(authUser.tests);
            setLoading(false);
        } else {
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

    return (
        <div className="page-wrapper tests-page">
            <Header
                currPage={'tests'} />
            
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="tests-wrapper task-cards-wrapper">
                        {
                            tests.map(test => 
                                authUser.status === 'student' ? (
                                    test.questions[0].user_answer_index === null &&
                                        <Test 
                                            key={test._id}
                                            testData={test}
                                            setTestToCompleteId={ (id) => setTestToCompleteId(id) }
                                            setTestToComplete={ (test) => setTestToComplete(test) } />
                                ) : (
                                    <Test 
                                        key={test._id}
                                        testData={test}
                                        setTestToCompleteId={ (id) => setTestToCompleteId(id) }
                                        deleteTest={ (title, group) => setTests(tests.filter(test => !(test.title === title && test.group === group))) } />
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
                            <FaPen className="new-post-pen" /> Створити тест
                    </button>
                ) : null
            }

            {
                authUser.status === 'teacher' ? (
                    modalVisibility &&
                        <NewTestModal
                            closeModal={ () => setModalVisibility(false) }
                            addNewTest={ newTest => setTests([ ...tests, newTest ]) } />
                ) : (
                    testToCompleteId &&
                        <CompleteTestModal
                            closeModal={ () => setTestToCompleteId(null) }
                            testToCompleteId={testToCompleteId}
                            testToComplete={testToComplete}
                            completeTest={ completedTestId => setTests(tests.filter(test => test._id !== completedTestId)) } />
                )
            }
        </div>
    )
}

export default Tests;
