import axios from 'axios';
import * as React from 'react';
import './AppClass.css';
import BurgerBuilder from './container/BurgerBuilder';
import ToolBar from './component/Toolbar';

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
            </React.Fragment>
        );
    }
}

const axiosObj = axios.create({
    baseURL: 'https://react-burgerbuilder-ts.firebaseio.com/'
});

export { axiosObj };