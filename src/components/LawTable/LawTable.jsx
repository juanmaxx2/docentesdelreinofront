import { FaEdit, FaTrash } from "react-icons/fa";
import style from './LawTable.module.css';

const LawTable = ({ laws, onClickDelete, onClickEdit, title, tipo }) => {
    return (
        <div className={style.tableContainer}>
            <p>{title}</p>
            {laws?.length ? (
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Titulo</th>
                            <th>URL</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {laws.map(law => (
                            <tr key={law.number}>
                                <td>{law.number}</td>
                                <td>{law.title}</td>
                                <td>{law.url}</td>
                                <td>
                                    <div className={style.buttons}>
                                        {tipo == "eliminado" ? (
                                            <></>
                                        ) : (
                                            <button className={style.actionButton} onClick={() => onClickEdit({ title: law.title, number: law.number, url: law.url })}>
                                                <FaEdit />
                                            </button>
                                        )}

                                        <button className={style.actionButton} onClick={() => onClickDelete(law.number)}>
                                            <FaTrash />
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={style.conteinerloader}>
                    <div className={style.loader}></div>
                </div>
            )}
        </div>
    );

};

export default LawTable;