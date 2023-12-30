import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";

import { useAuth } from "../context/AuthContext.js";
const Signup = () => {
  const { currentUser, setCurrentUser, signUp } = useAuth();
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    currentUser && navigate("/profile");
  }, []);
  const handelSubmit = async e => {
    e.preventDefault();
    setError("");
    if (passRef.current.value !== passConfRef.current.value) {
      return setError("Passwords aren't Match");
    }
    if (passRef.current.value.length < 6) {
      return setError("Password Length less than 6");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passRef.current.value);
      navigate("/profile");
    } catch (err) {
      if(err.message === "Firebase: Error (auth/email-already-in-use)." ){
        setError("Email Already used");} else if(
      err.message === "Firebase: Error (auth/invalid-email)." ){
        setError("Invalid Email");}
        else{setError("Cannot Sign Up")}
      
    }
    setLoading(false);
  };
  return (
    <form
      className="w-[330px] md:w-[400px] bg-white flex flex-col py-[15px] justify-center space-y-4 px-[20px] md:py-[10px] box"
      onSubmit={handelSubmit}
    >
      <div>
        <h2 className="font-[600] text-[30px] md:text-[40px] md:pt-[10px] ">
          Sign Up
        </h2>
        <p className="text-[#969696] md:text-[18px] font-normal">
          Please Sign up to continue to your account.
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
          ref={passRef}
        />
        <label
          for="input-pass"
          className="absolute z-0 text-[16px] font-[med] login-label"
        >
          Password
        </label>
      </div>
      <div className="w-[100%]  relative input-box ">
        <input
          type="password"
          className=" w-[100%] h-[100%] py-[13px] border-[2px] border-[#669999] rounded-[5px] login-input"
          required
          id="input-pass-conf"
          ref={passConfRef}
        />
        <label
          for="input-pass-conf"
          className="absolute z-0 text-[16px] font-[med] login-label"
        >
          Password Confirm
        </label>
      </div>

      <input
        type="submit"
        value={loading ? "Loading ..." : "Sign Up"}
        className="bg-priamry-blue text-white py-[8px] rounded-2xl text-[18px] transition-opacity font-bold my-5 hover:opacity-70"
      />

      <NavLink
        to="/login"
        className="text-center text-[#969696] my-2 text-[13px] opacity-70 font-[400] transition-[.3s] underline hover:text-priamry-blue"
      >
        Alrady have an Account ? Login
      </NavLink>
    </form>
  );
};

export default Signup;
