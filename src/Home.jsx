import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { addNote } from "./firebase";

import lang from "./language";

function Home() {
    const noteLinkValue = useRef(null);
    const [space, switchSpace] = useState("new");
    const [customoptions, switchOptions] = useState(false);
    const [status, setStatus] = useState(lang.home.newnote);
    const [copyButton, setCopyButton] = useState(lang.home.copy);
    
    const [creationError, setCreationError] = useState("");
    const [creationValue, setCreationValue] = useState("");
    
    const [notekey, setNoteKey] = useState("");
    const [notePass, setNotePass] = useState("");
    const [noteLife, setNoteLife] = useState("");
    const [noteSecret, setNoteSecret] = useState("");
    
    let optionSavedWarning = true;
    let optionSavedReference = "";
    let optionSavedEncryption = "";
    let optionSavedSelfdestruct = {label: "reading", value: 'reading'};
    
    if (window.localStorage) {
        if (window.localStorage.getItem("note-warning") !== null) optionSavedWarning = window.localStorage.getItem("note-warning") === 'true';
        if (window.localStorage.getItem("note-reference") !== null) optionSavedReference = window.localStorage.getItem("note-reference");
        if (window.localStorage.getItem("note-encryption") !== null) optionSavedEncryption = window.localStorage.getItem("note-encryption");
        if (window.localStorage.getItem("note-selfdestruct") !== null) optionSavedSelfdestruct = JSON.parse(window.localStorage.getItem("note-selfdestruct"));
    }
    
    const [customoptionwarning, switchOptionWarning] = useState((optionSavedSelfdestruct.value === "reading"));
    const [optionWarning, setOptionWarning] = useState(optionSavedWarning);
    const [optionReference, setOptionReference] = useState(optionSavedReference);
    const [optionEncryption, setOptionEncryption] = useState(optionSavedEncryption);
    const [optionSelfdestruct, setOptionSelfdestruct] = useState(optionSavedSelfdestruct);

    const updateWarning = ({target}) => {setOptionWarning(target.checked)};
    const updateReference = ({target}) => {setOptionReference(target.value)};
    const updateEncryption = ({target}) => {setOptionEncryption(target.value)};
    const updateSelfdestruct = (option) => {setOptionSelfdestruct(option); switchOptionWarning((option.value === "reading"));};
    const updateNoteValue = ({target}) => {setCreationValue(target.value)};

    const createNote = async () => {
        setCreationError("");

        const note = creationValue;
        const warning = !customoptions ? true : customoptionwarning ? false : optionWarning;
        const reference = customoptions ? optionReference : "";
        const encryption = customoptions ? optionEncryption : "";
        const selfdestruct = customoptions ? optionSelfdestruct : {label: "reading", value: 'reading'};

        if (note.trim() === "") return setCreationError("Error: The note text is empty.");

        if (window.localStorage) {
            window.localStorage.setItem("note", note);
            window.localStorage.setItem("note-warning", warning);
            window.localStorage.setItem("note-reference", reference);
            window.localStorage.setItem("note-encryption", encryption);
            window.localStorage.setItem("note-selfdestruct", JSON.stringify(selfdestruct));
        }

        switchSpace("processing");
        setStatus(lang.home.processing);

        const data = await addNote(note, warning, reference, encryption, selfdestruct);
        if (data.status === "failed") {
            setCreationError(data.message);
            setStatus(lang.home.failed);
            switchSpace("failed");
            return;
        }

        setNoteKey(data.message.id);
        setNotePass(data.message.passkey);
        setNoteSecret(data.message.secret);
        setNoteLife(selfdestruct.label);

        switchSpace("created");
        setStatus(lang.home.created);
    };
    const updateNote = () => {
        setStatus(lang.home.editnote);
        switchSpace("new");
    };
    const newNote = () => {
        window.location.reload();
    };
    const copyNoteLink = () => {
        noteLinkValue.current.select();
        window.document.execCommand("copy");
        setCopyButton(lang.home.copied);
        setTimeout(() => {
            setCopyButton(lang.home.copy);
        }, 500);
    };

    const optionsSwitch = () => {
        switchOptions(opt => {
            if (opt) {
                setOptionWarning(optionSavedWarning);
                setOptionReference(optionSavedReference);
                setOptionEncryption(optionSavedEncryption);
                setOptionSelfdestruct(optionSavedSelfdestruct);
                switchOptionWarning((optionSavedSelfdestruct.value === "reading"));
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
            {space === "new" && <>
                <div className="noter">
                    <textarea
                        name="note"
                        id="note"
                        className="notepad"
                        placeholder={lang.home.placeholder}
                        defaultValue={creationValue}
                        onChange={updateNoteValue}
                        autoFocus={true}
                    />
                </div>
                <div className="tip error center">{creationError}</div>
            </>}
            {space === "new" && customoptions && <>
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
                            {customoptionwarning && <>
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
                                    Show warning before opening note.
                                </label>
                            </>}
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
            {space === "new" && <>
                <div className="flex">
                    <button className="submit button" onClick={createNote} type="button">Create note</button>
                    <button className="switch button" onClick={optionsSwitch} type="reset">{customoptions ? lang.home.resetoptions : lang.home.setoptions}</button>
                </div>
            </>}

            {space === "processing" && <>
                <div className="tip">Your note is being saved.</div>
            </>}

            {space === "failed" && <>
                <div className="tip">Failed to create new note. This happended due to the following error:</div>
                <div className="tip error">{creationError || "No error detected!"}</div>
                <div className="tip">You can edit and retry updating old note or Create a new note.</div>
                <div className="flex">
                    <button className="button switch" type="button" onClick={updateNote}>Edit note</button>
                    <button className="button submit" type="button" onClick={newNote}>Create new note</button>
                </div>
            </>}

            {space === "created" && <>
                <div className="created">
                    <div className="upper bound">Link to your note:</div>
                    <input
                        ref={noteLinkValue}
                        className="key"
                        type="text"
                        name="notekey"
                        id="notekey"
                        readOnly={true}
                        value={`${window.location.origin}/note/${notekey}#${noteSecret}`}
                    />
                    <div className="lower bound">This note will self destruct after {noteLife}.</div>
                </div>
                <div className="flex">
                    <div className="flexblock">
                        <button className="button switch" type="button" onClick={copyNoteLink}>{copyButton}</button>
                    </div>
                    <div className="flex">
                        <div className="flexgap">
                            <Link to={`/note/${notekey}#${noteSecret}`} className="button submit" type="button">Open note</Link>
                            {noteLife === "reading" && <Link to={`/note/${notekey}#${notePass}`} className="button destroy" type="button">Destroy note</Link>}
                        </div>
                        <div className="flexblock">
                            <button className="button newnote" type="button" onClick={newNote}>Create new Note</button>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    );
};


const selfdestruct = [
    {
        label: "reading",
        value: 'reading'
    },
    {
        label: '1 hour',
        value: '1-hour'
    },
    {
        label: '2 hours',
        value: '2-hours'
    },
    {
        label: '3 hours',
        value: '3-hours'
    },
    {
        label: '6 hours',
        value: '6-hours'
    },
    {
        label: '12 hours',
        value: '12-hours'
    },
    {
        label: '24 hours',
        value: '24-hours'
    },
    {
        label: '7 days',
        value: '7-days'
    },
    {
        label: '30 days',
        value: '30-days'
    }
];

export default Home;