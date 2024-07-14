import React from 'react';
import { AddNote } from './AddNote';
import { Notes } from './Notes';

export default function Home() {
  return (
    <>
      <AddNote />
      <div className="container addNotes">
        <h2 className='pb-4 pt-5'>Your Notes</h2>
        <Notes />
      </div>
    </>
  )
}
