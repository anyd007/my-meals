import { useReducer } from "react";
import { createContext, useState} from "react";


export const MealContext = createContext()

const initialState = ()=>({
    meals: null
})

const reducer = (state, action)=>{
    switch (action.type) {
        case "GET_MEALS" :
            return {
                meals: action.payload
            }
        case "CREATE_MEAL" :
            return {
                meals:[action.payload, ...state.meals]
            }
        default: return state
    }
}


export const MealContextProvider = ({children}) =>{
    const [showForm, setShowForm] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState)
    return(
        <MealContext.Provider value={{showForm, setShowForm, state, dispatch}}>
            {children}
        </MealContext.Provider>
    )
}