import axios from 'axios';
import * as React from 'react';
import './AppClass.css';
import BurgerBuilder from './container/BurgerBuilder';
import ToolBar from './component/Toolbar';
import { Modal } from './component/MiscComps';

export default class AppClass extends React.Component
{
    public render()
    {
        console.log('app class render...');
        return (
            <React.Fragment>
                <ToolBar />
                <main className='BurgerLayoutContent'>
                    <BurgerBuilder />
                </main>
                {/* <Modal show={true} >
                <p>Something went wrong...</p>
                </Modal> */}
            </React.Fragment>
        );
    }
}

const axiosObj = axios.create({
    baseURL: 'https://react-burgerbuilder-ts.firebaseio.com/'
});

export { axiosObj };