import { createContext, useReducer, useEffect } from "react";

const initalState = {user: JSON.parse(localStorage.getItem("user")) || null, isFetching: false, error: false};

export const authContext = createContext(initalState);

export const authReducer = (state, action) => {
  switch (action.type) {
    case "loginStart":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "loginSuccess":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "loginFailure":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initalState);

    useEffect(()=>{
      localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user]);
    
    return (
      <authContext.Provider value={{user: state.user, isFetching: state.isFetching, error: state.error, dispatch}}>
        {children}
      </authContext.Provider>
    );
};