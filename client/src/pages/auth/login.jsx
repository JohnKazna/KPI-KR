import { useState } from 'react';

import TeacherLoginForm from '../../components/teacher-login/teacher-login-form';
import StudentLoginForm from '../../components/student-login-form/student-login-form';

import './auth.css';

const Login = () => {
    const [authRole, setAuthRole] = useState(null);

    return (
        <div className="page-wrapper auth-page">
            <div className="auth-wrapper">
                {
                    !authRole ? (
                        <div className="auth-choose-role">
                            <h1>Увійти як...</h1>
                            <div className="auth-choose-role-btns">
                                <button
                                    onClick={() => setAuthRole('teacher')}>
                                        Викладач
                                </button>
                                <button
                                    onClick={() => setAuthRole('student')}>
                                        Студент
                                </button>
                            </div>
                        </div>
                    ) : (
                        authRole === 'teacher' ? (
                            <TeacherLoginForm />
                        ) : <StudentLoginForm />
                    )
                }


            </div>
        </div>
    )
}

export default Login;
