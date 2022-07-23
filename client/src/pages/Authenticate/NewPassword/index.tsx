import InputPassword from "../../../components/Input";
import HeaderTop from "../../../components/HeaderTop";
import FooterSignIn from "../../../components/FooterSignIn";
function NewPassword() {
  function createPass(){
    
  }
    return (
      <div className="w-full">
        <HeaderTop />
        <div className="w-full h-full grid place-items-center">
          <div className=" mt-5 m-auto w-350  pt-1 pb-3 text-left">
            <div>
              <div className="mb-10">
                <h1 className="font-bold text-2xl text-gray-700">
                  Create password
                </h1>
                <div className="mt-3 mb-7 ">
                  <span className="font-thin">
                    Use a minimum of 10 characters, including uppercase letters,
                    lowercase letters and numbers.
                  </span>
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="#" className="block mb-1">
                  Password
                </label>
                <InputPassword />
              </div>
              <div className="mt-7">
                <label htmlFor="#" className="block mb-1">
                  Confirm password
                </label>
                <InputPassword />
              </div>
            </div>
            <div className="w-full mt-4 mb-6">
              <button className="cursor-pointer w-full text-center text-base leading-6 h-12 bg-blue-600 border-none rounded font-semibold text-white"
              onClick={createPass}
              >
                Create Account
              </button>
            </div>
            <FooterSignIn />
          </div>
        </div>
      </div>
    );
}

export default NewPassword;