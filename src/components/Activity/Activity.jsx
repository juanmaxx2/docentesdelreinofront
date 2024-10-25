import { Link } from 'react-router-dom';
import style from './Activity.module.css'

const Activity = ({ id, title, time, date, city, image }) => {
    return (
        <div className={style.bodyActivity}>
            <Link to={`/activity/${id}`} className={style.bodyInfo}>
                <div className={style.image}>
                    <img src={image} alt="Congreso" />
                </div>

                <div className={style.info}>
                    <h3>{title}</h3>
                    <h5>{city}</h5>
                    <h5>{date.day}/{date.month}/{date.year} - {time}</h5>
                </div>
            </Link>
        </div>
    );
};

export default Activity;