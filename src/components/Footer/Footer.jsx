import style from './Footer.module.css';
import face from '../../assets/logos/facebook.png';
import whats from '../../assets/logos/whatsapp.png';
import x from '../../assets/logos/x.png';

const Footer = () => {
    return (
        <div className={style.footer}>
            <hr />
            <div className={style.footerConteiner}>
                <p>Docentes del reino</p>
                <div className={style.logo}>
                    <img src={x} alt="X"/>
                    <img src={face} alt="Facebook"/>
                    <img src={whats} alt="Whatsapp"/>
                </div>
            </div>
        </div>
    );
};

export default Footer;