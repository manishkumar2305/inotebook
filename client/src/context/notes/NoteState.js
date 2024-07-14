import React, { useState } from "react";
import NoteContext from "./NoteContext";
import {BASE_URL} from "../../services/helper";

const NoteState = (props) => {
  const intialNotes = [];
  const [notes, setNotes] = useState(intialNotes);

  // Get all Notess
  const getAllNotes = async () => {
    // API Call for get all notes
    const response = await fetch(`${BASE_URL}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    // API Call for add a note
    const response = await fetch(`${BASE_URL}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API Call for edit a note
    const response = await fetch(`${BASE_URL}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNote = JSON.parse(JSON.stringify(notes));
    // Logic to edit note in client
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  // Delete Note
  const deleteNote = async (id) => {
    // API Call for delete a note
    const response = await fetch(`${BASE_URL}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
