import React, { useEffect, useState } from 'react';
import { listConnection } from '../../global/notes-function';
import { useDispatch } from 'react-redux';
import { loadAll } from '../../features/notes-slice';

import Header from '../../components/main/header/Header';
import Menu from '../../components/main/menu/Menu';
import Window from '../../components/main/window/Window';
import Footer from '../../components/main/footer/Footer';
import Spinner from '../../components/common/spinner/Spinner';

import './Main.scss'

const Main = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false) //zmienic na true jak odblokuje useEffect

    const loadNotes = async () => {
        try {
            const data = await listConnection('notes');
            if (data) { dispatch(loadAll(data)) }
        } catch (err) {
            window.location.href = `/error/nie udało się załadować listy notatek...`
        }
    }

    // useEffect(() => {
    //     (async () => {
    //         await loadNotes()
    //         setLoading(false)
    //     })();
    // });

    if (loading) return <Spinner />;

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
