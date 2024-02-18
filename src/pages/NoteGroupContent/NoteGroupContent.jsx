import React from "react";
import { FaPencil } from "react-icons/fa6";
import { IoIosArrowBack, IoMdMore } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "../../contexts/ModalContext";
import { NoteGroupsContext } from "../../contexts/NoteGroupsContext";
import { getTimestamp } from "../../utils";

//components
import Notes from "../../components/Notes/Notes";
import Modal from "../../components/ui/Modal/Modal";
import NoteGroupNotFound from "/assets/images/NoteGroupNotFound.svg";
import NotesNotFound from "/assets/images/NotesNotFound.svg";

import "./NoteGroupContent.css";

const NoteGroupContent = () => {
  const { noteGroups, setNoteGroups } = React.useContext(NoteGroupsContext);
  const { isModalOpen, toggleModal, actionType, setActionType } =
    React.useContext(ModalContext);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [note, setNote] = React.useState("");
  const [isMoreOption, setIsMoreOption] = React.useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const noteGroup = noteGroups.find((group) => group.id === id);
  // eslint-disable-next-line no-unsafe-optional-chaining
  const reverseNotes = noteGroup?.notes?.slice().reverse();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleClick = () => {
    setActionType("edit");
    toggleModal();
  };
  const handleMoreOptionClick = () => {
    setIsMoreOption(!isMoreOption);
  };

  React.useEffect(() => {
    if (note?.trim() === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [note]);

  const handleNote = () => {
    if (note.trim() === "") {
      return;
    }
    const newNote = {
      id: uuidv4(),
      title: `${note.split(" ").slice(0, 3).join(" ")}...`,
      content: note,
      createdAt: new Date(),
    };
    // Push the newNote to the notes array of the noteGroup
    noteGroup.notes.push(newNote);
    // Update the noteGroup in the noteGroups array
    const updatedNoteGroups = noteGroups.map((group) =>
      group.id === id ? noteGroup : group
    );

    // Write the updatedNoteGroups back to local storage
    localStorage.setItem("noteGroups", JSON.stringify(updatedNoteGroups));
    setNote("");
  };

  const handleNotesGroup = (name, color) => {
    const newNoteGroup = {
      id: uuidv4(),
      groupName: name,
      notes: [],
      color,
      createdAt: new Date(),
    };
    if (noteGroups.some((group) => group.groupName === name)) {
      alert("Group name already exists");
      return;
    }
    setNoteGroups([...noteGroups, newNoteGroup]);
    toggleModal();
    navigate(`/groups/${newNoteGroup.id}`);
  };

  const handleEdit = (newName, newColor) => {
    const noteGroup = {
      ...noteGroups.find((group) => group.id === id),
      groupName: newName,
      color: newColor,
    };

    const updatedNoteGroups = noteGroups.map((group) =>
      group.id === id ? noteGroup : group
    );
    setNoteGroups(updatedNoteGroups);
    localStorage.setItem("noteGroups", JSON.stringify(updatedNoteGroups));
    toggleModal();
  };

  React.useEffect(() => {
    if (noteGroups.length > 0 && !noteGroups.find((group) => group.id === id)) {
      navigate(`/groups/${noteGroups[0].id}`);
    }
  }, [noteGroups, id, navigate]);

  const handleDelete = () => {
    const updatedNoteGroups = noteGroups?.filter((group) => group?.id !== id);
    setNoteGroups(updatedNoteGroups);
    localStorage.setItem("noteGroups", JSON.stringify(updatedNoteGroups));
    if (
      updatedNoteGroups.length > 0 &&
      !updatedNoteGroups.find((group) => group.id === id)
    ) {
      navigate(`/groups/${updatedNoteGroups[0].id}`);
    }
  };
  return (
    <div className='NoteGroupContentContainer'>
      {noteGroups?.length === 0 ? (
        <>
          <div className='NoteGroupNotFoundImgWrapper'>
            <img
              src={NoteGroupNotFound}
              alt='Note group not found'
              className='NoteGroupNotFoundImg'
            />
            <p className='NoteGroupNotFoundText'>No group found</p>
            {/* note taking qoutes */}

            <p
              className='NoteGroupNotFoundText'
              style={{ fontSize: "1rem", textAlign: "center", whiteSpace: "pre" }}
            >
              <span style={{ fontSize: "1.5rem" }}>&ldquo;</span>
              <em>When your heart speaks, take good notes.</em>
              <span style={{ fontSize: "1.5rem" }}>&rdquo;</span>
              <br />- Judith Exner
            </p>
            <div className='mobileAddBtnWrapper'>
              <button className='mobileAddBtn' onClick={toggleModal}>
                Add Group
              </button>
            </div>
          </div>
          {actionType === "create" && isModalOpen && (
            <Modal
              toggleModal={toggleModal}
              actionType={actionType}
              action={handleNotesGroup}
            />
          )}
        </>
      ) : (
        <>
          <header className='header'>
            <div className='heading'>
              {isMobile && (
                <div>
                  <NavLink to='/' className='backBtn' title='Back'>
                    <IoIosArrowBack />
                  </NavLink>
                </div>
              )}
              <div
                className='groupInitial'
                style={{ background: noteGroup?.color }}
              >
                {noteGroup?.groupName
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])}
              </div>
              <div className='headerTextWrapper'>
                <h2 className='groupName'>{noteGroup?.groupName}</h2>
                <p className='NotesHeadingCreatedAtText'>{`${getTimestamp(
                  new Date(noteGroup?.createdAt)
                )} `}</p>
              </div>
            </div>
            {isMobile ? (
              <div
                className='mobileOptionIconWrapper'
                onClick={handleMoreOptionClick}
              >
                <IoMdMore className='mobileOptionIcon' />

                {isMoreOption && (
                  <div className='moreOptionWraper'>
                    <div
                      className='mobileEditIconWrapper'
                      onClick={handleClick}
                      title='Edit Group'
                    >
                      <FaPencil className='editIcon' />
                      <p>Edit</p>
                    </div>
                    <div
                      className='mobileDeleteIconWrapper'
                      onClick={handleDelete}
                      title='Delete Group'
                    >
                      <IoTrashBin className='deleteIcon' />
                      <p>Delete</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='headerIconWrapper'>
                <div
                  className='editIconWrapper'
                  onClick={handleClick}
                  title='Edit Group'
                >
                  <FaPencil className='editIcon' />
                </div>
                <div
                  className='deleteIconWrapper'
                  onClick={handleDelete}
                  title='Delete Group'
                >
                  <IoTrashBin />
                </div>
              </div>
            )}
          </header>
          <main className='main'>
            {reverseNotes?.length === 0 ? (
              <div className='noNotesFoundImgWrapper'>
                <img
                  src={NotesNotFound}
                  alt='Notes Not found'
                  className='noNoteFoundImg'
                />
                <p className='noNoteFoundText'>No notes found</p>
              </div>
            ) : (
              reverseNotes.map((note) => (
                <div key={note.id} className='notes'>
                  <Notes note={note} />
                </div>
              ))
            )}
          </main>
          <footer className='footer'>
            <div className='noteInputWrapper'>
              <textarea
                type='text'
                placeholder='Create notes'
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button
                title='Add Note'
                disabled={isDisabled}
                type='button'
                className={`addNoteBtn ${isDisabled ? "disabled" : ""}`}
                onClick={handleNote}
              >
                Add
              </button>
            </div>
          </footer>
        </>
      )}
      <div className='credit'>
        {" "}
        &copy; 2024 Design and Developed by{" "}
        <span>
          {" "}
          <NavLink to='https://github.com/DheerajSharma404' className='navLink'>
            {" "}
            Dheeraj Sharma
          </NavLink>{" "}
        </span>
      </div>
      {actionType === "edit" && isModalOpen && (
        <Modal
          toggleModal={toggleModal}
          actionType={actionType}
          action={handleEdit}
        />
      )}
    </div>
  );
};

export default NoteGroupContent;
