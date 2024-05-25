import "./NoteView.css";
import {FC} from "react";
import {TypeSchemaNote} from "../../api/NoteList.ts";

const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const NoteView: FC<TypeSchemaNote> = ({id, title, text, userId, createdAt}) => {
    return (
        <div className="note-view">
            <div className="note-view__head">
                <p className="note-view__datetime">{formatDate(createdAt)}</p>
                <p className="note-view__title">{title}</p>
            </div>

            <p className="note-view__text">
                {text}
            </p>
        </div>
    );
};
