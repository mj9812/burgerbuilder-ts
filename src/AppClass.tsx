import axios from 'axios';
import * as React from 'react';
import { Route } from 'react-router-dom';
import './AppClass.css';
import BurgerBuilder from './container/BurgerBuilder';
import ToolBar from './component/Toolbar';
import Checkout from './container/Checkout';
import Orders from './container/Orders';
import { IPropsRoute } from './classes/IProps';

export default class AppClass extends React.Component
{
    public render()
    {
        return (
            <React.Fragment>
                <Route path='/' component={ToolBar}/>
                <Route path='/' exact={true} render={this.builderComp}/>
                <Route path='/checkout' render={this.checkoutComp}/>
                <Route path='/orders' component={Orders}/>
            </React.Fragment>
        );
    }
    
    private builderComp = (routeProps: IPropsRoute) =>
    {
        return (
        <main className='BurgerLayoutContent'>
            <BurgerBuilder {...routeProps} /> 
        </main>);
    }
    private checkoutComp = (routeProps: IPropsRoute) =>
    {
        return (<Checkout {...routeProps}/>);
    }
}

const axiosObj = axios.create({
    baseURL: 'https://react-burgerbuilder-ts.firebaseio.com/'
});

export { axiosObj };