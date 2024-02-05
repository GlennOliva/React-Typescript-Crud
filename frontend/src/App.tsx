import { Routes, Route } from "react-router-dom";
import Items from "./components/Items";
import Item_Insert from "./components/Item_Insert";
import Item_Update from "./components/Item_Update";
import Login from "./labexam/Login";
import Register from "./labexam/Register";
import Dashboard from "./labexam/Dashboard";

const App = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/create" element={<Item_Insert />} />
        <Route path="/edit/:id" element={<Item_Update />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
