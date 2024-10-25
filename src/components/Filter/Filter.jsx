import { useEffect, useState } from "react";
import { getActivities, getProvince } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from './Filter.module.css';
import { Link } from "react-router-dom";
import MapFilter from "../MapFilter/MapFilter";


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

    const [tipo, setTipo] = useState('all');
    const [date, setDate] = useState('all');
    const [province, setProvince] = useState('all');
    const today = new Date().toISOString().split('T')[0];

    const onClickProvince = () => {
        setProvince('all')
    }

    const onClickDate = () => {
        setDate('all')
    }

    const onChangeHandlerTipo = (event) => {
        const value = event.target.value;
        setTipo(value);
    };

    const onChangeHandlerDate = (event) => {
        const value = event.target.value;
        setDate(value);
    };

    const sumbitHandler = (event) => {
        event.preventDefault();
        dispatch(getActivities(tipo, province, date));
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

                <div>
                    <p>Fecha</p>
                    <div>
                        <input
                            type="date"
                            value={date === 'all' ? '' : date}
                            onChange={onChangeHandlerDate}
                            placeholder="dd/mm/aaaa" // Aunque no se verá, es descriptivo
                            className={style.dateInput}
                            min={today} 
                        />
                        <button
                            type='button'
                            onClick={onClickDate}
                        >
                            Todas las fechas
                        </button>
                    </div>
                </div>

                <div className={style.filters}>
                    <p>Provincias</p>
                    <MapFilter
                        selectedProvince={province}
                        setSelectedProvince={setProvince}
                    />
                    {province == 'all' ?
                        (
                            <p>Todos</p>
                        ) : (
                            <p>{province}</p>
                        )}
                    <button 
                        type='button' 
                        onClick={onClickProvince}
                    >
                        Todas las provincias
                    </button>
                </div>

                <button type='submit'>Filtrar</button>
            </form>
        </div>
    );
};

export default Filter;