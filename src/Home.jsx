import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

import lang from "./language";

function Home() {
    const [space, switchSpace] = useState(true);
    const [customoptions, switchOptions] = useState(false);
    const [status, setStatus] = useState(lang.home.newnote);

    let optionSavedWarning = true;
    let optionSavedReference = "";
    let optionSavedEncryption = "";
    let optionSavedSelfdestruct = {label: lang.home.selfdestruct.reading, value: 'reading'};

    if (window.localStorage) {
        if (window.localStorage.getItem("note-warning") !== null) optionSavedWarning = window.localStorage.getItem("note-warning") === 'true';
        if (window.localStorage.getItem("note-reference") !== null) optionSavedReference = window.localStorage.getItem("note-reference");
        if (window.localStorage.getItem("note-encryption") !== null) optionSavedEncryption = window.localStorage.getItem("note-encryption");
        if (window.localStorage.getItem("note-selfdestruct") !== null) optionSavedSelfdestruct = JSON.parse(window.localStorage.getItem("note-selfdestruct"));
    }

    const [optionWarning, setOptionWarning] = useState(optionSavedWarning);
    const [optionReference, setOptionReference] = useState(optionSavedReference);
    const [optionEncryption, setOptionEncryption] = useState(optionSavedEncryption);
    const [optionSelfdestruct, setOptionSelfdestruct] = useState(optionSavedSelfdestruct);

    const updateWarning = ({target}) => {setOptionWarning(target.checked)};
    const updateReference = ({target}) => {setOptionReference(target.value)};
    const updateEncryption = ({target}) => {setOptionEncryption(target.value)};
    const updateSelfdestruct = (option) => {setOptionSelfdestruct(option)};

    const createNote = () => {
        const warning = customoptions ? optionWarning : true;
        const reference = customoptions ? optionReference : "";
        const encryption = customoptions ? optionEncryption : "";
        const selfdestruct = customoptions ? optionSelfdestruct : {label: lang.home.selfdestruct.reading, value: 'reading'};

        if (window.localStorage) {
            window.localStorage.setItem("note-warning", warning);
            window.localStorage.setItem("note-reference", reference);
            window.localStorage.setItem("note-encryption", encryption);
            window.localStorage.setItem("note-selfdestruct", JSON.stringify(selfdestruct));
        }

        switchOptions(false);
    };

    const optionsSwitch = () => {
        switchOptions(opt => {
            if (opt) {
                setOptionWarning(optionSavedWarning);
                setOptionReference(optionSavedReference);
                setOptionEncryption(optionSavedEncryption);
                setOptionSelfdestruct(optionSavedSelfdestruct);
            }
            return !opt;
        });
    };

    return (
        <div className="noteapp">
            <div className="flex head">
                <div className="title">{status}</div>
                <Link to="/how-it-works" className="link">{lang.footer.howitworks}</Link>
            </div>
            <div className="noter">
                <textarea name="note" id="note" className="notepad" placeholder={lang.home.placeholder}></textarea>
            </div>
            {customoptions && <>
                <div className="options">
                    <div className="flex">
                        <div className="flexblock">
                            <div className="label">Self-destruct after</div>
                            <Select
                                name="selfdestruct"
                                id="selfdestruct"
                                className="option"
                                options={selfdestruct}
                                defaultValue={optionSavedSelfdestruct}
                                onChange={updateSelfdestruct}
                            />
                        </div>
                        <div className="flexblock">
                            <div className="label">Self-destruct warning</div>
                            <label htmlFor="warning" className="reallabel">
                                <input
                                    className="input"
                                    type="checkbox"
                                    name="warning"
                                    id="warning"
                                    defaultChecked={optionSavedWarning}
                                    onChange={updateWarning}
                                />
                                Show warning before opening note
                            </label>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flexblock">
                            <div className="label">Encrypt with password</div>
                            <input
                                type="password"
                                autoComplete="new-password"
                                className="input"
                                name="encrypt"
                                id="encrypt"
                                onChange={updateEncryption}
                                defaultValue={optionSavedEncryption}
                            />
                        </div>
                        <div className="flexblock">
                            <div className="label">Name for reference</div>
                            <input
                                type="text"
                                autoComplete="name"
                                name="reference"
                                className="input"
                                id="reference"
                                onChange={updateReference}
                                defaultValue={optionSavedReference}
                            />
                        </div>
                    </div>
                    <div className="tip">Note: These values are saved and updated automatically on every note creation.</div>
                </div>
            </>}
            <div className="flex">
                <button className="submit button" onClick={createNote} type="button">Create note</button>
                <button className="switch button" onClick={optionsSwitch} type="reset">{customoptions ? lang.home.resetoptions : lang.home.setoptions}</button>
            </div>
        </div>
    );
};


const selfdestruct = [
    {
        label: lang.home.selfdestruct.reading,
        value: 'reading'
    },
    {
        label: '1 ' + lang.home.selfdestruct.hour,
        value: '1-hour'
    },
    {
        label: '2 ' + lang.home.selfdestruct.hours,
        value: '2-hours'
    },
    {
        label: '3 ' + lang.home.selfdestruct.hours,
        value: '3-hours'
    },
    {
        label: '6 ' + lang.home.selfdestruct.hours,
        value: '6-hours'
    },
    {
        label: '12 ' + lang.home.selfdestruct.hours,
        value: '12-hours'
    },
    {
        label: '24 ' + lang.home.selfdestruct.hours,
        value: '24-hours'
    },
    {
        label: '7 ' + lang.home.selfdestruct.days,
        value: '7-days'
    },
    {
        label: '30 ' + lang.home.selfdestruct.days,
        value: '30-days'
    }
];

export default Home;