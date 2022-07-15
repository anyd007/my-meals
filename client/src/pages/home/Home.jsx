import React, { useEffect, useState } from "react";
import MealDetails from "../../components/mealDetails/MealDetails";
import MealForm from "../../components/mealForm/MealFrom";
import { useMealContext } from "../../hooks/useMealContext";
import "./home.css"

const Home = () =>{
    const [showMeal, setShowMeal] = useState(false)
    const {showForm, setShowForm} = useMealContext()
    const {state, dispatch} = useMealContext()
    const handleClick = () =>{
        setShowForm(true)
    }

    useEffect(()=>{
        const feachMeals = async () =>{
            const response = await fetch("http://localhost:4000/api/meals")
            const json = await response.json()
            if(response.ok){
                dispatch({type: "GET_MEALS", payload: json})
                if(state.meals !== null){
                    setShowMeal(true)
                }
            }
        }
        feachMeals()
    }, [])
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
           {showMeal && state.meals.map(meal=>(<MealDetails key={meal._id} meal={meal}/>))}
            </div>
        </div>
    )
}

export default Home