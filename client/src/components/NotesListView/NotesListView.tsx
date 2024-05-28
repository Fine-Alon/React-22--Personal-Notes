import "./NotesListView.css";
import {NoteView} from "../NoteView";
import {useGetNoteList} from "../../api/NoteList.ts";
import {Loader} from "../Loader";
import {Button} from "../Button";

export const NotesListView = () => {

    const {
        noteList,
        status,
        handlePrevPage, handleNextPage, page
    } = useGetNoteList('api/notes/', '4')

    switch (status) {
        case 'pending':
            return <Loader/>
        case 'error':
            return <span>"ERROR"</span>
        case 'success':
            return (<div className={'note-list-box'}>
                    <ul className="note-list-view">
                        {noteList && noteList.list.map(note =>
                            <li key={note.id}><NoteView title={note.title}
                                                        createdAt={note.createdAt} id={note.id}
                                                        text={note.text} userId={note.userId}/></li>)}
                    </ul>
                    <div className={'note-list-pagination'}>
                        <Button onClick={handlePrevPage} isDisabled={page < 1}>Prev</Button>
                        <span style={{display:'flex',alignItems:'center'}}>{page + 1}</span>
                        <Button onClick={handleNextPage}
                                isDisabled={(page >= (noteList?.pageCount || 0) - 1)}>
                            Next</Button>
                    </div>
                </div>
            );
        default:
            return null
    }
};
