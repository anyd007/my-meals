import React from "react";
import { useState } from "react";
import MealDetails from "../../components/mealDetails/MealDetails";
import MealForm from "../../components/mealForm/MealFrom";
import { useMealContext } from "../../hooks/useMealContext";
import "./home.css"

const Home = () =>{
    const [showMeal, setShowMeal] = useState(false)
    const {showForm, setShowForm} = useMealContext()
    const handleClick = () =>{
        setShowForm(true)
    }
    return(
        <div className="home">
            {showForm && <MealForm />}
            <div className="home__title">
                <h1>MOJE POSIŁKI</h1>
            </div>
            <div className="home__descripion">
                <h4>WCIŚNIJ PRZYCISK ABY DODAĆ SWÓJ POSIŁEK</h4>
                <button onClick={handleClick}>DODAJ</button>
            </div>
           <div className="home__meal-detail">
            <div className="home__meal-detail--bg">
                <div className="bg1"></div>
                <div className="bg2"></div>
                <div className="bg3"></div>
                <div className="bg4"></div>
            </div>
           {showMeal && <MealDetails />}
            </div>
        </div>
    )
}

export default Home