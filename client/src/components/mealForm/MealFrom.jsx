import React, { useReducer, useState } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useMealContext } from "../../hooks/useMealContext";
import { meals } from "../../api/MealApi";
import "./meal-form.css";

const initalState = {
    title:'',
    composition:'',
    hour:''
}
const reducer = (state, action) =>{
    switch (action.type) {
        case "TITLE_INPUT":
            return {
                ...state,
                title: action.payload
            }
        case "INFO_INPUT":
            return {
                ...state,
                composition: action.payload
            }
        case "HOUR_INPUT":
            return {
                ...state,
                hour: action.payload
            }
        default: return state
    }
}

const MealForm = () =>{
    const {showForm, setShowForm, dispatch} = useMealContext()
    const [state, dispatchInptus] = useReducer(reducer, initalState)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const title = state.title
    const composition = state.composition
    const hour = state.hour

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const meal = ({title, composition, hour})
        const response = await fetch("http://localhost:4000/api/meals", {
            method: "POST",
            body: JSON.stringify(meal),
            headers:{"Content-type":"application/json"}
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            state.title = ''
            state.composition = ''
            state.hour = ''
            setError(null)
            setEmptyFields([])
            dispatch({type: "CREATE_MEAL", payload: json})
        }
    }

    return(
        <div className="meal-form">
            <form onSubmit={handleSubmit} className="meal-form__container">
                <AiOutlineCloseCircle onClick={()=>setShowForm(false)} className="meal-form__container--icon"/>
                <div className="meal-form__container--title">
                    <label htmlFor="title">NAZWA POSIŁKU</label><br />
                    <select 
                    name="title" 
                    id="title"
                    className={emptyFields.includes("title") ? "error" : ""}
                    value={state.title}
                    onChange={e=> dispatchInptus({type:"TITLE_INPUT", payload: e.target.value})}>
                    {meals && meals.map(el=>(<option key={el.id}>{el.name}</option>))}
                    </select>
                </div>

                <div className="meal-form__container--info">
                    <label htmlFor="info">CO DOBREGO BYŁO JEDZONE?<br/>max 100 znaków</label><br />
                    <textarea 
                    maxLength="100" 
                    type="text" 
                    name="info" 
                    id="info"
                    className={emptyFields.includes("composition") ? "error" : ""}
                    value={state.info}
                    onChange={e=> dispatchInptus({type: "INFO_INPUT", payload: e.target.value})}></textarea>
                </div>

                <div className="meal-form__container--hour">
                    <label htmlFor="hour">KIEDY ?</label><br />
                    <input 
                    type="datetime-local" 
                    name="hour" 
                    id="hour" 
                    className={emptyFields.includes("hour") ? "error" : ""}
                    value={state.hour}
                    onChange={e=> dispatchInptus({type: "HOUR_INPUT", payload: e.target.value})}/>
                </div>
                <div className="meal-form__container--btn">
                {error && <div className="errorMsg">{error}</div>}
                    <button>DODAJ</button>
                </div>
            </form>
        </div>
    )
}

export default MealForm