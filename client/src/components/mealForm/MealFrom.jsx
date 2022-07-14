import React, { useReducer } from "react";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useMealContext } from "../../hooks/useMealContext";
import { meals } from "../../api/MealApi";
import "./meal-form.css";

const initalState = {
    title:'',
    info:'',
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
                info: action.payload
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
    const {showForm, setShowForm} = useMealContext()
    const [state, dispatch] = useReducer(reducer, initalState)
    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(state);
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
                    value={state.title}
                    onChange={e=> dispatch({type:"TITLE_INPUT", payload: e.target.value})}>
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
                    value={state.info}
                    onChange={e=> dispatch({type: "INFO_INPUT", payload: e.target.value})}></textarea>
                </div>

                <div className="meal-form__container--hour">
                    <label htmlFor="hour">O KTÓREJ GODZINIE?</label><br />
                    <input 
                    type="time" 
                    name="hour" 
                    id="hour" 
                    value={state.hour}
                    onChange={e=> dispatch({type: "HOUR_INPUT", payload: e.target.value})}/>
                </div>
                <div className="meal-form__container--btn">
                    <button>DODAJ</button>
                </div>
            </form>
        </div>
    )
}

export default MealForm