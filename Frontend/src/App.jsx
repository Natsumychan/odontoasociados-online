import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global-styles.css";
import "@fontsource/arimo";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
	      position="top-right"
	      autoClose={3000}
	      hideProgressBar={false}
	      newestOnTop
	      closeOnClick
	      pauseOnHover
	      theme="colored"
      />
    </>
  );
}

export default App;
