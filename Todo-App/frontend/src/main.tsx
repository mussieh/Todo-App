import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Had to remove strict mode to make drag and drop work
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
