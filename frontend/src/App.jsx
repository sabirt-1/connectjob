import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/common/Navbar";
import { ToastContainer } from "react-toastify";



function App() {
  return (
    <>
    <Navbar />
    <AppRoutes />
    {/* ✅ ADDED: Only one ToastContainer for the entire app */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
