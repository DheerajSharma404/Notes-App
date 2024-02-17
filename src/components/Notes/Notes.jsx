/* eslint-disable react/prop-types */
import React from "react";
import { IoTrashBin } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { NoteGroupsContext } from "../../contexts/NoteGroupsContext";
import { formatTime, getJoinedDate } from "../../utils";

//styles
import "./Notes.css";

//eslint-disable-next-line
const Notes = ({ note }) => {
  const { noteGroups, setNoteGroups } = React.useContext(NoteGroupsContext);
  const { id } = useParams();

  const handleDelete = () => {
    const noteGroup = noteGroups.find((group) => group.id === id);
    const updatedNotes = noteGroup.notes.filter((n) => n.id !== note.id);
    const updatedNoteGroups = noteGroups.map((group) =>
      group.id === id ? { ...group, notes: updatedNotes } : group
    );
    // Write the updatedNoteGroups back to local storage
    localStorage.setItem("noteGroups", JSON.stringify(updatedNoteGroups));
    setNoteGroups(updatedNoteGroups);
  };
  return (
    <div className='note'>
      <h3 className='noteTitle'>{note.title}</h3>
      <p className='noteContent'>{note.content}</p>
      <div className='footerWrapper'>
        <p className='noteTimestamps'>{`${formatTime(
          new Date(note.createdAt)
        )} ⋅ ${getJoinedDate(new Date(note.createdAt))} `}</p>
        <div className='NotesDeleteIconWrapper' onClick={handleDelete}>
          <IoTrashBin />
        </div>
      </div>
    </div>
  );
};

export default Notes;
