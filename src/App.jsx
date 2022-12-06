import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Home from './Home';


function App(props) {
    return (
        <div className="app">
            <BrowserRouter>
                <Header />
                <main className="main">
                    <div className="cover">
                        <Routes>
                            <Route path='/note' element={<>{/*<MyNotes />*/}</>} />
                            <Route path='/note/:noteid' element={<>Note</>} />
                            <Route path='/' exact element={<Home />} />
                        </Routes>
                    </div>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;

