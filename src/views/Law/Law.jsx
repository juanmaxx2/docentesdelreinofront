import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './Law.module.css';
import { getNationalLaw, getProvinces, getProvinceLaw } from "../../redux/actions";
import { NavBar, Footer } from '../../components';

const Law = () => {
    const dispatch = useDispatch();
    const laws = useSelector(state => state.law);
    const Provincelaws = useSelector(state => state.provinceLaw);
    const provinces = useSelector(state => state.provinces);
    const [province, setProvince] = useState('Buenos Aires');

    useEffect(() => {
        dispatch(getProvinces());
        dispatch(getNationalLaw(province));
        dispatch(getProvinceLaw(province));
    }, [dispatch]);

    const handleProvinceChange = (e) => {
        setProvince(e.target.value);
    };

    const handleSearch = () => {
        dispatch(getProvinceLaw(province));
    };

    return (
        <div>
            <NavBar />
            <div className={style.body}>
                <p>Marco Legal</p>

                <div className={style.tableBody}>
                    <div className={style.tables}>
                        <p>Leyes Nacionales</p>
                        {laws.length ? (
                            <table className={style.table}>
                                <thead>
                                    <tr>
                                        <th>Número</th>
                                        <th>Título</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {laws.flat().map((law, index) => (
                                        <tr key={index}>
                                            <td>{law.number}</td>
                                            <td>{law.title}</td>
                                            <td><a href={law.url} target="_blank" rel="noopener noreferrer">Ver Ley</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                <p>No se encontraron leyes nacionales</p>
                            </div>
                        )}
                    </div>

                    <div className={style.tables}>
                        <p>Leyes Provinciales</p>

                        <div className={style.search}>
                            <select onChange={handleProvinceChange} className={style.select}>
                                <option value="all">Seleccione una provincia</option>
                                {provinces?.length ? (
                                    provinces.map((prov, index) => (
                                        prov.name == 'Buenos Aires' ? (
                                            <option key={index} value={prov.name} selected>{prov.name}</option>
                                        ) : (
                                            <option key={index} value={prov.name}>{prov.name}</option>
                                        )

                                    ))
                                ) : (
                                    <></>
                                )}
                            </select>
                            <button onClick={handleSearch} className={style.searchButton}>Buscar</button>
                        </div>

                        {Provincelaws.length ? (
                            <table className={style.table}>
                                <thead>
                                    <tr>
                                        <th>Número</th>
                                        <th>Título</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Provincelaws.flat().map((law, index) => (
                                        <tr key={index}>
                                            <td>{law.number}</td>
                                            <td>{law.title}</td>
                                            <td><a href={law.url} target="_blank" rel="noopener noreferrer">Ver Ley</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                <p>No se encontraron leyes provinciales</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Law;
