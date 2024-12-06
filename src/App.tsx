import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import AppRoutes from "@/router/Routes";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import store from "./redux/store";
import "./App.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <div>
            <ToastContainer />
            <Header />
            <AppRoutes />
            <Footer />
          </div>
        </Router>
      </Provider>
    </>
  );
};

export default App;
