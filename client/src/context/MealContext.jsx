import { createContext, useState} from "react";


export const MealContext = createContext()





export const MealContextProvider = ({children}) =>{
    const [showForm, setShowForm] = useState(false)
    return(
        <MealContext.Provider value={{showForm, setShowForm}}>
            {children}
        </MealContext.Provider>
    )
}