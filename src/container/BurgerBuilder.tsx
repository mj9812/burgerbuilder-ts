import { Fragment } from 'react';
import * as React from 'react';
import BurgerObj from '../classes/BurgerObj';
import BurgerComp from '../component/BurgerComp';
import BuilderComp from '../component/BuilderComp';
import OrderComp from '../component/OrderComp';

export default class BurgerBuilder extends React.Component
{
    public state = { hasOrderd: false };
    private burger: BurgerObj = new BurgerObj();
    
    public render()
    {
        console.log('BurgerBuilder render...');
        return (
            <Fragment>
                <BurgerComp burger={this.burger}
                    hasOrder={this.state.hasOrderd}/>

                <BuilderComp burger={this.burger}
                    hasOrder={this.state.hasOrderd}
                    orderClick={this.orderClicked}
                    builderClick={this.moreLessClicked}/>

                <OrderComp burger={this.burger}
                    hasOrder={this.state.hasOrderd}
                    cancelled={this.orderCancelled}/>
            </Fragment>
        );
    }

    private moreLessClicked = (event: any) =>
    {
        const elmt = event.target;
        if (elmt.textContent === 'More') {
            this.burger.increaseCount(elmt.getAttribute('data-ingr'));
        } else {
            this.burger.decreaseCount(elmt.getAttribute('data-ingr'));
        }
        this.setState({});
    }

    private orderClicked = () =>
    {
        this.setState({hasOrderd: true});
    }
    private orderCancelled = () =>
    {
        this.setState({hasOrderd: false});
    }
}