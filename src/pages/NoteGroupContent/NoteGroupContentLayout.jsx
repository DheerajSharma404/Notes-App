import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";

//components
import SideBar from "../../components/SideBar/SideBar";

//styles
import "./NoteGroupContentLayout.css";

const NoteGroupContentLayout = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <>
      <div className='LayoutContainer'>
        {!isMobile && (
          <div className='sideBarWrapper'>
            <SideBar />
          </div>
        )}
        <div className='outletWrapper'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default NoteGroupContentLayout;
