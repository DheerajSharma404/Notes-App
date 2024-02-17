import { NavLink } from "react-router-dom";
import Error from "/assets/images/Error.svg";

//styles
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className='errorContainer'>
      <img src={Error} alt='Not found Image' />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NavLink to='/' className='backToHome'>
        Back to Home
      </NavLink>
    </div>
  );
};

export default ErrorPage;
