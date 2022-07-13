import { useContext } from "react";
import { MealContext } from "../context/MealContext";

export const useMealContext = ()=>{
    const context = useContext(MealContext)

    if(!context){
        throw Error("useMealContext musi być w MealContextProvider")
    }

    return context
}