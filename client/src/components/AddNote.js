import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AlertContext from "../context/alerts/AlertContext";

export const AddNote = () => {
  const { showAlert } = useContext(AlertContext);
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (note.title === "" || note.description === "") {
      showAlert("Note has not been added successfully!", "danger");
    } else {
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
      showAlert("Note has been added successfully!", "success");
    }
  };

  return (
    <>
      <div className="container">
        <div className="container addNotes">
          <h2 className="pb-4 pt-5">Add Notes</h2>
          <form className="my-3">
            <div className="mb-4">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter your title must be 5 characters"
                value={note.title}
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter your description muse be 8 charcaters"
                value={note.description}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                placeholder="General"
                value={note.tag}
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleAddNote}
            >
              Add Note
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
