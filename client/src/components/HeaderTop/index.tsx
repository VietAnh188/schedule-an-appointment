import classNames from "classnames/bind";
import styles from './headerTop.module.scss'
import { Link } from "react-router-dom";
import {BsQuestionCircle} from 'react-icons/bs'
import Button from "../Button";
import Avatar from "../Avatar";
const cx = classNames.bind(styles)

function HeaderTop() {
    return ( <header className={cx('header_top') + ' flex justify-between'}>
        <div className={`${cx('left')} py-3 px-4`}>
            <div className={` text-white font-bold ${cx('logo')}`}>BOOKING.COM</div>
        </div>
        <div className={`${cx('right')} flex items-center`}>
            <ul className="flex flex items-center">
                <li className="text-white">VND</li>
                <li><img src="https://t-cf.bstatic.com/static/img/flags/new/48-squared/gb/daba79fdd4066d133e8bf59070fd6819b951c403.png" className="w-6 rounded-full" alt="" /></li>
                <li>
                    <Link to='/help'>
                        <BsQuestionCircle className="text-white text-2xl"/>
                    </Link>
                </li>
                <li>
                    <Button 
                        content= "List your property"
                        color="white"
                        border="solid 1px"
                        border-color='white'
                    />
                </li>
                <li  className="hidden">
                    <Avatar/>
                </li>
                <li>
                    <Link to='/register'>
                        <Button 
                            content="Register"
                            color="primary"
                            border="solid 1px"
                            borderColor='primary'
                            bacolor="white"
                            flag='8px'
                        />
                    </Link>
                    <Link to='/login'>
                        <Button 
                            content="Sign in"
                            color="primary"
                            border="solid 1px"
                            borderColor='primary'
                            bacolor="white"
                        />
                    </Link>
                </li>

                

              
            </ul>
        </div>
    </header> );
}

export default HeaderTop;