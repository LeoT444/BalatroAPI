import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListNaipe from "./components/Naipe/ListNaipe";
import AddNaipe from "./components/Naipe/AddNaipe";
import ReadNaipe from "./components/Naipe/ReadNaipe";
import UpdateNaipe from "./components/Naipe/UpdateNaipe";

import AddCarta from "./components/Cartas/AddCarta";
import ListCarta from "./components/Cartas/ListCarta";
import ReadCarta from "./components/Cartas/ReadCarta";
import UpdateCarta from "./components/Cartas/UpdateCarta";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/naipe" element={<ListNaipe />} />
            <Route path="/naipe/add" element={<AddNaipe />} />
            <Route path="/naipe/read/:id" element={<ReadNaipe />} />
            <Route path="/naipe/updade/:id" element={<UpdateNaipe />} />
            <Route path="/carta" element={<ListCarta />} />
            <Route path="/carta/add" element={<AddCarta />} />
            <Route path="/carta/read/:id" element={<ReadCarta />} />
            <Route path="/carta/update/:id" element={<UpdateCarta />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}
export default App;
