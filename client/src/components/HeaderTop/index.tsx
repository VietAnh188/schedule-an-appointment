import classNames from "classnames/bind";
import styles from "./headerTop.module.scss";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import Button from "../Button";
import Avatar from "../Avatar";
const cx = classNames.bind(styles);

function HeaderTop() {
  return (
      <header className={cx("header_top") + " wrap flex justify-between"}>
        <div className={`${cx("left")} py-3 px-4`}>
          <div className={` text-white font-bold cursor-default ${cx("logo")}`}>
            BOOKING.COM
          </div>
        </div>
        <div className={`${cx("right")} flex items-center`}>
          <ul className={`flex items-center cursor-pointer ${cx("list")}`}>
            <li className="text-white">VND</li>
            <li>
              <img
                src="https://t-cf.bstatic.com/static/img/flags/new/48-squared/gb/daba79fdd4066d133e8bf59070fd6819b951c403.png"
                className="w-6 rounded-full"
                alt=""
              />
            </li>
            <li>
              <Link to="/help">
                <BsQuestionCircle className="text-white text-2xl" />
              </Link>
            </li>
            <li className="hidden">
              <IoNotificationsOutline className="text-white text-2xl" />
            </li>
            <li className={`${cx('btn')} mr-2`}>
              <Link to="/property">
                <Button
                  content="List your property"
                  classname="text-white border border-solid border-white bg-primary"
                />
              </Link>
            </li>
            <li className="hidden">
              <Avatar />
            </li>
            <li className={`${cx('btn')}`}>
              <Link to="/register">
                <Button
                  content="Register"
                  classname="text-primary border border-solid border-primary bg-white mr-2"
                />
              </Link>
              <Link to="/login">
                <Button
                  content="Sign in"
                  classname="text-primary border border-solid border-primary bg-white"
                />
              </Link>
            </li>
          </ul>
        </div>
      </header>
  );
}

export default HeaderTop;
