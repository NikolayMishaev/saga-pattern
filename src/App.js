import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
  const store = useSelector((s) => s);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <button
        onClick={() => {
          dispatch({ type: "ACTION" });
        }}
      >
        Click
      </button>
    </div>
  );
}

export default App;
