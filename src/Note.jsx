import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Link, useLocation, useParams } from "react-router-dom";
import { getNote } from "./firebase";
import lang from "./language";


function Note() {
    const notekey = useParams().noteid;
    const notesecret = useLocation().hash.slice(1);

    const [status, setStatus] = useState(lang.note.waiting);
    const [space, switchSpace] = useState("waiting");

    const [noteData, setNoteData] = useState({});
    const [noteValue, setNoteValue] = useState("");
    const [noteError, setNoteError] = useState("Please wait while we get the note contents...");

    useEffect(() => {
        fetchNote();
    }, []);

    if (!notekey || !notesecret || !(notesecret.length === 8 || notesecret.length === 10)) return window.location.replace("/");
    //window.history.replaceState({}, window.document.title, "/hidden#");

    const createNoteContent = (data) => {
        switchSpace("reader");
        setStatus(lang.note.readnote);
        setNoteValue(data.note);
        setNoteData(data);
    };

    const fetchNote = async () => {
        const docRef = await getNote(notekey, notesecret);
        if (docRef.status === "failed") {
            switchSpace("failed");
            setStatus(lang.note.failed);
            setNoteError(docRef.message);
            return;
        }
        const data = docRef.message;
        console.log(data);
        if (data.passkey === notesecret) {
            switchSpace("destroy");
            setStatus(lang.note.destroy);
            return;
        }
        if (data.destruct === "reading" && data.warn === true) {
            switchSpace("warning");
            setStatus(lang.note.warning);
            return;
        }
        createNoteContent(data);
    };
    // fetchNote();

    const backToHome = () => {
        window.location.replace("/");
    };
    const destroyNote = async () => {
        //const data = await deleteNote(notekey);
    };
    return (
        <div className="noteapp">
            <div className="flex head">
                <div className="title">{status}</div>
                <Link to="/how-it-works" className="link">{lang.footer.howitworks}</Link>
            </div>
            {(space === "waiting" || space === "failed") && <>
                <div className="tip">{noteError}</div>
            </>}
            {space === "destroy" && <>
                <div className="tip">You are about to destroy a Note with id: <b>{notekey}</b></div>
                <div className="flexgap">
                    <button className="button destroy" type="button" onClick={destroyNote}>Yes, proceed to destroy</button>
                    <button className="button submit" type="button" onClick={backToHome}>No, back to home</button>
                </div>
            </>}
            {space === "reader" && <>
                <div className="created reject">
                    <div className="upper bound">This note will be destoyed in: <span className="lower bound"><Countdown date={noteData.expiring} /></span></div>
                </div>
                <div className="noter">
                    <textarea
                        name="note"
                        id="note"
                        className="notepad"
                        placeholder={lang.home.placeholder}
                        value={noteValue}
                        readOnly={true}
                    />
                </div>
            </>}
        </div>
    );
};

export default Note;