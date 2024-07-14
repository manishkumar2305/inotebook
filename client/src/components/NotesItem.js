import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alerts/AlertContext";

export const NotesItem = (props) => {
  const { showAlert } = useContext(AlertContext);
  const { deleteNote } = useContext(NoteContext);
  const { note, updateNote } = props;

  const [num, setNum] = useState(0);

  const randomNumber = () => {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.ceil(Math.random() * 10);
  };

  useEffect(() => {
    setNum(randomNumber());
  }, []);

  const deleteNoteHandle = () => {
    deleteNote(note._id);
    showAlert("Note has been deleted successfully!", "success");
  };

  return (
    <div className="col-md-6 notes-item">
      <div className={`card p-3 my-4 card-${num}`}>
        <div className={`card-body`}>
          <div className="d-flex justify-content-between">
            <h5 className="card-title" style={{ fontSize: "25px" }}>
              {note.title}
            </h5>
            <div className="action">
              <i
                className="fa-solid fa-trash mx-3"
                onClick={deleteNoteHandle}
              ></i>
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text" style={{ fontSize: "18px" }}>
            {note.description}
          </p>
          <p
            className="badge rounded-pill text-bg-danger pb-2 px-2"
            style={{ fontSize: "12px" }}
          >
            {note.tag}
          </p>
          <a
            href="/"
            className="btn btn-sm btn-primary d-block mt-2"
            style={{ width: "90px" }}
          >
            View Note
          </a>
        </div>
      </div>
    </div>
  );
};
