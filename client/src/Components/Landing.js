import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { config } from "../utils/config";
import ActDropdown from "./ActDropdown.js";

const Landing = () => {
  const userToken = useSelector((store) => store.user.userToken);
  const userDetails = useSelector((store) => store.user.userData);
  const redirect = useNavigate();

  useEffect(() => {
    if (!userToken) {
      redirect("/");
    }
  });
  return (
    userDetails && (
      <div>
        <div>
          <h1>Welcome, {userDetails.displayName}</h1>
        </div>
        <div>
          <ActDropdown loggedInUser={userDetails.emailAddress} />
        </div>
      </div>
    )
  );
};

export default Landing;
