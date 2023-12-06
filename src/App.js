import "./App.css";
import { Gameboard } from "./components/index";

function App() {
  return (
    <div className="App">
      <div
        className="flex justify-center items-center 
      h-screen w-screen dark:bg-slate-800 dark:text-white"
      >
        <Gameboard size="3" />
      </div>
    </div>
  );
}

export default App;
