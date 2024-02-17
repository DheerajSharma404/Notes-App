import React from "react";
import { IoIosAdd } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "../../contexts/ModalContext";
import { NoteGroupsContext } from "../../contexts/NoteGroupsContext";
import { formatTime, getJoinedDate } from "../../utils";

//components
import DevInfo from "../../components/DevInfo/DevInfo";
import Modal from "../../components/ui/Modal/Modal";
import NoteGroupNotFound from "/assets/images/NoteGroupNotFound.svg";

//styles
import "./Homepage.css";

const Homepage = () => {
  const { noteGroups, setNoteGroups } = React.useContext(NoteGroupsContext);
  const { isModalOpen, toggleModal } = React.useContext(ModalContext);
  const navigate = useNavigate();

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

  React.useEffect(() => {
    localStorage.setItem("noteGroups", JSON.stringify(noteGroups));
  }, [noteGroups]);

  return (
    <>
      <div className='homeContainer'>
        <div className='headingWrapper'>
          <h1 className='headingText'>Notes</h1>
        </div>

        <div className='noteGroupsContainer'>
          {noteGroups.length === 0 ? (
            <div className='homeNotFoundImgWrapper'>
              <img
                src={NoteGroupNotFound}
                alt='Not found'
                className='homeNotFoundImg'
              />
              <p className='homeNotFoundText'>No groups found</p>
              <p className='homeNotFoundText' style={{ fontSize: "1rem" }}>
                Click the + button to add a new note group
              </p>
            </div>
          ) : (
            noteGroups?.map((group) => (
              <NavLink
                title={group.groupName}
                to={`/groups/${group.id}`}
                key={group.id}
                className='noteGroup'
                style={{ background: group.color }}
              >
                <p className='homeNotesGroupName'>{group.groupName}</p>
                <p className='homeCreatedAtText'>{`${formatTime(
                  new Date(group.createdAt)
                )} ⋅ ${getJoinedDate(new Date(group.createdAt))} 
      `}</p>
              </NavLink>
            ))
          )}
        </div>
        <div>
          <button
            className='homeAddNoteGroupBtn'
            onClick={toggleModal}
            title='Add Note Group'
          >
            <IoIosAdd />
          </button>
        </div>

        <footer>
          <DevInfo />
        </footer>
      </div>
      {isModalOpen && (
        <Modal
          toggleModal={toggleModal}
          actionType='create'
          action={handleNotesGroup}
        />
      )}
    </>
  );
};

export default Homepage;
