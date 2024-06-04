import { Link } from "react-router-dom";
import style from './NavBar.module.css';

const NavBar = () => {
    return (
        <div className={style.bodyNavBar}>
            <div><Link to='/home'>incio</Link></div>
            <div><Link to='/institution'>institucion</Link></div>
            <div><Link to='/activities'>actividades</Link></div>
        </div>
    );
};

export default NavBar;