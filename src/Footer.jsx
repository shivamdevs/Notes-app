import { Link } from "react-router-dom";
import Select from "react-select";

import lang, { options, selected, update, current } from "./language";


function Footer() {
    const updatelanguage = (option) => {
        if (option.value === current) return;
        if (update(option.value)) {
            window.location.reload();
        } else {
            console.error("Couldn't update language: Option value doesn't match with the database.");
        }
    };
    return (
        <footer className="footer">
            <div className="cover">
                <div className="flex">
                    <div className="col">
                        <div className="copy">© ShivamDevs 2022</div>
                        <div className="version"><span>{lang.footer.version}:</span> 1.0.0</div>
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
                        <Select
                            name="language"
                            id="language"
                            className="select"
                            defaultValue={selected}
                            onChange={updatelanguage}
                            options={options}
                        />
                        <Link to="/translation">{lang.footer.translation}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;