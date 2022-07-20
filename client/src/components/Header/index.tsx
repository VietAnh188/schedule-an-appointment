import HeaderTop from "../HeaderTop";
import classNames from "classnames/bind";
import styles from './header.module.scss'
const cx = classNames.bind(styles)

function Header() {
    return ( 
        <div className={cx('header')}>
                <div className="wrap">
                <HeaderTop/>
                </div>
            </div>
        
     );
}

export default Header;