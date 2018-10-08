import * as React from 'react';
import burgerLogo from '../assets/images/burger-logo.png';
import { IPropsShow, IPropsChild } from '../classes/IProps';
import './MiscComps.css';
import './Spinner.css';

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

const BackDrop = (props: IPropsShow) => (props.show ?
    <div className='BackDrop' onClick={props.clicked} /> : null
);

const SideDrawer = (props: IPropsShow) =>
{
    const cssclass = 'SideDrawer ' + (props.show ? 'DrawerOpen' : 'DrawerClose');
    return (
        <div className={cssclass}>
            <div className='SideLogo'> <Logo /> </div>
            <nav> <Navigations /> </nav>
        </div>
    );
}

const Modal = (props: IPropsChild) => (
    <React.Fragment>
        <BackDrop show={props.show} clicked={props.clicked} />
        <div className={'Modal ' + (props.show ? 'ShowModal' : 'HideModal')} >
            { props.children }
        </div>
    </React.Fragment>
);

const Button = (props: IPropsChild) => (<button onClick={props.clicked}
    className={'Button ' + props.type}> {props.children} </button>);

const Spinner = () => (<div className="SpinnerLoader">Loading...</div>);

export { Logo, Navigations, BackDrop, SideDrawer, Modal, Button, Spinner };