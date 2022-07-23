import { useRef, useState } from "react";
import {FaRegEye,FaEyeSlash} from "react-icons/fa";
function InputPassword() {
  const [eye,setEye] = useState(false)
  const passwordRef =useRef<HTMLInputElement>(document.createElement("input"))
function handleEye(){
      setEye(prev=>!prev)
}
eye ? (passwordRef.current.type = "text") : (passwordRef.current.type = "password");
    return (
      <div className="flex w-full">
        <input 
          type="password"
          className="flex text-base  p-1 w-full focus:  outline-blue-900 "
          ref={passwordRef}
        />

        <div
          className="relative cursor-pointer -ml-8 p-2 top-0 bottom-0 hover:bg-slate-300"
          onClick={handleEye}
        >
          {eye ? <FaEyeSlash /> : <FaRegEye />}
        </div>
      </div>
    );
}

export default InputPassword;