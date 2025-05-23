import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
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
    <BrowserRouter>
      <div className="balatro-layout">
        <Sidebar />
        <main className="balatro-main">
          <Routes>
            <Route path="/naipe" element={<ListNaipe />} />
            <Route path="/naipe/add" element={<AddNaipe />} />
            <Route path="/naipe/read/:id_naipe" element={<ReadNaipe />} />
            <Route path="/naipe/update/:id_naipe" element={<UpdateNaipe />} />
            <Route path="/carta" element={<ListCarta />} />
            <Route path="/carta/add" element={<AddCarta />} />
            <Route path="/carta/read/:id_carta" element={<ReadCarta />} />
            <Route path="/carta/update/:id_carta" element={<UpdateCarta />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
