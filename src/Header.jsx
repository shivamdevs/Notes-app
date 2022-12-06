import { Link } from "react-router-dom";

import lang from "./language";


function Header() {
    return (
        <header className="header">
            <div className="cover">
                <div className="flex">
                    <div className="logo">
                        <Link to="/" className="icon">Private Note</Link>
                        <span className="tag">{lang.tagline}</span>
                    </div>
                    <div className="options">
                        <Link to="/note" className="button mine">{lang.header.mynotes}</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;