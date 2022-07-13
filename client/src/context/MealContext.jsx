import { createContext } from "react";


export const MealContext = createContext()





export const MealContextProvider = ({children}) =>{

    return(
        <MealContext.Provider value={''}>
            {children}
        </MealContext.Provider>
    )
}