import LoginInWith from "../../components/SignIn";
import { FaFacebookSquare, FaApple } from "react-icons/fa";
import { FcGoogle, FcPhoneAndroid } from "react-icons/fc";
import { useRef, useState } from "react";


function Authenticate() {
  const [mount,setMount] = useState(false)
  const [invalid, setInvalid] = useState(false);

  const emailRef = useRef<HTMLInputElement>(document.createElement('input'))
  const continueWithEmailRef = useRef<HTMLDivElement>(document.createElement('div'))
  function ValidateEmail(value:string) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailRegex.test(value)) {
      return true;
    }
    return false;
  }

  function createPass(){
      continueWithEmailRef.current.hidden =true
  }
  function submitEmail () {
     ValidateEmail(emailRef.current.value)
       ? setInvalid(false)
       : setInvalid(true);
  }
  invalid === false && createPass();

  return (
    <div className="w-full">
      <div className="h-16 bg-black w-full">asd</div>
      <div className="w-full h-full grid place-items-center">
        <div className=" mt-5 m-auto w-80  pt-1 pb-3 text-left">
          <div ref={continueWithEmailRef}>
            <div className="mb-10">
              <h1 className="font-bold text-2xl text-gray-700">
                Sign in or create an account
              </h1>
            </div>
            <div className="mb-4">
              <label className="flex mb-1" htmlFor="#">
                Email address
              </label>
              <input
                className={`w-full flex text-gray-800 text-sm font-normal leading-5 h-9 px-2 py-1 outline-none rounded border-2 border-gray-600
               ${invalid ? "border-red-700 border" : "border"}
              `}
                type="text"
                ref={emailRef}
              />
              {invalid ? (
                <p className="text-red-500 mt-2">
                  Please check if the email address you've entered is correct.
                </p>
              ) : (
                <p className="mt-2"></p>
              )}
            </div>
            <div className="w-full mt-4">
              <button
                className="cursor-pointer w-full text-center text-base leading-6 h-12 bg-blue-600 border-none rounded font-semibold text-white"
                onClick={submitEmail}
              >
                Continue with email
              </button>
            </div>
            <div className="flex mt-3 items-center">
              <div className="h-line bg-slate-700 w-full"></div>
              <span className="whitespace-nowrap mr-2 ml-2">
                or use one of these options
              </span>
              <div className="h-line bg-slate-700 w-full"></div>
            </div>
            <div className="mt-5 mb-8">
              <div className="flex justify-center ">
                <div>
                  <LoginInWith
                    Icon={FaFacebookSquare}
                    names="text-blue-700 text-lg"
                  />
                </div>
                <div className="ml-10 mr-10">
                  <LoginInWith Icon={FcGoogle} names="text-lg" />
                </div>
                <div>
                  <LoginInWith Icon={FcPhoneAndroid} names="text-lg" />
                </div>
              </div>
              <div className="cursor-pointer text-lg text-center text-blue-700 font-bold  mt-2">
                <p
                  onClick={() => {
                    setMount((prev) => !prev);
                  }}
                  style={{ display: mount ? "none" : "block" }}
                >
                  More ways to sign in
                </p>
                {mount && (
                  <div className="mt-8">
                    <LoginInWith Icon={FaApple} names="text-lg" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="h-line  bg-slate-400 w-full"></div>
            <div className="text-center text-xs font-thin mt-4 mb-4">
              By signing in or creating an account, you agree with our
              <a href="fb.com" className="no-underline font-thin">
                {" "}
                Terms & conditions
              </a>{" "}
              and
              <a href="fb.com" className="no-underline font-thin">
                {" "}
                Privacy statement
              </a>
            </div>
            <div className="h-line  bg-slate-400 w-full"></div>
          </div>
          <div className="text-center mb-5">
            All rights reserved.<br></br>Copyright (2006 - 2022) - Booking.com™
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
