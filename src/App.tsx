import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Report from "./components/Report";
import "./App.css";

function App() {
  return (
    <div className="App">
      <PrimeReactProvider>
        <div className="center-container">
          <Report />
        </div>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
