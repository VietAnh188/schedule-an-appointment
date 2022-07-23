import classNames from "classnames/bind";
import { IconType } from "react-icons";
import styles from './NavItem.module.scss'

const cx = classNames.bind(styles)
interface INavItem {
    Icon: IconType,
    content: string,
    active?: boolean
}

function NavItem({Icon, content, active}:INavItem) {
    return (<div className={`items-center p-3 rounded-full inline-flex ${active && cx('active')}`}>
        {<Icon className='text-white mr-2 text-2xl'/>}
        <span className="text-white text-base">{content}</span>
    </div>);
}

export default NavItem;