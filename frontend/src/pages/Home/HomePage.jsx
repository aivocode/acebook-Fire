import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./HomePage.css";

export const HomePage = () => {
  const { state } = useLocation();
  return (
    <div className="home">
      <div>{state}</div>
      <h1>Welcome to Acebook!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};
