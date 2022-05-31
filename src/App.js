import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
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
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar.jsx";

const LoggedInContext = createContext(false);

const RequireLoggedIn = ({ children }) => {
  const isLoggedIn = useContext(LoggedInContext);
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/signin" />;
};

const checkLocalStorageToken = () => {
  return Boolean(localStorage.getItem("supabase.auth.token"));
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return checkLocalStorageToken();
  });

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <div className="App">
        <Router>
          <Flex
            as="section"
            direction={{
              base: "column",
              lg: "row",
            }}
            height="100vh"
            bg="bg-canvas"
            overflowY="auto"
          >
            {isDesktop ? <Sidebar setIsLoggedIn={setIsLoggedIn} /> : <Navbar />}

            <Routes>
              <Route
                path="/"
                element={
                  <RequireLoggedIn>
                    <Home />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/equipments"
                element={
                  <RequireLoggedIn>
                    <Equipments />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/equipment/:id"
                element={
                  <RequireLoggedIn>
                    <Equipment />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/equipment/:id/edit"
                element={
                  <RequireLoggedIn>
                    <EditEquipment />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/equipment/create"
                element={
                  <RequireLoggedIn>
                    <NewEquipment />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/workers"
                element={
                  <RequireLoggedIn>
                    <Workers />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/worker/:id"
                element={
                  <RequireLoggedIn>
                    <Worker />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/inspections"
                element={
                  <RequireLoggedIn>
                    <Inspections />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/inspection/:id"
                element={
                  <RequireLoggedIn>
                    <Inspection />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/equipment/:id/inspection/create"
                element={
                  <RequireLoggedIn>
                    <NewInspection />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/models"
                element={
                  <RequireLoggedIn>
                    <Models />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/model/:id"
                element={
                  <RequireLoggedIn>
                    <Model />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/model/:id/edit"
                element={
                  <RequireLoggedIn>
                    <EditModel />
                  </RequireLoggedIn>
                }
              />
              <Route
                path="/model/create"
                element={
                  <RequireLoggedIn>
                    <NewModel />
                  </RequireLoggedIn>
                }
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/signin"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" />
                  ) : (
                    <SignIn setIsLoggedIn={setIsLoggedIn} />
                  )
                }
              />
            </Routes>
          </Flex>
        </Router>
      </div>
    </LoggedInContext.Provider>
  );
}

export default App;
