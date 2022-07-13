import React from "react";
import MealDetails from "../../components/mealDetails/MealDetails";
import "./home.css"

const Home = () =>{

    return(
        <div className="home">
            <div className="home__title">
                <h1>MOJE POSIŁKI</h1>
            </div>
            <div className="home__meal-detail">
                <MealDetails />
            </div>
        </div>
    )
}

export default Home