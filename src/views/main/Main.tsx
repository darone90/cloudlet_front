import React from 'react';

import Header from '../../components/main/header/Header';
import Menu from '../../components/main/menu/Menu';
import Window from '../../components/main/window/Window';
import Footer from '../../components/main/footer/Footer';

import './Main.scss'

const Main = () => {
    return (
        <div className='Main-component'>
            <Header />
            <Menu />
            <Window />
            <Footer />
        </div>
    )
}

export default Main
