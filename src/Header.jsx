import Select from "react-select";

import lang, { options, selected, update, current } from "./language";


function Header() {
    const updatelanguage = (option) => {
        if (option.value === current) return;
        if (update(option.value)) {
            window.location.reload();
        } else {
            console.error("Couldn't update language: Option value doesn't match with the database.");
        }
    };
    return (
        <header className="header">
            <div className="cover">
                <div className="flex">
                    <div className="logo">
                        <a href="/" className="icon">Private Note</a>
                        <span className="tag">{lang.tagline}</span>
                    </div>
                    <div className="options">
                        <Select
                            name="language"
                            id="language"
                            className="select"
                            defaultValue={selected}
                            onChange={updatelanguage}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;