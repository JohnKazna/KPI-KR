import { useState } from 'react';

import TeacherSignUpForm from '../../components/teacher-sign-up-form/teacher-sign-up-form';
import StudentSignUpForm from '../../components/student-sign-up-form/student-sign-up-form';

import './auth.css';

const SignUp = () => {
    const [authRole, setAuthRole] = useState(null);

    return (
        <div className="page-wrapper auth-page">
            <div className="auth-wrapper">
                {
                    !authRole ? (
                        <div className="auth-choose-role">
                            <h1>Зареєструватись як...</h1>
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
                            <TeacherSignUpForm />
                        ) : <StudentSignUpForm />
                    )
                }


            </div>
        </div>
    )
}

export default SignUp;
