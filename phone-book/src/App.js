import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import ContactForm from "./Components/ContactForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/addcontact"} element={<ContactForm />} />
                <Route path={"/editcontact/:id"} element={<ContactForm />} />
            </Routes>
        </Router>
    );
}

export default App;
