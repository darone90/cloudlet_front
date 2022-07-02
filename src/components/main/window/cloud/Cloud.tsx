import React, { useState } from 'react';
import { ButtonSize } from '../../../../types/components.type';

import Button from '../../../common/button/Button';
import Files from './Files';
import Gallery from './Gallery';
import UploadFiles from './Uploadfile';
import UploadFoto from './Uploadfoto';

const Cloud = () => {

    const [view, setView] = useState<boolean>(false)

    const upload = (<><UploadFiles /><UploadFoto /></>);
    const download = (<><Files /><Gallery /></>)


    return (
        <div className='Cloud'>
            <Button text={view ? 'Zobacz pliki' : 'Dodaj pliki'} size={ButtonSize.Important} func={() => (setView(prev => !prev))} />
            {view ? upload : download}
        </div>
    )
}

export default Cloud