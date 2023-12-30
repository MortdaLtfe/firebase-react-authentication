import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import "./Login.css";
const Login = () => {
  const { restPassword } = useAuth();
  const [error, setErorr] = useState();
  const [message, setMessage] = useState();
  const emailRef = useRef();
  const Navigate = useNavigate();
  const handelSubmit = async e => {
    e.preventDefault();
    setErorr("");

    try {
      await restPassword(emailRef.current.value);
      setMessage("Check your email please");
      setTimeout(() => {
        Navigate("/login");
      }, 5000);
    } catch (error) {
      error.message === "Firebase: Error (auth/invalid-email)."
        ? setErorr("Invalid Email")
        : setErorr("Cannot Create an Email");
    }
  };
  return (
    <form
      onSubmit={handelSubmit}
      className="w-[330px] md:w-[400px] bg-white flex flex-col justify-center space-y-4 px-[20px] py-[20px] box"
    >
      <div>
        <h2 className="font-[700] text-[35px] pt-[10px] pb-[3px]">
          Reset Password
        </h2>
        <p className="text-[#969696] md:text-[18px] font-normal">
          Enter Your Email to reset the Password
        </p>
      </div>

      {error && (
        <div className="bg-[#ff6767] py-[7px] px-[15px] text-[12px] text-white font-bold rounded-[4px]">
          {error}
        </div>
      )}

      {message && (
        <div className="bg-[#00d11e] py-[7px] px-[15px] text-[12px] text-white font-bold rounded-[4px]">
          {message}
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

      <input
        type="submit"
        value="Login"
        className="bg-priamry-blue text-white py-[8px] rounded-2xl text-[18px] transition-opacity font-bold my-5 hover:opacity-70"
      />
      <NavLink
        to="/login"
        className="text-center text-[#969696] my-2 text-[15px] opacity-80 font-[400] transition-[.3s] underline hover:text-priamry-blue"
      >
        Go Back
      </NavLink>
    </form>
  );
};

export default Login;
