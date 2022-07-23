import HeaderTop from "../HeaderTop";
import classNames from "classnames/bind";
import styles from './header.module.scss'
import Navbar from "../Navbar";
const cx = classNames.bind(styles)


interface Ihead {
    nav?: boolean
}
function Header({nav}:Ihead) {
    return ( 
        <div className={cx('header')}>
            <HeaderTop/>
            {nav && <Navbar/>}
        </div>
        
     );
}

export default Header;