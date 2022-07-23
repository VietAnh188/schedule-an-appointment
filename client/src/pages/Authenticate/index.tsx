import LoginInWith from "../../components/SignInOptions";
import { FaFacebookSquare, FaApple } from "react-icons/fa";
import { FcGoogle, FcPhoneAndroid } from "react-icons/fc";
import { useRef, useState } from "react";
import FooterSignIn from "../../components/FooterSignIn";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
function Authenticate() {
  const [mount, setMount] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const emailRef = useRef<HTMLInputElement>(document.createElement("input"));
  const continueWithEmailRef = useRef<HTMLDivElement>(document.createElement("div"));
  const errorRef = useRef<HTMLParagraphElement>(document.createElement("p"));

  function ValidateEmail(value: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(value)) {
      return true;
    }
    return false;
  }
const navigate = useNavigate();
  function createPass() {
    continueWithEmailRef.current.hidden = true;
    navigate("/login/password")
  }

  function submitEmail() {
    return ValidateEmail(emailRef.current.value) ? true : false;
  }

  function submit() {
   if( submitEmail()===true){
    createPass();
   }
  }

  function onBlurInput() {
    if (ValidateEmail(emailRef.current.value) === false) {
      setInvalid(true);
      errorRef.current.className = "block text-red-700";
      emailRef.current.className =
        "w-full flex text-gray-800 text-sm font-normal leading-5 h-9 px-2 py-1 outline-none rounded border-2 border-red-700";
    }
  }
  function focusInput() {
    if (ValidateEmail(emailRef.current.value) === false) {
      errorRef.current.className = "hidden";
      emailRef.current.className =
        "w-full flex text-gray-800 text-sm font-normal leading-5 h-9 px-2 py-1 outline-none rounded border-2 border-gray-600";
    }
  }

  return (
    <div className="w-full">
      <Header nav={false}/>
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
                onBlur={() => {
                  onBlurInput();
                }}
                onFocus={() => {
                  focusInput();
                }}
              />
              {invalid ? (
                <p className="text-red-500 mt-2" ref={errorRef}>
                  Please check if the email address you've entered is correct.
                </p>
              ) : (
                <p className="mt-2"></p>
              )}
            </div>
            <div className="w-full mt-4">
              <button
                className="cursor-pointer w-full text-center text-base leading-6 h-12 bg-blue-600 border-none rounded font-semibold text-white"
                onClick={submit}
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
                  style={{ display: mount ? "none" : "block" }}
                  onClick={() => {
                    setMount(true);
                  }}
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
          <FooterSignIn/>
          </div>
      </div>
    </div>
  );
}

export default Authenticate;
