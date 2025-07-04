import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <main className=" min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
