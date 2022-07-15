import React from "react";
import "./meal-details.css"


const MealDetails = ({meal}) =>{

    return(
        <div className="mealDetails">
             <h2>Nazwa posiłku: {meal.title}</h2>
             <h4>Opis dania:<br />{meal.composition}</h4>
             <h4>Godzina spożycia: {meal.hour}</h4>
        </div>
       
    )
}

export default MealDetails