import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
const UpdateProfile = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const navigate = useNavigate();
  const handelSubmit = (e, email, prevPass, newPass) => {
    e.preventDefault();
  };

  useEffect(() => {
    !currentUser && navigate("/login");
  }, []);
  return (
    <form
      className="w-[330px] md:w-[400px] bg-white flex flex-col py-[15px] justify-center space-y-4 px-[20px] md:py-[10px] box"
      onSubmit={handelSubmit}
    >
      <div>
        <h2 className="font-[600] text-[30px] md:text-[40px] md:pt-[10px] ">
          Update Account
        </h2>
        <p className="text-[#969696] md:text-[18px] font-normal">
          Enter The Data to update
        </p>
      </div>
      {error && (
        <div className="bg-[#ff6767] py-[9px] px-[15px] text-[12px] text-white font-bold rounded-[4px]">
          {error}
        </div>
      )}

      <div className="w-[100%]  relative input-box ">
        <input
          type="text"
          className=" w-[100%] h-[100%] py-[13px] border-[2px] border-[#669999] rounded-[5px] login-input"
          required
          id="input-email"
          ref={emailRef}
        />
        <label
          for="input-email"
          className="absolute z-0 text-[16px] font-[med] login-label"
        >
          Email
        </label>
      </div>
      <div className="w-[100%]  relative input-box ">
        <input
          type="password"
          className=" w-[100%] h-[100%] py-[13px] border-[2px] border-[#669999] rounded-[5px] login-input"
          required
          id="input-pass"
          ref={oldPassRef}
        />
        <label
          for="input-pass"
          className="absolute z-0 text-[16px] font-[med] login-label"
        >
          Old Password
        </label>
      </div>
      <div className="w-[100%]  relative input-box ">
        <input
          type="password"
          className=" w-[100%] h-[100%] py-[13px] border-[2px] border-[#669999] rounded-[5px] login-input"
          required
          id="input-pass-conf"
          ref={newPassRef}
        />
        <label
          for="input-pass-conf"
          className="absolute z-0 text-[16px] font-[med] login-label"
        >
          New Password
        </label>
      </div>

      <input
        type="submit"
        value={loading ? "Loading ..." : "Update"}
        className="bg-priamry-blue text-white py-[8px] rounded-2xl text-[18px] transition-opacity font-bold my-5 hover:opacity-70"
      />

      <NavLink
        to="/profile"
        className="text-center text-[#969696] my-2 text-[13px] opacity-70 font-[400] transition-[.3s] underline hover:text-priamry-blue"
      >
        Go Back
      </NavLink>
    </form>
  );
};

export default UpdateProfile;
