function FooterSignIn() {
    return (
      <div>
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
    );
}

export default FooterSignIn;