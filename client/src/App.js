import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Error from "./pages/error/Error";
import Hotel from "./pages/hotel/Hotel";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
