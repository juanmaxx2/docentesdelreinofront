import { useNavigate } from 'react-router-dom';
import { PedirLocalStorage } from '../../components/LocalStorage/LocalStorage';
import { useEffect } from 'react';
import style from './Admin.module.css';
import { NavBar, Footer } from '../../components';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!PedirLocalStorage('token')) navigate("/login");
    }, [PedirLocalStorage()]);

    const onClickNavigate = (comp) => {
        navigate(`/admin/${comp}`)
    }

    return (
        <div className={style.adminContainer}>
            <NavBar />
            <div className={style.adminContent}>
                <div className={style.adminOptions}>
                    <h1>Admin</h1>
                    <p>Modificar</p>
                    <button onClick={() => onClickNavigate('activity')}>Actividades</button>
                    <button onClick={() => onClickNavigate('association')}>Asociaciones</button>
                    <button onClick={() => onClickNavigate('user')}>Usuarios</button>
                    <button onClick={() => onClickNavigate('province')}>Provincias</button>
                    <button onClick={() => onClickNavigate('law')}>Leyes</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Admin;
