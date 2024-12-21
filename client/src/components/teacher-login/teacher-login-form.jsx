import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/features/user/userSlice";

import '../../pages/auth/auth.css';

const TeacherLoginForm = () => {
    const dispatch = useDispatch();
    
    const [loginData, setLoginData] = useState({
        phone: '',
        password: ''
    });

    const handleTeacherLogin = (e) => {
        e.preventDefault();

        axios.post('/api/auth/teacher-login', loginData)
            .then(res => res.data)
            .then(user => {
                dispatch(setUser(user));
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('Здійчнено успішний вхід в систему!');
            })
            .catch(err => {
                toast.error(err.response.data.error);
            });
    }

    return (
        <div className="student-auth-form-wrapper auth-form-wrapper">
            <h1 className="auth-form-title">Вхід в систему</h1>
            <form 
                onSubmit={ e => handleTeacherLogin(e) }
                className="auth-form">
                <div className="field-wrapper">
                    <label htmlFor="phone">Номер тел.</label>
                    <input 
                        onChange={(e) => {
                            setLoginData({ ...loginData, phone: e.target.value });
                        }}
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        // pattern="+38[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        required />
                </div>
                <div className="field-wrapper">
                    <label htmlFor="password">Пароль</label>
                    <input 
                        onChange={(e) => {
                            setLoginData({ ...loginData, password: e.target.value });
                        }}
                        type="password" 
                        id="password" 
                        name="password" 
                        required />
                </div>
                <button className="auth-btn">Увійти</button>
            </form>
        </div>
    )
}

export default TeacherLoginForm;
