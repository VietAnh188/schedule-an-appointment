import { Link } from "react-router-dom";
import NavItem from "../NavItem";
import './Nav.module.scss'
import {AiOutlineCar} from 'react-icons/ai'
import {FaPlaneDeparture} from 'react-icons/fa'
import {GiEarthAmerica, GiHomeGarage} from 'react-icons/gi'
import {MdOutlineAttractions} from 'react-icons/md'
import {BiTaxi} from 'react-icons/bi'

import classNames from "classnames/bind";
import styles from './Nav.module.scss'

const cx = classNames.bind(styles)

function Navbar() {
  return (
    <div className={`wrap py-3 px-4 ${cx('navbar')}`}>
      <ul className={`flex ${cx('list')}`}>
        <li>
          <Link to='/stays'>
          <NavItem Icon={GiHomeGarage} content="Stays" active={true} />
          </Link>
        </li>
        <li>
         <Link to='/flights'> <NavItem Icon={FaPlaneDeparture} content="Flights" /></Link>
        </li>
        <li>
          <Link to='/hotel'><NavItem Icon={GiEarthAmerica} content="Flights + Hotel" /></Link>
        </li>
        <li>
          <Link to='/car'>
          <NavItem Icon={AiOutlineCar} content="Car rentals"/>
          </Link>
        </li>
        <li>
          <Link to='/car'>
          <NavItem Icon={MdOutlineAttractions} content="Attractions"/>
          </Link>
        </li>
        <li>
          <Link to='/car'>
          <NavItem Icon={BiTaxi} content="Airport Taxi"/>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
