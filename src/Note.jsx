import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


function Note() {
    const notekey = useParams().noteid;
    const notesecretgot = useLocation().hash.slice(1);
    useEffect(() => {
        window.history.replaceState({}, window.document.title, "/hidden#");
    }, []);
    return (
        <div>Note id: {notekey} key: {notesecretgot}</div>
    );
};

export default Note;