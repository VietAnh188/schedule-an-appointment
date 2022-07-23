import HeaderTop from "../HeaderTop";
import classNames from "classnames/bind";
import styles from './header.module.scss'
import Navbar from "../Navbar";
const cx = classNames.bind(styles)

function Header() {
    return ( 
        <div className={cx('header')}>
            <HeaderTop/>
            <Navbar/>
        </div>
        
     );
}

export default Header;