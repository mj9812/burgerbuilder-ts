import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
// import { IPropsRoute } from 'src/classes/IProps';

const Navigations = () => 
{
    return (
    <ul className='Navigations'>
        <li className='NavigationItem'>
            <NavLink to='/' exact={true}
            // className={props.location.pathname==='/' ? 'active' : ''}
            >Burger Builder</NavLink>
        </li>
        <li className='NavigationItem'>
            <NavLink to='/checkout'
            // className={props.location.pathname==='/checkout' ? 'active' : ''} 
            >Checkout</NavLink>
        </li>
    </ul>);
}
export default withRouter( Navigations );

// const Navigations = (props: IPropsRoute) => 