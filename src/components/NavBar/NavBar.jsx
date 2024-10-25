import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import style from './NavBar.module.css';
import logo from '../../assets/adoralogo.png';
import { PedirLocalStorage } from "../LocalStorage/LocalStorage";

const NavBar = () => {
    const [admin, setAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (PedirLocalStorage('token')) setAdmin(true);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={style.conteinerNavBar}>
            <div className={style.bodyNavBar}>
                {/* Logo */}
                <Link to='/' className={style.logo}>
                    <img src={logo} alt="Logo" />
                    <p className={style.logoText}>Asociación Docentes del Reino Argentina</p>
                </Link>

                {/* Botón hamburguesa para móviles */}
                <button className={style.menuButton} onClick={toggleMenu}>
                    &#9776;
                </button>

                {/* Opciones de navegación */}
                <div className={`${style.bodyOpciones} ${menuOpen ? style.showMenu : ''}`}>
                    <div><Link to='/'>Inicio</Link></div>
                    <div><Link to='/activities'>Actividades</Link></div>
                    {admin ? (
                        <div><Link to='/admin'>Admin</Link></div>
                    ) : (
                        <div><Link to='/'>Participación</Link></div>
                    )}
                </div>
            </div>
            <hr />
        </div>
    );
};

export default NavBar;