import * as React from 'react';
import burgerLogo from '../assets/images/burger-logo.png';
import './Toolbar.css';
import { Fragment } from 'react';

interface IProps
{
    show: boolean;
    clicked?: () => void;
}

export default class Toolbar extends React.Component
{
    public state = { drawer: false };

    public render()
    {
        console.log('toolbar render...');
        return (
            <Fragment>
                <header className='Toolbar'>
                    <div className='DrawerToggle' onClick={this.openDrawer}>
                        <div/><div/><div/>
                    </div>
                    <div className='ToolLogo'>
                        <Logo />
                    </div>
                    <nav className='DesktopOnly'>
                        <Navigations />
                    </nav>
                </header>
                <BackDrop show={this.state.drawer} clicked={this.closeDrawer}/>
                <SideDrawer show={this.state.drawer} />
            </Fragment>
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

const Logo = () => (
    <div className='LogoComp'>
        <img src={burgerLogo} alt='Burger Logo' />
    </div>
);

const Navigations = () => (
    <ul className='Navigations'>
        <li className='NavigationItem'>
            <a href='/' className='active'>Burger Builder</a>
        </li>
        <li className='NavigationItem'>
            <a href='/' >Checkout</a>
        </li>
    </ul>
);

const BackDrop = (props: IProps) => (props.show ?
    <div className='BackDrop' onClick={props.clicked} /> : null
);

const SideDrawer = (props: IProps) =>
{
    const cssclass = 'SideDrawer ' + (props.show ? 'Open' : 'Close');
    return (
        <div className={cssclass}>
            <div className='SideLogo'> <Logo /> </div>
            <nav> <Navigations /> </nav>
        </div>
    );
}

export { BackDrop };