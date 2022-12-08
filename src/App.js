import logo from "./logo.svg";
import "./App.css";
import { AnimalsList } from "./AnimalsList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { CreateAnimal } from "./CreateAnimal";
import { Editanimal } from "./EditAnimal";
import { Login } from "./Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AppLogout from "./AppLogout";

function App() {

  const MainDashboardEntry = () => {
    return (
        <AppLogout>
            <AnimalsList />
        </AppLogout>
    )
}
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            
            <Route path="/animalList" element={<MainDashboardEntry />} />
            <Route path="/animalList/:userId" element={<Editanimal />} />
            <Route path="/createAnimal" element={<CreateAnimal />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/* <AnimalList /> */}
    </div>
  );
}

export default App;
