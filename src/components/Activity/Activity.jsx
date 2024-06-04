import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteActivity } from '../../redux/actions';
import style from './Activity.module.css'
import Congreso2 from '../../assets/Congreso2.jpg';

const Activity = ({ id, title, schedule, date, city }) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(deleteActivity(id));
    };

    return (
        <div className={style.bodyActivity}>
            <button onClick={onClickHandler}>X</button>
            <Link to={`/activity/${id} `}>
                <p>{title}</p>
                <div className={style.actImg}>
                    <img src={Congreso2} alt="Congreso" />
                </div>
                <div className={style.infoImg}>
                    <p>{city}</p>
                    <p>{date}</p>
                    <p>{schedule}</p>
                </div>

            </Link>
        </div>
    );
};

export default Activity;