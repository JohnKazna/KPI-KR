import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import './home.css';

const Home = () => {
    return (
        <div className="page-wrapper home-page">
            <Header />

            <div className="intro-wrapper">
                <div className="intro-info">
                    <h1 className="intro-info-heading">Онлайн-навчання</h1>
                    <p className="intro-info-about">
                        Завдання для контролю знань та засвоєння <br/>вивченого матеріалу.
                    </p>
                </div>
                <img 
                    className="intro-img" 
                    src="./src/assets/img/home-poster.png" 
                    alt="Home Poster Image" />
            </div>

            <Footer />
        </div>
    )
}

export default Home;
