import style from "./ActionInformation.module.css";
import image from "../../assets/Congreso.jpg"

const ActionInformation = ({ institution }) => {
    return (
        <div className={style.body}>
            <div className={style.image}>
                {
                    institution.image ? (
                        <img src={activity.image} alt={institution.name} />
                    ) : (
                        <img src={image} alt={institution.name} />
                    )
                }
            </div>
            <div className={style.informationBody}>
                <div className={style.name}>
                    <p>{institution.name}</p>
                </div>
                <div className={style.information}>
                    <h3>Introducción</h3>
                    <p>{institution.introduction}</p>
                </div>
                <div className={style.information}>
                    <h3>Historia</h3>
                    <p>{institution.history}</p>
                </div>
                <div className={style.information}>
                    <h3>Objetivo</h3>
                    <p>{institution.objetive}</p>
                </div>
                <p>{institution.mail}</p>
            </div>
        </div>
    )
}

export default ActionInformation;