import { useReducer } from "react";
import StoreContext from "./StoreContext";
import reducer, { initState } from "../reducer";

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
