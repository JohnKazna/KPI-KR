import { useSelector } from 'react-redux';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import './profile.css';
import toast from 'react-hot-toast';

const Profile = () => {
    const authUser = useSelector(state => state.user.user);

    return (
        <div className="profile-page page-wrapper">
            <Header />

            {
                authUser.status === 'teacher' ? (
                    <form
                        onSubmit={ e => e.preventDefault() }
                        className="auth-form">
                        <div className="field-wrapper">
                            <label htmlFor="surname">Прізвище</label>
                            <input
                                readOnly
                                value={ authUser.surname }
                                type="text"
                                id="surname"
                                name="surname"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="name">{`Ім'я`}</label>
                            <input
                                readOnly
                                value={ authUser.name }
                                type="text"
                                id="name"
                                name="name"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="second_name">По батькові</label>
                            <input
                                readOnly
                                value={ authUser.second_name }
                                type="text"
                                id="second_name"
                                name="second_name"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="phone">Номер тел.</label>
                            <input
                                readOnly
                                value={ authUser.phone }
                                type="text"
                                id="phone"
                                name="phone"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="university">ВНЗ</label>
                            <input
                                readOnly
                                value={ authUser.university }
                                type="text"
                                id="university"
                                name="university"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="faculty">Факультет/інститут</label>
                            <input
                                readOnly
                                value={ authUser.faculty }
                                type="text"
                                id="faculty"
                                name="faculty"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="subject">Дисципліна</label>
                            <input
                                readOnly
                                value={ authUser.subject }
                                type="text"
                                id="subject"
                                name="subject"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="year">Рік прийому на роботу</label>
                            <input
                                readOnly
                                value={ authUser.year }
                                type="number"
                                id="year"
                                name="year"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="identity_number">Номер особової справи</label>
                            <input
                                readOnly
                                value={ authUser.identity_number }
                                type="number"
                                id="identity_number"
                                name="identity_number"
                                required />
                        </div>

                        <button
                            onClick={ () => {
                                toast.success('Заявку успішно подано!');
                            } }>
                            Подати заяву на зміну даних
                        </button>
                    </form>
                ) : (
                    <form 
                        onSubmit={ e => e.preventDefault() }
                        className="auth-form">
                        <div className="field-wrapper">
                            <label htmlFor="surname">Прізвище</label>
                            <input
                                readOnly
                                value={ authUser.surname }
                                type="text"
                                id="surname"
                                name="surname"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="name">{`Ім'я`}</label>
                            <input
                                readOnly
                                value={ authUser.name }
                                type="text"
                                id="name"
                                name="name"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="second_name">По батькові</label>
                            <input
                                readOnly
                                value={ authUser.second_name }
                                type="text"
                                id="second_name"
                                name="second_name"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="phone">Номер тел.</label>
                            <input
                                readOnly
                                value={ authUser.phone }
                                type="text"
                                id="phone"
                                name="phone"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="university">ВНЗ</label>
                            <input
                                readOnly
                                value={ authUser.university }
                                type="text"
                                id="university"
                                name="university"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="faculty">Факультет/інститут</label>
                            <input
                                readOnly
                                value={ authUser.faculty }
                                type="text"
                                id="faculty"
                                name="faculty"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="group">Група</label>
                            <input
                                readOnly
                                value={ authUser.group }
                                type="text"
                                id="group"
                                name="group"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="year">Рік вступу</label>
                            <input
                                readOnly
                                value={ authUser.year }
                                type="number"
                                id="year"
                                name="year"
                                required />
                        </div>

                        <div className="field-wrapper">
                            <label htmlFor="student_number">Номер студентського квитка</label>
                            <input
                                readOnly
                                value={ authUser.student_number }
                                type="number"
                                id="student_number"
                                name="student_number"
                                required />
                        </div>

                        <button
                            onClick={ () => {
                                toast.success('Заявку успішно подано!');
                            } }>
                            Подати заяву на зміну даних
                        </button>
                    </form>
                )
            }

            <Footer />
        </div>
    )
}

export default Profile;
