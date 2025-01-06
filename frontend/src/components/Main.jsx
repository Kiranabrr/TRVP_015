import { useEffect, useState } from "react"
import { fetchAllData, addShift, addProcedure } from "../requests";

import Card from "./ui/Card";
import AddShift from "./forms/AddShift";
import AddProcedure from "./forms/AddProcedure";

export default function Main() {
    const [data, setData] = useState([]);
    const [shown, setShown] = useState(false);
    const [shown2, setShown2] = useState(false);

    useEffect(() => {
        fetchAllData(setData);
    }, [])

    const currentComplexitySum = (id) => {
        let current = data.filter((element) => {
            return element.shift_id === parseInt(id);
        })
        return current[0].appointments.reduce((acc, element) => {return acc + element.procedure_complexity}, 0)
    }

    const procedureInShift = (shift_id, procedure_id) => {

        const current = data.find((element) => element.shift_id === parseInt(shift_id));

        if (current && current.procedures) {

            return current.procedures.some((element) => {
                return element.procedure_id === parseInt(procedure_id);
            });
        }

        return false;
    };

    return (
        <main className="main-block">
            <div className="main-block-menu">
                {!shown && (<button className="filed-button" onClick={() => {setShown(true); window.scrollTo(0,0);}}>Добавить смену</button>)}
                {!shown2 && (<button className="filed-button" onClick={() => {setShown2(true); window.scrollTo(0,0);}}>Добавить процедуру</button>)}
            </div>
            {(shown || shown2) && (
                <div className="main-block-form">
                    {shown && (
                        <AddShift setShown={setShown} requestFunction={addShift} />
                    )}
                    {shown2 && (
                        <AddProcedure setShown={setShown2} requestFunction={addProcedure}/>
                    )}
                </div>
            )}

            <div className="main-block-list">
                {data.map((element, index) => {
                    return (
                        <Card key={index} data={element} currentComplexitySum={currentComplexitySum} procedureInShift={procedureInShift} allData={data}/>
                    )
                })}
            </div>
        </main>
    )
}