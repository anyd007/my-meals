import React from "react";
import { FaExchangeAlt, FaTrashAlt } from 'react-icons/fa';
import { useMealContext } from "../../hooks/useMealContext";
import "./meal-details.css"


const MealDetails = ({meal}) =>{
const {dispatch} = useMealContext()
    const handleClick = async () =>{
        const response = await fetch("http://localhost:4000/api/meals/" + meal._id, {
            method: "DELETE"
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type: "DELETE_MEAL", payload: json})
        }

    }
    return(
        <div className="mealDetails">
             <h2>Nazwa posiłku: {meal.title}</h2>
             <h4>Opis dania:</h4><h3>{meal.composition}</h3>
             <h4>Godzina spożycia:</h4><h3>{meal.hour}</h3>
             <FaTrashAlt onClick={handleClick} className="mealDetails__icon"/>
        </div>
       
    )
}

export default MealDetails