import React from "react";
import Header from "../../components/Header";
import classNames from "classnames/bind";
import styles from './home.module.scss'
const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('main')}>
            <div className={cx('header')}>
                <div className="wrap">
                    <Header/>
                </div>
            </div>
        </div>
     );
}

export default Home