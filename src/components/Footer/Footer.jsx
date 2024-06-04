import style from './Footer.module.css';
import { useSelector } from 'react-redux';

import ADORALOGO from "../../assets/ADORALOGO.png"
import facebook from "../../assets/facebook.webp"
import whatsapp from "../../assets/whatsapp.png"
import { PedirLocalStorage } from '../LocalStorage/LocalStorage';

const Footer = () => {
    const institution = PedirLocalStorage('institution')

    return (
        <div className={style.bodyfooter}>
            <div className={style.institution}>
                <img src={ADORALOGO} alt="Logo" />
                <p>{institution.name}</p>
            </div>
            <div className={style.contact}>
                <p>{institution.mail}</p>
                <p>{institution.direction}</p>
                <p>{institution.phone}</p>
            </div>
            <div className={style.socialnetwork}>
                <img src={facebook} alt="facebook" />
                <div className={style.whatsapp}>
                    <img src={whatsapp} alt="whatsapp" />
                </div>
            </div>

        </div>
    );
};

export default Footer;