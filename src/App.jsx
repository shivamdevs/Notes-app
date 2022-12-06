import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";


function App(props) {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/note' element={<>My Note</>} />
                    <Route path='/note/:noteid' element={<>Note</>} />
                    <Route path='/' exact element={<>Home Component</>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;

