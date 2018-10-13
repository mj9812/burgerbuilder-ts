import * as React from 'react';
import Navigations from './Navigations';
import { Logo, BackDrop, SideDrawer } from './MiscComps';
import './Toolbar.css';

export default class Toolbar extends React.Component
{
    public state = { drawer: false };

    public render()
    {
        return (
            <React.Fragment>
                <header className='Toolbar'>
                    <div className='DrawerToggle' onClick={this.openDrawer}>
                        <div/><div/><div/>
                    </div>
                    <div className='ToolLogo'>
                        <Logo />
                    </div>
                    <nav className='DesktopOnly'>
                        <Navigations  />
                    </nav>
                </header>
                <BackDrop show={this.state.drawer} clicked={this.closeDrawer}/>
                <SideDrawer show={this.state.drawer} clicked={this.closeDrawer}/>
            </React.Fragment>
        );
    }

    private closeDrawer = () =>
    {
        this.setState({ drawer: false });
    }
    private openDrawer = () =>
    {
        this.setState({ drawer: true });
    }
}