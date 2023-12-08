import "./App.css";
import { Games } from "./components/index";

function App() {
  return (
    <div className="App">
      <div
        className="flex flex-col justify-center items-center 
      h-screen w-screen dark:bg-slate-800 dark:text-white overflow-hidden"
      >
        <Games />
      </div>
    </div>
  );
}

export default App;
