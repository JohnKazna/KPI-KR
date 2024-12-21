import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/features/user/userSlice';

import '../../pages/auth/auth.css';

const StudentSignUpForm = () => {
    const dispatch = useDispatch();

    const [signUpData, setSignUpData] = useState({
        name: '',
        surname: '',
        second_name: '',
        phone: '',
        university: '',
        faculty: '',
        year: 0,
        student_number: 0,
        group: '',
        password: ''
    });

    const handleStudentSignUp = (e) => {
        e.preventDefault();

        axios.post('/api/auth/student-signup', signUpData)
            .then(res => res.data)
            .then(user => {
                dispatch(setUser(user));
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('Успішно зареєстровано новий обліковий запис!');
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    return (
        <div className="student-auth-form-wrapper auth-form-wrapper sign-up-form-wrapper">
            <h1 className="auth-form-title">Реєстрація</h1>
            <form 
                onSubmit={(e) => handleStudentSignUp(e)}
                className="auth-form">
                <div className="field-wrapper">
                    <label htmlFor="surname">Прізвище</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, surname: e.target.value });
                        }}
                        type="text"
                        id="surname"
                        name="surname"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="name">{ `Ім'я` }</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, name: e.target.value });
                        }}
                        type="text"
                        id="name"
                        name="name"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="second_name">По батькові</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, second_name: e.target.value });
                        }}
                        type="text"
                        id="second_name"
                        name="second_name"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="phone">Номер тел.</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, phone: e.target.value });
                        }}
                        type="text"
                        id="phone"
                        name="phone"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="university">ВНЗ</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, university: e.target.value });
                        }}
                        type="text"
                        id="university"
                        name="university"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="faculty">Факультет/інститут</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, faculty: e.target.value });
                        }}
                        type="text"
                        id="faculty"
                        name="faculty"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="group">Група</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, group: e.target.value });
                        }}
                        type="text"
                        id="group"
                        name="group"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="year">Рік вступу</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, year: e.target.value });
                        }}
                        type="number"
                        id="year"
                        name="year"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="student_number">Номер студентського квитка</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, student_number: e.target.value });
                        }}
                        type="number"
                        id="student_number"
                        name="student_number"
                        required />
                </div>

                <div className="field-wrapper">
                    <label htmlFor="password">Пароль</label>
                    <input
                        onChange={(e) => {
                            setSignUpData({ ...signUpData, password: e.target.value });
                        }}
                        type="password"
                        id="password"
                        name="password"
                        required />
                </div>

                <button className="auth-btn">Зареєструватися</button>
            </form>
        </div>
    )
}

export default StudentSignUpForm;
