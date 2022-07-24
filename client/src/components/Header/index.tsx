import HeaderTop from "../HeaderTop";
import classNames from "classnames/bind";
import styles from './header.module.scss'
import Navbar from "../Navbar";
const cx = classNames.bind(styles)


interface Ihead {
    nav?: boolean
}
function Header({nav}:Ihead) {
    if(nav==undefined)
        nav=true
    return ( 
        <div className={cx('header')}>
            <HeaderTop/>
            {nav==false || <Navbar/>}
        </div>
        
     );
}

export default Header;