import { NavLink } from "react-router-dom";

//styles
import "./DevInfo.css";


const DevInfo = () => {
  return (
    <div className='homeCredit'>
      <p className='creditText'>
        &copy; 2024 Design and Developed by&nbsp;
        <NavLink to='https://github.com/DheerajSharma404' className='navLink'>
          {" "}
          Dheeraj Sharma
        </NavLink>{" "}
      </p>
    </div>
  );
};

export default DevInfo;
