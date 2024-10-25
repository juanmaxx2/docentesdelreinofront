import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer, NavBar } from "../../components";
import { getAllInstitution } from "../../redux/actions";
import ActionInformation from "../../components/ActionInformation/ActionInformation";
import style from "./NationalAgency.module.css";

const NationalAgency = () => {
    const dispatch = useDispatch()
    const institutions = useSelector(state => state.institutions);

    useEffect(() => {
        dispatch(getAllInstitution(['ASI', 'Revision Curricular','Jornadas de Oracion Nacional','Asistentes del Reino']));
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <div className={style.ActionBody}>
                <div className={style.name}>
                    <h1>Agenda Nacional</h1>
                </div>
                <div>
                    {
                        institutions?.length ? (
                            institutions.map(inst => {
                                return (
                                    <ActionInformation
                                        institution={inst}
                                    />
                                )
                            })
                        ) : (
                            <div>Loading...</div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NationalAgency;