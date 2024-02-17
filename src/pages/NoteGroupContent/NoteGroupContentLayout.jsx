import { Outlet } from "react-router-dom";

//components
import SideBar from "../../components/SideBar/SideBar";

//styles
import "./NoteGroupContentLayout.css";

const NoteGroupContentLayout = () => {
  return (
    <>
      <div className='LayoutContainer'>
        <div className='sideBarWrapper'>
          <SideBar />
        </div>
        <div className='outletWrapper'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NoteGroupContentLayout;
