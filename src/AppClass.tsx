import axios from 'axios';
import * as React from 'react';
import { Route } from 'react-router-dom';
import './AppClass.css';
import BurgerBuilder from './container/BurgerBuilder';
import ToolBar from './component/Toolbar';
import Checkout from './container/Checkout';
import BurgerObj from './classes/BurgerObj';
import { IPropsRoute } from './classes/IProps';

export default class AppClass extends React.Component
{
    public state = { initPhase: true, errMsg: '' };
    private burger: BurgerObj = new BurgerObj();

    public render()
    {
        return (
            <React.Fragment>
                <Route path='/' component={ToolBar}/>
                <Route path='/' exact={true} render={this.builderComp}/>
                <Route path='/checkout' render={this.checkoutComp}/>
            </React.Fragment>
        );
    }
    
    private builderComp = (routeProps: IPropsRoute) =>
    {
        return (
        <main className='BurgerLayoutContent'>
            <BurgerBuilder initPhase={this.state.initPhase} burger={this.burger}
                stateChange={this.changeState} errMsg={this.state.errMsg} {...routeProps} /> 
        </main>);
    }
    private checkoutComp = (routeProps: IPropsRoute) =>
    {
        return (<Checkout burger={this.burger} {...routeProps}/>);
    }

    private changeState = (iPh: boolean, er: string) =>
    {
        this.setState({initPhase: iPh, errMsg: er});
    }
}

const axiosObj = axios.create({
    baseURL: 'https://react-burgerbuilder-ts.firebaseio.com/'
});

export { axiosObj };