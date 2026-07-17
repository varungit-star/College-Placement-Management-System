import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Companies from "./pages/Companies";
import Drives from "./pages/Drives";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Offers from "./pages/Offers";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/drives" element={<Drives />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;