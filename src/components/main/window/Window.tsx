import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Callendar from './callendar/Callendar';
import Cloud from './cloud/Cloud';
import Notes from './notes/Notes';
import User from './user/User';

import './Window.scss';

const Window = () => {
    return (
        <div className='Main-window'>
            <Routes>
                <Route path='/notes' element={<Notes />} />
                <Route path='/callendar' element={<Callendar />} />
                <Route path='/user' element={<User />} />
                <Route path='/*' element={<Cloud />} />
            </Routes>
        </div>
    )
}

export default Window