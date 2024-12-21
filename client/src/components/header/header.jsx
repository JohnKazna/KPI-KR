import toast from "react-hot-toast"
;
import { IoIosArrowDown } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/features/user/userSlice";

import './header.css';
import { useState } from "react";

const Header = ({ currPage }) => {
    const authUser = useSelector(state => state.user.user);
    
    const [userNavBarVisibility, setUserNavBarVisibility] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="header-wrapper">
            <div 
                onClick={() => navigate('/')}
                className="logo">
                    <img src="./src/assets/img/logo.svg" alt="Logo" />
                    <h1>StudyStation</h1>
            </div>

            <nav className="nav-bar">
                <a 
                    onClick={() => {
                        if (!authUser) {
                            return toast.error('Спочатку увійдіть або зареєструйтесь!');
                        }
                        navigate('/posts');
                    }}
                    className={ currPage === 'posts' ? "active-nav-bar-link" : ""}>
                        Пости
                </a>
                <a 
                    onClick={() => {
                        if (!authUser) {
                            return toast.error('Спочатку увійдіть або зареєструйтесь!');
                        }
                        navigate('/tests');
                    }}
                    className={ currPage === 'tests' ? "active-nav-bar-link" : ""}>
                        Тести
                </a>
                <a 
                    onClick={ () => {
                        if (!authUser) {
                            return toast.error('Спочатку увійдіть або зареєструйтесь!');
                        }
                        navigate('/tasks');
                    } }
                    className={ currPage === 'tasks' ? "active-nav-bar-link" : ""}>
                        Завдання
                </a>
            </nav>

            {
                authUser ? (
                    <div 
                        onClick={ () => setUserNavBarVisibility(!userNavBarVisibility) }
                        className="user-nav">
                        <h1 className="user-capital-letter">{ authUser.status === 'teacher' ? 'В' : 'С' }</h1>
                        <div className="user-name">
                            <p>{ authUser.status === 'teacher' ? 'Викладач' : 'Студент' }</p>
                            <IoIosArrowDown />
                        </div>

                        {
                            userNavBarVisibility ? (
                                <nav className="user-nav-bar">
                                    <div 
                                        onClick={() => {
                                            navigate('/profile');
                                        }}
                                        className="user-nav-btn profile-btn">
                                        <FaHome />
                                        <p>Мій профіль</p>
                                    </div>
                                    <div 
                                        onClick={() => {
                                            navigate('/tasks-list');
                                        }}
                                        className="user-nav-btn tasks-list-btn">
                                        <FaTasks />
                                        <p>Список завдань</p>
                                    </div>
                                    <div 
                                        onClick={ () => {
                                            dispatch(clearUser());
                                            localStorage.clear('user');
                                            navigate('/');
                                        } }
                                        className="user-nav-btn logout-btn">
                                        <MdLogout />
                                        <p>Вийти</p>
                                    </div>
                                </nav>
                            ) : null
                        }
                    </div>
                ) : (
                    <div className="auth-btns-wrapper">
                        <a onClick={ () => navigate('/login') }>Увійти</a>
                        <a onClick={ () => navigate('/sign-up') }>Зареєструватися</a>
                    </div>
                )
            }
        </div>
    )
}

export default Header;
