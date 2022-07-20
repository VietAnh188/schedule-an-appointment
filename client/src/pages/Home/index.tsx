import React from "react";
import Header from "../../components/Header";
import classNames from "classnames/bind";
import styles from './home.module.scss'
const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('main')}>
            <Header/>
        </div>
     );
}

export default Home