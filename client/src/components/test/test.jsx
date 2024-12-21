import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/features/user/userSlice';

import './test.css';
import '../post/post.css';

const Test = ({ testData, setTestToCompleteId, setTestToComplete, deleteTest }) => {
    const authUser = useSelector(state => state.user.user);

    const dispatch = useDispatch();

    const handleTestDelete = () => {
        axios.post(`/api/tests/delete-test`, { teacher_id: authUser._id, title: testData.title, group: testData.group })
            .then(res => res.data)
            .then(message => {
                deleteTest(testData.title, testData.group);
                dispatch(setUser({
                    ...authUser,
                    tests: authUser.tests.filter(test => !(test.title === testData.title && test.group === testData.group))
                }));
                toast.success(message.message);
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    return (
        <div className="test-wrapper task-card">
            <div className="task-card-heading">
                <h1 className="task-card-title">
                    {testData.subject}
                </h1>
            </div>

            <div className="task-card-info">
                <div className="task-descr">
                    <div className="task-card-decor"></div>
                    <div>
                        <p className="task-card-subtitle">
                            {testData.title}
                        </p>
                        <p className="test-questions-num">
                            Кількість питань у тесті: {testData.questions.length}
                        </p>
                    </div>
                </div>
                
                <div className="task-card-btns">
                    {
                        authUser.status === 'teacher' ? (
                            <button
                                onClick={ handleTestDelete }>
                                    Видалити
                            </button>
                        ) : (
                            <button
                                onClick={ () => {
                                    setTestToCompleteId(testData._id);
                                    setTestToComplete(testData);
                                } }>
                                    Пройти тест
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Test;
