import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer, NavBar } from "../../components";
import { getAllInstitution } from "../../redux/actions";
import ActionInformation from "../../components/ActionInformation/ActionInformation";
import style from "./Actions.module.css";

const Actions = () => {
    const dispatch = useDispatch()
    const institutions = useSelector(state => state.institutions);

    useEffect(() => {
        dispatch(getAllInstitution(['Escritores del Reino', 'Jubilados y Apasionados']));
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <div className={style.ActionBody}>
                <div className={style.name}>
                    <h1>Acciones</h1>
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

export default Actions;