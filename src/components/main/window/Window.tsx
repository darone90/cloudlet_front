import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Callendar from './callendar/Callendar';
import Cloud from './cloud/Cloud';
import Notes from './notes/Notes';
import User from './user/User';

const Window = () => {
    return (
        <div className='Main-window'>
            <Routes>
                <Route path='/' element={<Cloud />} />
                <Route path='/notes' element={<Notes />} />
                <Route path='/callendar' element={<Callendar />} />
                <Route path='/user' element={<User />} />
            </Routes>
        </div>
    )
}

export default Window