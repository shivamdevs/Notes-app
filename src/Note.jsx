import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getNote } from "./firebase";
import lang from "./language";


function Note() {
    const notekey = useParams().noteid;
    const notesecret = useLocation().hash.slice(1);

    const [status, setStatus] = useState(lang.note.waiting);
    const [space, switchSpace] = useState("waiting");

    const [noteValue, setNoteValue] = useState("");
    const [noteError, setNoteError] = useState("Please wait while we get the note contents...");

    if (!notekey || !notesecret || !(notesecret.length === 8 || notesecret.length === 10)) return window.location.replace("/");
    window.history.replaceState({}, window.document.title, "/hidden#");

    const fetchNote = async () => {
        const data = await getNote(notekey, notesecret);
        console.log(data);

        return "";
    };
    fetchNote();
    return (
        <div className="noteapp">
            <div className="flex head">
                <div className="title">{status}</div>
                <Link to="/how-it-works" className="link">{lang.footer.howitworks}</Link>
            </div>
            {space === "waiting" && <>
                <div className="tip">{noteError}</div>
            </>}
            {space === "reveil" && <>
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