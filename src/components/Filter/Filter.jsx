import { useEffect, useState } from "react";
import { getActivities, getProvince } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from './Filter.module.css';
import { Link } from "react-router-dom";

const Filter = () => {
    const dispatch = useDispatch();
    const tipos = [{
        name: "Congreso",
        value: 1
    }, {
        name: "Conferencia",
        value: 2
    },
    {
        name: "Charla",
        value: 3
    },
    {
        name: "Jornadas de Capacitacion",
        value: 4
    },
    {
        name: "Jornadas de Oracion",
        value: 5
    }];

    const provinces = useSelector(state => state.provinces);
    
    const [tipo, setTipo] = useState('all');
    const [province, setProvince] = useState('all');
    
    useEffect(() => {
        dispatch(getProvince());
    }, [dispatch]);

    const onChangeHandlerTipo = (event) => {
        const value = event.target.value;
        setTipo(value);
    };

    const onChangeHandlerProvince = (event) => {
        const value = event.target.value;
        setProvince(value);
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        dispatch(getActivities(tipo, province));
    };

    return (
        <div className={style.bodyfilter}>
            <p>Actividades</p>
            <form onSubmit={sumbitHandler}>

                <div className={style.filters}>
                    <p>Tipo de Activitidades</p>
                    <select onChange={onChangeHandlerTipo}>
                        <option key='all' value='all'>Todas los tipos</option>
                        {
                            tipos.map((tipo) => {
                                return (
                                    <option key={tipo.value} value={tipo.value}>{tipo.name}</option>
                                );
                            })
                        }
                    </select>
                </div>

                <div className={style.filters}>
                    <p>Provincias</p>
                    {
                        provinces.length ? (
                            <select onChange={onChangeHandlerProvince}>
                                <option key='all' value='all'>Todas las provincias</option>
                                {
                                    provinces.map((province) => {
                                        return (
                                            <option key={province.name} value={province.name}>{province.name}</option>
                                        );
                                    })
                                }
                            </select>
                        ) : (<></>)
                    }
                </div>

                <button type='submit'>Filtrar</button>
            </form>
            
            <Link to='/create'><div className={style.create}>crear</div></Link>
            
        </div>
    );
};

export default Filter;