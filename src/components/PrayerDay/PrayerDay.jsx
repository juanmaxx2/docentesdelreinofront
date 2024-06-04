import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePrayerDay } from '../../redux/actions';
import Congreso2 from '../../assets/Congreso2.jpg';
import style from './PrayerDay.module.css'

const PrayerDay = ({ id, title, schedule, date }) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(deletePrayerDay(id));
    };

    return (
        <div className={style.bodyActivity}>
            <button onClick={onClickHandler}>X</button>
            <Link to={`/prayerday/${id}`}>
                <p>{title}</p>
                <div className={style.actImg}>
                    <img src={Congreso2} alt="Congreso" />
                </div>
                <div className={style.infoImg}>
                    <p>{schedule}</p>
                    <p>{date}</p>

                </div>
            </Link>
        </div>
    );
};

export default PrayerDay;