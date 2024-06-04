import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Footer, NavBar, PedirLocalStorage } from "../../components";
import ADORALOGO from "../../assets/ADORALOGO.png";
import Introduccion from "../../assets/Introduccion.jpg";
import style from "./Institution.module.css";

const Institution = () => {
    const institution = PedirLocalStorage('institution');

    return (
        <div>
            <NavBar />
            <div className={style.intitutionbody}>
                <div className={style.name}>
                    <p>{institution.name}</p>
                </div>
                <div className={style.presentation}>
                    <img src={ADORALOGO} alt="Logo"/>
                    <div>
                        <p>{institution.presentation}</p>
                    </div>
                </div>
                <div className={style.historybody}>
                    <p>Hisotria</p>
                    <div className={style.historyinfo}>
                        <img src={Introduccion} alt="Introduccion"/>
                        <p>{institution.history}</p>
                    </div>
                </div>
                <div className={style.objetive}>
                    <p>{institution.objetive}</p>
                </div>
                 <Link to='/updateinstitution'><div>modificar</div></Link>
            </div>
            <Footer />
        </div>
    );
};

export default Institution