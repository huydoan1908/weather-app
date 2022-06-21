import { useContext } from "react";
import { ThemeProvider, Backdrop, CircularProgress } from "@mui/material";
import { StoreContext } from "./store";
// Import Component
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import ErrorMessage from "./components/ErrorMessage";
//Import Style
import "./App.css";
import darkTheme from "./themes/darkTheme";

function App() {
  const [state, dispatch] = useContext(StoreContext);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <SearchBar />
        <Main />
        <Backdrop open={state.backdrop}>
          <CircularProgress color="info" />
        </Backdrop>
        <ErrorMessage />
      </div>
    </ThemeProvider>
  );
}

export default App;
