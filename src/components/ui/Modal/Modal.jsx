import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Colors, theme } from "../../../constants";

//styles
import "./Modal.css";
// eslint-disable-next-line
const Modal = ({ toggleModal, actionType, action }) => {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState(Colors.YELLOW);
  const [selectedColor, setSelectedColor] = React.useState(Colors.YELLOW);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsDisabled(e.target.value === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    action(name, color);
  };

  const handleChooseColor = (e) => {
    setColor(e.target.getAttribute("value"));
    setSelectedColor(e.target.getAttribute("value"));
  };

  return (
    <div className='modal'>
      <div className='modalOverlay' onClick={toggleModal}></div>
      <div className='modalContent'>
        <h1 className='modalHeading'>
          {actionType === "create"
            ? "Create new group"
            : "Choose new group name and color"}
        </h1>
        <div className='closeBtn' onClick={toggleModal} title='Close'>
          <IoIosCloseCircleOutline />
        </div>
        <form>
          <label htmlFor='groupName'>
            Group Name : &nbsp;
            <input
              title='Group Name'
              type='text'
              id='groupName'
              name="groupName"
              value={name}
              placeholder='Group Name'
              onChange={handleNameChange}
              autoFocus
            />{" "}
          </label>
          <label htmlFor='color'>
            <p>Choose Color : </p>
            <div
              className='colorRingWrapper'
              onClick={handleChooseColor}
              id='color'
            >
              {theme.map((color) => (
                <div
                  key={color}
                  className={`colorRing ${color.toLowerCase()} ${
                    selectedColor === Colors[color] ? "selected" : ""
                  }`}
                  value={Colors[color]}
                ></div>
              ))}
            </div>
          </label>
          <button
            disabled={isDisabled}
            type='submit'
            className={`createGroupBtn ${isDisabled ? "disabled" : ""}`}
            onClick={handleSubmit}
          >
            {actionType === "create" ? "Create" : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
