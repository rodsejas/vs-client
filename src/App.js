import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useContext, createContext } from "react";
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
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

// import NavBar from "./components/NavBar";

const LoggedInContext = createContext(false);

const RequireLoggedIn = ({ children }) => {
  const isLoggedIn = useContext(LoggedInContext);
  console.log("Is Logged In", isLoggedIn);
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/signin" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <div className="App">
        <Router>
          {/* <NavBar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/equipments"
              element={
                // <RequireLoggedIn>
                <Equipments />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/equipment/:id"
              element={
                // <RequireLoggedIn>
                <Equipment />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/equipment/:id/edit"
              element={
                // <RequireLoggedIn>
                <EditEquipment />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/equipment/create"
              element={
                // <RequireLoggedIn>
                <NewEquipment />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/workers"
              element={
                // <RequireLoggedIn>
                <Workers />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/worker/:id"
              element={
                // <RequireLoggedIn>
                <Worker />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/inspections"
              element={
                // <RequireLoggedIn>
                <Inspections />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/inspection/:id"
              element={
                // <RequireLoggedIn>
                <Inspection />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/equipment/:id/inspection/create"
              element={
                // <RequireLoggedIn>
                <NewInspection />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/models"
              element={
                // <RequireLoggedIn>
                <Models />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/model/:id"
              element={
                // <RequireLoggedIn>
                <Model />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/model/:id/edit"
              element={
                // <RequireLoggedIn>
                <EditModel />
                // </RequireLoggedIn>
              }
            />
            <Route
              path="/model/create"
              element={
                // <RequireLoggedIn>
                <NewModel />
                // </RequireLoggedIn>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/signin"
              element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
            />
          </Routes>
        </Router>
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;
