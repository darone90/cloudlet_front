import React, { useEffect, useState } from 'react';
import { listConnection } from '../../global/notes-function';
import { useDispatch } from 'react-redux';
import { loadAll } from '../../features/notes-slice';
import { loadFiles } from '../../features/files-slice';
import { loadFoto } from '../../features/foto-slice';
import { getFilesList } from '../../global/files-functions';

import Header from '../../components/main/header/Header';
import Menu from '../../components/main/menu/Menu';
import Window from '../../components/main/window/Window';
import Footer from '../../components/main/footer/Footer';
import Spinner from '../../components/common/spinner/Spinner';

import './Main.scss'

const Main = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true)

    const loadNotes = async () => {
        try {
            const data = await listConnection('notes');
            if (data) { dispatch(loadAll(data)) }
        } catch (err) {
            window.location.href = `/error/nie udało się załadować listy notatek...`;
        }
    }

    const loadFilesFromDatabase = async () => {
        try {
            const data = await getFilesList('files');
            if (data) {
                const { files, fotos } = data;
                dispatch(loadFiles(files))
                dispatch(loadFoto(fotos))
            }
        } catch (err) {
            window.location.href = `/error/nie udało się załadować listy plików`;
        }
    }

    useEffect(() => {
        (async () => {
            await loadNotes()
            await loadFilesFromDatabase();
            setLoading(false)
        })();
    }, []);

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
