import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Game from "./pages/Game";   
import Create from "./pages/Create";
import Read from "./pages/Read";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/game" element={<Game />} />

        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/edit" element={<Edit />} />
      
      </Routes>
    </Router>
  );
}

export default App;
