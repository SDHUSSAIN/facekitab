import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducers";


const INITIAL_STATE = {
    user : {
        _id:"6267b2037f85ef8922962e02",
        username:"saddam",
        email:"saddam@gmail.com",
        password:"$2a$10$COLX/Sbrj0NK2FxoXb3.6OlLBh3G4roMG.02ZrWBzVF6zudWqWZ6e",
        followers:["6267a65b5aeb938aac6f04fd"],
        followins:["6267a65b5aeb938aac6f04fd"],
        isAdmin:false,
        createdAt:"2022-04-26T08:49:07.856+00:00",
        updatedAt:"2022-04-26T13:53:56.402+00:00",
        description:"Hey this is saddam hussain a biryani lover",
        city:"Delhi",
        from:"Village Lampur",
        relationship:1,

},
isFetching: false,
error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return(
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }} >{children}</AuthContext.Provider>
    )
}