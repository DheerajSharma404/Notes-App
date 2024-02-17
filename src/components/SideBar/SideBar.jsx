import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "../../contexts/ModalContext";
import { NoteGroupsContext } from "../../contexts/NoteGroupsContext";
import NoteGroupNotFound from "/assets/images/NoteGroupNotFound.svg";

//components
import Modal from "../ui/Modal/Modal";

//styles
import "./SideBar.css";

const SideBar = () => {
  const { noteGroups, setNoteGroups } = React.useContext(NoteGroupsContext);
  const { isModalOpen, toggleModal, actionType, setActionType } =
    React.useContext(ModalContext);
  const location = useLocation();
  const navigate = useNavigate();

  const noteGroupRefs = React.useRef({});

  const handleClick = () => {
    setActionType("create");
    toggleModal();
  };

  const handleNotesGroup = (name, color) => {
    const newNoteGroup = {
      id: uuidv4(),
      groupName: name,
      notes: [],
      color,
      createdAt: new Date(),
    };
    noteGroupRefs.current[newNoteGroup.id] = React.createRef();
    if (noteGroups.some((group) => group.groupName === name)) {
      alert("Group already exists");
      return;
    }
    setNoteGroups([...noteGroups, newNoteGroup]);
    toggleModal();
    navigate(`/groups/${newNoteGroup.id}`);
  };

  React.useEffect(() => {
    const groupId = location.pathname.split("/")[2]; // Get the group id from the URL
    if (groupId && noteGroupRefs.current[groupId]) {
      const groupElement = noteGroupRefs.current[groupId]; // Get the group element
      const rect = groupElement.getBoundingClientRect(); // Get the position of the group
      // Check if the group is in the viewport
      const isInViewPort =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      if (!isInViewPort) {
        groupElement.scrollIntoView({
          behavior: "smooth",
        }); // Scroll to the active group
      }
    }
  }, [location]);

  React.useEffect(() => {
    localStorage.setItem("noteGroups", JSON.stringify(noteGroups));
  }, [noteGroups]);

  return (
    <>
      <div className='sidebar'>
        <div className='sidebarNotesHeading'>
          <NavLink title='Back' to='/' className='sideBarNavLink'>
            <BsArrowLeft />
          </NavLink>
          <h1>Notes</h1>
        </div>

        <div className='sidebarNotesGroupList'>
          {noteGroups?.length === 0 ? (
            <div className='sidebarNotFoundImgWrapper'>
              <img
                src={NoteGroupNotFound}
                alt='Not found'
                className='sidebarNotFoundImg'
              />
              <p className='sidebarNotFoundText'>No groups found</p>
              <p className='sidebarNotFoundText' style={{ fontSize: "1rem" }}>
                Click the + button to add a new note group
              </p>
            </div>
          ) : (
            noteGroups?.map((group) => (
              <NavLink
                title={group.groupName}
                to={`/groups/${group.id}`}
                key={group.id}
                ref={(el) => (noteGroupRefs.current[group.id] = el)}
                className={`sidebarGroup ${
                  location.pathname === `/groups/${group.id}`
                    ? "sidebarActiveGroup"
                    : ""
                }`}
              >
                <div
                  className='sidebarGroupInitial'
                  style={{ background: group.color }}
                >
                  {group?.groupName
                    ?.split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])}
                </div>
                <p className='sidebarGroupName'>{group.groupName}</p>
              </NavLink>
            ))
          )}
        </div>
        <div
          className='sidebarAddGroupWrapper'
          onClick={handleClick}
          title='Add Note Group'
        >
          <IoIosAdd />
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
  );
};

export default SideBar;
