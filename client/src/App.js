import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Error from "./pages/error/Error";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { SearchContext } from "./context/SearchContext";

function App() {
  const state = useContext(SearchContext)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
