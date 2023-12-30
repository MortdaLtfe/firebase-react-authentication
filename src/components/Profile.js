import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.js";
import { useNavigate, NavLink } from "react-router-dom";
const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState();
  const handelLogout = async () => {
    try {
      logout();
      Navigate("/login");
    } catch (e) {
      setError("Cannot Logout");
    }
  };
  const Navigate = useNavigate();
  useEffect(() => {
    !currentUser && Navigate("/login");
  }, []);

  return (
    <div className="bg-white flex flex-col w-[300px] px-[10px] md:w-[400px] py-[10px] justify-center items-center  box space-y-[5px]">
      {error && (
        <div className="bg-[#ff6767] py-[8px] px-[15px] text-[14px] text-white font-bold rounded-[4px]">
          {error}
        </div>
      )}
      <div className="w-[100%]">
        <p>Email</p>
        <div className="px-[10px]">{currentUser && currentUser.email}</div>
      </div>
      <div className="flex justify-between items-center flex-row w-[100%] text-white">
        <button
          onClick={handelLogout}
          className="bg-priamry-blue text-white py-[5px] w-full rounded-3xl "
        >
          Logout
        </button>
      </div>
      <NavLink
        to="/update-profile"
        className="bg-priamry-blue text-white py-[5px] w-full rounded-3xl text-center"
      >
        Update Profile
      </NavLink>
    </div>
  );
};
export default Profile;
