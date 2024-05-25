import "./NotesListView.css";
import {NoteView} from "../NoteView";
import {useGetNoteList} from "../../api/NoteList.ts";
import {Loader} from "../Loader";

export const NotesListView = () => {

    const {
        noteList,
        status
    } =  useGetNoteList('api/notes/')

    switch (status) {
        case 'pending':
            return <Loader/>
        case 'error':
            return <span>"ERROR"</span>
        case 'success':
            return (
                <ul className="note-list-view">
                    {noteList.list && noteList.list.map(note =>
                        <li key={note.id}><NoteView title={note.title}
                                                    createdAt={note.createdAt} id={note.id}
                                                    text={note.text} userId={note.userId}/></li>)}
                </ul>
            );
        default:
            return null
    }
};
