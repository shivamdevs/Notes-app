import { Link } from "react-router-dom";

import lang from "./language";


function Footer() {

    return (
        <footer className="footer">
            <div className="cover">
                <div className="flex">
                    <div className="col">
                        <div className="copy">Private Note</div>
                        <div className="copy">© ShivamDevs 2022</div>
                    </div>
                    <div className="col">
                        <Link to="/how-it-works">{lang.footer.howitworks}</Link>
                        <Link to="/faq">{lang.footer.faqs}</Link>
                        <Link to="/support">{lang.footer.support}</Link>
                    </div>
                    <div className="col">
                        <Link to="/changelog">{lang.footer.updates}</Link>
                        <Link to="/request">{lang.footer.request}</Link>
                        <Link to="/social">{lang.footer.social}</Link>
                    </div>
                    <div className="col">
                        <Link to="/translation">{lang.footer.translation}</Link>
                        <div className="version"><span>{lang.footer.version}:</span> 1.0.0</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;