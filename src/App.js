import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Equipments from "./pages/Equipments";
import Equipment from "./pages/Equipment";
import EditEquipment from "./pages/EditEquipment";
import NewEquipment from "./pages/NewEquipment";
import Workers from "./pages/Workers";
import Worker from "./pages/Worker";
import Inspections from "./pages/Inspections";
import Inspection from "./pages/Inspection";
import NewInspection from "./pages/NewInspection";
import Models from "./pages/Models";
import Model from "./pages/Model";
import EditModel from "./pages/EditModel";
import NewModel from "./pages/NewModel";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/equipment/:id" element={<Equipment />} />
          <Route path="/equipment/:id/edit" element={<EditEquipment />} />
          <Route path="/equipment/create" element={<NewEquipment />} />
          <Route path="/workers" element={<Workers />} />
          <Route path="/worker/:id" element={<Worker />} />
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/inspection/:id" element={<Inspection />} />
          <Route
            path="/equipment/:id/inspection/create"
            element={<NewInspection />}
          />
          <Route path="/models" element={<Models />} />
          <Route path="/model/:id" element={<Model />} />
          <Route path="/model/:id/edit" element={<EditModel />} />
          <Route path="/model/create" element={<NewModel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
