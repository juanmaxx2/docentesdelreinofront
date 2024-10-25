import { Link } from 'react-router-dom';
import style from './PrayerDay.module.css'

const PrayerDay = ({ id, title, time, date, image }) => {

    return (
        <div className={style.bodyActivity}>
            <Link to={`/prayerday/${id}`}>
                <div className={style.image}>
                    <img src={image} alt="Congreso" />
                </div>
                <div className={style.info}>
                    <h3>{title}</h3>
                    <h5>{date.day}/{date.month}/{date.year} - {time}</h5>
                </div>
            </Link>
        </div>
    );
};

export default PrayerDay;