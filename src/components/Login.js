import { useState, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import "./Login.css";

const Login = () => {
  const [passType, setPassType] = useState("password");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const emailRef = useRef();
  const passRef = useRef();
  const Navigate = useNavigate();
  const location = useLocation();

  const redirect = location.state?.path || "/";
  const handelIconClick = () => {
    passType === "text" ? setPassType("password") : setPassType("text");
  };

  const handelSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passRef.current.value);

      Navigate(redirect, { replace: true });
    } catch (err) {
      setLoading(false);
      setError(() => {
        if (err.code === "auth/invalid-credential") {
          return "Email or Password incorrect";
        } else if (err.code === "auth/invalid-email") {
          return "Invaild Email";
        } else {
          return "Cannot Login";
        }
      });
    }
  };

  return (
    <form
      onSubmit={handelSubmit}
      className="w-[330px] md:w-[400px] bg-white flex flex-col justify-center space-y-4 px-[20px] py-[20px] box"
    >
      <div>
        <h2 className="font-[700] text-[40px] pt-[10px] pb-[3px]">Login</h2>
        <p className="text-[#969696] md:text-[18px] font-normal">
          Please login to continue to your account.
        </p>
      </div>
      {error && (
        <div className="bg-[#ff6767] py-[8px] px-[15px] text-[14px] text-white font-bold rounded-[4px]">
          {error}
        </div>
      )}
      <div className="w-[100%]  relative input-box ">
        <input
          type={"text"}
          className=" w-[100%] h-[100%] py-[13px] border-[2px] border-[#669999] rounded-[5px] login-input"
          required
          id={"input-email"}
          ref={emailRef}
        />
        <label
          for={"input-email"}
          className="absolute z-0 text-[16px] font-[med] login-label"
        >
          Email
        </label>
      </div>
      <div className="w-[100%]  relative input-box ">
        <input
          type={passType}
          className=" w-[100%] h-[100%] py-[13px] border-[2px] border-[#669999] rounded-[5px] login-input"
          required
          id={"input-pass"}
          ref={passRef}
        />
        <label
          for={"input-pass"}
          className="absolute z-0 text-[16px] font-[med] login-label"
        >
          Password
        </label>
        <img
          src={
            passType === "text"
              ? "/icons/visibility.svg"
              : "/icons/NotVisibility.svg"
          }
          alt="show"
          className="absolute pass-icon"
          onClick={handelIconClick}
        />
      </div>

      <NavLink
        to="/forgot"
        className="text-[#969696] opacity-70 text-[13px] font-[400] underline transition-[0.3s] hover:text-priamry-blue"
      >
        Forgot Password ?
      </NavLink>

      <input
        type="submit"
        value={loading ? "Loading ..." : "Login"}
        className="bg-priamry-blue text-white py-[8px] rounded-2xl text-[18px] transition-opacity font-bold my-5 hover:opacity-70"
      />

      <NavLink
        to="/sign-up"
        className="text-center text-[#969696] my-2 text-[13px] opacity-70 font-[400] transition-[.3s] underline hover:text-priamry-blue"
      >
        don't have an Account ? create an Account
      </NavLink>
    </form>
  );
};

export default Login;
